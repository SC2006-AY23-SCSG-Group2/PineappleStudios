import {ActionFunctionArgs, json, redirect} from "@remix-run/node";
import {Form, useActionData, useNavigation} from "@remix-run/react";
import React from "react";

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

  console.log(data);

  await new Promise((f) => setTimeout(f, 2000));

  if (data.email === "make_me_login") {
    return redirect("/");
  }

  const errors = {
    email: "wrong name: " + data.email,
    password: "wrong password: " + data.password,
  };

  const value = {
    email: data.email,
    password: data.password,
  };

  return json({
    errors,
    value,
  });
}

export default function Login(): React.JSX.Element {
  // const [formData]: [FormData,
  // React.Dispatch<React.SetStateAction<FormData>>] = useState({ email: "",
  // password: "", });

  const navigation = useNavigation();
  const actionData = useActionData<typeof action>();

  return (
    <>
      <div id={"login-form"}>
        <div className="card w-full shrink-0 bg-base-100 shadow-2xl">
          <Form className="card-body" method={"POST"} action={"/login/spotify"}>
            <fieldset
              className="card-body p-0"
              disabled={navigation.state === "submitting"}>
              <TextField
                id={"spotify-account"}
                label={"Spotify Account"}
                type={"username"}
              />

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
                    className="link-hover link label-text-alt">
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
      </div>
    </>
  );
}
