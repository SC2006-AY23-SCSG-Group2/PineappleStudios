import {LoaderFunctionArgs, Session, json, redirect} from "@remix-run/node";

import {getItemIdBySrcId} from "../../../lib/dataRetrieve/getItemInfo";
import {addItemToLibrary} from "../../../lib/dataRetrieve/handleLibraryItems";
import {
  SessionData,
  SessionFlashData,
  destroySession,
  getSession,
} from "../../session";

export async function action({request}: LoaderFunctionArgs) {
  const session: Session<SessionData, SessionFlashData> = await getSession(
    request.headers.get("cookie"),
  );
  if (!session.has("userId") || !session.data.userId) {
    session.flash("error", "User not login");

    return redirect("/login", {
      headers: {
        "Set-Cookie": await destroySession(session),
      },
    });
  }

  if (isNaN(+session.data.userId)) {
    session.flash("error", "User id is not a number");

    return redirect("/login", {
      headers: {
        "Set-Cookie": await destroySession(session),
      },
    });
  }

  const formData = await request.formData();

  const id = formData.get("id") as string;

  if (!id) {
    return json({
      success: false,
      data: undefined,
      error: {msg: "no form data provided"},
    });
  }

  let numID: number = -1;
  if (isNaN(+id)) {
    numID = (await getItemIdBySrcId(id)) ?? -1;
  } else if (!isNaN(+id)) {
    numID = +id;
  }

  // console.log(">>>> User" + +session.data.userId + ", Item: " + numID);

  const result = await addItemToLibrary(+session.data.userId, numID);

  if (!result) {
    console.log(result);

    return json({
      success: false,
      error: {msg: "Unable to add item to library"},
    });
  }

  return redirect("/library/item/" + id);
}
