import { PrismaClient } from '@prisma/client';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { handleBookSearchAPI, handleMovieSearchAPI, handleSongSearchAPI } from './getAPIInfo';

const prisma = new PrismaClient();

export async function getRecentItemNames(userId: number): Promise<string[]> {
  const recentItems = await prisma.recentItems.findMany({
    where: { userId },
    orderBy: { addedAt: 'desc' },
    take: 3,
    include: { item: { select: { title: true } } },
  });

  return recentItems.map(item => item.item.title);
} 

interface RecommendationResponse {
    books: string[];
    movies: string[];
    songs: string[];
}

interface ErrorResponse {
    error: string;
}

export async function fetchRecommendations(itemTitle: string): Promise<RecommendationResponse | ErrorResponse> {
    try {
        const response: AxiosResponse<RecommendationResponse> = await axios.post('http://127.0.0.1:5000/recommend/combined', {
            media_name: itemTitle
        });

        // Check if the request was successful
        if (response.status === 200) {
            return response.data;
        } else {
            const errorMessage = `Failed to fetch recommendations. Status code: ${response.status} (${response.statusText})`;
            console.error(errorMessage);
            console.error("Response data:", response.data);
            return { error: errorMessage };
        }
    } catch (error) {
        // Log detailed error message
        if (axios.isAxiosError(error)) {
            const axiosError: AxiosError = error;
            const errorMessage = `Error while fetching recommendations. Status code: ${axiosError.response?.status} (${axiosError.response?.statusText})`;
            console.error(errorMessage);
            console.error("Response data:", axiosError.response?.data);
            return { error: errorMessage };
        } else {
            const errorMessage = `Unexpected error while fetching recommendations:`;
            console.error(errorMessage);
            return { error: errorMessage };
        }
    }
}
// export async function fetchRecommendationsForRecentItems(userId: number): Promise<RecommendationResponse[]> {
//     try {
//       // Get the titles of the 3 most recent items for the user
//       const recentItemNames = await getRecentItemNames(userId);
  
//       // Fetch recommendations for each recent item
//       const recommendationsPromises = recentItemNames.map(itemTitle => fetchRecommendations(itemTitle));
//       const recommendations = await Promise.all(recommendationsPromises);
  
//       // Filter out any ErrorResponse objects from the array
//       const validRecommendations = recommendations.filter(
//         (recommendation): recommendation is RecommendationResponse => 'books' in recommendation
//       );
  
//       return validRecommendations;
//     } catch (error) {
//       console.error('Error:', error);
//       // If an error occurs, return an empty array
//       return [];
//     } finally {
//       await prisma.$disconnect(); // Disconnect from the Prisma client
//     }
//   }

export async function fetchRecommendationsForRecentItems(userId: number): Promise<RecommendationResponse> {
    try {
      // Get the titles of the 3 most recent items for the user
      const recentItemNames = await getRecentItemNames(userId);
  
      // Fetch recommendations for each recent item
      const recommendationsPromises = recentItemNames.map(itemTitle => fetchRecommendations(itemTitle));
      const recommendations = await Promise.all(recommendationsPromises);
  
      // Merge recommendations for all recent items
      const mergedRecommendations: RecommendationResponse = {
        books: [],
        movies: [],
        songs: [],
      };
      for (const recommendation of recommendations) {
        if ('books' in recommendation && 'movies' in recommendation && 'songs' in recommendation) {
          mergedRecommendations.books = [...mergedRecommendations.books, ...recommendation.books];
          mergedRecommendations.movies = [...mergedRecommendations.movies, ...recommendation.movies];
          mergedRecommendations.songs = [...mergedRecommendations.songs, ...recommendation.songs];
        } else {
          console.error('Error fetching recommendations:', recommendation.error);
          // Handle error case
        }
      }
  
      return mergedRecommendations;
    } catch (error) {
      console.error('Error:', error);
      // If an error occurs, return an empty object
      return {
        books: [],
        movies: [],
        songs: [],
      };
    } finally {
      await prisma.$disconnect(); // Disconnect from the Prisma client
    }
  }

  export async function fetchRecommendationsWithDetails(userId: number): Promise<any> {
    try {
        // Fetch recommendations for recent items
        const recommendations = await fetchRecommendationsForRecentItems(userId);

        // Remove leading spaces from item names
        const cleanRecommendations = {
            books: recommendations.books.map(book => book.trim()),
            movies: recommendations.movies.map(movie => movie.trim()),
            songs: recommendations.songs.map(song => song.trim()),
        };

        // Fetch API details for books, movies, and songs
        const booksPromises = cleanRecommendations.books.map(book => handleBookSearchAPI(book));
        const moviesPromises = cleanRecommendations.movies.map(movie => handleMovieSearchAPI(movie));
        const songsPromises = cleanRecommendations.songs.map(song => handleSongSearchAPI(song));

        const books = await Promise.all(booksPromises);
        const movies = await Promise.all(moviesPromises);
        const songs = await Promise.all(songsPromises);

        // Combine recommendations with API details
        const recommendationsWithDetails = {
            books: mergeWithDetails(recommendations.books, books),
            movies: mergeWithDetails(recommendations.movies, movies),
            songs: mergeWithDetails(recommendations.songs, songs),
        };

        return recommendationsWithDetails;
    } catch (error) {
        console.error('Error:', error);
        // If an error occurs, return an empty object
        return {
            books: [],
            movies: [],
            songs: [],
        };
    }
}

// Function to merge recommendations with API details
function mergeWithDetails(recommendations: string[], details: any[]): any[] {
    return recommendations.map((recommendation, index) => {
        const detail = details[index][0]; // Assuming each recommendation has only one detail
        return {
            name: recommendation,
            detail: detail, // You might need to adjust this depending on the structure of your detail response
        };
    });
}
