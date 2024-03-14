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
    const movieId = request.params.id; //contain all movie's data for a movie
    const movie = await prismaClient.movie.delete({
      where: {
        itemId: movieId,
      },
    });
    return movie;
  } catch (e) {
    console.log(e);
  }
};
