import {ActionFunctionArgs, json, redirect} from "@remix-run/node";
import {Form, useActionData, useNavigation} from "@remix-run/react";
import React, {useEffect, useState} from "react";

import {TextField} from "../../components/textField";

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

export default function Login() {
  const [formData]: [FormData, React.Dispatch<React.SetStateAction<FormData>>] =
    useState({
      email: "",
      password: "",
    });

  const navigation = useNavigation();
  const actionData = useActionData<typeof action>();

  useEffect(() => {
    console.log(useActionData);
  }, [actionData]);

  return (
    <>
      <div
        className="hero min-h-screen bg-base-200"
        // style={{backgroundImage: `url(/images/loginbg.png)`}}
      >
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div
            id={"login-Title"}
            className=" text-center max-lg:mt-10 lg:text-left mx-7">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">A place for your entertainment contents.</p>
          </div>
          <div id={"login-form"}>
            <div className="card shrink-0 w-full shadow-2xl bg-base-100">
              <Form className="card-body" method={"POST"}>
                <fieldset
                  className="card-body p-0"
                  disabled={navigation.state === "submitting"}>
                  <TextField
                    id={"email"}
                    label={"Email"}
                    value={formData.email}
                  />

                  {actionData ? (
                    <p className="form-control">
                      <label
                        htmlFor={"wrong-email"}
                        className="label text-error">
                        {actionData?.errors.email}
                      </label>
                    </p>
                  ) : null}

                  <TextField
                    id={"password"}
                    label={"Password"}
                    value={formData.password}
                  />

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
                  <button className="btn btn-primary">
                    Login with Spotify
                  </button>
                </div>
                <div className="form-control mt-6">
                  <button className="btn disabled btn-primary">
                    Login with Microsoft
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
