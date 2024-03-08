import React from "react";

interface TopNavProps {
  leftSection?: [React.JSX.Element];
  rightSection?: [React.JSX.Element];
}

export default function TopNav({
  leftSection,
  rightSection,
}: TopNavProps): React.JSX.Element {
  return (
    <>
      <nav className="absolute top-0 z-40 navbar bg-base-100">
        <div className="navbar-start">
          {leftSection === undefined
            ? null
            : leftSection.map((e: React.JSX.Element) => e)}
          {/*<NavLink to={"/library"} role="button" className="btn btn-square">*/}
          {/*  <svg*/}
          {/*    xmlns="http://www.w3.org/2000/svg"*/}
          {/*    className="h-6 w-6"*/}
          {/*    fill="none"*/}
          {/*    viewBox="0 0 24 24"*/}
          {/*    stroke="currentColor">*/}
          {/*    <path*/}
          {/*      strokeLinecap="round"*/}
          {/*      strokeLinejoin="round"*/}
          {/*      strokeWidth="2"*/}
          {/*      d="M6 18L18 6M6 6l12 12"*/}
          {/*    />*/}
          {/*  </svg>*/}
          {/*</NavLink>*/}
        </div>
        <div className="navbar-center lg:flex">
          <a href={"/"} className="text-xl btn btn-ghost">
            daisyUI
          </a>
        </div>
        <div className="navbar-end">
          {rightSection === undefined
            ? null
            : rightSection.map((e: React.JSX.Element) => e)}
          {/*<NavLink*/}
          {/*  to={"/library/item/editing"}*/}
          {/*  role="button"*/}
          {/*  className="btn btn-square">*/}
          {/*  <svg*/}
          {/*    xmlns="http://www.w3.org/2000/svg"*/}
          {/*    className="h-6 w-6"*/}
          {/*    fill="none"*/}
          {/*    viewBox="0 0 24 24"*/}
          {/*    stroke="currentColor">*/}
          {/*    <path*/}
          {/*      strokeLinecap="round"*/}
          {/*      strokeLinejoin="round"*/}
          {/*      strokeWidth="2"*/}
          {/*      d="M6 18L18 6M6 6l12 12"*/}
          {/*    />*/}
          {/*  </svg>*/}
          {/*</NavLink>*/}
        </div>
      </nav>
    </>
  );
}
