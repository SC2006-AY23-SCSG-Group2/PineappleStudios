import {
  LoaderFunctionArgs,
  Session,
  TypedResponse,
  json,
  redirect,
} from "@remix-run/node";
import {
  FetcherWithComponents,
  useFetcher,
  useLoaderData,
} from "@remix-run/react";
import React, {useEffect, useState} from "react";

import {
  getItemInfoByItemId,
  getItemInfoBySrcId,
} from "../../../lib/dataRetrieve/getItemInfo";
import {addHistoryItemForUser} from "../../../lib/dataRetrieve/handleUserInfo";
import {
  BookContent,
  ItemInfo,
  ItemType,
  MovieContent,
  SimpleItem,
  SongContent,
} from "../../../lib/interfaces";
import {
  SessionData,
  SessionFlashData,
  commitSession,
  destroySession,
  getSession,
} from "../../session";
import {HistoryItemList} from "../_components/HistoryItemList";
import InfoHover from "../_components/InfoHover";
import {SmallPeopleList} from "../_components/SmallPeopleList";
import {TagList} from "../_components/TagList";
import {ToastList} from "../_components/ToastList";
import {ItemInfoMutex} from "../browser/MUTEX";

export async function loader({params, request}: LoaderFunctionArgs): Promise<
  TypedResponse<{
    success: boolean;
    data: ItemInfo | undefined;
    error: {msg: string} | undefined;
  }>
> {
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

  const userId = +session.data.userId;

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

  await addHistoryItemForUser(+session.data.userId, +id);

  return json(jsonData, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function tab_index(): React.JSX.Element {
  // eslint-disable-next-line react-hooks/rules-of-hooks
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
  const fetcherRecommendation = useFetcher<{
    success: boolean;
    data: {data: SimpleItem[]} | null;
    error: {msg: string} | null;
  }>({
    key: "recommendation",
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [getRecommendation, setGetRecommendation] = useState(false);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (!getRecommendation) {
      fetcherRecommendation.load(
        "/api/recommendation/item/" +
          loaderData.data?.title.replaceAll("/", "-"),
      );
      setGetRecommendation(true);
    }
  }, [
    fetcherRecommendation,
    getRecommendation,
    loaderData.data?.title,
    setGetRecommendation,
  ]);

  const recommendation = fetcherRecommendation.data;
  const isSubmitting = fetcherRecommendation.state === "submitting";
  const isLoading = fetcherRecommendation.state === "loading";
  const isIdle = fetcherRecommendation.state === "idle";

  const fetcherAddToLibrary: FetcherWithComponents<{
    success: false;
    error: {msg: string};
    // eslint-disable-next-line react-hooks/rules-of-hooks
  }> = useFetcher<{
    success: false;
    error: {msg: string};
  }>({key: "add-to-library"});
  fetcherAddToLibrary.formAction = "post";

  const fetcherAddToFavourite: FetcherWithComponents<{
    success: false;
    error: {msg: string};
    // eslint-disable-next-line react-hooks/rules-of-hooks
  }> = useFetcher<{
    success: false;
    error: {msg: string};
  }>({key: "add-tags"});
  fetcherAddToFavourite.formAction = "post";

  const fetcherDeleteFavourite: FetcherWithComponents<{
    success: false;
    error: {msg: string};
    // eslint-disable-next-line react-hooks/rules-of-hooks
  }> = useFetcher<{
    success: false;
    error: {msg: string};
  }>({key: "delete-tags"});
  fetcherAddToFavourite.formAction = "post";

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [toasts, setToasts] = useState<
    {
      id: number;
      message: string;
      type: string;
    }[]
  >([]);
  const autoClose: boolean = true;
  const autoCloseDuration: number = 5;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const showToast = (message: string, type: string): void => {
    const toast: {id: number; message: string; type: string} = {
      id: Date.now(),
      message,
      type,
    };

    setToasts((prevToasts: {id: number; message: string; type: string}[]) => [
      ...prevToasts,
      toast,
    ]);

    if (autoClose) {
      setTimeout((): void => {
        removeToast(toast.id);
      }, autoCloseDuration * 1000);
    }
  };

  function removeToast(id: number) {
    setToasts((prevToasts: {id: number; message: string; type: string}[]) =>
      prevToasts.filter(
        (toast: {id: number; message: string; type: string}): boolean =>
          toast.id !== id,
      ),
    );
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect((): void => {
    if (fetcherAddToLibrary.data && !fetcherAddToLibrary.data.success) {
      console.log(fetcherAddToLibrary.data.error.msg);
      showToast(fetcherAddToLibrary.data.error.msg, "error");
      fetcherAddToLibrary.data = undefined;
    }
  }, [fetcherAddToLibrary, showToast]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect((): void => {
    if (fetcherAddToFavourite.data && !fetcherAddToFavourite.data.success) {
      console.log(fetcherAddToFavourite.data.error.msg);
      showToast(fetcherAddToFavourite.data.error.msg, "error");
      fetcherAddToFavourite.data = undefined;
    }
  }, [fetcherAddToFavourite, showToast]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect((): void => {
    if (fetcherDeleteFavourite.data && !fetcherDeleteFavourite.data.success) {
      console.log(fetcherDeleteFavourite.data.error.msg);
      showToast(fetcherDeleteFavourite.data.error.msg, "error");
      fetcherDeleteFavourite.data = undefined;
    }
  }, [fetcherDeleteFavourite, showToast]);

  const data: ItemInfo = loaderData.data;
  const content: MovieContent | SongContent | BookContent = data.otherContent;

  const type: string[] = ["Book", "Song", "Movie"];

  function funcContent(): React.JSX.Element | null {
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
              <div className="indicator">
                <span className="badge indicator-item badge-primary badge-lg indicator-start">
                  In Library
                </span>
                {data.tag.filter(
                  (e: string) =>
                    e.toLowerCase() === "favourite" ||
                    e.toLowerCase() === "favorite",
                ).length >= 1 && (
                  <span className="badge indicator-item badge-primary badge-lg">
                    Favourite
                  </span>
                )}
                <figure className="mask mask-squircle mx-3 my-4  h-72 w-72 justify-items-center">
                  <img
                    className="h-72 w-72"
                    src={data.img}
                    alt="Poster of the item"
                  />
                </figure>
              </div>

              <div className="card-body">
                <div className="card-title">
                  <h1 className="block text-4xl">{data.title}</h1>
                </div>
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
                action={"/api/item/delete-from-library"}>
                <input type="hidden" id="id" name="id" value={data.id} />
                <button
                  type="submit"
                  className="btn btn-neutral btn-wide my-1 min-w-full">
                  Delete from Library
                </button>
              </fetcherAddToLibrary.Form>
              {data.tag.filter(
                (e: string) =>
                  e.toLowerCase() === "favourite" ||
                  e.toLowerCase() === "favorite",
              ).length >= 1 ? (
                <fetcherDeleteFavourite.Form
                  className={"min-w-full"}
                  method={"POST"}
                  action={"/api/item/delete-tags"}>
                  <input type="hidden" id="item" name="item" value={data.id} />
                  <input type="hidden" id="tag" name="tag" value="favourite" />
                  <button
                    type="submit"
                    className="btn btn-neutral btn-wide my-1 min-w-full">
                    Delete from Favourite
                  </button>
                </fetcherDeleteFavourite.Form>
              ) : (
                <fetcherAddToFavourite.Form
                  className="min-w-full"
                  method="POST"
                  action="/api/item/add-tags">
                  <input type="hidden" id="item" name="item" value={data.id} />
                  <input type="hidden" id="tag" name="tag" value="favourite" />
                  <button
                    type="submit"
                    className="btn btn-neutral btn-wide my-1 min-w-full">
                    Add to Favourite
                  </button>
                </fetcherAddToFavourite.Form>
              )}
            </div>
            <div className={"max-lg:mt-12 lg:my-4"}></div>
            <div className="card min-w-[25rem] self-start bg-base-200 shadow-xl max-md:w-96">
              <div className="card-body">
                <h2 className="card-title mx-2 text-2xl lg:text-3xl">Genres</h2>
                <TagList tag={data.genre} />
              </div>
              <div className="card-body">
                <h2 className="card-title mx-2 text-2xl lg:text-3xl">Tags</h2>
                {data.tag.length === 0 ? (
                  <p className="text-center">No tags</p>
                ) : (
                  <TagList tag={data.tag} />
                )}
              </div>
              <SmallPeopleList items={data.people} />
              {/*used as an item list */}
              {(!getRecommendation || isLoading || isSubmitting) && (
                <>
                  <div className="card w-full shadow-none">
                    <div className="card-body">
                      <h2 className="card-title mx-2 text-2xl lg:text-3xl">
                        Recommendation
                        <InfoHover info="This is recommendation based on the relevance of the item" />
                      </h2>
                      <div className="flex w-52 flex-col gap-4">
                        <div className="skeleton h-32 w-full"></div>
                        <div className="skeleton h-4 w-28"></div>
                        <div className="skeleton h-4 w-full"></div>
                        <div className="skeleton h-4 w-full"></div>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {getRecommendation &&
                isIdle &&
                recommendation &&
                recommendation.success &&
                recommendation.data && (
                  <HistoryItemList
                    title="Recommendation"
                    items={recommendation.data.data}
                    info="This is recommendation based on the relevance of the item"
                  />
                )}

              {getRecommendation &&
                isIdle &&
                (!recommendation || !recommendation.success) && (
                  <>
                    <div className="card w-full shadow-none">
                      <div className="card-body">
                        <h2 className="card-title mx-2 text-2xl lg:text-3xl">
                          Recommendation
                          <InfoHover info="This is recommendation based on the relevance of the item" />
                        </h2>
                        <div className="flex w-52 flex-col gap-4">
                          <div className="skeleton h-32 w-full"></div>
                          <div className="skeleton h-4 w-28"></div>
                          <div className="skeleton h-4 w-full"></div>
                          <div className="skeleton h-4 w-full"></div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
            </div>
          </div>
          {/*Right Card End*/}
        </div>
      </div>
      <ToastList data={toasts} removeToast={removeToast} />
    </>
  );
}
