import {ActionFunctionArgs} from "@remix-run/node";
import {Form, useNavigation} from "@remix-run/react";
import React from "react";

import {TextField} from "../_components/TextField";
import LibraryTopNav from "../library/components/LibraryTopNav";

export async function action({request}: ActionFunctionArgs) {
  const formData = await request.formData();
  console.log(formData.get("Name"));
  return null;
}

export default function LibraryItem(): React.JSX.Element {
  const navigation = useNavigation();

  return (
    <>
      <p>aaaa</p>
      <Form method={"POST"} action={"/library/item"}>
        <fieldset
          className="card-body p-0"
          disabled={navigation.state === "submitting"}>
          <LibraryTopNav
            leftSection={[
              <>
                <button type={"submit"} className={"btn btn-square"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </>,
            ]}
          />

          <TextField id={"Name"} label={"name"} />
        </fieldset>
      </Form>
      <p>aaaa</p>
    </>
  );
}
