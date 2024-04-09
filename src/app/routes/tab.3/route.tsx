import {
  LoaderFunctionArgs,
  Session,
  TypedResponse,
  json,
  redirect,
} from "@remix-run/node";
import {FetcherWithComponents, useFetcher} from "@remix-run/react";
import React from "react";

import {ItemType} from "../../../lib/interfaces";
import {
  SessionData,
  SessionFlashData,
  commitSession,
  destroySession,
  getSession,
} from "../../session";

interface SimpleSimpleItem {
  srcID: string;
  title: string;
  type: ItemType;
  img: string;
}

interface SearchFormData {
  type: ItemType;
  query: string;
}

export async function action({request}: LoaderFunctionArgs): Promise<
  TypedResponse<{
    success: boolean;
    data: {items: SimpleSimpleItem[]} | undefined;
    error: {msg: string} | undefined;
  }>
> {
  const session: Session<SessionData, SessionFlashData> = await getSession(
    request.headers.get("cookie"),
  );

  if (!session.has("userId") || !session.data.userId) {
    session.flash("error", "User not login");

    return redirect("/login", {
      headers: {
        "Set-Cookie": await destroySession(session),
      },
    });
  }

  if (isNaN(+session.data.userId)) {
    session.flash("error", "User id is not a number");

    return redirect("/login", {
      headers: {
        "Set-Cookie": await destroySession(session),
      },
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const formData = await request.formData();
  const data: SearchFormData = {
    type: +(formData.get("email") as string) as ItemType,
    query: formData.get("query") as string,
  };

  console.log(">>>> type: " + data.type);
  console.log(">>>> query: " + data.query);

  let jsonData: {
    success: boolean;
    data: {items: SimpleSimpleItem[]} | undefined;
    error: {msg: string} | undefined;
  } = {
    success: true,
    data: undefined,
    error: {msg: "Error"},
  };

  if (data.type > 3) {
    jsonData = {
      success: false,
      data: undefined,
      error: {msg: "Error Message"},
    };
  }

  return json(jsonData, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function tab_index(): React.JSX.Element {
  const fetcher: FetcherWithComponents<{
    success: false;
    error: {msg: string};
    // eslint-disable-next-line react-hooks/rules-of-hooks
  }> = useFetcher<{
    success: false;
    error: {msg: string};
  }>({key: "search"});
  fetcher.formAction = "post";

  return (
    <>
      <fetcher.Form
        className={"join mt-2 w-full min-w-full"}
        method={"POST"}
        action={"/tab/3"}>
        <p className="form-control grow">
          <input
            id="query"
            name="query"
            className="input join-item input-bordered input-primary"
            placeholder="Search"
          />
        </p>
        <p className="form-control">
          <select
            id="type"
            name="type"
            defaultValue={ItemType.All}
            className="join-item select select-bordered select-primary">
            <option disabled>Filter</option>
            <option value={ItemType.All} selected={true}>
              All
            </option>
            <option value={ItemType.Book}>Book</option>
            <option value={ItemType.Song}>Music</option>
            <option value={ItemType.Movie}>Movie</option>
          </select>
        </p>
        <p className="form-control">
          <button className="btn btn-accent join-item" type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-7 w-7 opacity-70">
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </p>
      </fetcher.Form>
    </>
  );
}
