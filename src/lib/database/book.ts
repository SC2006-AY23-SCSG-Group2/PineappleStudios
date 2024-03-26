import {Book} from "@prisma/client";
import { prismaClient } from "./prisma";

// getAllBooks
export const getAllBooks = async () => {
  try {
    const allBooks = await prismaClient.book.findMany({
      include: {
        item: true, // Include the associated Item data
      },
    });
    return allBooks;
  } catch (e) {
    console.log(e);
  }
};

// getBookById
export const getBookById = async (request: any) => {
  try {
    const bookId = request.params.id;
    const book = await prismaClient.book.findUnique({
      where: {
        id: bookId,
      },
      include: {
        item: true,
      },
    });
    return book;
  } catch (e) {
    console.log(e);
  }
};

// createBook
export const createBook = async (request: any) => {
  try {
    const bookData = request.body;
    const book = await prismaClient.book.create({
      data: bookData,
    });
    return book;
  } catch (e) {
    console.log(e);
  }
};

// updateBook
export const updateBook = async (request: any) => {
  try {
    const bookId = request.params.itemId;
    const bookData = request.body;
    // Remove bookId from bookData to prevent updating it
    delete bookData.bookId;

    const book = await prismaClient.book.update({
      where: {
        id: bookId,
      },
      data: bookData,
    });
    return book;
  } catch (e) {
    console.log(e);
  }
};

// deleteBook
export const deleteBook = async (request: any) => {
  try {
    const bookId = request.params.id;
    const book = await prismaClient.book.delete({
      where: {
        id: bookId,
      },
    });
    return book;
  } catch (e) {
    console.log(e);
  }
};
// // Add a review to a book
// export const addBookReview = async (bookId: number, review: String) => {
//   try {
//     // Check if the book exists
//     const book = await prismaClient.book.findUnique({
//       where: {
//         id: bookId,
//       },
//     });

//     if (!book) {
//       throw new Error('Book not found');
//     }

//     // Add the review to the book
//     const updatedBook = await prismaClient.book.update({
//       where: {
//         id: bookId,
//       },
//       data: {
//         review: review,
//       },
//     });

//     return updatedBook;
//   } catch (error) {
//     console.error("Failed to add review to book:", error);
//     throw new Error("Failed to add review to book");
//   }
// };
import React, { useState, useEffect } from 'react';
import request from 'superagent';

export const getBookRequest = async (searchValue: string) => {
  //const url = `http://openlibrary.org/search.json?q=${searchValue}`;
  const url = `https://www.googleapis.com/books/v1/volumes?q=${searchValue}`;
  try {
    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.docs) {
      // Assuming the response structure has an array called 'docs' containing books
      return responseJson.docs;
    } else {
      return []; // If no books found, return an empty array
    }
  } catch (error) {
    console.error('Error fetching books:', error);
    return []; // Return empty array in case of errors
  }
};