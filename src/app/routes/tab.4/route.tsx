import {useLoaderData} from "@remix-run/react";
import React from "react";

import Preference from "./components/Preference";

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
    },
  };
};

export default function tab_index(): React.JSX.Element {
  const {user} = useLoaderData<typeof loader>();

  const colors = ["success", "warning", "error"]; // Define an array of colors

  return (
    <div className="flex justify-between">
      <div className="card m-4 w-1/3 min-w-0 bg-base-100 shadow-xl">
        <div className="avatar">
          <div className="w-36 rounded-full">
            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
          <h2 className="card-title mx-14 block pt-7 text-2xl">
            {user.name}
            <span className="mt-2 block text-xl">{user.email}</span>
          </h2>
        </div>
        <div className="card-body">
          <div className="stats stats-vertical shadow">
            <div className="stat">
              <div className="stat-title">Date Joined</div>
              <div className="stat-value">{user.date}</div>
            </div>
            <div className="stat">
              <div className="stat-title">Time Used</div>
              <div className="stat-value">{user.time} hours</div>
            </div>
            <div className="stat">
              <div className="stat-title">Liked items</div>
              <div className="stat-value">{user.numOfLikes}</div>
            </div>
            <div className="stat">
              <div className="stat-title">Ratings Given</div>
              <div className="stat-value">{user.numOfRatings}</div>
            </div>
          </div>
          <div className="card-actions justify-end">
            <button className="btn btn-secondary my-2">Edit Profile</button>
          </div>
        </div>
      </div>

      <div className="flex h-1/2 w-7/12 min-w-0 flex-col shadow-xl">
        <div className="card mb-4 bg-gray-200">
          <div className="card-body">
            <div className="flex flex-row">
              <h2 className="card-title mx-2 text-3xl">Preferences</h2>
              <button>
                <svg
                  viewBox="0 0 1024 1024"
                  fill="currentColor"
                  height="1.15em"
                  width="1.15em"
                  className="hover:scale-90">
                  <path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z" />
                </svg>
              </button>
            </div>
            <div className="flex flex-row flex-wrap overflow-x-auto">
              {user.preferences.map((category, i) => (
                <React.Fragment key={i}>
                  {category.values.map((value, j) => (
                    <Preference key={`${i}-${j}`} color={colors[i]}>
                      {value}
                    </Preference>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="card bg-gray-200">
          <div className="card-body">
            <div className="flex flex-row">
              <h2 className="card-title mx-2 text-2xl">View History</h2>
            </div>
            <div className="my-4 flex flex-row flex-wrap overflow-x-auto">
              {Array.from({length: 10}).map((_, index) => (
                <div key={index} className="avatar flex flex-col">
                  <div className="mx-12 w-32 rounded">
                    <img src="https://m.media-amazon.com/images/I/71EodKggiQL.png" />
                  </div>
                  <div className="h-8 text-center">Too lazy to loop this</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
