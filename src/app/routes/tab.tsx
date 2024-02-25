import {Outlet} from "@remix-run/react";
import React from "react";

import BtmNav from "../components/layout/BtmNav";
import TopNav from "../components/layout/TopNav";

export default function tab(): React.JSX.Element {
  return (
    <>
      <TopNav />
      <Outlet />
      <BtmNav />
    </>
  );
}
