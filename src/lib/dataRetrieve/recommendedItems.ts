import axios, {AxiosError, AxiosResponse} from "axios";

import {prismaClient} from "../database/prisma";
import {ErrorResponse, RecommendationResponse} from "../interfaces";
import {getPreferencesOfUser} from "./handleUserPreferences";

export async function fetchRecommendationsBasedOnSinglePreference(
  preference: string,
): Promise<RecommendationResponse | ErrorResponse> {
  try {
    const response: AxiosResponse<RecommendationResponse> = await axios.post(
      "http://127.0.0.1:5000/recommend/llm",
      {
        media_name: preference,
      },
    );

    // Check if the request was successful
    if (response.status === 200) {
      return response.data;
    } else {
      const errorMessage = `Failed to fetch recommendations based on preference. Status code: ${response.status} (${response.statusText})`;
      console.error(errorMessage);
      console.error("Response data:", response.data);
      return {error: errorMessage};
    }
  } catch (error) {
    // Log detailed error message
    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError = error;
      const errorMessage = `Error while fetching recommendations based on preference. Status code: ${axiosError.response?.status} (${axiosError.response?.statusText})`;
      console.error(errorMessage);
      console.error("Response data:", axiosError.response?.data);
      return {error: errorMessage};
    } else {
      const errorMessage = `Unexpected error while fetching recommendations based on preference:`;
      console.error(errorMessage);
      return {error: errorMessage};
    }
  }
}

export async function fetchRecommendationsBasedOnUserPreferences(
  userId: number,
): Promise<RecommendationResponse> {
  try {
    // Get the preferences of the user
    const preferences = await getPreferencesOfUser(userId);

    // Fetch recommendations for each preference
    const recommendationsPromises = preferences.map((name) =>
      fetchRecommendationsBasedOnSinglePreference(name),
    );

    const recommendations = await Promise.all(recommendationsPromises);

    // Initialize temporary sets to keep track of added items
    const addedBooks = new Set<string>();
    const addedMovies = new Set<string>();
    const addedSongs = new Set<string>();

    // Merge recommendations for preferences
    const mergedRecommendations: RecommendationResponse = {
      books: [],
      movies: [],
      songs: [],
    };

    for (const recommendation of recommendations) {
      if (
        "books" in recommendation &&
        "movies" in recommendation &&
        "songs" in recommendation
      ) {
        // Add unique books
        for (const book of recommendation.books) {
          if (!addedBooks.has(book)) {
            mergedRecommendations.books.push(book);
            addedBooks.add(book);
          }
        }

        // Add unique movies
        for (const movie of recommendation.movies) {
          if (!addedMovies.has(movie)) {
            mergedRecommendations.movies.push(movie);
            addedMovies.add(movie);
          }
        }

        // Add unique songs
        for (const song of recommendation.songs) {
          if (!addedSongs.has(song)) {
            mergedRecommendations.songs.push(song);
            addedSongs.add(song);
          }
        }
      } else {
        console.error("Error fetching recommendations:", recommendation.error);
        // Handle error case
      }
    }

    return mergedRecommendations;
  } catch (error) {
    console.error("Error:", error);
    // If an error occurs, return an empty object
    return {
      books: [],
      movies: [],
      songs: [],
    };
  }
}
