import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  Session,
  redirect,
} from "@remix-run/node";
import {useFetcher, useLoaderData} from "@remix-run/react";
import React from "react";
import {useState} from "react";
import {addPreferenceForUser} from "src/lib/dataRetrieve/handleUserPreferences";
import {getPreferenceByName} from "src/lib/database/preference";

import {createNewPreference} from "../../../lib/dataRetrieve/createPreference";
import {getUserById} from "../../../lib/database/user";
import {
  SessionData,
  SessionFlashData,
  destroySession,
  getSession,
} from "../../session";
import {PreferenceList} from "../_components/PreferenceList";

export async function action({request}: LoaderFunctionArgs) {
  const session: Session<SessionData, SessionFlashData> = await getSession(
    request.headers.get("cookie"),
  );
  let user;
  if (session.data.userId !== undefined)
    user = await getUserById(parseInt(session.data.userId));

  const formData: FormData = await request.formData();
  const preferences: string[] = Array.from(formData.getAll("preference")).map(
    (value: FormDataEntryValue) => {
      if (typeof value === "string") {
        return value; // If it's already a string, return it as is
      } else {
        return ""; // If it's not a string (e.g., a file), handle it accordingly
      }
    },
  );

  for (const temp of preferences) {
    const preference = await getPreferenceByName(temp);
    if (user && preference)
      await addPreferenceForUser(user.id, preference.name);
  }

  return redirect("/tab/4");
}

export async function loader({request}: LoaderFunctionArgs) {
  const session: Session<SessionData, SessionFlashData> = await getSession(
    request.headers.get("cookie"),
  );

  if (!session.has("userId") || !session.data.userId) {
    session.flash("error", "User not login");

    return redirect("/login", {
      headers: {
        "Set-Cookie": await destroySession(session),
      },
    });
  }

  if (isNaN(+session.data.userId)) {
    session.flash("error", "User id is not a number");

    return redirect("/login", {
      headers: {
        "Set-Cookie": await destroySession(session),
      },
    });
  }

  let preferenceData: string[] = [];
  for (let i = 0; i < 20; i++) {
    await createNewPreference("PLACEHOLDER" + i.toString());
    preferenceData.push("PLACEHOLDER" + i.toString());
  }

  let userName = "";
  const user = await getUserById(parseInt(session.data.userId));
  if (user !== null) {
    userName = user.userName;
  }

  return {
    preferenceData,
    userName,
  };
}

export default function TabIndex({}): React.JSX.Element {
  const loaderData = useLoaderData<typeof loader>();

  const [formData, setFormData] = useState<string[]>([]);

  const addPreference = (message: string) => {
    setFormData([...formData, message]);
  };

  const removePreference = (message: string) => {
    setFormData(formData.filter((e) => e !== message));
  };

  const handlePreferenceClick = (clickedPreference: string) => {
    console.log("Clicked Preference: ", clickedPreference);
    if (!formData.includes(clickedPreference)) addPreference(clickedPreference);
    else removePreference(clickedPreference);
  };

  //handle formData, pass it to action
  const fetcher = useFetcher(); // Initialize the fetcher function
  fetcher.formAction = "post";

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-center text-2xl font-bold">
        Welcome, {loaderData.userName}
      </h1>
      <div className="mb-4 text-center">
        <h2 className="text-lg font-semibold">Choose what you like:</h2>
        <p className="text-md">
          You have selected <strong>{formData.length}</strong> preference.
        </p>
      </div>
      <div className="flex h-full items-center justify-center">
        <div className="artboard artboard-horizontal phone-4">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {loaderData.preferenceData.map((preference, index) => (
              <PreferenceList
                key={index}
                preference={[preference]}
                selected={formData}
                onPreferenceClick={handlePreferenceClick}
              />
            ))}
          </div>
        </div>
      </div>
      <fetcher.Form
        className={"join mt-2 w-full min-w-full"}
        method={"POST"}
        action={"/profile/editing/first-time"}>
        {formData.map((preference, index) => (
          <input
            key={index}
            type="hidden"
            name="preference"
            value={preference}
          />
        ))}
        <p className="mb-6 mt-6 text-center text-2xl">
          <h2>All Good! Press next to continue!</h2>
          <input type="submit" value="Next" className="btn glass" />
        </p>
      </fetcher.Form>
    </div>
  );
}
