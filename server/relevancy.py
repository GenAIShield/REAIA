from helpers import load_document
from helpers import chunk_data
from helpers import insert_or_fetch_embeddings
from helpers import qa_chain_gpt


def paper_relevancy(file="IRJET-V8I1201.pdf", topic="university admission"):
    data = load_document(file)
    chunks = chunk_data(data)
    vector_store = insert_or_fetch_embeddings(chunks)
    prompt = (
        f"""Evaluate the factual accuracy of details contained in the research data corpus by considering reference data in the variable {topic} serves as the Original Fact to verify information.
    Give the relevancy of the topic coherence with assessment categories as : "RELEVANT","PARTIALLY RELEVANT" or "IRRELEVANT" with the percentage assigned to them . 
    if "RELEVANT" then assign a percentage between 60-100%, if "PARTIALLY RELEVANT" then assign the percentage between 30%-60% and if "IRRELEVANT" then assign the percentage between 0-30%. Also provide a justification for this.
    An example would be - Relevancy: "RELEVANT"\nPercentage: 67%\nJustification: <justification>" """
    )
    response = qa_chain_gpt(vector_store, prompt)
    return response


def parse_response(response):
    # Initialize default values
    relevancy, percentage, justification = "Unknown", 0, "No justification provided"

    # Try extracting each part by searching for specific labels
    try:
        # Extract relevancy by finding the line starting with "Relevancy:"
        relevancy_line = next(line for line in response.splitlines() if line.startswith("Relevancy:"))
        relevancy = relevancy_line.split(":", 1)[1].strip().strip('"')

        # Extract percentage by finding the line starting with "Percentage:"
        percentage_line = next(line for line in response.splitlines() if line.startswith("Percentage:"))
        percentage = int(percentage_line.split(":", 1)[1].strip().strip('%'))

        # Extract justification by finding the line starting with "Justification:"
        justification_line = next(line for line in response.splitlines() if line.startswith("Justification:"))
        justification = justification_line.split(":", 1)[1].strip()

    except (ValueError, StopIteration, IndexError) as e:
        print(f"Error parsing response: {e}")

    return relevancy, percentage, justification


def get_paper_relevancy(file, topic):
    response = paper_relevancy(file,topic)
    relevancy, percentage, justification = parse_response(response)
    return relevancy, percentage, justification