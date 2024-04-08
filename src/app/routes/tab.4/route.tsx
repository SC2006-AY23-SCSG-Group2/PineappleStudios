import {LoaderFunctionArgs, json} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import React from "react";
import {commitSession, getSession} from "src/app/session";
import {getUserInfoByUserId} from "src/lib/dataRetrieve/getUserInfo";

import {TagList} from "../_components/TagList";
import {HistoryItemList} from "./components/HistoryItemList";
import {UserProfileCard, userData} from "./components/UserProfileCard";

export async function loader({request}: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("cookie"));

  let userData;
  if (session.data.userId) {
    userData = await getUserInfoByUserId(parseInt(session.data.userId));
  }
  if (!userData || !userData.history) {
    return null;
  }

  return json(
    {
      session: session,
      user: {
        name: userData?.name,
        email: userData?.email,
        time: userData?.timeUsedAppInMins,
        date: userData?.dateJoined,
        numOfLikes: userData?.numberofLikedItem,
        numOfRatings: userData?.numberOfRating,
        preferences: userData?.preference,
        HistoryItems: userData?.history,
      },
    },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    },
  );
}

export default function tab_index(): React.JSX.Element {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const loaderData = useLoaderData<typeof loader>();
  const userData: userData = {
    name: loaderData?.user.name ?? "Name",
    email: loaderData?.user.email ?? "Email",
    date: loaderData?.user.date ?? "Date",
    time: loaderData?.user.time ?? 0,
    numOfLikes: loaderData?.user.numOfLikes ?? 0,
    numOfRatings: loaderData?.user.numOfRatings ?? 0,
  };
  const colors = ["accent", "primary", "secondary"];
  return (
    <>
      <div className="hero min-h-screen">
        {loaderData &&
          loaderData.user.email !== undefined &&
          loaderData.user.email !== null && (
            <div className="hero-content max-lg:m-0 max-lg:flex-col max-md:w-96 lg:m-0 lg:flex-row lg:items-end lg:justify-end">
              <UserProfileCard user={userData} />

              <div className="card self-start bg-base-200 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title mx-2 text-2xl lg:text-3xl">
                    Preferences
                  </h2>

                  <TagList
                    tag={loaderData.user.preferences}
                    colors={colors}
                    buttonType="none"
                  />
                </div>

                <HistoryItemList
                  title="View History"
                  items={loaderData.user.HistoryItems}
                />
              </div>
            </div>
          )}
      </div>
    </>
  );
}
