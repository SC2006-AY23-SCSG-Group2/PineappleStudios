import {Outlet} from "@remix-run/react";
import React from "react";

export default function tab(): React.JSX.Element {
  return (
    <>
      {/*<TopNav />*/}
      <Outlet />
    </>
  );
}
