import {LoaderFunctionArgs, json, redirect} from "@remix-run/node";
import {Outlet, useLoaderData} from "@remix-run/react";
import React from "react";

import {commitSession, destroySession, getSession} from "../../session";
import BtmNav from "../_components/BtmNav";
import TopNav from "../_components/TopNav";
import TabTopNav from "./components/TabTopNav";

export async function loader({request}: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("cookie"));

  if (!session.has("userId")) {
    session.flash("error", "User not login");

    return redirect("/login", {
      headers: {
        "Set-Cookie": await destroySession(session),
      },
    });
  }

  // const id = params.id;

  const regex = /https?:\/\/[A-Z|a-z|\.]+:?\d{0,5}\/tab\/(\d).*/gm;

  const m = regex.exec(request.url);
  const type = m ? m.at(1) ?? "" : "";

  let title = "Pineapple Studio";

  switch (type) {
    case "1":
      title = "Library";
      break;
    case "2":
      title = "Browser Online";
      break;
    case "3":
      title = "Search Online";
      break;
    case "4":
      title = "Profile";
      break;
  }
  // const isEditing: boolean = m ? m.at(2) === "editing" : false;

  return json(
    {
      success: true,
      data: {title: title},
      error: {},
    },
    {
      status: 200,
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    },
  );
}

export default function tab(): React.JSX.Element {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const data = useLoaderData<typeof loader>();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const navigate = useNavigate();
  return (
    <>
      <TabTopNav
        title={!data.success ? "Pineapple Studio" : data.data!.title}
        additionalClassName={"lg:hidden"}
      />
      <TopNav />
      <div className="mx-6 lg:mx-12">
        <Outlet />
      </div>
      <BtmNav />
    </>
  );
}
