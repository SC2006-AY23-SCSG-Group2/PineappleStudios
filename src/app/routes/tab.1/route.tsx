import {json} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import React from "react";

import {ItemType, SimpleItem} from "../../../lib/interfaces";
import {ItemList} from "../_components/ItemList";

export async function loader() {
  function randomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function makeItems(): SimpleItem[] {
    const returnList: SimpleItem[] = [];
    for (let i = 0; i < 20; i++) {
      const id = randomInteger(0, 1084);
      const newItem: SimpleItem = {
        id: id,
        title: "Item",
        img: `https://picsum.photos/id/${id}/200.webp`,
        tag: randomInteger(0, 1084) % 2 == 0 ? ["favorite"] : [],
        type: randomInteger(0, 1084) % 3,
      };
      returnList.push(newItem);
    }

    return returnList;
  }

  return json({
    success: true,
    data: {
      items: makeItems(),
    },
  });
}

export default function tab_index(): React.JSX.Element {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const data = useLoaderData<typeof loader>();

  if (!data.success) {
    return (
      <>
        <h1 className={"text-error"}>Error</h1>
      </>
    );
  }

  const favoriteItems: SimpleItem[] = data.data.items.filter(
    (item: SimpleItem) =>
      item.tag.includes("favorite") || item.tag.includes("favourite"),
  );
  const notFavoriteItems: SimpleItem[] = data.data.items.filter(
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
    </>
  );
}
