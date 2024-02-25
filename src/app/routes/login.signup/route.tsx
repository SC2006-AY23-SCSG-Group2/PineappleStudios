// import {Link} from "@remix-run/react";
// import {ChangeEvent, useState} from "react";
// import {Layout} from "src/components/layoutlogin";
//
// import {TextField} from "../../components/textField";
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
//       <div className="h-full flex justify-start items-center ml-20">
//         <div className="flex flex-col gap-y-5">
//           <form method="POST" className="rounded-2xl bg-black p-6 w-96">
//             <h2 className="text-3xl font-extrabold text-white mb-5">
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
//             <div className="w-full text-center mt-5">
//               {/* Comment out the link to stuff here when actually coding authentication */}
//               <Link to="/">
//                 <button
//                   type="submit"
//                   name="_action"
//                   value="Sign In"
//                   className="w-full rounded-xl mt-2 bg-red-500 px-3 py-2 text-black font-semibold transition duration-300 ease-in-out hover:bg-red-600">
//                   Create an account
//                 </button>
//               </Link>
//             </div>
//             <p className="text-white mt-4 flex justify-center font-semibold text-lg">
//               Already have an account?&nbsp;&nbsp;
//               <Link
//                 to="/login"
//                 className="text-red-500 underline hover:text-red-700 font-semibold text-lg">
//                 Sign in
//               </Link>
//             </p>
//           </form>
//         </div>
//       </div>
//     </Layout>
//   );
// }
