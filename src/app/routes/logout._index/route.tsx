import {ActionFunctionArgs, redirect} from "@remix-run/node";
import {destroySession, getSession} from "src/app/session";

export const action = async ({request}: ActionFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  await destroySession(session);
  return redirect("/login", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};

export default function LogoutPage() {
  return redirect("/login");
}
