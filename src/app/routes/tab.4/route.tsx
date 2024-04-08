import {LoaderFunctionArgs} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import React from "react";
import {commitSession, getSession} from "src/app/session";
import {getUserInfoByUserId} from "src/lib/dataRetrieve/getUserInfo";
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
    const endTime = new Date(); // Current time
    console.log("StartTime : ", startTime.toLocaleString());
    console.log("endTime : ", endTime.toLocaleString());
    const timeUsed = await calculateUsageTimeInMinutes(startTime, endTime);
    await updateUserTimeUsedInApp(parseInt(session.data.userId), timeUsed);
    // Update the session's startTime to the current time
    session.set("startTime", endTime);
    await commitSession(session);

    console.log(
      "Updated StartTime : ",
      session.data.startTime.toLocaleString(),
    );
  }

  let userData;
  if (session.data.userId) {
    userData = await getUserInfoByUserId(parseInt(session.data.userId));
  }
  if (!userData || !userData.history) {
    return;
  }

  return {
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
    headers: {
      "Set-Cookie": await commitSession(session),
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
        {session.data.userId !== undefined && session.data.userId !== null && (
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
