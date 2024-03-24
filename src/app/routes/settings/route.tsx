import {Outlet} from "@remix-run/react";
import React from "react";

import BtmNav from "../_components/BtmNav";
import TopNav from "../_components/TopNav";

export default function tab_index(): React.JSX.Element {
  return (
    <>
      <TopNav />
      <Outlet />
      <BtmNav />
    </>
  );
}
