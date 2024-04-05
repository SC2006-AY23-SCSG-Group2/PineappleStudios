//http://www.omdbapi.com/?s=star wars&apikey=411ddaa2
import {createItem, deleteItem} from "./item";
import {prismaClient} from "./prisma";

//CRUD

//CRUD
//getAllMovies
export const getAllMovies = async () => {
  try {
    const allMovies = await prismaClient.movie.findMany({
      include: {
        item: true, //also get all movieItem
      },
    });
    return allMovies;
  } catch (e) {
    console.log(e);
  }
};

//getMovieByItemId
export const getMovieByItemId = async (movieId: any) => {
  try {
    const movie = await prismaClient.movie.findUnique({
      where: {
        itemId: movieId, //id equals to movieid
      },
      include: {
        item: true,
      },
    });
    return movie;
  } catch (e) {
    console.log(e);
  }
};

//createMovie
export const createMovie = async (reqMovie: any, reqItem: any) => {
  try {
    const movieData = reqMovie.body; //contain all movie's data for a movie
    const itemData = reqItem.body;
    const movie = await prismaClient.movie.create({
      data: movieData,
    });
    const item = await createItem(itemData);
    return {movie, item};
  } catch (error) {
    console.error("Error occurred while creating movie:", error);
  }
};

//updateMovie
export const updateMovie = async (request: any) => {
  try {
    const movieId = request.params.itemId;
    const movieData = request.body; //contain all movie's data for a movie

    // Remove movieId from movieData to prevent updating it
    delete movieData.itemId;
    delete movieData.item;
    delete movieData.srcId;

    const movie = await prismaClient.movie.update({
      where: {
        itemId: movieId,
      },
      data: movieData,
    });
    return movie;
  } catch (e) {
    console.log(e);
  }
};

//deleteMovie
export const deleteMovie = async (request: any) => {
  try {
    const movieId = request.params.itemId; //contain all movie's data for a movie
    let result = await deleteItem(movieId); // Await the deleteItem function directly
    if (result) {
      await prismaClient.movie.delete({
        where: {
          itemId: movieId,
        },
      });
      return {success: true};
    } else {
      return {success: false, error: "Unable to delete item"};
    }
  } catch (e) {
    console.log(e);
    return {success: false};
  }
};

// const [movies, setMovies] = useState([]);

// export const getMovieRequest = async (searchValue: any) => {
//   const url = "http://www.omdbapi.com/?s=${searchValue}&apikey=411ddaa2";
//   const response = await fetch(url);
//   const responseJson = await response.json();

//   if (responseJson.Search) {
//     setMovies(responseJson.Search);
//   }
// };
export const getMovieRequest = async (searchValue: string) => {
  const url = `http://www.omdbapi.com/?s=${encodeURIComponent(
    searchValue,
  )}&apikey=411ddaa2`;
  try {
    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      // Extract movie information from response data
      const moviesData: any[] = responseJson.Search.map((item: any) => ({
        itemTitle: item.Title,
        // Add other properties of a movie as needed
      }));
      return moviesData;
    } else {
      console.error("No movies found.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

export const getMovieDetailsRequest = async (searchValue: string) => {
  const url = `http://www.omdbapi.com/?t=${encodeURIComponent(
    searchValue,
  )}&apikey=411ddaa2`;
  try {
    const response = await fetch(url);
    const responseData = await response.json();

    if (responseData.Response === "True") {
      // Extract movie information from response data
      const movieData: any[] = [
        {
          itemTitle: responseData.Title,
          thumbnailUrl:
            responseData.Poster !== "N/A" ? responseData.Poster : "",
          genre: responseData.Genre || "N/A",
          language: responseData.Language || "N/A",
          averageRating: responseData.imdbRating || "N/A",
          ratingsCount: responseData.imdbVotes || "N/A",
          year: responseData.Year || "N/A", // Add year
          duration: responseData.Runtime || "N/A", // Add duration
          // Add other properties of a movie as needed
        },
      ];
      return movieData;
    } else {
      console.error("Movie not found.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching movie:", error);
    return [];
  }
};

// // Rate a movie by ID using a raw SQL query
// export const rateMovie = async (movieId: number, rating: number) => {
//   try {
//     // Execute a raw SQL query to update the rating of the movie
//     await prismaClient.$executeRaw`UPDATE "Movie" SET "rate" = ${rating} WHERE "id" = ${movieId}`;

//     // Retrieve the updated movie
//     const updatedMovie = await prismaClient.movie.findUnique({
//       where: {
//         id: movieId,
//       },
//     });

//     if (!updatedMovie) {
//       throw new Error('Failed to retrieve updated movie');
//     }

//     return updatedMovie;
//   } catch (error) {
//     console.error("Failed to rate movie:", error);
//     throw new Error("Failed to rate movie");
//   }
// };
// // Add a review to a movie using a raw SQL query
// export const addMovieReview = async (movieId: number, review: string) => {
//   try {
//     // Execute a raw SQL query to update the review of the movie
//     await prismaClient.$executeRaw`UPDATE "Movie" SET "review" = ${review} WHERE "id" = ${movieId}`;

//     // Retrieve the updated movie
//     const updatedMovie = await prismaClient.movie.findUnique({
//       where: {
//         id: movieId,
//       },
//     });

//     if (!updatedMovie) {
//       throw new Error('Failed to retrieve updated movie');
//     }

//     return updatedMovie;
//   } catch (error) {
//     console.error("Failed to add review to movie:", error);
//     throw new Error("Failed to add review to movie");
//   }
// };
