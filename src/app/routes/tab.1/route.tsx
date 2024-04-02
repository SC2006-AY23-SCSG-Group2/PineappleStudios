import {useLoaderData} from "@remix-run/react";
import React from "react";

import ItemList from "../_components/ItemList";
import {TagList} from "../_components/TagList";
import {ViewItems} from "../_components/ViewItems";

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
    }>;
  };
}

export const loader = async (): Promise<LoaderData> => {
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
          thumbnailUrl: "https://picsum.photos/200.webp",
          itemTitle: "Item",
          showHeart: true,
        },
        {
          thumbnailUrl: "https://picsum.photos/200.webp",
          itemTitle: "Item",
          showHeart: true,
        },
        {
          thumbnailUrl: "https://picsum.photos/200.webp",
          itemTitle: "Item",
        },
        {
          thumbnailUrl: "https://picsum.photos/200.webp",
          itemTitle: "Item",
          showHeart: true,
        },
        {
          thumbnailUrl: "https://picsum.photos/200.webp",
          itemTitle: "Item",
        },
        {
          thumbnailUrl: "https://picsum.photos/200.webp",
          itemTitle: "Item",
          showHeart: true,
        },
        {
          thumbnailUrl: "https://picsum.photos/200.webp",
          itemTitle: "Item",
        },
        {
          thumbnailUrl: "https://picsum.photos/200.webp",
          itemTitle: "Item",
        },
        {
          thumbnailUrl: "https://picsum.photos/200.webp",
          itemTitle: "Item",
        },
        {
          thumbnailUrl: "https://picsum.photos/200.webp",
          itemTitle: "Item",
        },
        {
          thumbnailUrl: "https://picsum.photos/200.webp",
          itemTitle: "Item",
        },
      ],
    },
  };
};

export default function tab_index(): React.JSX.Element {
  const {user} = useLoaderData<typeof loader>();

  const favoriteItems = user.items.filter((item) => item.showHeart);
  const unfavoriteItems = user.items.filter((item) => !item.showHeart);

  return (
    <>
      <div className="bg-gray-200">
        <ItemList title="Favorites" items={favoriteItems} />
        <div className="divider"></div>
        <h1 className="mx-10 mb-4 text-xl font-extrabold text-black text-gray-900 md:text-3xl lg:text-4xl">
          <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Top Recommendations
          </span>{" "}
          based on PineappleAI🍍
        </h1>
        <div className="divider"></div>
        <ItemList title={"Music"} items={user.items} />
        <ItemList title="Movies & TV Shows" items={user.items} />
        <ItemList title="Books" items={unfavoriteItems} />
      </div>
    </>
  );
}
