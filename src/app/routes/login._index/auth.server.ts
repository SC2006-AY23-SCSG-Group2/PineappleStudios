// import {ActionFunctionArgs, json, redirect} from "@remix-run/node";
//
// import {getUserByEmail} from "../../lib/database/user";
//
// type FormData = {
//   email: string;
//   password: string;
// };
//
// export async function action({request}: ActionFunctionArgs) {
//   const formData = await request.formData();
//   const data: FormData = {
//     email: formData.get("email") as string,
//     password: formData.get("password") as string,
//   };
//
//   const user = await getUserByEmail(data.email);
//   let errors = {
//     email: "",
//     password: "",
//   };
//   const value = {
//     email: data.email,
//     password: data.password,
//   };
//
//   if (user) {
//     if (user.password === data.password) {
//       return redirect("/tab");
//     } else {
//       // Incorrect password, show only wrong password error
//       errors = {
//         email: "",
//         password: "Wrong password",
//       };
//
//       return json({
//         errors,
//         value,
//       });
//     }
//   } else {
//     errors = {
//       email: "User not found",
//       password: "",
//     };
//
//     return json({
//       errors,
//       value,
//     });
//   }
// }
