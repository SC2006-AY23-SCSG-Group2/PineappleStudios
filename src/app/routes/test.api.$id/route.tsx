import {LoaderFunctionArgs, json} from "@remix-run/node";

import {getItemInfo} from "../../../lib/database/functions";

export async function loader({params}: LoaderFunctionArgs) {
  const id: string | undefined = params.id;

  if (!id) {
    return json(
      {
        success: false,
        data: {},
        error: {msg: "no id requested"},
      },
      {status: 400},
    );
  }

  const data = getItemInfo(id);

  return json(
    {
      success: true,
      data: data,
      error: {},
    },
    {status: 200},
  );
}
