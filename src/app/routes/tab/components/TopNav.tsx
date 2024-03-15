import {Link, NavLink} from "@remix-run/react";
import React, {useState} from "react";

export default function TopNav(): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

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
          <div className="dropdown dropdown-end dropdown-hover">
            <div tabIndex={0} role="button" className="m-1">
              <div
                className="avatar btn btn-circle btn-ghost mr-2"
                onMouseEnter={() => setIsOpen(true)}>
                <div className="w-11 rounded-full">
                  <Link to="/tab/4">
                    <img
                      src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                      alt="Avatar"
                    />
                  </Link>
                </div>
              </div>
            </div>
            {isOpen && (
              <ul
                className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
                tabIndex={0}>
                <li>
                  <a href="/tab/4">Account</a>
                </li>
                <li>
                  <a href="/tab/3">Settings</a>
                </li>
                <li>
                  <a href="/login">Logout</a>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
