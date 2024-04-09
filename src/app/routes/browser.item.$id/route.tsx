import {
  LoaderFunctionArgs,
  TypedResponse,
  json,
  redirect,
} from "@remix-run/node";
import {useFetcher, useLoaderData} from "@remix-run/react";
import React, {useEffect, useState} from "react";

import {
  getItemInfoByItemId,
  getItemInfoBySrcId,
} from "../../../lib/dataRetrieve/getItemInfo";
import {
  BookContent,
  ItemInfo,
  ItemType,
  MovieContent,
  SongContent,
} from "../../../lib/interfaces";
import {commitSession, destroySession, getSession} from "../../session";
import {SmallPeopleList} from "../_components/SmallPeopleList";
import {TagList} from "../_components/TagList";
import {ToastList} from "../_components/ToastList";
import {HistoryItemList} from "../tab.4/components/HistoryItemList";

export async function loader({params, request}: LoaderFunctionArgs): Promise<
  TypedResponse<{
    success: boolean;
    data: ItemInfo | undefined;
    error: {msg: string} | undefined;
  }>
> {
  const session = await getSession(request.headers.get("cookie"));

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

  const id = params.id;
  if (!id) {
    return json({
      success: false,
      data: undefined,
      error: {msg: "unknown url requested"},
    });
  }

  let itemInfo;
  if (isNaN(+id)) {
    itemInfo = await getItemInfoBySrcId(id, +session.data.userId);
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

  if (itemInfo.isInLibrary && itemInfo.id) {
    return redirect("/library/item/" + itemInfo.id, {
      headers: {"Set-Cookie": await commitSession(session)},
    });
  }

  if (id !== itemInfo.id.toString()) {
    return redirect("/browser/item/" + itemInfo.id, {
      headers: {"Set-Cookie": await commitSession(session)},
    });
  }

  return json(jsonData, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function tab_index(): React.JSX.Element {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const loaderData = useLoaderData<typeof loader>();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const fetcherAddToLibrary = useFetcher<{
    success: false;
    error: {msg: string};
  }>({key: "add-to-library"});
  fetcherAddToLibrary.formAction = "post";

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [toasts, setToasts] = useState<
    {
      id: number;
      message: string;
      type: string;
    }[]
  >([]);
  const autoClose = true;
  const autoCloseDuration = 5;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const showToast = (message: string, type: string) => {
    const toast: {id: number; message: string; type: string} = {
      id: Date.now(),
      message,
      type,
    };

    // if (toasts.length > 0 && toast.id - toasts[toasts.length - 1].id < 500) {
    //   return;
    // }

    setToasts((prevToasts) => [...prevToasts, toast]);

    if (autoClose) {
      setTimeout(() => {
        removeToast(toast.id);
      }, autoCloseDuration * 1000);
    }
  };

  function removeToast(id: number) {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (fetcherAddToLibrary.data && !fetcherAddToLibrary.data.success) {
      console.log(fetcherAddToLibrary.data.error.msg);
      showToast(fetcherAddToLibrary.data.error.msg, "error");
      fetcherAddToLibrary.data = undefined;
    }
  }, [fetcherAddToLibrary, showToast]);

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

  const data: ItemInfo = loaderData.data;
  const content: MovieContent | SongContent | BookContent = data.otherContent;

  const type = ["Book", "Song", "Movie"];

  function funcContent() {
    switch (data.type) {
      case ItemType.Book: {
        return (
          <>
            {(content as BookContent).pageCount && (
              <p className="mt-2 block text-lg">
                Page Count: {(content as BookContent).pageCount}
              </p>
            )}
          </>
        );
      }

      case ItemType.Movie: {
        return (
          <>
            {(content as MovieContent).duration && (
              <p className="mt-2 block text-lg">
                Duration: {(content as MovieContent).duration} minutes
              </p>
            )}
            {(content as MovieContent).country && (
              <p className="mt-2 block text-lg">
                Country: {(content as MovieContent).country}
              </p>
            )}
          </>
        );
      }

      case ItemType.Song: {
        return (
          <>
            {(content as SongContent).album && (
              <p className="mt-2 block text-lg">
                Album: {(content as SongContent).album}
              </p>
            )}
            {(content as SongContent).duration && (
              <p className="mt-2 block text-lg">
                Duration: {(content as SongContent).duration} minutes
              </p>
            )}
          </>
        );
      }
    }

    return null;
  }

  return (
    <>
      <div className="hero min-h-screen">
        <div className="hero-content max-lg:m-2 max-lg:flex-col lg:m-0 lg:flex-row lg:items-end lg:justify-end ">
          {/*Left Card Begin*/}
          <div className="lg:m-sm min-w-[25rem] max-md:w-96 lg:sticky lg:bottom-[16px] lg:max-w-md">
            <div className="card items-center bg-base-200 shadow-xl ">
              <figure className="mask mask-squircle mx-3 my-4  h-72 w-72 justify-items-center">
                <img
                  className="h-72 w-72"
                  src={data.img}
                  alt="Poster of the item"
                />
              </figure>

              <div className="card-title">
                <h1 className="block text-4xl">{data.title}</h1>
              </div>
              <div className="card-body">
                <p className="mt-2 block text-lg">Type: {type[data.type]}</p>
                {data.country && (
                  <p className="mt-2 block text-lg">Country: {data.country}</p>
                )}
                {data.publicationDate && (
                  <p className="mt-2 block text-lg">
                    Publication Data: {data.publicationDate}
                  </p>
                )}
                {funcContent()}
              </div>
            </div>
          </div>
          {/*Left Card End*/}

          <div className={"max-lg:mt-4 lg:hidden"}></div>

          {/*Right Card Begin*/}
          <div className="self-start">
            <div className={"card w-full min-w-80 items-center"}>
              <fetcherAddToLibrary.Form
                className={"min-w-full"}
                method={"POST"}
                action={"/api/item/add-to-library"}>
                <input type="hidden" id="id" name="id" value={data.id} />
                <button type="submit" className="btn btn-wide my-1 min-w-full">
                  Add to Library
                </button>
              </fetcherAddToLibrary.Form>
            </div>
            <div className={"max-lg:mt-12 lg:my-4"}></div>
            <div className="card min-w-[25rem] bg-base-200 shadow-xl max-md:w-96">
              <div className="card-body">
                <h2 className="card-title mx-2 text-2xl lg:text-3xl">Genres</h2>
                <TagList tag={data.genre} />
              </div>
              <SmallPeopleList items={data.people} />
              {/*used as an item list */}
              <HistoryItemList title="Recommendation" items={[]} />
            </div>
          </div>
          {/*Right Card End*/}
        </div>
      </div>
      <ToastList data={toasts} removeToast={removeToast} />
    </>
  );
}
