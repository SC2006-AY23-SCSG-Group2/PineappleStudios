import {ActionFunctionArgs, json, redirect} from "@remix-run/node";
import {
  Form,
  Link,
  NavLink,
  useActionData,
  useNavigation,
} from "@remix-run/react";
import React from "react";

import {getUserByEmail} from "../../../lib/database/user";
import {TextField} from "../_components/TextField";
//import {action} from "../../../lib/connection/login"

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
        <Form
          className="card w-full shrink-0 bg-base-100 shadow-2xl"
          method={"POST"}
          action={"/login?index"}>
          <fieldset
            className="card-body"
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
                <label htmlFor={"wrong-password"} className="label text-error">
                  {actionData?.errors.password}
                </label>
              </p>
            ) : null}

            <p className="form-control">
              <label htmlFor={"forget-password"} className="label">
                <Link
                  id="forget-password"
                  to="/login/forgot_password"
                  className="link-hover link label-text-alt">
                  Forget password?
                </Link>
              </label>
            </p>
            <p className="form-control mb-3 mt-3">
              <button
                type={"submit"}
                className="btn btn-primary group-invalid:pointer-events-none group-invalid:opacity-30">
                {navigation.state === "submitting" ? "Login..." : "Login"}
              </button>
            </p>
            <p className="text-center">
              Don't have an account?{" "}
              <Link className="underline" to="/login/signup">
                Register
              </Link>
            </p>
          </fieldset>
        </Form>

        <div className="divider">OR</div>
        <div className="card w-full shrink-0 bg-base-100 shadow-2xl">
          <Form className="card-body">
            <div className="form-control mt-6">
              <NavLink className="btn btn-neutral" to="/login/gmail">
                Login with Gmail
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
