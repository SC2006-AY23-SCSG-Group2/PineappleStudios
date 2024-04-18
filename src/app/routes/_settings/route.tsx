import {LoaderFunctionArgs, Session, json, redirect} from "@remix-run/node";
import {Outlet, useLoaderData} from "@remix-run/react";
import React from "react";

import {getUserInfoByUserId} from "../../../lib/dataRetrieve/getUserInfo";
import {
  SessionData,
  SessionFlashData,
  commitSession,
  destroySession,
  getSession,
} from "../../session";
import BtmNav from "../_components/BtmNav";
import TopNav from "../tab/components/TopNav";

export async function loader({request}: LoaderFunctionArgs) {
  const session: Session<SessionData, SessionFlashData> = await getSession(
    request.headers.get("cookie"),
  );

  if (!session.has("userId")) {
    session.flash("error", "User not login");

    return redirect("/login", {
      headers: {
        "Set-Cookie": await destroySession(session),
      },
    });
  }

  let userData;
  if (session.data.userId) {
    userData = await getUserInfoByUserId(parseInt(session.data.userId));
  }
  if (!userData || !userData.history) {
    return json(
      {
        success: false,
        email: null,
        error: {msg: "User Information cannot load."},
      },
      {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      },
    );
  }

  const email = userData.email;

  return json(
    {
      success: true,
      email: email,
      error: undefined,
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
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <TopNav
        email={
          data.success && data && data.email ? data.email : "Pineapple User"
        }
      />
      <Outlet />
      <BtmNav />
    </>
  );
}
