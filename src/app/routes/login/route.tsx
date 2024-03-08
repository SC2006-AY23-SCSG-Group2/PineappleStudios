import {Outlet} from "@remix-run/react";
import React from "react";

export default function LoginLayout(): React.JSX.Element {
  return (
    <>
      <div
        className="min-h-screen hero bg-base-200"
        // style={{backgroundImage: `url(/images/loginbg.png)`}}
      >
        <div className="flex-col hero-content lg:flex-row-reverse">
          <div
            id={"login-Title"}
            className="mx-7 max-lg:mt-10 text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">A place for your entertainment contents.</p>
          </div>
          <Outlet />
        </div>
      </div>
    </>
  );
}
