import {useLoaderData} from "@remix-run/react";
import React from "react";

import {TagList} from "../_components/TagList";
import {ViewItems} from "../_components/ViewItems";
import UserProfileCard from "./components/UserProfileCard";

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
      HistoryItems: [
        {
          imageSrc: "https://m.media-amazon.com/images/I/71EodKggiQL.png",
          placeholder: "Item",
        },
        {
          imageSrc: "https://m.media-amazon.com/images/I/71EodKggiQL.png",
          placeholder: "Item",
        },
        {
          imageSrc: "https://m.media-amazon.com/images/I/71EodKggiQL.png",
          placeholder: "Item",
        },
        {
          imageSrc: "https://m.media-amazon.com/images/I/71EodKggiQL.png",
          placeholder: "Item",
        },
        {
          imageSrc: "https://m.media-amazon.com/images/I/71EodKggiQL.png",
          placeholder: "Item",
        },
        {
          imageSrc: "https://m.media-amazon.com/images/I/71EodKggiQL.png",
          placeholder: "Item",
        },
        {
          imageSrc: "https://m.media-amazon.com/images/I/71EodKggiQL.png",
          placeholder: "Item",
        },
        {
          imageSrc: "https://m.media-amazon.com/images/I/71EodKggiQL.png",
          placeholder: "Item",
        },
        {
          imageSrc: "https://m.media-amazon.com/images/I/71EodKggiQL.png",
          placeholder: "Item",
        },
        {
          imageSrc: "https://m.media-amazon.com/images/I/71EodKggiQL.png",
          placeholder: "Item",
        },
        {
          imageSrc: "https://m.media-amazon.com/images/I/71EodKggiQL.png",
          placeholder: "Item",
        },
      ],
    },
  };
};

export default function tab_index(): React.JSX.Element {
  const {user} = useLoaderData<typeof loader>();

  const colors = ["success", "warning", "error"]; // Define an array of colors

  return (
    <div className="flex justify-between bg-base-200">
      <UserProfileCard user={user} />
      <div className="flex h-1/2 w-7/12 min-w-0 flex-col shadow-xl">
        <div className="card mb-4 bg-gray-200">
          <div className="card-body">
            <h2 className="card-title mx-2 text-3xl">Preferences</h2>
            <div className="flex flex-row flex-wrap overflow-x-auto">
              <TagList
                tag={user.preferences}
                colors={colors}
                buttonType="close"
              />
            </div>
          </div>
        </div>
        <ViewItems title="View History" items={user.HistoryItems} />
      </div>
    </div>
  );
}
