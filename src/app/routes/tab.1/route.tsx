import {useLoaderData} from "@remix-run/react";
import React from "react";

import {ItemList} from "../_components/ItemList";

interface LoaderData {
  user: {
    name: string;
    email: string;
    time: number;
    date: string;
    numOfLikes: number;
    numOfRatings: number;
    preferences: Array<{name: string; values: string[]}>;
    items: Array<{
      thumbnailUrl?: string;
      itemTitle?: string;
      showHeart?: boolean;
      type?: string;
    }>;
  };
}

export async function loader(): Promise<LoaderData> {
  function randomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return {
    user: {
      name: "Unknown_Blaze",
      email: "unknown@e.ntu.edu.sg",
      time: 2,
      date: "March 15, 2024",
      numOfLikes: 107,
      numOfRatings: 26,
      preferences: [
        {
          name: "Music",
          values: [
            "Pop",
            "Jazz",
            "Classical",
            "Indie",
            "Movie-related",
            "Indian Classical",
          ],
        },
        {name: "Books", values: ["Dystopian", "Non-fiction"]},
        {name: "Movies", values: ["Thriller", "Horror"]},
      ],
      items: [
        {
          thumbnailUrl: `https://picsum.photos/id/${randomInteger(
            0,
            1084,
          )}/200.webp`,
          itemTitle: "Item",
          showHeart: true,
        },
        {
          thumbnailUrl: `https://picsum.photos/id/${randomInteger(
            0,
            1084,
          )}/200.webp`,
          itemTitle: "Item",
          showHeart: true,
        },
        {
          thumbnailUrl: `https://picsum.photos/id/${randomInteger(
            0,
            1084,
          )}/200.webp`,
          itemTitle: "Item",
        },
        {
          thumbnailUrl: `https://picsum.photos/id/${randomInteger(
            0,
            1084,
          )}/200.webp`,
          itemTitle: "Item",
          showHeart: true,
        },
        {
          thumbnailUrl: `https://picsum.photos/id/${randomInteger(
            0,
            1084,
          )}/200.webp`,
          itemTitle: "Item",
        },
        {
          thumbnailUrl: `https://picsum.photos/id/${randomInteger(
            0,
            1084,
          )}/200.webp`,
          itemTitle: "Item",
          showHeart: true,
        },
        {
          thumbnailUrl: `https://picsum.photos/id/${randomInteger(
            0,
            1084,
          )}/200.webp`,
          itemTitle: "Item",
        },
        {
          thumbnailUrl: `https://picsum.photos/id/${randomInteger(
            0,
            1084,
          )}/200.webp`,
          itemTitle: "Item",
        },
        {
          thumbnailUrl: `https://picsum.photos/id/${randomInteger(
            0,
            1084,
          )}/200.webp`,
          itemTitle: "Item",
        },
        {
          thumbnailUrl: `https://picsum.photos/id/${randomInteger(
            0,
            1084,
          )}/200.webp`,
          itemTitle: "Item",
        },
        {
          thumbnailUrl: `https://picsum.photos/id/${randomInteger(
            0,
            1084,
          )}/200.webp`,
          itemTitle: "Item",
        },
      ],
    },
  };
}

export default function tab_index(): React.JSX.Element {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {user} = useLoaderData<typeof loader>();

  const favoriteItems = user.items.filter((item) => item.showHeart);
  const notFavoriteItems = user.items.filter((item) => !item.showHeart);

  return (
    <>
      <ItemList title="Favorites" items={favoriteItems} />

      {notFavoriteItems.filter((x) => x.type === "music").length !== 0 && (
        <>
          <div className="divider"></div>
          <ItemList
            title="Music"
            items={notFavoriteItems.filter((x) => x.type === "music")}
          />
        </>
      )}

      {notFavoriteItems.filter((x) => x.type === "movie").length !== 0 && (
        <>
          <div className="divider"></div>
          <ItemList
            title="Movies & TV Shows"
            items={notFavoriteItems.filter((x) => x.type === "movie")}
          />
        </>
      )}

      {notFavoriteItems.filter((x) => x.type === "book").length !== 0 && (
        <>
          <div className="divider"></div>
          <ItemList
            title="Books"
            items={notFavoriteItems.filter((x) => x.type === "book")}
          />
        </>
      )}

      {notFavoriteItems.filter(
        (x) =>
          x.type === undefined ||
          (x.type !== "movie" && x.type !== "book" && x.type !== "music"),
      ).length !== 0 && (
        <>
          <div className="divider"></div>
          <ItemList
            title="Others"
            items={notFavoriteItems.filter(
              (x) =>
                x.type === undefined ||
                (x.type !== "movie" && x.type !== "book" && x.type !== "music"),
            )}
          />
        </>
      )}
    </>
  );
}
