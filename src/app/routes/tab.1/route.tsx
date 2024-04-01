import React from "react";
import { TagList } from "../_components/TagList";
import { useLoaderData } from "@remix-run/react";
import { ViewItems } from "../_components/ViewItems";

interface LoaderData {
  user: {
    name: string;
    email: string;
    time: number;
    date: string;
    numOfLikes: number;
    numOfRatings: number;
    preferences: Array<{ name: string; values: string[] }>;
    items: Array<{
      imageSrc: string;
      placeholder: string;
      showHeart?: boolean; // Make showHeart optional
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
          imageSrc: "https://picsum.photos/200.webp",
          placeholder: "Item",
          showHeart: true,
        },
        {
          imageSrc: "https://picsum.photos/200.webp",
          placeholder: "Item",
          showHeart: true,
        },
        {
          imageSrc: "https://picsum.photos/200.webp",
          placeholder: "Item",
        },
        {
          imageSrc: "https://picsum.photos/200.webp",
          placeholder: "Item",
          showHeart: true,
        },
        {
          imageSrc: "https://picsum.photos/200.webp",
          placeholder: "Item",
        },
        {
          imageSrc: "https://picsum.photos/200.webp",
          placeholder: "Item",
          showHeart: true,
        },
        {
          imageSrc: "https://picsum.photos/200.webp",
          placeholder: "Item",
        },
        {
          imageSrc: "https://picsum.photos/200.webp",
          placeholder: "Item",
        },
        {
          imageSrc: "https://picsum.photos/200.webp",
          placeholder: "Item",
        },
        {
          imageSrc: "https://picsum.photos/200.webp",
          placeholder: "Item",
        },
        {
          imageSrc: "https://picsum.photos/200.webp",
          placeholder: "Item",
        },
      ],
    },
  };
};

export default function tab_index(): React.JSX.Element {
  const {user} = useLoaderData<typeof loader>();

  const favoriteItems = user.items.filter(item => item.showHeart === true);

  const unfavoriteItems = user.items.filter(item => item.showHeart !== true);

  return (
    <>
    <div className="bg-gray-200">
      <ViewItems title="Favorites" items={favoriteItems} />
      <div className="divider"></div>
      <h1 className="mx-10 mb-4 text-xl font-extrabold text-gray-900 text-black md:text-3xl lg:text-4xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-pink-600 from-purple-400">Top Recommendations</span> based on PineappleAI🍍</h1>
      <div className="divider"></div>
      <ViewItems title="Music" items={user.items} />
      <ViewItems title="Movies & TV Shows" items={[user.items[3]]} />
      <ViewItems title="Books" items={unfavoriteItems} />
    </div>
    </>
  );
}
