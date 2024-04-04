import {LoaderFunctionArgs, TypedResponse, json} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import React from "react";

import {getItemInfo} from "../../../lib/database/functions";
import {ItemInfo} from "../../../lib/interfaces";

export function loader({params}: LoaderFunctionArgs): TypedResponse<{
  success: boolean;
  data: ItemInfo | undefined;
  error: {msg: string} | undefined;
}> {
  const id = params.id;
  if (!id) {
    return json({
      success: false,
      data: undefined,
      error: {msg: "unknown url requested"},
    });
  }

  let itemInfo: ItemInfo | undefined = getItemInfo(id);

  let jsonData: {
    success: boolean;
    data: ItemInfo | undefined;
    error: {msg: string} | undefined;
  } = {
    success: true,
    data: itemInfo,
    error: undefined,
  };

  return json(jsonData);
}

export default function tab_index(): React.JSX.Element {
  const loaderData = useLoaderData<typeof loader>();

  if (!loaderData.success) {
    return (
      <>
        <h1 className={"text-error"}>{loaderData.error?.msg}</h1>
      </>
    );
  }

  if (!loaderData.data) {
    return (
      <>
        <h1 className={"text-error"}>Error Data Not Found</h1>
      </>
    );
  }

  let data: ItemInfo = loaderData.data;

  return (
    <>
      <p>{data.toString()}</p>
    </>
  );
}
