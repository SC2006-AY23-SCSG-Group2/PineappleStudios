import {LoaderFunctionArgs, json} from "@remix-run/node";

import {getItemInfo} from "../../../lib/database/functions";

export async function loader({params}: LoaderFunctionArgs) {
  const id: string | undefined = params.id;

  if (!id) {
    json({
      success: false,
      data: {},
      error: {msg: "no id requested"},
    });
    return null;
  }
  const data = getItemInfo(id);

  console.log({
    success: true,
    data: data,
    error: {},
  });
  return null;
}
