import {Form, NavLink, useActionData, useNavigation} from "@remix-run/react";
import React from "react";

import {TextField} from "../components/TextField";
import {action} from "./login._index.server";

export default function Login(): React.JSX.Element {
  const navigation = useNavigation();
  const actionData = useActionData<typeof action>();

  return (
    <>
      <div id={"login-form"}>
        <div className="card shrink-0 w-full shadow-2xl bg-base-100">
          <Form className="card-body" method={"POST"} action={"/login?index"}>
            <fieldset
              className="card-body p-0"
              disabled={navigation.state === "submitting"}>
              <TextField id={"email"} label={"Email"} type={"username"} />

              {actionData ? (
                <p className="form-control">
                  <label htmlFor={"wrong-email"} className="label text-error">
                    {actionData?.errors.email}
                  </label>
                </p>
              ) : null}

              <TextField id={"password"} label={"Password"} type={"password"} />

              {actionData ? (
                <p className="form-control">
                  <label
                    htmlFor={"wrong-password"}
                    className="label text-error">
                    {actionData?.errors.password}
                  </label>
                </p>
              ) : null}

              <p className="form-control">
                <label htmlFor={"forget-password"} className="label">
                  <a
                    id="forget-password"
                    href="/login/forgot-password"
                    className="label-text-alt link link-hover">
                    forget password?
                  </a>
                </label>
              </p>
              <p className="form-control mt-6">
                <button type={"submit"} className="btn btn-primary">
                  {navigation.state === "submitting" ? "Login..." : "Login"}
                </button>
              </p>
            </fieldset>
          </Form>
        </div>
        <div className="divider">OR</div>
        <div className="card shrink-0 w-full shadow-2xl bg-base-100">
          <Form className="card-body">
            <div className="form-control mt-6">
              <NavLink className="btn btn-primary" to={"/login/spotify"}>
                Login with Spotify
              </NavLink>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-disabled btn-primary">
                Login with Microsoft
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
