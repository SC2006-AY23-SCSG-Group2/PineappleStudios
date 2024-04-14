#!/usr/bin/env python
# coding: utf-8

# # Content Based Recommendation System
import joblib
import numpy as np
import pandas as pd
from fuzzywuzzy import fuzz, process
from joblib import Memory
from sklearn.metrics.pairwise import linear_kernel

movies = pd.read_csv('Datasets_for_content_recommendation/movies.csv', low_memory = False)
songs = pd.read_csv('Datasets_for_content_recommendation/spotify_millsongdata.csv')
books = pd.read_csv('Datasets_for_content_recommendation/GoogleBookAPIDataset.csv')



books_df = books.drop(columns = ['id', 'averageRating', 'maturityRating', 'pageCount','Unnamed: 0.1', 'Unnamed: 0'])
movies_df = movies.drop(columns=['id', 'rating', 'certificate', 'duration', 'votes', 'gross_income', 'directors_id', 'year'])
songs_df = songs.drop(columns = ['link'])




def preprocess_text(text_series):
    # Convert to lowercase
    text_series = text_series.str.lower()
    # Remove punctuation
    text_series = text_series.str.replace(r'[^\w\s]', '', regex=True)
    # Remove numbers
    text_series = text_series.str.replace(r'\d+', '', regex=True)
    return text_series

# Preprocess the movie names and tags
movies_df['name'] = preprocess_text(movies_df['name'])
movies_df['genre'] = preprocess_text(movies_df['genre'])
movies_df['directors_name'] = preprocess_text(movies_df['directors_name'])
movies_df['stars_name'] = preprocess_text(movies_df['stars_name'])
movies_df['description'] = preprocess_text(movies_df['description'])

# Preprocess the book title, desc, authors, categories and publishedDate
books_df['title'] = preprocess_text(books_df['title'])
books_df['desc'] = preprocess_text(books_df['desc'])
books_df['authors'] = preprocess_text(books_df['authors'])
books_df['categories'] = preprocess_text(books_df['categories'])
books_df['publishedDate'] = preprocess_text(books_df['publishedDate'])

songs_df['song'] = preprocess_text(songs_df['song'])
songs_df['artist'] = preprocess_text(songs_df['artist'])
songs_df['text'] = preprocess_text(songs_df['text'])


# In[4]:


# def save_data_structures():
#     # TF-IDF and Cosine Similarity for Books
#     tfidf_vectorizer_books = TfidfVectorizer(stop_words='english')
#     tfidf_matrix_books = tfidf_vectorizer_books.fit_transform(books_df['desc'])
#     cosine_sim_books = linear_kernel(tfidf_matrix_books, tfidf_matrix_books)
#     book_indices = pd.Series(books_df.index, index=books_df['title']).drop_duplicates()

#     # TF-IDF and Nearest Neighbors for Songs
#     tfidf_vectorizer_songs = TfidfVectorizer(stop_words='english')
#     tfidf_matrix_songs = tfidf_vectorizer_songs.fit_transform(songs_df['text'] + ' ' + songs_df['artist'])
#     model_nn_songs = NearestNeighbors(n_neighbors=10, metric='cosine')
#     model_nn_songs.fit(tfidf_matrix_songs)
#     song_indices = pd.Series(songs_df.index, index=songs_df['song']).drop_duplicates()

#     # TF-IDF and Nearest Neighbors for Movies
#     tfidf_vectorizer_movies = TfidfVectorizer(stop_words='english')
#     tfidf_matrix_movies = tfidf_vectorizer_movies.fit_transform(movies_df['genre'] + ' ' + movies_df['directors_name'] + ' ' + movies_df['stars_name'] + ' ' + movies_df['description'])
#     model_nn_movies = NearestNeighbors(n_neighbors=10, metric='cosine')
#     model_nn_movies.fit(tfidf_matrix_movies)
#     movie_indices = pd.Series(movies_df.index, index=movies_df['name'].str.lower()).drop_duplicates()

#     # Save everything using pickle
#     with open('data_structures.pkl', 'wb') as f:
#         pickle.dump((tfidf_matrix_books, cosine_sim_books, book_indices,
#                      tfidf_matrix_songs, model_nn_songs, song_indices,
#                      tfidf_matrix_movies, model_nn_movies, movie_indices), f)

# save_data_structures()

def load_data_structures():
    # Load book structures
    tfidf_vectorizer_books = joblib.load('tfidf_vectorizer_books.joblib')
    tfidf_matrix_books = joblib.load('tfidf_matrix_books.joblib')
    cosine_sim_books = joblib.load('cosine_sim_books.joblib')
    book_indices = joblib.load('book_indices.joblib')

    # Load song structures
    tfidf_vectorizer_songs = joblib.load('tfidf_vectorizer_songs.joblib')
    tfidf_matrix_songs = joblib.load('tfidf_matrix_songs.joblib')
    model_nn_songs = joblib.load('model_nn_songs.joblib')
    song_indices = joblib.load('song_indices.joblib')

    # Load movie structures
    tfidf_vectorizer_movies = joblib.load('tfidf_vectorizer_movies.joblib')
    tfidf_matrix_movies = joblib.load('tfidf_matrix_movies.joblib')
    model_nn_movies = joblib.load('model_nn_movies.joblib')
    movie_indices = joblib.load('movie_indices.joblib')

    return {
        'tfidf_vectorizer_books': tfidf_vectorizer_books, 
        'tfidf_matrix_books': tfidf_matrix_books,
        'cosine_sim_books': cosine_sim_books, 
        'book_indices': book_indices,
        'tfidf_vectorizer_songs': tfidf_vectorizer_songs, 
        'tfidf_matrix_songs': tfidf_matrix_songs,
        'model_nn_songs': model_nn_songs, 
        'song_indices': song_indices,
        'tfidf_vectorizer_movies': tfidf_vectorizer_movies, 
        'tfidf_matrix_movies': tfidf_matrix_movies,
        'model_nn_movies': model_nn_movies, 
        'movie_indices': movie_indices
    }

data_structures = load_data_structures()




# In[6]:


# Initialize joblib Memory to cache results
mem = Memory(location='./joblib_cache', verbose=0)

@mem.cache
def get_cached_best_match(title, choice_keys):
    # Simulate process.extractOne (to be replaced with your actual fuzzy matching logic)
    return process.extractOne(title, choice_keys, scorer=fuzz.WRatio)

@mem.cache
def get_recommendations(model_nn, media_title, data_frame, indices, column_name, vectorizer, tfidf_matrix=None, is_book=False):
    title = media_title.lower().strip()
    choice_keys = indices.index.tolist()

    # Transform the new input using the saved TF-IDF vectorizer
    @mem.cache
    def get_tfidf_input(media_title, vectorizer):
        return vectorizer.transform([media_title])

    tfidf_input = get_tfidf_input(media_title, vectorizer)

    @mem.cache
    def get_nn_results(tfidf_input, model_nn):
        return model_nn.kneighbors(tfidf_input, n_neighbors=20)



    # If the title exists exactly, use it; otherwise, use fuzzy matching.
    if title in choice_keys:
        idx = indices[title]
    else:
        closest_match, _ = get_cached_best_match(title, choice_keys)
        idx = indices.get(closest_match, None)

    if idx is None:
        print(f"No close match found for '{media_title}'.")
        return []

    if isinstance(idx, (pd.Series, np.ndarray)):
        idx = idx.iloc[0]

    # Deduplicate and fetch recommendations
    seen = set()
    recommendations = []
    if is_book:
        sim_scores = linear_kernel(tfidf_input, tfidf_matrix).flatten()
        top_indices = sim_scores.argsort()[::-1]
        for i in top_indices:
            if len(recommendations) >= 5:
                break
            rec = data_frame.iloc[i][column_name]
            if rec not in seen:
                seen.add(rec)
                recommendations.append(rec)
    else:
        distances, nn_indices = get_nn_results(tfidf_input, model_nn)
        for i in nn_indices.flatten()[1:]:
            if len(recommendations) >= 5:
                break
            rec = data_frame.iloc[i][column_name]
            if rec not in seen:
                seen.add(rec)
                recommendations.append(rec)

    return recommendations



def get_all_recommendations(media_title):
    # Get recommendations for books
    book_recommendations = get_recommendations(None, media_title, books_df, data_structures['book_indices'], "title", data_structures['tfidf_vectorizer_books'], tfidf_matrix=data_structures['tfidf_matrix_books'], is_book = True)
    
    # Get recommendations for songs
    song_recommendations = get_recommendations(data_structures['model_nn_songs'], media_title, songs_df, data_structures['song_indices'], "song", data_structures['tfidf_vectorizer_songs'])
    
    # Get recommendations for movies
    movie_recommendations = get_recommendations(data_structures['model_nn_movies'], media_title, movies_df, data_structures['movie_indices'], "name", data_structures['tfidf_vectorizer_movies'])
    
    return book_recommendations, song_recommendations, movie_recommendations


import os
import re  # Import the re module

import openai
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()
# Retrieve the API key
openai_api_key = os.getenv('OPENAI_API_KEY')

# with open('api_key.txt', 'r') as file:
#     openai.api_key = file.readline().strip().strip("'")
openai.api_key = openai_api_key
    
@mem.cache    
def generate_LLM_recommendation(media_name):
    # Construct the prompt using the media name.
    prompt = f"recommend me books, movies and songs similar to '{media_name}'"

    # Get the response from the OpenAI API.
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}],
    )

    # Extract the content from the response.
    content = response['choices'][0]['message']['content'].strip()
    
    def clean_item(item):
        # Remove leading numbers and periods like "1. ".
        item = re.sub(r'^\d+\.\s*', '', item)
        # Remove double quotes.
        item = item.replace('"', '')
        # Remove any text after a dash which usually contains the author's name or year.
        item = re.sub(r' -.*', '', item)
        # Remove anything in parentheses, often used for additional info like years.
        item = re.sub(r'\(.*\)', '', item).strip()
        # Remove any following "by" and any text after it, which usually contains the author's name or artist.
        item = re.sub(r'\sby\s.*', '', item).strip()
        return item

    # Split the response into sections and then into individual items.
    sections = content.split('\n\n')  # Assuming each section is separated by two newlines.
    recommendations = {}
    
    # Process each section to extract and clean items.
    for section in sections:
        # Split the section into a title and items.
        title, *items = section.split('\n')
        # Remove any leading or trailing characters like ':' from the title.
        title = title.replace(':', '').strip()
        
        # Clean each item and store them.
        recommendations[title] = [clean_item(item) for item in items if item]

    # Accessing the lists and assigning them to variables.
    books = recommendations.get('Books', [])
    movies = recommendations.get('Movies', [])
    songs = recommendations.get('Songs', [])

    # Return the cleaned lists.
    return books, movies, songs






# # Combined Recommendation System

# ### Now we shall combine both recommendation systems and shuffle them so as to not over rely on either one  when making recommendations



import random


@mem.cache
def combined_recommendations(media_title):
    # Fetch LLM recommendations
    llm_books, llm_movies, llm_songs = generate_LLM_recommendation(media_title)

    # Fetch content-based recommendations
    content_books, content_songs, content_movies = get_all_recommendations(media_title)

    # Function to interleave recommendations
    def interleave_lists(list1, list2):
        combined = [val for pair in zip(list1, list2) for val in pair]
        combined.extend(list1[len(list2):])
        combined.extend(list2[len(list1):])
        return combined

    # Interleave LLM recommendations with content-based recommendations
    combined_books = interleave_lists(llm_books, content_books)
    combined_movies = interleave_lists(llm_movies, content_movies)
    combined_songs = interleave_lists(llm_songs, content_songs)

    # Shuffle the combined lists to avoid over-relying on one source
    random.shuffle(combined_books)
    random.shuffle(combined_movies)
    random.shuffle(combined_songs)

    return combined_books[:5], combined_movies[:5], combined_songs[:5]






