import {useLoaderData} from "@remix-run/react";
import React from "react";

import {TagList} from "../_components/TagList";
import {ViewItems} from "../_components/ViewItems";
import UserProfileCard from "./components/UserProfileCard";
import { getSession } from "src/app/session";
import { LoaderFunctionArgs } from "@remix-run/node";

export const loader = async ({request} : LoaderFunctionArgs) => {

  let session = await getSession(request.headers.get("cookie"));

  return {
    session : session.data,
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
          showHeart: true
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
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {session, user} = useLoaderData<typeof loader>();

  const colors = ["neutral", "primary", "secondary"];
  return (
    <>
      
      <div className="hero min-h-screen bg-base-200 ">
        {session.isUser && ( 
        <div className="hero-content max-lg:m-12 max-lg:flex-col lg:m-0 lg:flex-row lg:items-end lg:justify-end">
          <UserProfileCard user={user} />
          <div className="flex min-w-0 flex-col shadow-xl max-lg:w-full lg:w-7/12">
            <div className="card mb-4 bg-gray-200">
              <div className="card-body">
                <h2 className="card-title mx-2 text-3xl">Preferences</h2>
                <div className="flex flex-row flex-wrap justify-around overflow-x-auto">
                  <TagList
                    tag={user.preferences}
                    colors={colors}
                    buttonType="none"
                  />
                </div>
              </div>
            </div>
            <ViewItems title="View History" items={user.HistoryItems}/>
          </div>
        </div>
        )}
      </div>
    </>
  );
}
