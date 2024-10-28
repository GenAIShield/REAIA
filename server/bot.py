import mysql.connector
from mysql.connector import Error
import os
from dotenv import load_dotenv

# Load environment variables (assumes you have MySQL credentials in your .env file)
load_dotenv()


def get_db_connection():
    """Establishes a connection to the MySQL database."""
    try:
        connection = mysql.connector.connect(
            host=os.getenv('MYSQL_HOST'),
            user=os.getenv('MYSQL_USER'),
            password=os.getenv('MYSQL_PASSWORD'),
            database=os.getenv('MYSQL_DB')
        )
        if connection.is_connected():
            return connection
    except Error as e:
        print(f"Error connecting to MySQL: {e}")
    return None


def create_tables():
    """Creates necessary tables in the MySQL database if they do not exist."""
    connection = get_db_connection()
    if connection is None:
        return

    cursor = connection.cursor()

    # Create chat_history table if it doesn't exist
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS chat_history (
            id INT AUTO_INCREMENT PRIMARY KEY,
            question TEXT NOT NULL,
            response TEXT NOT NULL,
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    connection.commit()
    cursor.close()
    connection.close()


def fetch_chat_history():
    """Fetches chat history from the MySQL database."""
    connection = get_db_connection()
    if connection is None:
        return []
    create_tables()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT question, response, timestamp FROM chat_history ORDER BY timestamp DESC")
    history = cursor.fetchall()
    cursor.close()
    connection.close()
    return history


def save_chat_entry(question, response):
    """Saves a question-response pair in the MySQL chat history table."""
    connection = get_db_connection()
    if connection is None:
        return

    cursor = connection.cursor()
    cursor.execute(
        "INSERT INTO chat_history (question, response) VALUES (%s, %s)", (question, response)
    )
    connection.commit()
    cursor.close()
    connection.close()