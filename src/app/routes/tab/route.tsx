import {Outlet} from "@remix-run/react";
import React from "react";

import BtmNav from "./components/BtmNav";
import TopNav from "./components/TopNav";

export default function tab(): React.JSX.Element {
  return (
    <>
      <TopNav activate={"1"} />
      <Outlet />
      <BtmNav />
    </>
  );
}
