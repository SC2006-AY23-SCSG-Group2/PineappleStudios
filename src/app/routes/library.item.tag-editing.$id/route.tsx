import {LoaderFunctionArgs, Session, json, redirect} from "@remix-run/node";
import {Form, useLoaderData} from "@remix-run/react";
import React, {useState} from "react";

import {
  getItemInfoByItemId,
  getItemInfoBySrcId,
} from "../../../lib/dataRetrieve/getItemInfo";
import {ItemInfo} from "../../../lib/interfaces";
import {
  SessionData,
  SessionFlashData,
  commitSession,
  destroySession,
  getSession,
} from "../../session";
import {ItemInfoMutex} from "../browser/MUTEX";
import {PrefListChoose} from "./components/PrefListChoose";

export async function loader({request, params}: LoaderFunctionArgs) {
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

  const id: string | undefined = params.id;

  if (!id) {
    return json({
      success: false,
      data: undefined,
      error: {msg: "unknown url requested"},
    });
  }

  const userId: number = +session.data.userId;

  let itemInfo;
  if (isNaN(+id)) {
    await ItemInfoMutex.runExclusive(async () => {
      itemInfo = await getItemInfoBySrcId(id, userId);
    });
  } else if (!isNaN(+id)) {
    itemInfo = await getItemInfoByItemId(+id, +session.data.userId);
  }

  let jsonData: {
    success: boolean;
    data: ItemInfo | undefined;
    error: {msg: string} | undefined;
  } = {
    success: true,
    data: itemInfo,
    error: undefined,
  };

  if (!itemInfo) {
    jsonData = {
      success: false,
      data: undefined,
      error: {msg: "Item " + id + " not found."},
    };
    return json(jsonData, {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  if (!itemInfo.isInLibrary && itemInfo.id) {
    return redirect("/browser/item/" + itemInfo.id, {
      headers: {"Set-Cookie": await commitSession(session)},
    });
  }

  if (id !== itemInfo.id.toString()) {
    return redirect("/library/item/" + itemInfo.id, {
      headers: {"Set-Cookie": await commitSession(session)},
    });
  }

  return json(jsonData, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

// export async function loader({request}: LoaderFunctionArgs) {
//   const session: Session<SessionData, SessionFlashData> = await getSession(
//     request.headers.get("cookie"),
//   );
//
//   if (!session.has("userId") || !session.data.userId) {
//     session.flash("error", "User not login");
//
//     return redirect("/login", {
//       headers: {
//         "Set-Cookie": await destroySession(session),
//       },
//     });
//   }
//
//   if (isNaN(+session.data.userId)) {
//     session.flash("error", "User id is not a number");
//
//     return redirect("/login", {
//       headers: {
//         "Set-Cookie": await destroySession(session),
//       },
//     });
//   }
//
//   await getAllPreferencesInTheSystem();
//   const preferenceData: string[] = [];
//   const [additionalPreferences, setAdditionalPreferences] =
// useState<string[]>( [], );  for (const preference of additionalPreferences)
// { await createNewPreference(preference); preferenceData.push(preference); }
// let userCurrentPreferences = await getPreferencesOfUser(
// parseInt(session.data.userId), );  if (!userCurrentPreferences) {
// userCurrentPreferences = []; }  let userName = ""; const user = await
// getUserById(parseInt(session.data.userId));  if (user !== null) { userName =
// user.userName; }  return { preferenceData, userName, userCurrentPreferences,
// }; }

export default function TabIndex(): React.JSX.Element {
  const loaderData = useLoaderData<typeof loader>();

  if (!loaderData.success) {
    return (
      <>
        <h1 className={"text-error"}>{loaderData.error?.msg}</h1>
      </>
    );
  }

  if (!loaderData.data) {
    return (
      <>
        <h1 className={"text-error"}>Error Data Not Found</h1>
      </>
    );
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [formData, setFormData] = useState<string[]>(loaderData.data.tag);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [newTag, setNewTag] = useState<string>("");

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [preference, setPreferences] = useState<string[]>(loaderData.data.tag);

  function addPreference(message: string) {
    setFormData([...formData, message]);
  }

  function removePreference(message: string) {
    setFormData(formData.filter((e) => e !== message));
  }

  function addNewTag() {
    addPreference(newTag);
    setPreferences([...preference, newTag]);
  }

  function onChange(event: {target: {value: React.SetStateAction<string>}}) {
    setNewTag(event.target.value);
  }

  const handlePreferenceClick = (clickedPreference: string) => {
    console.log("Clicked Preference: ", clickedPreference);
    if (!formData.includes(clickedPreference)) {
      addPreference(clickedPreference);
    } else {
      removePreference(clickedPreference);
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-center text-2xl font-bold">
          Adding Tags for: {loaderData.data.title}
        </h1>
        <div className="hero">
          {/*<div className="flex h-full items-center justify-center">*/}
          {/*<div className="artboard artboard-horizontal phone-4">*/}
          <div className="hero-content">
            <div className="card">
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {preference.map((preference, index) => (
                  <>
                    <PrefListChoose
                      key={index}
                      preference={[preference]}
                      selected={formData}
                      onPreferenceClick={handlePreferenceClick}
                    />
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="hero">
          <div className="hero-content">
            <div className="card">
              {/*  <div className="card-body">*/}
              <h2 className="card-title">Add tags</h2>
              <label className="input input-bordered flex items-center gap-1">
                New Tag
                <input
                  type="text"
                  className="grow"
                  placeholder="New Tag"
                  value={newTag}
                  onChange={onChange}
                />
              </label>

              <button className="btn w-full" onClick={addNewTag}>
                Add
              </button>

              {/*</div>*/}
            </div>
          </div>
        </div>

        <Form
          className={"w-full"}
          method={"POST"}
          action={"/api/item/set-tags"}>
          {formData.map((e, index) => {
            console.log(e);
            return <input key={index} type="hidden" name="tag" value={e} />;
          })}
          <input type="hidden" name="item" value={loaderData.data.id} />
          <button
            type="submit"
            className="btn my-2 w-full rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-6 text-lg text-black hover:scale-95">
            Finish
          </button>
        </Form>
      </div>
    </>
  );
}