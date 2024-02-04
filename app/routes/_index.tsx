import type {MetaFunction} from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    {title: "New Remix App"},
    {name: "description", content: "Welcome to Remix!"},
  ];
};

export default function Index() {
  return (
    <div style={{fontFamily: "system-ui, sans-serif", lineHeight: "1.8"}}>
      <h1>Welcome to Remix</h1>
      <button className="mx-4 btn">Button</button>
      <button className="mx-4 btn btn-neutral">Neutral</button>
      <button className="mx-4 btn btn-primary">Primary</button>
      <button className="mx-4 btn btn-secondary">Secondary</button>
      <button className="mx-4 btn btn-accent">Accent</button>
      <button className="mx-4 btn btn-ghost">Ghost</button>
      <button className="mx-4 btn btn-link">Link</button>
    </div>
  );
}
