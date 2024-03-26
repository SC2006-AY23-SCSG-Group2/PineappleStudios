import {Movie} from "@prisma/client";

import {prismaClient} from "./prisma";

//CRUD
//getAllMovies
export const getAllMovies = async () => {
  //request and response is parameter
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

//getMovieById
export const getMovieById = async (request: any) => {
  try {
    const movieId = request.params.id;
    const movie = await prismaClient.movie.findUnique({
      where: {
        id: movieId, //id equals to movieid
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

export const createMovie = async (request: any) => {
  try {
    const movieData = request.body; //contain all movie's data for a movie
    const movie = await prismaClient.movie.create({
      data: movieData,
    });
    return movie;
  } catch (e) {
    console.log(e);
  }
};
//updateMovie
export const updateMovie = async (request: any) => {
  try {
    const movieId = request.params.itemId;
    const movieData = request.body; //contain all movie's data for a movie

    // Remove movieId from movieData to prevent updating it
    delete movieData.movieId;

    const movie = await prismaClient.movie.update({
      where: {
        id: movieId,
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
    const movieId = request.params.id; //contain all movie's data for a movie
    const movie = await prismaClient.movie.delete({
      where: {
        id: movieId,
      },
    });
    return movie;
  } catch (e) {
    console.log(e);
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



