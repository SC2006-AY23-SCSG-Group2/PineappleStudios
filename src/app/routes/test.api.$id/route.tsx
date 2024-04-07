import {LoaderFunctionArgs, json} from "@remix-run/node";
import {getUserInfoByUserId} from "src/lib/dataRetrieve/getUserInfo";
import {addHistoryItemForUser} from "src/lib/dataRetrieve/handleHistoryItems";
import {
  decrementLikedItemsByOne,
  incrementLikedItemsByOne,
  updateUserName,
} from "src/lib/dataRetrieve/handleUserInfo";
import {
  addPreferenceForUser,
  removePreferenceForUser,
} from "src/lib/dataRetrieve/handleUserPreferences";
import {getUserById} from "src/lib/database/user";

export async function loader({params}: LoaderFunctionArgs) {
  // const booksData = await getSongDetailsRequest("Maze Runner");
  // await updateUserName(2, "POP");
  await decrementLikedItemsByOne(2);
  const frontendUser = await getUserInfoByUserId(2);
  const user = await getUserById(2);
  // const book = await getItemInfoExample("1");
  // if (user != null)
  //   console.log("SUCCESSFULLY CREATED ITEM, PEOPLE, ITEM, ASSIGNMENT, BOOK");
  return json(
    {
      success: true,
      dataFromDataBase: user,
      dataForFronted: frontendUser,
      error: {},
    },
    {status: 200},
  );
}
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
