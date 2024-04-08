import {cssBundleHref} from "@remix-run/css-bundle";
import {LinksFunction} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import styles from "./tailwind.css";
import { ThemeProvider, useTheme } from "./routes/utils/theme-provider";

// export const links: LinksFunction = ()
// => [{rel: "stylesheet", href:

// export const links: LinksFunction = () => [{rel: "stylesheet", href:
// styles}];

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