import {ActionFunctionArgs, json, redirect} from "@remix-run/node";
import {Form, Link, useActionData, useNavigation} from "@remix-run/react";
import React from "react";

import {createUser} from "../../../lib/database/user";
import {TextField} from "../_components/TextField";

type FormData = {
  name: string;
  email: string;
  password: string;
};

export async function action({request}: ActionFunctionArgs) {
  const formData = await request.formData();
  const data: FormData = {
    name: formData.get("username") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const user = await createUser(data);

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

export default function tab_index(): React.JSX.Element {
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
            <TextField id={"username"} label={"Username"} type={"username"} />

            {actionData ? (
              <p className="form-control">
                <label htmlFor={"wrong-email"} className="label text-error">
                  {actionData?.errors.email}
                </label>
              </p>
            ) : null}

            <TextField id={"email"} label={"Email"} type={"email"} />

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

            <p className="form-control mt-6 mb-3">
              <button
                type={"submit"}
                className="btn btn-primary group-invalid:pointer-events-none group-invalid:opacity-30">
                {navigation.state === "submitting"
                  ? "Signing up..."
                  : "Sign Up"}
              </button>
            </p>
            <p className="text-center">
                Already have an account? <Link className="underline text-blue-700" to="/login">Login</Link>
            </p>
          </fieldset>
        </Form>
      </div>
    </>
  );
}
