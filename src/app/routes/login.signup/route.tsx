import {ActionFunctionArgs, json, redirect} from "@remix-run/node";
import {Form, Link, useActionData, useNavigation} from "@remix-run/react";
import React from "react";

import {createUser, getUserByEmail} from "../../../lib/database/user";
import {TextField} from "../_components/TextField";

//import {action} from "../../../lib/connection/signup"

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

  const errors: {[key: string]: string} = {};

  if (!data.name) {
    errors.name = "Invalid Name";
  }

  if (!data.email) {
    errors.email = "Invalid Email";
  }

  if (!data.password) {
    errors.password = "Invalid Password";
  }

  if (Object.keys(errors).length > 0) {
    return json({errors, value: data});
  }

  const user = await getUserByEmail(data.email);

  if (user) {
    errors.email = "You already have an account";
    return json({errors, value: data});
  }

  await createUser(data);
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
          action={"/login/signup"}>
          <fieldset
            className="card-body"
            disabled={navigation.state === "submitting"}>
            <TextField id={"username"} label={"Username"} type={"username"} />

            {actionData ? (
              <p className="form-control">
                <label htmlFor={"wrong-email"} className="label text-error">
                  {actionData?.errors.name}
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

            <p className="form-control mb-3 mt-6">
              <button
                type={"submit"}
                className="btn btn-primary group-invalid:pointer-events-none group-invalid:opacity-30">
                {navigation.state === "submitting"
                  ? "Signing up..."
                  : "Sign Up"}
              </button>
            </p>
            <p className="text-center">
              Already have an account?{" "}
              <Link className="text-blue-700 underline" to="/login">
                Login
              </Link>
            </p>
          </fieldset>
        </Form>
      </div>
    </>
  );
}
