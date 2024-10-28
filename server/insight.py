from helpers import load_document
from helpers import chunk_data
from helpers import insert_or_fetch_embeddings
from helpers import qa_chain_gpt


def get_paper_insight(file="IRJET-V8I1201.pdf"):
    # data = load_document('IRJET-V8I1201.pdf')
    data = load_document(file)
    chunks = chunk_data(data)
    vector_store = insert_or_fetch_embeddings(chunks)
    prompt = (
        f"I am creating a research assistant tool, please provide the below details"
        f"Using this content, provide insights about the research paper with whatever below available points:\n\n"
        f"Summary:\n"
        f"Target Audience:\n"
        f"Key Points:\n"
        f"Innovations:\n"
        f"Future expansions:\n"
    )
    response = qa_chain_gpt(vector_store, prompt)
    return response


print(get_paper_insight())