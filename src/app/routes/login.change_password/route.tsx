import {ActionFunctionArgs, json, redirect} from "@remix-run/node";
import {Form, useActionData, useNavigation} from "@remix-run/react";
import React from "react";

import {getUserByEmail, updatePassword} from "../../../lib/database/user";
import {TextField} from "../_components/TextField";

//import {email} from "../login.otp"

//import {email} from "../login.otp"

type FormData = {
  password: string;
  confirm_password: string;
};

export async function action({request}: ActionFunctionArgs) {
  const formData = await request.formData();
  const data: FormData = {
    password: formData.get("password") as string,
    confirm_password: formData.get("confirm_password") as string,
  };

  const errors: {[key: string]: string} = {};

  if (!data.password) {
    errors.password = "Invalid Password: Password cannot be empty";
  }

  if (data.confirm_password != data.password) {
    errors.confirm_password = "Passwords Mismatch";
  }

  if (Object.keys(errors).length > 0) {
    return json({errors, value: data});
  }
  const email = "john@gmail.com";
  const user = await getUserByEmail(email);
  await updatePassword(email, data.password);
  return redirect("/login");
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
          action={"/login/change_password"}>
          <fieldset
            className="card-body"
            disabled={navigation.state === "submitting"}>
            <TextField
              id={"password"}
              label={"New Password"}
              type={"password"}
            />

            {actionData ? (
              <p className="form-control">
                <label htmlFor={"wrong-email"} className="label text-error">
                  {actionData?.errors.password}
                </label>
              </p>
            ) : null}

            <TextField
              id={"confirm_password"}
              label={"Confirm Password"}
              type={"password"}
            />

            {actionData ? (
              <p className="form-control">
                <label htmlFor={"wrong-password"} className="label text-error">
                  {actionData?.errors.confirm_password}
                </label>
              </p>
            ) : null}

            <p className="form-control mb-3 mt-6">
              <button
                type={"submit"}
                className="btn btn-primary group-invalid:pointer-events-none group-invalid:opacity-30">
                {navigation.state === "submitting"
                  ? "Resetting up..."
                  : "Reset Password"}
              </button>
            </p>
          </fieldset>
        </Form>
      </div>
    </>
  );
}
