import {
  LoaderFunctionArgs,
  TypedResponse,
  json,
  redirect,
} from "@remix-run/node";
import {NavLink, useLoaderData} from "@remix-run/react";
import React from "react";

import {getMultipleSimpleItems} from "../../../lib/dataRetrieve/getItems";
import {ItemType, SimpleItem} from "../../../lib/interfaces";
import {commitSession, destroySession, getSession} from "../../session";
import {ItemList} from "../_components/ItemList";

export async function loader({request}: LoaderFunctionArgs): Promise<
  TypedResponse<{
    success: boolean;
    data: SimpleItem[] | null;
    error: {msg: string} | undefined;
  }>
> {
  const session = await getSession(request.headers.get("cookie"));

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

  const itemList: SimpleItem[] = await getMultipleSimpleItems(
    10,
    10,
    10,
    +session.data.userId,
  );

  let jsonData: {
    success: boolean;
    data: SimpleItem[] | null;
    error: {msg: string} | undefined;
  } = {
    success: true,
    data: itemList,
    error: undefined,
  };

  if (!itemList || itemList.length < 1) {
    session.flash("error", "Library Cannot found");

    jsonData = {
      success: false,
      data: null,
      error: {msg: "Items not found"},
    };
  }

  return json(jsonData, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function tab_index(): React.JSX.Element {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const loaderData = useLoaderData<typeof loader>();

  return (
    <>
      {loaderData?.data && (
        <h1 className="mx-6 mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-4xl font-extrabold text-transparent">
          Today&apos;s Hits
        </h1>
      )}
      {loaderData?.data &&
        loaderData?.data.filter((x: SimpleItem) => x.type === ItemType.Song)
          .length > 0 && (
          <ItemList
            items={loaderData?.data.filter(
              (x: SimpleItem) => x.type === ItemType.Song,
            )}
            title="Top Music"
          />
        )}
      {loaderData?.data &&
        loaderData?.data.filter((x: SimpleItem) => x.type === ItemType.Movie)
          .length > 0 && (
          <ItemList
            items={loaderData?.data.filter(
              (x: SimpleItem) => x.type === ItemType.Movie,
            )}
            title="Top Movies"
          />
        )}
      {loaderData?.data &&
        loaderData?.data.filter((x: SimpleItem) => x.type === ItemType.Book)
          .length > 0 && (
          <ItemList
            items={loaderData?.data.filter(
              (x: SimpleItem) => x.type === ItemType.Book,
            )}
            title="Top Books"
          />
        )}
      {(!loaderData.data ||
        loaderData.data.length +
          loaderData.data.length +
          loaderData.data.length ===
          0) && (
        <>
          <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
              <div className="max-w-md">
                <h1 className="text-3xl font-bold text-error">
                  There is recommendations, you may search what you like.
                </h1>
                <NavLink className="btn btn-primary" to="/tab/3">
                  Go to Search Page
                </NavLink>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
