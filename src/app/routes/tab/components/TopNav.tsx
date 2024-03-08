import {NavLink} from "@remix-run/react";
import React from "react";

export default function TopNav(): React.JSX.Element {
  return (
    <>
      <nav className="sticky top-0 z-40 max-lg:hidden navbar bg-base-100 lg:visible">
        <div className="navbar-start">
          <a href={"/"} className="text-xl btn btn-ghost">
            daisyUI
          </a>
        </div>
        <div className="navbar-center lg:flex">
          <ul className="px-1 menu menu-horizontal">
            <li className="px-2 menu-item">
              <NavLink to={"/tab/1"}>Item 1</NavLink>
            </li>
            <li className="px-2 menu-item">
              <NavLink to={"/tab/2"}>Item 2</NavLink>
            </li>
            <li className="px-2 menu-item">
              <NavLink to={"/tab/3"}>Item 3</NavLink>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <NavLink
            to={"/tab/4"}
            role="button"
            className="btn btn-ghost btn-circle avatar">
            <div className="avatar">
              <div className="w-24 rounded-full">
                <img
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  alt="Avatar"
                />
              </div>
            </div>
          </NavLink>
        </div>
      </nav>
    </>
  );
}
