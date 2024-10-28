import os
import google.generativeai as genai
import openai
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv(), override=True)

OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')

openai.api_key = OPENAI_API_KEY


def load_document(file):
    import pandas as pd
    from docx import Document
    name, extension = os.path.splitext(file)

    if extension == ".pdf":
        from langchain.document_loaders import PyPDFLoader
        loader = PyPDFLoader(file)

    elif extension == ".docx":
        from langchain.document_loaders import Docx2txtLoader
        loader = Docx2txtLoader(file)

    elif extension == ".csv":
        data = pd.read_csv(file)
        doc = Document()
        table = doc.add_table(rows=1, cols=len(data.columns))
        hdr_cells = table.rows[0].cells
        for i, column in enumerate(data.columns):
            hdr_cells[i].text = column
        for index, row in data.iterrows():
            row_cells = table.add_row().cells
            for i, cell in enumerate(row):
                row_cells[i].text = str(cell)
        docx_path = "uploaded_doc.docx"
        doc.save(docx_path)

        from langchain.document_loaders import Docx2txtLoader
        loader = Docx2txtLoader(docx_path)
    elif extension == ".md":
        from langchain_community.document_loaders import TextLoader
        loader = TextLoader(file, "utf-8")

    else:
        print(f"Document format {extension} not supported")
        return None

    data = loader.load()
    return data


def extract_text(file_path):
    import pdfplumber
    # Open the PDF file
    with pdfplumber.open(file_path) as pdf:
        all_text = ''

        # Loop through each page in the PDF
        for page in pdf.pages:
            text = page.extract_text()  # Extract text from page
            all_text += text  # Append text from each page to the string

    # Print or manipulate the extracted text
    print(all_text)
    return all_text


def chunk_data(data, chunk_size=256, chunk_overlap=20):
    from langchain.text_splitter import RecursiveCharacterTextSplitter
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=chunk_size, chunk_overlap=chunk_overlap)
    chunks = text_splitter.split_documents(data)
    print(chunks)
    return chunks


def insert_or_fetch_embeddings(chunks):
    from langchain.vectorstores import FAISS
    from langchain.embeddings.openai import OpenAIEmbeddings

    embeddings = OpenAIEmbeddings(model="text-embedding-ada-002")
    vector_store = FAISS.from_documents(chunks, embeddings)
    return vector_store


def qa_chain_gpt(vector_store, q):
    from langchain.chains import RetrievalQA
    from langchain.chat_models import ChatOpenAI
    llm = ChatOpenAI(model='gpt-4-turbo', temperature=0)
    retriever = vector_store.as_retriever(search_type='similarity', search_kwargs={'k': 6})
    chain = RetrievalQA.from_chain_type(llm=llm, chain_type="stuff", retriever=retriever)
    response = chain.run(q)
    return response