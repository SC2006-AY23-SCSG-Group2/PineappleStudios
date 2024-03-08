import {ActionFunctionArgs, json, redirect} from "@remix-run/node";
import {Form, NavLink, useActionData, useNavigation} from "@remix-run/react";
import React from "react";

import {getUserByEmail} from "../../../lib/database/user";
import {TextField} from "../_components/TextField";

type FormData = {
  email: string;
  password: string;
};

export async function action({request}: ActionFunctionArgs) {
  const formData = await request.formData();
  const data: FormData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const user = await getUserByEmail(data.email);

  let errors = {
    email: "",
    password: "",
  };
  const value = {
    email: data.email,
    password: data.password,
  };

  if (!user) {
    errors = {
      email: "User not found",
      password: "",
    };

    return json({
      errors,
      value,
    });
  }

  if (user.password !== data.password) {
    errors = {
      email: "",
      password: "Wrong password",
    };

    return json({
      errors,
      value,
    });
  }

  return redirect("/tab");
}

export default function Login(): React.JSX.Element {
  const navigation = useNavigation();
  const actionData = useActionData<typeof action>();

  return (
    <>
      <div id={"login-form"}>
        <div className="w-full shrink-0 shadow-2xl card bg-base-100">
          <Form className="card-body" method={"POST"} action={"/login?index"}>
            <fieldset
              className="p-0 card-body"
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
              <p className="mt-6 form-control">
                <button type={"submit"} className="btn btn-primary">
                  {navigation.state === "submitting" ? "Login..." : "Login"}
                </button>
              </p>
            </fieldset>
          </Form>
        </div>
        <div className="divider">OR</div>
        <div className="w-full shrink-0 shadow-2xl card bg-base-100">
          <Form className="card-body">
            <div className="mt-6 form-control">
              <NavLink className="btn btn-primary" to={"/login/spotify"}>
                Login with Spotify
              </NavLink>
            </div>
            <div className="mt-6 form-control">
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
