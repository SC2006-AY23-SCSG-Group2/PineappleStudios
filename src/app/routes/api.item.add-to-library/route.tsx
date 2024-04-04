import {LoaderFunctionArgs, redirect} from "@remix-run/node";

import {getSession} from "../../session";

export async function action({request}: LoaderFunctionArgs) {
  let formData = await request.formData();
  const data = {
    id: formData.get("id") as string,
  };
  console.log(data.id);
  const session = await getSession();
  session.get("userId");

  return redirect("/library/item/" + data.id);
}
