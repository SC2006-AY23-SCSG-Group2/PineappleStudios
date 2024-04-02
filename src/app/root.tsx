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

export default function App() {
  return (
    <html lang="en" data-theme="cupcake">
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
