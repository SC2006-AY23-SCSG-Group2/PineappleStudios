import {LoaderFunctionArgs} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import React from "react";
import {getSession} from "src/app/session";
import {
  calculateUsageTimeInMinutes,
  updateUserTimeUsedInApp,
} from "src/lib/dataRetrieve/handleUserInfo";

import {SimpleItem} from "../../../lib/interfaces";
import {TagList} from "../_components/TagList";
import {HistoryItemList} from "./components/HistoryItemList";
import {UserProfileCard} from "./components/UserProfileCard";

export async function loader({request}: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("cookie"));
  if (session.data.startTime && session.data.userId) {
    const startTime = new Date(session.data.startTime);
    const timeUsed = await calculateUsageTimeInMinutes(startTime);
    session.set("startTime", new Date());
    await updateUserTimeUsedInApp(parseInt(session.data.userId), timeUsed);
  }

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

  return {
    session: session.data,
    user: {
      name: "Unknown_Blaze",
      email: "unknown@e.ntu.edu.sg",
      time: 2,
      date: "March 15, 2024",
      numOfLikes: 107,
      numOfRatings: 26,
      preferences: [
        "Pop",
        "Jazz",
        "Classical",
        "Indie",
        "Movie-related",
        "Indian Classical",
        "Dystopian",
        "Non-fiction",
        "Thriller",
        "Horror",
      ],
      HistoryItems: makeItems(),
    },
  };
}

export default function tab_index(): React.JSX.Element {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {session, user} = useLoaderData<typeof loader>();

  const colors = ["accent", "primary", "secondary"];
  return (
    <>
      <div className="hero min-h-screen">
        {session.userId !== undefined && session.userId !== null && (
          <div className="hero-content max-lg:m-0 max-lg:flex-col max-md:w-96 lg:m-0 lg:flex-row lg:items-end lg:justify-end">
            <UserProfileCard user={user} />

            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h2 className="card-title mx-2 text-2xl lg:text-3xl">
                  Preferences
                </h2>

                <TagList
                  tag={user.preferences}
                  colors={colors}
                  buttonType="none"
                />
              </div>

              <HistoryItemList title="View History" items={user.HistoryItems} />
            </div>
            {/*</div>*/}
          </div>
        )}
      </div>
    </>
  );
}
