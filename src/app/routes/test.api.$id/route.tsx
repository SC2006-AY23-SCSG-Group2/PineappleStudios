// import {LoaderFunctionArgs, json} from "@remix-run/node";
// import {getUserInfoByUserId} from "src/lib/dataRetrieve/getUserInfo";
// import {addHistoryItemForUser} from "src/lib/dataRetrieve/handleHistoryItems";
// import {
//   decrementLikedItemsByOne,
//   incrementLikedItemsByOne,
//   updateUserName,
// } from "src/lib/dataRetrieve/handleUserInfo";
// import {
//   addPreferenceForUser,
//   removePreferenceForUser,
// } from "src/lib/dataRetrieve/handleUserPreferences";
// import {getUserById} from "src/lib/database/user";

// export async function loader({params}: LoaderFunctionArgs) {
//   // const booksData = await getSongDetailsRequest("Maze Runner");
//   // await updateUserName(2, "POP");
//   await decrementLikedItemsByOne(2);
//   const frontendUser = await getUserInfoByUserId(2);
//   const user = await getUserById(2);
//   // const book = await getItemInfoExample("1");
//   // if (user != null)
//   //   console.log("SUCCESSFULLY CREATED ITEM, PEOPLE, ITEM, ASSIGNMENT, BOOK");
//   return json(
//     {
//       success: true,
//       dataFromDataBase: user,
//       dataForFronted: frontendUser,
//       error: {},
//     },
//     {status: 200},
//   );
// }
//--------------------Testing getItemInfoBySrcId,getItemIdBySrcId functions -----------------------
// import { LoaderFunctionArgs, json } from "@remix-run/node";
// import {
//   getItemInfoBySrcId,
//   getItemIdBySrcId,
//   getItemInfoByItemId,
// } from "../../../lib/database/functions"; // Update the path to match your project structure
// export async function loader({ params }: LoaderFunctionArgs) {
//   const srcId: string = "tt1790864"; // Provide a valid source ID for testing
//   const userId: number = 1; // Provide a valid user ID for testing
//   try {
//     // const itemId = await getItemIdBySrcId(srcId);
//     // if (!itemId) {
//     //   return json(
//     //     {
//     //       success: false,
//     //       data: {},
//     //       error: { msg: "Item ID not found for the provided source ID" },
//     //     },
//     //     { status: 400 }
//     //   );
//     // }
//     const itemInfo = await getItemInfoBySrcId(srcId, userId);
//     if (!itemInfo) {
//       return json(
//         {
//           success: false,
//           data: {},
//           error: { msg: "Item info not found for the provided source ID" },
//         },
//         { status: 400 }
//       );
//     }
//     console.log("Item Info:", itemInfo);
//     return json(
//       {
//         success: true,
//         data: itemInfo,
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
//         error: { msg: "An error occurred while fetching item info" },
//       },
//       { status: 500 }
//     );
//   }
// }
//-------------Testing for getLibraryInfoByUserId ----------------------------
// import {LoaderFunctionArgs, json} from "@remix-run/node";
// import {getLibraryInfoByUserId} from "src/lib/dataRetrieve/getLibraryInfo";

// export async function loader({params}: LoaderFunctionArgs) {
//   const userId: number = 2; // Provide a valid user ID for testing

//   try {
//     const libraryInfo = await getLibraryInfoByUserId(userId);
//     if (!libraryInfo) {
//       return json(
//         {
//           success: false,
//           data: {},
//           error: {msg: "Library info not found for the provided user ID"},
//         },
//         {status: 400},
//       );
//     }

//     console.log("Library Info:", libraryInfo);
//     return json(
//       {
//         success: true,
//         data: libraryInfo,
//         error: {},
//       },
//       {status: 200},
//     );
//   } catch (error) {
//     console.error("Error:", error);
//     return json(
//       {
//         success: false,
//         data: {},
//         error: {msg: "An error occurred while fetching library info"},
//       },
//       {status: 500},
//     );
//   }
// }

// ----------------------------- addItemToLibrary funciton -----------------------------
// import { LoaderFunctionArgs, json } from "@remix-run/node";
// import { addItemToLibrary, removeItemFromLibrary } from "../../../lib/dataRetrieve/handleLibraryItems";

// export async function loader({ request }: LoaderFunctionArgs) {
//   const userId: number = 2; // Provide a valid user ID for testing
//   const libraryId: number = 1; // Provide the library ID where you want to add the item
//   const movieId: number = 45; // Provide the ID of the existing movie

//   try {
//     // Add the existing movie to the library
//     const addedMovie = await removeItemFromLibrary(userId, libraryId, movieId);
//     console.log("Added Movie to Library:", addedMovie);

//     return json(
//       {
//         success: true,
//         data: addedMovie,
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
//         error: { msg: "An error occurred while adding movie to library" },
//       },
//       { status: 500 }
//     );
//   }
// }

//---------------------------------folder function -------------------------
// import { LoaderFunctionArgs, json } from "@remix-run/node";
// import { addItemToFolder, removeItemFromFolder } from "../../../lib/dataRetrieve/handleFolder";

// export async function loader({ request }: LoaderFunctionArgs) {
//   const userId: number = 2; // Provide a valid user ID for testing
//   const libraryId: number = 2; // Provide the library ID where you want to add the item
//   const folderId: number = 2; // Provide the ID of the folder where you want to add the item
//   const itemId: number = 43; // Provide the ID of the existing item (movie, song, or book)

//   try {
//     // Add the existing item to the folder
//     const addedItem = await addItemToFolder(libraryId, folderId, itemId);
//     console.log("Added Item to Folder:", addedItem);

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

// ---------------------- createReview ------------------------------
// import { LoaderFunctionArgs, json } from "@remix-run/node";
// //import { createReview } from "../../../lib/database/review";
// import { createRating } from "../../../lib/database/rate";
// import { handleRating } from "../../../lib/dataRetrieve/handleRating";

// export async function loader({ request }: LoaderFunctionArgs) {
//   const userId: number = 2; // Provide a valid user ID for testing
//   const itemId: number = 43; // Provide the ID of the existing item (movie, song, or book)
//   const reviewContent: string = "Worst song that i have heard so far."; // Provide the review content
//   const rating: number = 4; // Provide the rating (out of 5) to be assigned

//   try {
//     // Create a new review
//     //const newReview = await createReview(userId, itemId, reviewContent);
//     const newReview = await handleRating(userId, itemId, rating);
//     console.log("Created Review:", newReview);

//     return json(
//       {
//         success: true,
//         data: newReview,
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
//         error: { msg: "An error occurred while creating review" },
//       },
//       { status: 500 }
//     );
//   }
// }
//---------------------------avgRating---------------------------
// import { LoaderFunctionArgs, json } from "@remix-run/node";
// import { getAverageRatingByItemId } from "../../../lib/database/rate"; // Update the import path

// export async function loader({ params }: LoaderFunctionArgs) {
//   const itemId: number = 44; // Provide the item ID for testing

//   try {
//     const averageRating = await getAverageRatingByItemId(itemId);

//     console.log("Average Rating:", averageRating);

//     return json(
//       {
//         success: true,
//         data: { averageRating },
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
//         error: { msg: "An error occurred while fetching average rating for item" },
//       },
//       { status: 500 }
//     );
//   }
// }
//------------------------------handle folder----------------------------------
// import { LoaderFunctionArgs, json } from "@remix-run/node";
// //import { createFolder } from "../../../lib/database/folder";
// import { handleFolder } from "../../../lib/dataRetrieve/handleFolder";

// export async function loader({ request }: LoaderFunctionArgs) {
//   const libraryId: number = 2; // Provide the library ID where you want to create the folder
//   const folderName: string = "Train"; // Provide the name for the folder

//   try {
//     // Create a new folder
//     const newFolder = await handleFolder(folderName, libraryId);
//     console.log("Created Folder:", newFolder);

//     return json(
//       {
//         success: true,
//         data: newFolder,
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
//         error: { msg: "An error occurred while creating folder" },
//       },
//       { status: 500 }
//     );
//   }
// }
// -----------------------handle api ------------------------------------------
import { LoaderFunctionArgs, json } from "@remix-run/node";
import {getBookRequest, getBookDetailsRequest} from "./../../../lib/database/book"
import {getMovieRequest, getMovieDetailsRequest} from "./../../../lib/database/movie"
import { getSearchAPI } from "./../../../lib/dataRetrieve/getAPIInfo"


export async function loader({request}: LoaderFunctionArgs) {
  try {
    // Invoke the handleSearchAPI function
    const searchData = await getSearchAPI("Harry Potter");

    // Separate the search data into books, movies, and songs
    const books = searchData.slice(0, 10);
    const movies = searchData.slice(10, 20);
    const songs = searchData.slice(20);

    // for (const singleBookData of books) {
    //   // Create a book item using the fetched book data
    //   const result = await createBookItem(singleBookData);

    //   // Log the result if needed
    //   console.log("Book Item Created:", result);
    // }
    for (const singleBookData of movies) {
      // Create a book item using the fetched book data
      const result = await createMovieItem(singleBookData);
      if (result?.item) await addHistoryItemForUser(2, result?.item.id);
      // Log the result if needed
      console.log("Movie Item Created:", result);
    }
    // for (const singleBookData of songs) {
    //   // Create a book item using the fetched book data
    //   const result = await createSongItem(singleBookData);

    //   // Log the result if needed
    //   console.log("Song Item Created:", result);
    // }
    // Log the separated data
    console.log("Books:", books);
    console.log("Movies:", movies);
    console.log("Songs:", songs);

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
