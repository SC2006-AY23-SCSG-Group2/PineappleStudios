// import {LoaderFunctionArgs, json} from "@remix-run/node";
// import {removeTagInItemAssignment} from "src/lib/database/TagsInItems";
// import {getBookDetailsRequest} from "src/lib/database/book";
// import {createBookItem} from "src/lib/database/bookAPI";
// import {getMovieDetailsRequest} from "src/lib/database/movie";
// import {createMovieItem} from "src/lib/database/movieAPI";
// import {getSongDetailsRequest} from "src/lib/database/song";
// import {createSongItem} from "src/lib/database/songAPI";
// import {getTagByName} from "src/lib/database/tag";
// import {createTagsforItem} from "src/lib/database/tagsItem";
// import {
//   getItemInfoByItemId,
//   getItemInfoExample,
// } from "../../../lib/database/functions";
// export async function loader({params}: LoaderFunctionArgs) {
//   const booksData = await getSongDetailsRequest("Maze Runner");
//   const book = await createSongItem(booksData[0]);
//   if (book == null) return;
//   await createTagsforItem(book.item.id, "Watch Now");
//   let tag = await getTagByName("Scary");
//   if (tag) await removeTagInItemAssignment(book.item.id, tag.id);
//   const frontendBook = await getItemInfoByItemId(book.item.id, 1);
//   // const book = await getItemInfoExample("1");
//   if (book != null)
//     console.log("SUCCESSFULLY CREATED ITEM, PEOPLE, ITEM, ASSIGNMENT, BOOK");
//   return json(
//     {
//       success: true,
//       dataForApi: book,
//       dataForFronted: frontendBook,
//       error: {},
//     },
//     {status: 200},
//   );
//   // const id: string | undefined = params.id;
//   // if (!id) {
//   //   return json(
//   //     {
//   //       success: false,
//   //       data: {},
//   //       error: {msg: "no id requested"},
//   //     },
//   //     {status: 400},
//   //   );
//   // }
//   // const data = getItemInfo(id);
//   // return json(
//   //   {
//   //     success: true,
//   //     data: data,
//   //     error: {},
//   //   },
//   //   {status: 200},
//   // );
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
import {LoaderFunctionArgs, json} from "@remix-run/node";
import {getLibraryInfoByUserId} from "src/lib/dataRetrieve/getLibraryInfo";

export async function loader({params}: LoaderFunctionArgs) {
  const userId: number = 2; // Provide a valid user ID for testing

  try {
    const libraryInfo = await getLibraryInfoByUserId(userId);
    if (!libraryInfo) {
      return json(
        {
          success: false,
          data: {},
          error: {msg: "Library info not found for the provided user ID"},
        },
        {status: 400},
      );
    }

    console.log("Library Info:", libraryInfo);
    return json(
      {
        success: true,
        data: libraryInfo,
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
        error: {msg: "An error occurred while fetching library info"},
      },
      {status: 500},
    );
  }
}
