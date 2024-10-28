from server.reaia.utils.helpers import load_document, chunk_data, insert_or_fetch_embeddings, qa_chain_gpt
from insight import get_paper_insight
from server.reaia.insights.plagiarism import get_plagiarism_result
from server.reaia.insights.readability import get_readability_insight
from server.reaia.insights.relevancy import get_paper_relevancy


def get_results(file, topic):
    relevancy, relevancy_percentage, relevancy_recommendation = get_paper_relevancy(file, topic)
    insight = get_paper_insight(file)
    readability, normalized_readability_score, composite_readability_score = get_readability_insight(file)
    plagiarism, plag_percent = get_plagiarism_result(file)
    composite_document_score = get_composite_score(relevancy_percentage, composite_readability_score, plag_percent)
    ai_recommendation = get_ai_recommendation(file, relevancy, relevancy_recommendation, relevancy_percentage,
                                              readability, normalized_readability_score, composite_readability_score,
                                              plagiarism, plag_percent, composite_document_score)
    return insight, relevancy, relevancy_percentage, relevancy_recommendation, readability, normalized_readability_score, composite_readability_score, plagiarism, plag_percent, composite_document_score, ai_recommendation


def get_composite_score(relevancy_percentage, normalized_readability_score, plag_percent):
    # Assigning weights: 50% for relevancy, 30% for plagiarism, 20% for readability
    weights = {
        "relevancy": 0.5,
        "plagiarism": 0.3,
        "readability": 0.2
    }

    # Calculating weighted composite score
    composite_score = (
            relevancy_percentage * weights["relevancy"]
            + (100 - plag_percent) * weights["plagiarism"]  # Inverse as lower plagiarism is better
            + normalized_readability_score * weights["readability"]
    )
    return round(composite_score, 2)  # Return score as a percentage


def get_ai_recommendation(file, relevancy, relevancy_recommendation, relevancy_percentage, readability,
                          normalized_readability_score, composite_readability_score, plagiarism, plag_percent,
                          composite_document_score):
    data = load_document(file)
    chunks = chunk_data(data)
    vector_store = insert_or_fetch_embeddings(chunks)

    prompt = (
        f"The document provided has been analyzed and scored based on several metrics:\n\n"
        f"- **Relevancy**: {relevancy} (Relevancy Percentage: {relevancy_percentage}%)\n"
        f"- **Readability**: {readability} (Normalized Score: {normalized_readability_score}, "
        f"Composite Readability Score: {composite_readability_score})\n"
        f"- **Plagiarism**: {plag_percent}% plagiarized\n"
        f"- **Composite Document Score**: {composite_document_score}%\n\n"
        f"Please provide a structured recommendation insight based on these scores in the following format:\n\n"
        f"Recommendation Insight:\n"
        f"Relevancy: [Provide insight and suggestions on the document's relevancy]\n"
        f"Readability: [Provide insight and suggestions on the document's readability]\n"
        f"Originality: [Provide insight and suggestions on the document's originality, considering plagiarism score]\n\n"
        f"Ensure that each section contains specific, actionable recommendations to improve the document."
    )

    response = qa_chain_gpt(vector_store, prompt)
    return response


print(get_results("IRJET-V8I1201.pdf", "AI Assisted Research"))