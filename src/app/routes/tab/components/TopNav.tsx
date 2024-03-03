import {NavLink} from "@remix-run/react";
import React from "react";

export default function TopNav(): React.JSX.Element {
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
            <li className="menu-item px-2">
              <NavLink to={"/tab/1"}>Item 1</NavLink>
            </li>
            <li className="menu-item px-2">
              <NavLink to={"/tab/2"}>Item 2</NavLink>
            </li>
            <li className="menu-item px-2">
              <NavLink to={"/tab/3"}>Item 3</NavLink>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {/*<ThemeChanger />*/}
          <NavLink
            to={"/tab/4"}
            role="button"
            className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </NavLink>
        </div>
      </nav>
    </>
  );
}
