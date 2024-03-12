// import {Link} from "@remix-run/react";
// import {ChangeEvent, useState} from "react";
// import {Layout} from "src/_components/layoutlogin";
//
// import {TextField} from "../../_components/textField";
//
// export default function Signup() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//
//   // Updates the form data when an input changes
//   const handleInputChange = (
//     event: ChangeEvent<HTMLInputElement>,
//     field: string,
//   ) => {
//     const {name, value} = event.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//     }));
//   };
//
//   return (
//     <Layout>
//       <div className="ml-20 flex h-full items-center justify-start">
//         <div className="flex flex-col gap-y-5">
//           <form method="POST" className="w-96 rounded-2xl bg-black p-6">
//             <h2 className="mb-5 text-3xl font-extrabold text-white">
//               Create an account
//             </h2>
//             <TextField
//               htmlFor="name"
//               type="name"
//               label="Name"
//               value={formData.name}
//               onChange={(e) => handleInputChange(e, "name")}
//             />
//             <TextField
//               htmlFor="email"
//               label="Email"
//               value={formData.email}
//               onChange={(e) => handleInputChange(e, "email")}
//             />
//             <TextField
//               htmlFor="password"
//               type="password"
//               label="Password"
//               value={formData.password}
//               onChange={(e) => handleInputChange(e, "password")}
//             />
//             <div className="mt-5 w-full text-center">
//               {/* Comment out the link to stuff here when actually coding authentication */}
//               <Link to="/">
//                 <button
//                   type="submit"
//                   name="_action"
//                   value="Sign In"
//                   className="mt-2 w-full rounded-xl bg-red-500 px-3 py-2 font-semibold text-black transition duration-300 ease-in-out hover:bg-red-600">
//                   Create an account
//                 </button>
//               </Link>
//             </div>
//             <p className="mt-4 flex justify-center text-lg font-semibold text-white">
//               Already have an account?&nbsp;&nbsp;
//               <Link
//                 to="/login"
//                 className="text-lg font-semibold text-red-500 underline hover:text-red-700">
//                 Sign in
//               </Link>
//             </p>
//           </form>
//         </div>
//       </div>
//     </Layout>
//   );
// }
