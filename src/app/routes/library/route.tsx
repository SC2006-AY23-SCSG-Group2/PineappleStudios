import {LoaderFunctionArgs, json} from "@remix-run/node";
import {Outlet, useLoaderData, useNavigate} from "@remix-run/react";
import React from "react";

import LibraryTopNav from "./components/LibraryTopNav";

export function loader({params, request}: LoaderFunctionArgs) {
  const id = params.id;

  const regex = new RegExp(
    "^https?:\\/\\/[a-zA-z\\-0-9.]+:?\\d{0,5}\\/library\\/(folder|item)\\/(e?d?i?t?i?n?g?)\\/?\\d+$",
    "gm",
  );

  const m = regex.exec(request.url);
  const type = m ? m.at(1) ?? "" : "";

  const isEditing: boolean = m ? m.at(2) === "editing" : false;

  console.log(`Found match, group ${type}`);

  if (!type) {
    return json({
      success: false,
      data: {},
      error: {context: "unknown url requested"},
    });
  }

  let title: string = "";

  if (type === "folder") {
    title = "Folder " + id;
  } else if (type === "item") {
    title = "Item " + id;
  }

  if (isEditing) {
    title = title + " Editing";
  }

  return json({
    success: true,
    data: {title: title},
    error: {},
  });
}

export default function tab(): React.JSX.Element {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const data = useLoaderData<typeof loader>();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
  return (
    <>
      <LibraryTopNav
        leftSection={[
          <>
            <button
              className="btn btn-circle lg:hidden"
              onClick={() => {
                navigate(-1);
              }}>
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
                  d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"
                />
              </svg>
            </button>

            <button
              className="btn max-lg:hidden lg:visible"
              onClick={() => {
                navigate(-1);
              }}>
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
                  d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"
                />
              </svg>
              Back
            </button>
          </>,
        ]}
        title={
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          !data.success ? "Pineapple Studio" : data.data!.title
        }
      />
      <Outlet />
    </>
  );
}
