import {Outlet} from "@remix-run/react";
import React from "react";

import BtmNav from "../../components/layout/BtmNav";

export default function tab(): React.JSX.Element {
  return (
    <>
      <nav className="navbar sticky top-0 z-40 bg-base-100 max-lg:hidden lg:visible">
        <div className="navbar-start">
          <a href={"/"} className="btn btn-ghost text-xl">
            daisyUI
          </a>
        </div>
        <div className="navbar-center lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a href={"/tab/1"}>Item 1</a>
            </li>
            <li>
              <a href={"/tab"}>Item 1</a>
            </li>
            <li>
              <a href={"/tab"}>Item 1</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <div role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
        </div>
      </nav>

      <Outlet />
      <BtmNav />
    </>
  );
}

// const Favorite: FunctionComponent<{}> = ({contact}) => {
//
//
//   return (
//     <Form method="post">
//       <button
//         aria-label={
//           favorite
//             ? "Remove from favorites"
//             : "Add to favorites"
//         }
//         name="favorite"
//         value={favorite ? "false" : "true"}
//       >
//         {favorite ? "★" : "☆"}
//       </button>
//     </Form>
//   );
// };
