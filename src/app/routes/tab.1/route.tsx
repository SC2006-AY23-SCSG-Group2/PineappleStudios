import React from "react";
import { TagList } from "../_components/TagList";
import { useLoaderData } from "@remix-run/react";
import { ViewItems } from "../_components/ViewItems";

export const loader = async () => {
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
      favorites: [
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

  return (
    
    <>
      <ViewItems title="Favourites" items={user.favorites} />
    </>
  );
}
