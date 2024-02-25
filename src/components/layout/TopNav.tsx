import React from "react";

export default function TopNav({
  activate,
}: {
  activate: string;
}): React.JSX.Element {
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
              <a
                className={activate === "1" ? "btn-active" : ""}
                href={"/tab/1"}>
                Item 1
              </a>
            </li>
            <li>
              <a className={activate === "2" ? "btn-active" : ""} href={"/tab"}>
                Item 2
              </a>
            </li>
            <li>
              <a className={activate === "3" ? "btn-active" : ""} href={"/tab"}>
                Item 3
              </a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {/*<ThemeChanger />*/}
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
    </>
  );
}
