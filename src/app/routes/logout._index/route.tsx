import {LoaderFunctionArgs, redirect} from "@remix-run/node";
import {destroySession, getSession} from "src/app/session";

export async function loader({request}: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  await destroySession(session);
  return redirect("/login", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}
