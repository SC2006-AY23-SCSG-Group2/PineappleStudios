import {User} from "../../../lib/interfaces";
import { json, LoaderFunctionArgs, redirect, Session, TypedResponse } from "@remix-run/node";
import React, { useState } from "react";
import {
  SessionData,
  SessionFlashData,
  commitSession,
  destroySession,
  getSession,
} from "../../session";
import { getUserInfoByUserId } from "src/lib/dataRetrieve/getUserInfo";
import { TagList } from "../_components/TagList";
import { Link, useFetcher, useLoaderData } from "@remix-run/react";
import { sha256 } from "js-sha256";
import { PrefListChoose } from "../profile.editing.first-time/components/PrefListChoose";
import {addPreferenceForUser} from "src/lib/dataRetrieve/handleUserPreferences";
import {getPreferenceByName} from "src/lib/database/preference";
import {createNewPreference} from "../../../lib/dataRetrieve/createPreference";
import {getUserById} from "../../../lib/database/user";
import { updateUserEmail, updateUserName } from "src/lib/dataRetrieve/handleUserInfo";
import { TextField } from "../_components/TextField";

export async function action({request}: LoaderFunctionArgs) {
  const session: Session<SessionData, SessionFlashData> = await getSession(
    request.headers.get("cookie"),
  );
  let user;
  if (session.data.userId !== undefined)
    user = await getUserById(parseInt(session.data.userId));

  const formData: FormData = await request.formData();
  
  // Extract userName and email from the form data.
  const newUserName = formData.get("name")?.toString() || user?.userName; // Notice we're using 'userName' here
  const newEmail = formData.get("email")?.toString() || user?.email;
  
  // Update userName and email if they have changed.
  if (user) {
    if (newUserName && user.userName !== newUserName) {
      await updateUserName(user.id, newUserName); // Pass 'newUserName' instead of 'newName'
    }
    if (newEmail && user.email !== newEmail) {
      await updateUserEmail(user.id, newEmail);
    }
  }

  return redirect("/tab/4");
}

export interface userData {
  name: string;
  email: string;
  date: string;
  time: number;
  numOfLikes: number;
  numOfRatings: number;
}

interface UserProfileEditCardProps {
  user: userData;
}

interface EditData {
  name: string;
  email: string;
  preferences: string[]; 
}

export async function loader({request}: LoaderFunctionArgs): Promise<
  TypedResponse<{
    success: boolean;
    user: User | null;
    error: {msg: string} | undefined;
  }>
> {
  const session = await getSession(request.headers.get("cookie"));

  let userData;
  if (session.data.userId) {
    userData = await getUserInfoByUserId(parseInt(session.data.userId));
  }
  if (session.data.userId) {
    userData = await getUserInfoByUserId(parseInt(session.data.userId));
    // Get the user's current preferences
  }
  
  if (!userData || !userData.history) {
    return json(
      {
        success: false,
        user: null,
        error: {msg: "User Information cannot load."},
      },
      {
        headers: {
          "Set-Cookie": await commitSession(session),
        },
      },
    );
  }

  return json(
    {
      success: true,
      user: userData,
      error: undefined,
    },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    },
  );
}

export default function tab_index(): React.JSX.Element {
  const loaderData = useLoaderData<typeof loader>();
  const fetcher = useFetcher();

  // Initial form data setup with useState
  const [formData, setFormData] = useState<EditData>({
    name: loaderData.user?.name ?? "",
    email: loaderData.user?.email ?? "example@gmail.com",
    preferences: loaderData.user?.preference ?? []
  });

  // Handle changes in the input fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value 
    }));
  };
  

  if (!loaderData) {
    return <><h1 className={"text-error"}>Error</h1></>;
  }

  if (!loaderData.success || !loaderData!.user) {
    return <><h1 className={"text-error"}>{loaderData.error?.msg}</h1></>;
  }

  const userData: userData = {
    name: loaderData?.user.name ?? "Name",
    email: loaderData?.user.email ?? "Email",
    date: loaderData?.user.dateJoined ?? "Date",
    time: loaderData?.user.timeUsedAppInMins ?? 0,
    numOfLikes: loaderData?.user.numberOfLikedItem ?? 0,
    numOfRatings: loaderData?.user.numberOfRating ?? 0,
  };

  const handlePreferenceClick = (clickedPreference: string) => {
    setFormData(prevData => {
      const newPreferences = prevData.preferences.includes(clickedPreference)
        ? prevData.preferences.filter(p => p !== clickedPreference)
        : [...prevData.preferences, clickedPreference];
    
      return { ...prevData, preferences: newPreferences };
    });
  };
  
  
  

  const addPreference = (preference: string) => {
    if (!formData.preferences.includes(preference)) {
      setFormData(prevData => ({
        ...prevData,
        preferences: [...prevData.preferences, preference]
      }));
    }
  };
  
  const removePreference = (preference: string) => {
    setFormData(prevData => ({
      ...prevData,
      preferences: prevData.preferences.filter(p => p !== preference)
    }));
  };

  const submitForm = async () => {
    // Create a FormData object to include the preferences
    const updatedFormData = new FormData();
    updatedFormData.append('name', formData.name);
    updatedFormData.append('email', formData.email);
    // Join the preferences array into a string
    updatedFormData.append('preferences', formData.preferences.join(','));
    
    // Log FormData to ensure correct data is being sent
    for (let [key, value] of updatedFormData.entries()) { 
      console.log(key, value);
    }
    
    // Use the FormData in the fetcher.submit call
    await fetcher.submit(updatedFormData, { method: "post" });
  };
  

  return (
    <>
      <div className="hero min-h-screen">
        <div className="hero-content flex-col lg:flex-row justify-between">
          <div className="card w-full lg:w-1/3 bg-base-200 shadow-xl">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input 
                  type="text" 
                  placeholder="Your name" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control">
              <TextField id={"email"} label={"Email"} type={"username"} />
                <input 
                  type="email" 
                  placeholder="Your email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="flex flex-row justify-center gap-6 my-2">
                <div className="card-actions">
                  <Link to="/tab/4"><button className="btn btn-secondary min-w-24">Cancel</button></Link>
                </div>
                <div className="card-actions">
                <button className="btn btn-primary" onClick={submitForm}>
                  Save Changes
                </button>
              </div>
              </div>
              
            </div>
          </div>
          <div className="card w-full lg:w-2/3 bg-base-200 shadow-xl overflow-x-auto">
            <div className="card-body">
              <h2 className="card-title">Preferences</h2>
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {loaderData.user.preference.map((preference, index) => (
                  <PrefListChoose
                  key={index}
                  preference={[preference]}
                  selected={formData.preferences}
                  onPreferenceClick={handlePreferenceClick}
                />
              ))}
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
