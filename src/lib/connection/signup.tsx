import {ActionFunctionArgs, json, redirect} from "@remix-run/node";
import {getUserByEmail, createUser} from "../../lib/database/user";


type FormData = {
  name: string;
  email: string;
  password: string;
};

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const data: FormData = {
      name: formData.get("username") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
  
    const errors: { [key: string]: string } = {};
  
    if (!data.name) {
      errors.name = "Invalid Name";
    }
  
    if (!data.email) {
      errors.email = "Invalid Email";
    }
  
    if (!data.password) {
      errors.password = "Invalid Password";
    }
  
    if (Object.keys(errors).length > 0) {
      return json({ errors, value: data });
    }
  
    const user = await getUserByEmail(data.email);
  
    if (user) {
      errors.email = "You already have an account";
      return json({ errors, value: data });
    }
  
    await createUser(data);
    return redirect("/tab");
  }