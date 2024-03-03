import {LoaderFunctionArgs, json} from "@remix-run/node";
import {Outlet, useLoaderData} from "@remix-run/react";
import React from "react";

import BtmNav from "./components/BtmNav";
import TopNav from "./components/TopNav";

export async function loader({request}: LoaderFunctionArgs) {
  // parse the search params for `?q=`
  const url = new URL(request.url);
  let index = url.href
    .split("/")
    .filter((e) => {
      if (e !== "/") {
        return e;
      }
    })
    .pop();
  if (index === undefined || index === null || index === "tab") {
    index = "1";
  }
  return json({index: index});
}

export default function tab(): React.JSX.Element {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const data = useLoaderData<typeof loader>();
  return (
    <>
      <TopNav activate={data.index} />
      <Outlet />
      <BtmNav activate={data.index} />
    </>
  );
}
