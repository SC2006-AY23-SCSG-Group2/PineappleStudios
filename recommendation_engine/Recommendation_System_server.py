

import random

from flask import Flask, jsonify, request
from flask_cors import CORS

from Recommendation_System import (combined_recommendations,
                                   generate_LLM_recommendation,
                                   get_all_recommendations,
                                   load_data_structures)

app = Flask(__name__)
CORS(app)

data_structures = load_data_structures()

@app.route('/recommend/llm', methods=['POST'])
def recommend_llm():
    try:
        media_name = request.json['media_name']
        books, movies, songs = generate_LLM_recommendation(media_name)
        response = {
            'books': books,
            'movies': movies,
            'songs': songs
        }
        return jsonify(response)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/recommend/content', methods=['POST'])
def recommend_content():
    try:
        media_name = request.json['media_name']
        books, movies, songs = get_all_recommendations(media_name)
        response = {
            'books': books,
            'movies': movies,
            'songs': songs
        }
        return jsonify(response)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/recommend/combined', methods=['POST'])
def recommend_combined():
    try:
        media_name = request.json['media_name']
        combined_books, combined_movies, combined_songs = combined_recommendations(media_name)
        response = {
            'books': combined_books,
            'movies': combined_movies,
            'songs': combined_songs
        }
        return jsonify(response)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)


# In[ ]:




