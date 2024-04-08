import {LoaderFunctionArgs, json, redirect} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import React from "react";

import {getLibraryInfoByUserId} from "../../../lib/dataRetrieve/getLibraryInfo";
import {ItemType, Library, SimpleItem} from "../../../lib/interfaces";
import {commitSession, destroySession, getSession} from "../../session";
import {ItemList} from "../_components/ItemList";

export async function loader({request}: LoaderFunctionArgs) {
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

  const library: Library | null = await getLibraryInfoByUserId(
    +session.data.userId,
  );

  let jsonData: {
    success: boolean;
    data: Library | null;
    error: {msg: string} | undefined;
  } = {
    success: true,
    data: library,
    error: undefined,
  };

  if (library) {
    session.flash("error", "Library Cannot found");

    jsonData = {
      success: false,
      data: null,
      error: {msg: "Library not found"},
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

  if (!loaderData.success) {
    return (
      <>
        <h1 className={"text-error"}>{loaderData.error?.msg}</h1>
      </>
    );
  }

  if (!loaderData.success || !loaderData.data) {
    return (
      <>
        <h1 className={"text-error"}>Error</h1>
      </>
    );
  }

  const favoriteItems: SimpleItem[] = loaderData.data.items.filter(
    (item: SimpleItem) =>
      item.tag.includes("favorite") || item.tag.includes("favourite"),
  );
  const notFavoriteItems: SimpleItem[] = loaderData.data.items.filter(
    (item: SimpleItem) =>
      !(item.tag.includes("favorite") || item.tag.includes("favourite")),
  );

  return (
    <>
      <ItemList title="Favorites" items={favoriteItems} />

      {notFavoriteItems.filter((x: SimpleItem) => x.type === ItemType.Song)
        .length !== 0 && (
        <>
          <div className="divider"></div>
          <ItemList
            title="Music"
            items={notFavoriteItems.filter(
              (x: SimpleItem) => x.type === ItemType.Song,
            )}
          />
        </>
      )}

      {notFavoriteItems.filter((x: SimpleItem) => x.type === ItemType.Movie)
        .length !== 0 && (
        <>
          <div className="divider"></div>
          <ItemList
            title="Movies & TV Shows"
            items={notFavoriteItems.filter(
              (x: SimpleItem) => x.type === ItemType.Movie,
            )}
          />
        </>
      )}

      {notFavoriteItems.filter((x: SimpleItem) => x.type === ItemType.Book)
        .length !== 0 && (
        <>
          <div className="divider"></div>
          <ItemList
            title="Books"
            items={notFavoriteItems.filter(
              (x: SimpleItem) => x.type === ItemType.Book,
            )}
          />
        </>
      )}

      {notFavoriteItems.filter(
        (x: SimpleItem) => x.type === undefined || x.type > 2,
      ).length !== 0 && (
        <>
          <div className="divider"></div>
          <ItemList
            title="Others"
            items={notFavoriteItems.filter(
              (x: SimpleItem) => x.type === undefined || x.type > 2,
            )}
          />
        </>
      )}
      <div className="divider m-4 p-4"></div>
    </>
  );
}
