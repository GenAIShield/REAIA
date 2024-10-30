import requests
from reaia.utils.helpers import load_document

url = "https://www.prepostseo.com/apis/checkPlag"
api_key = "68de9c4b705d6c07a4e367296d10c773"


def detect_plagiarism(text, api_key, url):
    data = {
        "key": api_key,
        "data": text,
        "ignore": "YOUR_MATCH_URL"
    }

    response = requests.post(url, data=data)
    if response.status_code != 200:
        return None, None

    result = response.json()
    sources = result.get('sources', [])

    # Sort sources by 'percent' in descending order and select top 3
    top_sources = sorted(sources, key=lambda x: x['percent'], reverse=True)[:3]
    result['sources'] = top_sources

    # Determine the top percentage if sources are not empty
    top_percentage = top_sources[0]['percent'] if top_sources else 0

    return result['sources'], top_percentage


def get_plagiarism_result(file):
    text = load_document(file)
    response, top_percentage = detect_plagiarism(text, api_key, url)
    return response, top_percentage