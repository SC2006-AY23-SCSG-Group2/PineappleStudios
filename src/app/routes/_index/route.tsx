import type {MetaFunction} from "@remix-run/node";

import TestComponent from "../_components/TestComponent";

export const meta: MetaFunction = () => {
  return [
    {title: "New Remix App"},
    {name: "description", content: "Welcome to Remix!"},
  ];
};

export default function Index() {
  return (
    <div style={{fontFamily: "system-ui, sans-serif", lineHeight: "1.8"}}>
      <h1>Welcome to Login</h1>
      <TestComponent />
    </div>
  );
}
