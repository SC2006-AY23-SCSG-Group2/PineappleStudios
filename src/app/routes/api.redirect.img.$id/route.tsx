import {LoaderFunctionArgs, redirect} from "@remix-run/node";

import {getItemIdBySrcId} from "../../../lib/dataRetrieve/getItemInfo";
import {getItemById} from "../../../lib/database/item";

export async function loader({params}: LoaderFunctionArgs) {
  const id = params.id;

  if (!id) {
    return redirect("404");
  }

  let item;
  if (isNaN(+id)) {
    const newId = await getItemIdBySrcId(id);
    if (!newId) {
      return redirect("/404");
    }
    item = await getItemById(newId);
  } else if (!isNaN(+id)) {
    item = await getItemById(+id);
  }

  if (!item) {
    return redirect("/404");
  }

  const img: Response = await fetch(item?.image);

  return new Response(img.body, {
    status: 200,
    headers: {
      "Content-Type": "application/image",
    },
  });
}
