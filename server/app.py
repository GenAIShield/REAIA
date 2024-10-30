import os
import requests
import mysql.connector
from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
from reaia.chat.bot import answer_question
from reaia.insights.aggregate import get_results
from reaia.chat.db import fetch_chat_history
from reaia.knowledge_graph.graph import create_graph
from reaia.insights.insight import get_paper_insight
from reaia.utils.neo4j_driver import get_neo4j_driver

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'downloads'
RESEARCH_CORPUS_FOLDER = 'research-corpus'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(RESEARCH_CORPUS_FOLDER, exist_ok=True)
CORE_API_URL = "https://api.core.ac.uk/v3/search/works"

# MySQL configuration
db_config = {
    'user': 'root',
    'password': '',
    'host': 'localhost',
    'database': 'research_assistant',
}


# Function to connect to the database
def get_db_connection():
    return mysql.connector.connect(**db_config)


# Function to create table if it doesn't exist
def create_research_table():
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS research (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255),
            summary TEXT,
            privacy ENUM('public', 'private'),
            allow_contribution ENUM('yes', 'no'),
            file_url VARCHAR(255),
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    """)
    connection.commit()
    cursor.close()
    connection.close()


# Function to clear all files in the downloads folder
def clear_downloads_folder():
    for filename in os.listdir(UPLOAD_FOLDER):
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        try:
            if os.path.isfile(file_path):
                os.remove(file_path)
        except Exception as e:
            print(f"Error deleting file {file_path}: {e}")


# Analyze text function
def analyze_text(file_path, topic):
    (
        insight,
        relevancy,
        readability,
        normalized_readability_score,
        composite_readability_score,
        plagiarism,
        plag_percent,
        composite_document_score,
        ai_recommendation,
        relevancy_insight,
        readability_insight,
        originality_insight
    ) = get_results(file_path, topic)

    return {
        "insight": insight,
        "relevancy": relevancy,
        "readability": readability,
        "normalized_readability_score": normalized_readability_score,
        "composite_readability_score": composite_readability_score,
        "plagiarism": plagiarism,
        "plag_percent": plag_percent,
        "composite_document_score": composite_document_score,
        "ai_recommendation": ai_recommendation,
        "relevancy_insight": relevancy_insight,
        "readability_insight": readability_insight,
        "originality_insight": originality_insight
    }


def search_find_insight(file):
    insight = get_paper_insight(file)
    graph_response = create_graph()
    return {"insight":insight, "graph_response":graph_response}


# Function to create chat history table if it doesn't exist
def create_chat_history_table():
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS chat_history (
            id INT AUTO_INCREMENT PRIMARY KEY,
            question TEXT,
            response TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    """)
    connection.commit()
    cursor.close()
    connection.close()


@app.route('/evaluate_research', methods=['POST'])
def process_document():
    # Clear the downloads folder before processing each request
    clear_downloads_folder()

    if 'document' not in request.files or request.files['document'].filename == '':
        return jsonify({"message": "error", "result": "No file provided"}), 400

    document = request.files['document']
    file_path = os.path.join(UPLOAD_FOLDER, document.filename)
    document.save(file_path)

    if os.path.exists(file_path):
        topic = request.form.get('topic', '')
        analysis_result = analyze_text(file_path, topic)  # Pass file path directly
        return jsonify({
            "message": "success",
            "result": analysis_result
        })
    else:
        return jsonify({"message": "error", "result": "File not saved correctly"}), 500


@app.route('/search_find_insight', methods=['POST'])
def search_find_insight():
    data = request.json
    topic = data.get('topic')
    context = data.get('context')
    option = data.get('option')

    # Implement the logic for the three functionalities here
    if option == "Document available":
        if 'document' not in data or data['document'] == '':
            return jsonify({"message": "error", "result": "No file provided"}), 400

        document = data['document']
        file_path = os.path.join(UPLOAD_FOLDER,
                                 document['filename'])  # Assuming document is a dictionary with a filename key
        with open(file_path, 'wb') as f:
            f.write(document['content'])  # Assuming content is the binary data of the document

        sfi_result = search_find_insight(file_path)
        return jsonify({
            "message": "success",
            "result": sfi_result
        })

    elif option == "Url known":
        url = data.get('url')
        if not url:
            return jsonify({"message": "error", "result": "No URL provided"}), 400

        try:
            response = requests.get(url, stream=True)
            if response.status_code == 200:
                file_name = url.split("/")[-1]
                file_path = os.path.join(UPLOAD_FOLDER, file_name)

                with open(file_path, "wb") as doc_file:
                    doc_file.write(response.content)

                sfi_result = search_find_insight(file_path)  # Pass file path directly
                return jsonify({
                    "message": "success",
                    "result": sfi_result
                })
            else:
                return jsonify({"message": "error", "result": "Failed to download document"}), 400
        except requests.RequestException as e:
            return jsonify({"message": "error", "result": f"Error downloading document: {str(e)}"}), 500

    elif option == "Any":
        query = f"{topic} {context}" if context else topic
        try:
            response = requests.get(CORE_API_URL, params={"q": query, "limit": 1})
            if response.status_code == 200:
                data = response.json()
                if data["results"]:
                    paper = data["results"][0]
                    title = paper.get("title", "No title available")
                    abstract = paper.get("abstract", "No abstract available")
                    download_url = paper.get("downloadUrl", None)

                    # Attempt to download and process full text if available
                    if download_url:
                        try:
                            download_response = requests.get(download_url, stream=True)
                            if download_response.status_code == 200:
                                file_name = download_url.split("/")[-1]
                                file_path = os.path.join(UPLOAD_FOLDER, file_name)

                                with open(file_path, "wb") as file:
                                    file.write(download_response.content)

                                sfi_result = search_find_insight(file_path)  # Pass file path directly
                                return jsonify({
                                    "message": "success",
                                    "result": sfi_result
                                })
                            else:
                                return jsonify(
                                    {"message": "error", "result": "Full text not available for download"}), 404
                        except requests.RequestException as e:
                            return jsonify(
                                {"message": "error", "result": f"Error downloading full text: {str(e)}"}), 500
                    else:
                        return jsonify(
                            {"message": "error", "result": "No download URL available for research paper"}), 404
                else:
                    return jsonify({"message": "error", "result": "No relevant research documents found"}), 404
            else:
                return jsonify({"message": "error", "result": "Failed to retrieve research documents"}), 500
        except Exception as e:
            return jsonify({"message": "error", "result": f"Error fetching research document: {str(e)}"}), 500

    else:
        return jsonify({"message": "error", "result": "Invalid option selected"}), 400


@app.route('/post_research', methods=['POST'])
def post_research():
    # Create table if it doesn't exist
    create_research_table()

    # Get data from the request
    data = request.json
    title = data.get('title')
    summary = data.get('summary')
    privacy = data.get('privacy')
    allow_contribution = data.get('allow_contribution')
    attachments = data.get('attachments', [])

    # List to hold the URLs of stored files
    file_urls = []

    # Process each attachment
    for attachment in attachments:
        if 'filename' not in attachment or 'content' not in attachment:
            return jsonify({"message": "error", "result": "Invalid attachment format"}), 400

        filename = attachment['filename']
        content = attachment['content']

        # Save file to research-corpus folder
        file_path = os.path.join(RESEARCH_CORPUS_FOLDER, filename)
        with open(file_path, 'wb') as f:
            f.write(content)  # Assuming content is the binary data of the document

        file_urls.append(file_path)  # Store the local path or URL

    # Insert research data into the database
    connection = get_db_connection()
    cursor = connection.cursor()
    for file_url in file_urls:
        cursor.execute("""
            INSERT INTO research (title, summary, privacy, allow_contribution, file_url) 
            VALUES (%s, %s, %s, %s, %s)
        """, (title, summary, privacy, allow_contribution, file_url))

    connection.commit()
    cursor.close()
    connection.close()

    # Return the response with timestamp and filenames
    return jsonify({
        "message": "success",
        "timestamp": datetime.now().isoformat(),
        "files_posted": file_urls
    })


# CHATBOT INTEGRATION:
@app.route('/chat_history', methods=['GET'])
def get_chat_history():
    """Endpoint to retrieve the chat history from the database."""
    history = fetch_chat_history()
    return jsonify({"message": "success", "history": history})


@app.route('/chatbot', methods=['POST'])
def chatbot_route():
    """Endpoint to handle chatbot queries."""
    data = request.json
    question = data.get('question')

    if not question:
        return jsonify({"message": "error", "result": "No question provided"}), 400

    # Get chat history to pass as context
    chat_history = fetch_chat_history()

    # Generate chatbot response
    response_text = answer_question(question, chat_history)

    return jsonify({"message": "success", "result": response_text})


@app.route('/graph')
def get_graph():
    cypher_query = "MATCH (s)-[r:!MENTIONS]->(t) RETURN s,r,t LIMIT 200"
    driver = get_neo4j_driver()
    with driver.session() as session:
        results = session.run(cypher_query)
        nodes = []
        edges = []
        for record in results:
            # Extract node and relationship data
            # Assuming `s` and `t` are nodes and `r` is a relationship
            source = record['s']['id']
            target = record['t']['id']
            nodes.append({'id': source, 'label': str(source)})  # Adjust attributes as needed
            nodes.append({'id': target, 'label': str(target)})
            edges.append({'from': source, 'to': target, 'label': str(record['r'])})  # Adjust attributes as needed

        # Remove duplicates
        nodes = [dict(t) for t in {tuple(d.items()) for d in nodes}]
        return jsonify({'nodes': nodes, 'edges': edges})


if __name__ == '__main__':
    # Call this function when the app starts to ensure the table exists
    create_chat_history_table()
    app.run(debug=True)

