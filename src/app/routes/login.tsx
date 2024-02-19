import { Link } from "@remix-run/react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Layout } from "src/components/layoutlogin";
import { Textfield } from "src/components/textfield";

export default function Login() {
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Updates the form data when an input changes
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>, field: string) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [field]: event.target.value
    }));
  }

  // Handles form submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }

  return (

    <Layout>
      <div className="h-full flex justify-center items-center">
      <div className="flex flex-col gap-y-5">
        <form method="POST" className="rounded-2xl bg-black p-6 w-96">
          <h2 className="text-3xl font-extrabold text-white mb-5">Login</h2>
          <Textfield
            htmlFor="username"
            label="Username"
            value={formData.email || ''}
            onChange={e => handleInputChange(e, 'email')}
          />
          <Textfield
            htmlFor="password"
            type="password"
            label="Password"
            value={formData.password || ''}
            onChange={e => handleInputChange(e, 'password')}
          />
          <div className="flex flex-row justify-end text-red-400 hover:text-red-600">
            <p>Forgot Password?</p>
          </div>
          <div className="w-full text-center mt-5">
            <button type="submit" name="_action" value="Sign In" className="w-1/2 rounded-xl mt-2 bg-red-500 px-3 py-2 text-black font-semibold transition duration-300 ease-in-out hover:bg-red-600">
            <Link to="/">Login</Link>
            </button>
          </div>
          <p className="text-center text-white mt-4">
      <span className="font-semibold text-lg">Don't have an account?&nbsp;&nbsp;</span>
      <Link to="/signup" className="text-red-500 underline hover:text-red-700 font-semibold text-lg">Sign up</Link>
    </p>
    <p className="my-4 text-lg">
      --------------------&nbsp;&nbsp;or&nbsp;&nbsp;---------------------
    </p>
    <div className="w-full text-center my-1">
              <button type="button" name="_action" value="Sign In" className="w-5/6 rounded-xl mt-2 bg-slate-100 px-3 py-2 text-black font-semibold transition duration-300 ease-in-out hover:bg-slate-300">Login with Email</button>
    </div>
    <div className="w-full text-center my-1">
        <button type="button" name="_action" value="Sign In" className="w-5/6 rounded-xl mt-2 bg-slate-100 px-3 py-2 text-black font-semibold transition duration-300 ease-in-out hover:bg-slate-300">Login with Spotify</button>
    </div>
        </form>
            

      </div>
      </div>
    </Layout>
  );
}
