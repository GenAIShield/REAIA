import os
from langchain_experimental.graph_transformers import LLMGraphTransformer
from langchain_core.pydantic_v1 import BaseModel, Field
from typing import List, Tuple, Optional
from langchain_core.messages import AIMessage, HumanMessage
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate, PromptTemplate
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_core.runnables import RunnableBranch, RunnableLambda, RunnableParallel, RunnablePassthrough
from langchain_core.pydantic_v1 import BaseModel
from langchain_community.vectorstores import Neo4jVector
from langchain_community.graphs import Neo4jGraph
from langchain_community.vectorstores.neo4j_vector import remove_lucene_chars
from db import fetch_chat_history, save_chat_entry  # Import our database functions

# Load the environment
from dotenv import load_dotenv, find_dotenv
load_dotenv(find_dotenv(),override=True)

# Setting up the environment for OpenAI (ensure API key is in your .env file)
os.environ["OPENAI_API_KEY"] = os.getenv('OPENAI_API_KEY')

# Initializing The Graph
graph = Neo4jGraph()
llm = ChatOpenAI(temperature=0, model="gpt-3.5-turbo-0125")
embedding_llm = OpenAIEmbeddings()
llm_transformer = LLMGraphTransformer(llm=llm)

# Initialize Vector Index
vector_index = Neo4jVector.from_existing_graph(
    embedding_llm,
    search_type="hybrid",
    node_label="Document",
    text_node_properties=["text"],
    embedding_node_property="embedding"
)

# Define Prompt Templates for context retrieval
response_template = """You are a dedicated Research Assistant AI, providing detailed, context-based answers and insights derived from research papers in the knowledge base.
    Context: {context}
    Researcher's Question: {question}
    Insightful Answer:"""

prompt = ChatPromptTemplate.from_template(response_template)

# Define a function to format chat history
def _format_chat_history(chat_history: List[Tuple[str, str]]) -> List:
    # Create a list to store formatted messages
    formatted_history = []

    # Check if chat_history is a list of tuples with 2 elements each
    if not isinstance(chat_history, list) or not all(isinstance(entry, tuple) and len(entry) == 2 for entry in chat_history):
        print("Invalid chat_history format:", chat_history)
        return formatted_history  # Return an empty list if format is invalid
    # Loop through the chat history tuples
    for human, ai in chat_history:
        # Append formatted messages to the list
        formatted_history.append(HumanMessage(content=human))
        formatted_history.append(AIMessage(content=ai))
    
    # Return the list of formatted messages
    return formatted_history

# Define the search query and retriever
_search_query = RunnableBranch(
    (
        RunnableLambda(lambda x: bool(x.get("chat_history"))).with_config(run_name="HasChatHistoryCheck"),
        RunnablePassthrough.assign(chat_history=lambda x: _format_chat_history(x["chat_history"]))
        | ChatPromptTemplate.from_template(
            """Given the conversation history and a new question from the researcher, rephrase the question so it stands alone, capturing the key context from prior exchanges.
            Chat History: {chat_history}
            Researcher's Follow-Up Question: {question}
            Rephrased Question:"""
        )
        | ChatOpenAI(temperature=0)
        | StrOutputParser(),
    ),
    RunnableLambda(lambda x: x["question"]),
)


def generate_full_text_query(input_text: str) -> str:
    # Remove Lucene special characters and split into words
    words = [f"{word}~2" for word in remove_lucene_chars(input_text).split() if word]
    # Join with AND and return
    full_text_query = " AND ".join(words)
    return full_text_query.strip()

# Define Entity Extraction
class Entities(BaseModel):
    names: List[str] = Field(
        ..., description="All entities such as person or organization names in the text."
    )
def  extract_entities(question: str) -> str:
    # Entity Extraction Chain
    prompt = ChatPromptTemplate.from_messages([
        ("system", "You are a research assistant focused on identifying key entities such as authors,\
        institutions, and organizations mentioned in research texts. Extract relevant entities accurately \
        to help provide context and enhance research insights."),
        ("human", "Use the given format to extract information from the following input: {question}")
    ])

    entity_chain = prompt | llm.with_structured_output(Entities)
    entities = entity_chain.invoke({"question": question})
    return entities

# Document Retriever function
def structured_retriever(question: str) -> str:
    result = ""
    entities = extract_entities(question)
    
    if not entities.names:
        print("No entities found for the question.")
        return "No relevant entities found."
    
    for entity in entities.names:
        # Debugging: Print the current entity being queried
        # print(f"Querying for entity: {entity}")
        
        response = graph.query(
            """CALL db.index.fulltext.queryNodes('entity', $query, {limit:5})
               YIELD node, score
               CALL {
                   WITH node
                   MATCH (node)-[r:!MENTIONS]->(neighbor)
                   RETURN node.id + ' - ' + type(r) + ' -> ' + neighbor.id AS output
                   UNION ALL
                   WITH node
                   MATCH (node)<-[r:!MENTIONS]-(neighbor)
                   RETURN neighbor.id + ' - ' + type(r) + ' -> ' + node.id AS output
               }
               RETURN output LIMIT 50
            """,
            {"query": generate_full_text_query(entity)}
        )
        
        # Handle response safely
        if response:
            result += "\n".join([el['output'] for el in response])
        else:
            print(f"No results found for entity: {entity}")

    return result

# Main retriever function
def retriever(question: str) -> str:
    structured_data = structured_retriever(question)
    unstructured_data = [el.page_content for el in vector_index.similarity_search(question)]
    final_data = f"""Structured data:
{structured_data}
Unstructured data:
{"#Document ".join(unstructured_data)}
    """
    return final_data

# Define the Chat Chain with context retrieval
chain = (
    RunnableParallel({"context": _search_query | retriever, "question": RunnablePassthrough()})
    | prompt
    | llm
    | StrOutputParser()
)

def answer_question(question: str, chat_history: Optional[List[Tuple[str, str]]] = None) -> str:
    """Generate an answer for the given question and save it to chat history."""
    # Get the formatted chat history for context
    chat_history = fetch_chat_history()
    response = chain.invoke({"question": question, "chat_history": chat_history})
    
    # Save the question-response pair to the database
    save_chat_entry(question, response)
    return response