import textstat
import re
from reaia.utils.helpers import load_document, extract_text, chunk_data, insert_or_fetch_embeddings, qa_chain_gpt

# Define maximum scores to normalize readability metrics
MAX_SCORES = {
    "Flesch Reading Ease": 100,  # Readable within a score of 0-100
    "Flesch-Kincaid Grade Level": 12,  # Usually 12th grade max
    "Gunning Fog Index": 20,  # Higher scores are rare, usually below 20
    "SMOG Index": 20,
    "Automated Readability Index": 20,
    "Coleman-Liau Index": 20,
    "Linsear Write Formula": 20,
    "Dale-Chall Readability Score": 10  # Difficult scores are closer to 10
}


def preprocess_text(text):
    try:
        if text is None:
            raise ValueError("No text extracted. Please provide valid text for preprocessing.")

        preprocessed_text = text.lower()
        preprocessed_text = re.sub(r'[^a-zA-Z0-9\s]', '', preprocessed_text)
        preprocessed_text = re.sub(r'\s+', ' ', preprocessed_text)
        preprocessed_text = re.sub(r'\b(page \d+)\b', '', preprocessed_text, flags=re.IGNORECASE)
        preprocessed_text = re.sub(r'\bheader\b', '', preprocessed_text, flags=re.IGNORECASE)
        preprocessed_text = re.sub(r'\bfooter\b', '', preprocessed_text, flags=re.IGNORECASE)
        preprocessed_text = preprocessed_text.strip()
        return preprocessed_text

    except Exception as e:
        print(f"Error in preprocessing text: {e}")
        return ""


def calculate_readability_score(processed_text):
    try:
        raw_scores = {
            "Flesch Reading Ease": textstat.flesch_reading_ease(processed_text),
            "Flesch-Kincaid Grade Level": textstat.flesch_kincaid_grade(processed_text),
            "Gunning Fog Index": textstat.gunning_fog(processed_text),
            "SMOG Index": textstat.smog_index(processed_text),
            "Automated Readability Index": textstat.automated_readability_index(processed_text),
            "Coleman-Liau Index": textstat.coleman_liau_index(processed_text),
            "Linsear Write Formula": textstat.linsear_write_formula(processed_text),
            "Dale-Chall Readability Score": textstat.dale_chall_readability_score(processed_text)
        }

        # Normalize scores
        normalized_scores = {key: min(value / MAX_SCORES[key], 1.0) for key, value in raw_scores.items()}

        # Calculate composite score as the mean of normalized scores
        composite_score = sum(normalized_scores.values()) / len(normalized_scores)

        return raw_scores, normalized_scores, composite_score
    except Exception as e:
        print(f"Error in calculating readability score: {e}")
        return {}, {}, 0


def get_readability_insight(file="IRJET-V8I1201.pdf"):
    data = load_document(file)
    chunks = chunk_data(data)
    vector_store = insert_or_fetch_embeddings(chunks)
    text = extract_text(file)
    preprocessed_text = preprocess_text(text)
    raw_scores, normalized_scores, composite_score = calculate_readability_score(preprocessed_text)
    print(raw_scores)
    # Create the prompt for LLM analysis
    prompt = f"""
    Given the following readability scores for a research document, evaluate the readability and suggest insights for potential improvements.

    Raw Readability Scores:
    {raw_scores}

    Normalized Readability Scores (scaled between 0-1):
    {normalized_scores}

    Composite Readability Score: {composite_score}

    Based on these scores, provide insights on the document’s readability. Consider the document context and assess if the document and the scores are well aligned.
    Consider how it may impact readers’ comprehension, on the context of research fields and among other research document. Suggest ways to improve readability if the document is too complex. Keep it consise with 5 to 6 sentences
    """

    # Use the LLM to generate insights
    response = qa_chain_gpt(vector_store, prompt)
    return response, normalized_scores, composite_score


# Example usage
readability_insight = get_readability_insight()
print(readability_insight)