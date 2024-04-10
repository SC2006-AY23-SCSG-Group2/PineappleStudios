// import {
//   ActionFunctionArgs,
//   LoaderFunctionArgs,
//   json,
//   redirect,
// } from "@remix-run/node";
// import {
//   Form,
//   useActionData,
//   useLoaderData,
//   useNavigation,
// } from "@remix-run/react";
//
// import {get_spotify_login_url} from "./spofityUrl.server";
//
// /// NOTE:
// /// TODO:
// /// 1. Spotify Authorization code found --> login the user(create session id
// // --> redirect to home page) / 2. using Authorization code to request email
// / //  2.1 email not found /       2.1.1 let the user sign up(pre-fill
// default // username and email get from spotify) /   2.2 email found /
// return // error. --> error(EASY)? or additional functions? /       2.2.1 ask
// the user // to login using email and password, and link two accounts / //
// (forget password ... renew ... login ... link, not issue for this) / //
// 2.2.2 user do not want to link /         2.2.2.1 create a user account using
// // a fake email(ramdon_string@fake.email.fake). EASYY  type FormData = {
// email: string; password: string; };  export async function loader({request}:
// LoaderFunctionArgs) { return json({spotify_login_url:
// get_spotify_login_url(request.url)}); }  export async function action({request}: ActionFunctionArgs) { const formData = await request.formData(); const data: FormData = { email: formData.get("email") as string, password: formData.get("password") as string, };  console.log(data);  await new Promise((f) => setTimeout(f, 2000));  if (data.email === "make_me_login") { return redirect("/"); }  const errors = { email: "wrong name: " + data.email, password: "wrong password: " + data.password, };  const value = { email: data.email, password: data.password, };  return json({ errors, value, }); }  export default function Login(): React.JSX.Element { // const [formData]: [FormData, // React.Dispatch<React.SetStateAction<FormData>>] = useState({ email: "", // password: "", });  const navigation = useNavigation(); const actionData = useActionData<typeof action>(); const data = useLoaderData<typeof loader>();  return ( <> <div id={"login-form"}> <div className="card w-full shrink-0 bg-base-100 shadow-2xl"> <Form className="card-body" method={"POST"} action={"/login/spotify"}> <fieldset className="card-body p-0" disabled={navigation.state === "submitting"}> <p className="form-control"> <label htmlFor={"wrong-email"} className="label"> {data?.spotify_login_url} </label> </p>  <p className="form-control"> <label htmlFor={"wrong-email"} className="label"> {actionData?.value.email} </label> </p>  <p className="form-control mt-6"> <button type={"submit"} className="btn btn-primary"> {navigation.state === "submitting" ? "Login..." : "Login"} </button> </p> </fieldset> </Form> </div> </div> </> ); }
