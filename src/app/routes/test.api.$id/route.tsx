// import {LoaderFunctionArgs, json} from "@remix-run/node";
// import {getUserInfoByUserId} from "src/lib/dataRetrieve/getUserInfo";
// import {addHistoryItemForUser} from
// "src/lib/dataRetrieve/handleHistoryItems"; import {
// decrementLikedItemsByOne, incrementLikedItemsByOne, updateUserName, } from
// "src/lib/dataRetrieve/handleUserInfo"; import { addPreferenceForUser,
// removePreferenceForUser, } from
// "src/lib/dataRetrieve/handleUserPreferences"; import {getUserById} from
// "src/lib/database/user"; export async function loader({params}:
// LoaderFunctionArgs) { // const booksData = await getSongDetailsRequest("Maze
// Runner"); // await updateUserName(2, "POP"); await
// decrementLikedItemsByOne(2); const frontendUser = await
// getUserInfoByUserId(2); const user = await getUserById(2); // const book =
// await getItemInfoExample("1"); // if (user != null) //
// console.log("SUCCESSFULLY CREATED ITEM, PEOPLE, ITEM, ASSIGNMENT, BOOK");
// return json( { success: true, dataFromDataBase: user, dataForFronted:
// frontendUser, error: {}, }, {status: 200}, ); } --------------------Testing
// getItemInfoBySrcId,getItemIdBySrcId functions ----------------------- import
// { LoaderFunctionArgs, json } from "@remix-run/node"; import {
// getItemInfoBySrcId, getItemIdBySrcId, getItemInfoByItemId, } from
// "../../../lib/database/functions"; // Update the path to match your project
// structure export async function loader({ params }: LoaderFunctionArgs) {
// const srcId: string = "tt1790864"; // Provide a valid source ID for testing
// const userId: number = 1; // Provide a valid user ID for testing try { //
// const itemId = await getItemIdBySrcId(srcId); // if (!itemId) { //   return
// json( //     { //       success: false, //       data: {}, //       error: {
// msg: "Item ID not found for the provided source ID" }, //     }, //     {
// status: 400 } //   ); // } const itemInfo = await getItemInfoBySrcId(srcId,
// userId); if (!itemInfo) { return json( { success: false, data: {}, error: {
// msg: "Item info not found for the provided source ID" }, }, { status: 400 }
// ); } console.log("Item Info:", itemInfo); return json( { success: true,
// data: itemInfo, error: {}, }, { status: 200 } ); } catch (error) {
// console.error("Error:", error); return json( { success: false, data: {},
// error: { msg: "An error occurred while fetching item info" }, }, { status:
// 500 } ); } } -------------Testing for getLibraryInfoByUserId
// ---------------------------- import {LoaderFunctionArgs, json} from
// "@remix-run/node"; import {getLibraryInfoByUserId} from
// "src/lib/dataRetrieve/getLibraryInfo"; export async function
// loader({params}: LoaderFunctionArgs) { const userId: number = 2; // Provide
// a valid user ID for testing try { const libraryInfo = await
// getLibraryInfoByUserId(userId); if (!libraryInfo) { return json( { success:
// false, data: {}, error: {msg: "Library info not found for the provided user
// ID"}, }, {status: 400}, ); } console.log("Library Info:", libraryInfo);
// return json( { success: true, data: libraryInfo, error: {}, }, {status:
// 200}, ); } catch (error) { console.error("Error:", error); return json( {
// success: false, data: {}, error: {msg: "An error occurred while fetching
// library info"}, }, {status: 500}, ); } } -----------------------------
// addItemToLibrary funciton ----------------------------- import {
// LoaderFunctionArgs, json } from "@remix-run/node"; import {
// addItemToLibrary, removeItemFromLibrary } from
// "../../../lib/dataRetrieve/handleLibraryItems"; export async function
// loader({ request }: LoaderFunctionArgs) { const userId: number = 2; //
// Provide a valid user ID for testing const libraryId: number = 1; // Provide
// the library ID where you want to add the item const movieId: number = 45; //
// Provide the ID of the existing movie try { // Add the existing movie to the
// library const addedMovie = await removeItemFromLibrary(userId, libraryId,
// movieId); console.log("Added Movie to Library:", addedMovie); return json( {
// success: true, data: addedMovie, error: {}, }, { status: 200 } ); } catch
// (error) { console.error("Error:", error); return json( { success: false,
// data: {}, error: { msg: "An error occurred while adding movie to library" },
// }, { status: 500 } ); } } ---------------------------------folder function
// ------------------------- import { LoaderFunctionArgs, json } from
// "@remix-run/node"; import { addItemToFolder, removeItemFromFolder } from
// "../../../lib/dataRetrieve/handleFolder"; export async function loader({
// request }: LoaderFunctionArgs) { const userId: number = 2; // Provide a
// valid user ID for testing const libraryId: number = 2; // Provide the
// library ID where you want to add the item const folderId: number = 2; //
// Provide the ID of the folder where you want to add the item const itemId:
// number = 43; // Provide the ID of the existing item (movie, song, or book)
// try { // Add the existing item to the folder const addedItem = await
// addItemToFolder(libraryId, folderId, itemId); console.log("Added Item to
// Folder:", addedItem); return json( { success: true, data: addedItem, error:
// {}, }, { status: 200 } ); } catch (error) { console.error("Error:", error); return json( { success: false, data: {}, error: { msg: "An error occurred while adding item to folder" }, }, { status: 500 } ); } } ---------------------- createReview ------------------------------ import { LoaderFunctionArgs, json } from "@remix-run/node"; //import { createReview } from "../../../lib/database/review"; import { createRating } from "../../../lib/database/rate"; import { handleRating } from "../../../lib/dataRetrieve/handleRating"; export async function loader({ request }: LoaderFunctionArgs) { const userId: number = 1; // Provide a valid user ID for testing const itemId: number = 2; // Provide the ID of the existing item (movie, song, or book) const reviewContent: string = "Worst song that i have heard so far."; // Provide the review content const rating: number = 2; // Provide the rating (out of 5) to be assigned try { // Create a new review //const newReview = await createReview(userId, itemId, reviewContent); const newReview = await handleRating(userId, itemId, rating); console.log("Created Review:", newReview); return json( { success: true, data: newReview, error: {}, }, { status: 200 } ); } catch (error) { console.error("Error:", error); return json( { success: false, data: {}, error: { msg: "An error occurred while creating review" }, }, { status: 500 } ); } } ---------------------------avgRating and create item--------------------------- import {LoaderFunctionArgs, json} from "@remix-run/node"; import {handleCreateItem} from "src/lib/dataRetrieve/createItems"; // Update the import path import { handleBookSearchAPI, handleMovieSearchAPI, handleSongSearchAPI, } from "src/lib/dataRetrieve/getAPIInfo"; import {getAverageRatingByItemId} from "../../../lib/database/rate"; export async function loader({params}: LoaderFunctionArgs) { const itemId: number = 2; // Provide the item ID for testing try { const averageRating = await getAverageRatingByItemId(itemId); console.log("Average Rating:", averageRating); // Fetch book data const books = await handleMovieSearchAPI("harry potter"); for (const book in books) await handleCreateItem(book); // Pick a random book const randomBook = books[Math.floor(Math.random() * books.length)]; // const averageRating = await handleCreateItem(books[1]); return json( { success: true, data: {averageRating}, error: {}, }, {status: 200}, ); } catch (error) { console.error("Error:", error); return json( { success: false, data: {}, error: { msg: "An error occurred while fetching average rating for item", }, }, {status: 500}, ); } } ------------------------------handle folder---------------------------------- import { LoaderFunctionArgs, json } from "@remix-run/node"; //import { createFolder } from "../../../lib/database/folder"; import { handleFolder } from "../../../lib/dataRetrieve/handleFolder"; export async function loader({ request }: LoaderFunctionArgs) { const libraryId: number = 2; // Provide the library ID where you want to create the folder const folderName: string = "Train"; // Provide the name for the folder try { // Create a new folder const newFolder = await handleFolder(folderName, libraryId); console.log("Created Folder:", newFolder); return json( { success: true, data: newFolder, error: {}, }, { status: 200 } ); } catch (error) { console.error("Error:", error); return json( { success: false, data: {}, error: { msg: "An error occurred while creating folder" }, }, { status: 500 } ); } } -----------------------handle api ------------------------------------------
import {LoaderFunctionArgs, json} from "@remix-run/node";
import {getItemInfoBySrcId} from "src/lib/dataRetrieve/getItemInfo";
import {getBookDetailsRequest} from "src/lib/database/book";
import {
  getSongDetailsRequest,
  getSongDetailsRequestById,
} from "src/lib/database/song";

import {getMovieDetailsRequest} from "../../../lib/database/movie";

export async function loader({request}: LoaderFunctionArgs) {
  try {
    // Invoke the handleSearchAPI function
    const songs: string[] = [
      "Bohemian Rhapsody by Queen",
      "Stairway to Heaven by Led Zeppelin",
      "Hotel California by Eagles",
      "Hey Jude by The Beatles",
      "Smells Like Teen Spirit by Nirvana",
      "Imagine by John Lennon",
      "Like a Rolling Stone by Bob Dylan",
      "Billie Jean by Michael Jackson",
      "Purple Haze by Jimi Hendrix",
      "Comfortably Numb by Pink Floyd",
      "Yesterday by The Beatles",
      "What's Going On by Marvin Gaye",
      "Sweet Child o' Mine by Guns N' Roses",
      "No Woman, No Cry by Bob Marley & The Wailers",
      "Billie Jean by Michael Jackson",
      "Superstition by Stevie Wonder",
      "Born to Run by Bruce Springsteen",
      "Stayin' Alive by Bee Gees",
      "Dancing Queen by ABBA",
      "Like a Prayer by Madonna",
    ];

    for (const song of songs) {
      const songData = await getSongDetailsRequest(song);
      await getItemInfoBySrcId(songData[0].srcId, 1);
    }

    const books: string[] = [
      "To Kill a Mockingbird by Harper Lee",
      "1984 by George Orwell",
      "Pride and Prejudice by Jane Austen",
      "The Great Gatsby by F. Scott Fitzgerald",
      "The Catcher in the Rye by J.D. Salinger",
      "The Hobbit by J.R.R. Tolkien",
      "Moby-Dick by Herman Melville",
      "War and Peace by Leo Tolstoy",
      "The Lord of the Rings by J.R.R. Tolkien",
      "The Adventures of Huckleberry Finn by Mark Twain",
      "The Grapes of Wrath by John Steinbeck",
      "Brave New World by Aldous Huxley",
      "The Odyssey by Homer",
      "Jane Eyre by Charlotte Brontë",
      "Wuthering Heights by Emily Brontë",
      "Great Expectations by Charles Dickens",
      "Crime and Punishment by Fyodor Dostoevsky",
      "The Brothers Karamazov by Fyodor Dostoevsky",
      "Ulysses by James Joyce",
      "One Hundred Years of Solitude by Gabriel García Márquez",
    ];

    for (const book of books) {
      const bookData = await getBookDetailsRequest(book);
      await getItemInfoBySrcId(bookData[0].srcId, 1);
    }

    const movies: string[] = [
      "The Shawshank Redemption",
      "The Godfather",
      "The Dark Knight",
      "Schindler's List",
      "Pulp Fiction",
      "The Lord of the Rings: The Return of the King",
      "Forrest Gump",
      "Inception",
      "The Matrix",
      "The Lord of the Rings: The Fellowship of the Ring",
      "The Empire Strikes Back",
      "The Green Mile",
      "The Lion King",
      "Gladiator",
      "The Departed",
      "Interstellar",
      "The Prestige",
      "Django Unchained",
      "Back to the Future",
      "The Lord of the Rings: The Two Towers",
    ];

    for (const movie of movies) {
      const movieData = await getMovieDetailsRequest(movie);
      await getItemInfoBySrcId(movieData[0].srcId, 1);
    }

    const id = "song+11dFghVXANMlKmJXsNCbNl";
    const searchData = await getSongDetailsRequestById(id);
    // const songData = await getSongDetailsRequest("Maze Runner");
    // await createSongItem(songData[0]);

    // Log the search data
    console.log("Search Data:", searchData);

    // Return the search data
    return json(
      {
        success: true,
        data: searchData,
        error: {},
      },
      {status: 200},
    );
  } catch (error) {
    console.error("Error:", error);
    return json(
      {
        success: false,
        data: {},
        error: {msg: "An error occurred while fetching search results"},
      },
      {status: 500},
    );
  }
}

//------------------------------------handle folder---------------------------------------
// import { LoaderFunctionArgs, json } from "@remix-run/node";
// import { addFolderToLibrary, removeFolderFromLibrary } from "./../../../lib/dataRetrieve/handleLibraryFolders";

// export async function loader({ request }: LoaderFunctionArgs) {
//   try {
//     // Add folder to library
//     const userId = 3;
//     const libraryId = 3;
//     const folderId = 4;
//     //const addFolderResult = await addFolderToLibrary(userId, libraryId, folderId); // Replace with appropriate values

//     // Remove folder from library
//     const removeFolderResult = await removeFolderFromLibrary(userId, libraryId, folderId); // Replace with appropriate values

//     // Return the results
//     return json(
//       {
//         success: true,
//         data: {
//           //addFolderResult,
//           removeFolderResult,
//         },
//         error: {},
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error:", error);
//     return json(
//       {
//         success: false,
//         data: {},
//         error: { msg: "An error occurred while testing folder functions" },
//       },
//       { status: 500 }
//     );
//   }
// }

//---------------------------- handleSeries --------------------------------------
// import { LoaderFunctionArgs, json } from "@remix-run/node";
// import { updateSeriesToFolder, createSeriesInFolder, deleteSeriesFromFolder } from "./../../../lib/dataRetrieve/handleSeries";

// export async function loader({ request }: LoaderFunctionArgs) {
//   try {
//     // Add series to folder
//     const folderId = 2; // Replace with the ID of the folder
//     const seriesId = 1; // Replace with the ID of the series
//     const seriesName = "rudra";
//     //const addSeriesResult = await addSeriesToFolder(folderId, seriesId);

//     // Remove series from folder
//     const removeSeriesResult = await createSeriesInFolder(seriesName,folderId); // Uncomment to test removal

//     // Return the results
//     return json(
//       {
//         success: true,
//         data: {
//           //addSeriesResult,
//           removeSeriesResult, // Uncomment to include removal result
//         },
//         error: {},
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error:", error);
//     return json(
//       {
//         success: false,
//         data: {},
//         error: { msg: "An error occurred while testing series functions" },
//       },
//       { status: 500 }
//     );
//   }
// }
// import { LoaderFunctionArgs, json } from "@remix-run/node";
// import { getSongDetailsRequest, getSongDetailsRequestById } from "src/lib/database/song";
// import { getMovieDetailsRequestById } from "src/lib/database/movie";
// import { getSpotifyTokens } from "src/lib/database/spotify";
// import { getBookDetailsRequestById } from "src/lib/database/book";

// export async function loader({ request }: LoaderFunctionArgs) {
//   const search = "shape of you";
//   const song_id = "song+54SMw8TnDcuieolVRXBmni"
//   const movie_id = "movie+tt1201607"
//   const book_id = "book+XeDzzwEACAAJ"

//   try {
//     // Call the actual function to fetch song details
//     const addedItem = await getSongDetailsRequestById(song_id);
//     //const addedItem = await getSpotifyToken();
//     return json(
//       {
//         success: true,
//         data: addedItem,
//         error: {},
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error:", error);
//     return json(
//       {
//         success: false,
//         data: {},
//         error: { msg: "An error occurred while adding item to folder" },
//       },
//       { status: 500 }
//     );
//   }
// }
