import {
  LoaderFunctionArgs,
  TypedResponse,
  json,
  redirect,
} from "@remix-run/node";
import {Form, useLoaderData} from "@remix-run/react";
import React from "react";

import {getItemInfoExample} from "../../../lib/database/functions";
import {ItemInfo} from "../../../lib/interfaces";
import {SmallPeopleList} from "../_components/SmallPeopleList";
import {TagList} from "../_components/TagList";

export function loader({params}: LoaderFunctionArgs): TypedResponse<{
  success: boolean;
  data: ItemInfo | undefined;
  error: {msg: string} | undefined;
}> {
  const id = params.id;
  if (!id) {
    return json({
      success: false,
      data: undefined,
      error: {msg: "unknown url requested"},
    });
  }

  let itemInfo: ItemInfo | undefined = getItemInfoExample(id);

  if (itemInfo !== undefined && itemInfo.isInLibrary && !itemInfo.id) {
    return redirect("/library/item/" + itemInfo.id);
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

  return json(jsonData);
}

export default function tab_index(): React.JSX.Element {
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

  let data: ItemInfo = loaderData.data;
  let content = data.otherContent;

  const type = ["Book", "Song", "Movie"];

  return (
    <>
      <div className="hero min-h-screen">
        <div className="hero-content max-lg:m-2 max-lg:flex-col lg:m-0 lg:flex-row lg:items-end lg:justify-end ">
          {/*Left Card Begin*/}
          <div className="lg:m-sm min-w-[25rem] max-md:w-96 lg:sticky lg:bottom-[16px] lg:max-w-md">
            <div className="card items-center bg-base-200 shadow-xl ">
              <figure className="mask mask-squircle mx-3 my-4  h-72 w-72 justify-items-center">
                <img className="h-72 w-72" src={data.img} alt="Image" />
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
              </div>
            </div>
            <div className={"max-lg:mt-12 lg:my-4"}></div>
            <div className={"card w-full min-w-80 items-center"}>
              <Form
                className={"min-w-full"}
                method={"POST"}
                navigate={false}
                action={"/api/item/add-to-library"}>
                <input type="hidden" id="id" name="id" value={data.id} />
                <button type="submit" className="btn btn-wide my-1 min-w-full">
                  Add to Library
                </button>
              </Form>
            </div>
          </div>
          {/*Left Card End*/}

          <div className={"max-lg:mt-4 lg:hidden"}></div>

          {/*Right Card Begin*/}
          <div className="card min-w-[25rem] self-start bg-base-200 shadow-xl max-md:w-96">
            <div className="card-body">
              <h2 className="card-title mx-2 text-2xl lg:text-3xl">
                Preferences
              </h2>
              <TagList tag={data.tag} />
            </div>
            <SmallPeopleList items={data.people} />
          </div>
          {/*Right Card End*/}
        </div>
      </div>
    </>
  );
}
