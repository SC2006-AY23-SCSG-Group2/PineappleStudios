import {cssBundleHref} from "@remix-run/css-bundle";
import {LinksFunction, LoaderFunctionArgs, json} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import {
  calculateUsageTimeInMinutes,
  updateUserTimeUsedInApp,
} from "../lib/dataRetrieve/handleUserInfo";
import {ThemeProvider, useTheme} from "./routes/_utils/theme-provider";
import {commitSession, getSession} from "./session";
import styles from "./tailwind.css";

export const links: LinksFunction = () => [
  ...(cssBundleHref
    ? [
        {
          rel: "stylesheet",
          href: cssBundleHref,
        },
      ]
    : [
        {
          rel: "stylesheet",
          href: styles,
        },
      ]),
];

export async function loader({request}: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get("cookie"));
  if (session.data.startTime && session.data.userId) {
    const startTime = new Date(session.data.startTime);
    const endTime = new Date(); // Current time
    const timeUsed = await calculateUsageTimeInMinutes(startTime, endTime);
    await updateUserTimeUsedInApp(parseInt(session.data.userId), timeUsed);
    session.set("startTime", endTime);
  }

  return json("", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

function App() {
  const {theme} = useTheme();
  return (
    <html lang="en" data-theme={theme}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <title></title>
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function Root() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}
