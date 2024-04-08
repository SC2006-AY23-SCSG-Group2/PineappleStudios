import {Link, NavLink} from "@remix-run/react";
import React, {useState} from "react";

import {useTheme} from "../_utils/theme-provider";
import Logout from "./Logout";
import Pineapple from "./Pineapple";

// function Logout(): React.JSX.Element {

// function Logout(): React.JSX.Element {

// function Logout(): React.JSX.Element {
//   return (
//     <>
//       <p>Are you sure you want to log out?</p>
//       <Form method="post">
//         <button type = "submit">Logout</button>
//       </Form>
//         <button><Link to="/tab/1">Never mind</Link></button>
//     </>
//   );
// }

function ThemeToggle() {
  const {theme, toggleTheme} = useTheme();

  // Assuming dark mode is 'dark' and light mode is 'light'
  const isDarkMode = theme === "dark";

  return (
    <label className="swap swap-rotate mr-10">
      <input
        type="checkbox"
        checked={!isDarkMode}
        onChange={toggleTheme}
        className="hidden"
      />

      {/* sun icon */}
      <svg
        className="swap-off h-6 w-6 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24">
        {/* Sun SVG path */}
        <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
      </svg>

      {/* moon icon */}
      <svg
        className="swap-on h-6 w-6 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24">
        {/* Moon SVG path */}
        <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
      </svg>
    </label>
  );
}

export default function TopNav(): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  // const action = async ({request}: ActionFunctionArgs) => {
  //   const session = await getSession(
  //     request.headers.get("Cookie")
  //   );
  //   return redirect("/login", {
  //     headers: {
  //       "Set-Cookie": await destroySession(session),
  //     },
  //   });
  // };
  const {toggleTheme} = useTheme();
  return (
    <>
      <nav className="navbar sticky top-0 z-40 bg-base-100 max-lg:hidden lg:visible">
        <div className="navbar-start">
          <a href={"/tab/1"} className="btn btn-ghost text-xl">
            <Pineapple />
            Studios
          </a>
        </div>
        <div className="navbar-center lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li className="menu-item px-4 ">
              <NavLink to={"/tab/1"}>Home</NavLink>
            </li>
            <li className="menu-item px-4">
              <NavLink to={"/tab/2"}>Browser</NavLink>
            </li>
            <li className="menu-item px-4">
              <NavLink to={"/tab/3"}>Library</NavLink>
            </li>
          </ul>
        </div>

        <div className="navbar-end">
          <ThemeToggle />
          <div className="dropdown dropdown-end dropdown-hover">
            <div tabIndex={0} role="button" className="m-1">
              <div
                className="avatar btn btn-circle btn-ghost mr-2"
                onMouseEnter={() => setIsOpen(true)}
                onClick={() => setIsOpen(false)}>
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
                  <a href="/settings/general">Settings</a>
                </li>
                <li>
                  <Logout />
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
