import {LoaderFunctionArgs, json} from "@remix-run/node";
import {removeTagInItemAssignment} from "src/lib/database/TagsInItems";
import {getBookDetailsRequest} from "src/lib/database/book";
import {createBookItem} from "src/lib/database/bookAPI";
import {getTagByName} from "src/lib/database/tag";
import {createTagsforItem} from "src/lib/database/tagsItem";

import {
  getItemInfoByItemId,
  getItemInfoExample,
} from "../../../lib/database/functions";

export async function loader({params}: LoaderFunctionArgs) {
  const booksData = await getBookDetailsRequest("Maze Runner");
  const book = await createBookItem(booksData[0]);
  if (book == null) return;
  await createTagsforItem(book.item.id, "Watch Now");
  let tag = await getTagByName("Scary");
  if (tag) await removeTagInItemAssignment(book.item.id, tag.id);
  const frontendBook = await getItemInfoByItemId(book.item.id, 1);
  // const book = await getItemInfoExample("1");
  if (book != null)
    console.log("SUCCESSFULLY CREATED ITEM, PEOPLE, ITEM, ASSIGNMENT, BOOK");
  return json(
    {
      success: true,
      dataForApi: book,
      dataForFronted: frontendBook,
      error: {},
    },
    {status: 200},
  );

  // const id: string | undefined = params.id;

  // if (!id) {
  //   return json(
  //     {
  //       success: false,
  //       data: {},
  //       error: {msg: "no id requested"},
  //     },
  //     {status: 400},
  //   );
  // }

  // const data = getItemInfo(id);

  // return json(
  //   {
  //     success: true,
  //     data: data,
  //     error: {},
  //   },
  //   {status: 200},
  // );
}
