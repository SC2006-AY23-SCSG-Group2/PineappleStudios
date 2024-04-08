import {json} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import React from "react";

import {SimpleItem} from "../../../lib/interfaces";
import {ItemList} from "../_components/ItemList";

export async function loader() {
  function randomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function makeItems(): SimpleItem[] {
    const returnList: SimpleItem[] = [];
    for (let i = 0; i < 20; i++) {
      const id = randomInteger(0, 1084);
      const newItem: SimpleItem = {
        id: id,
        title: "Item",
        img: `https://picsum.photos/id/${id}/200.webp`,
        tag: randomInteger(0, 1084) % 2 == 0 ? ["favorite"] : [],
        type: randomInteger(0, 1084) % 3,
      };
      returnList.push(newItem);
    }

    return returnList;
  }

  return json({
    success: true,
    data: {
      items: makeItems(),
    },
  });
}

export default function tab_index(): React.JSX.Element {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <h1 className="mx-6 mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-4xl font-extrabold text-transparent">
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        Today's Hits
      </h1>
      <ItemList items={data.data.items} title={"Top Music"} />
      <ItemList items={data.data.items} title={"Top Movies"} />
      <ItemList items={data.data.items} title={"Top TV Shows"} />
      <ItemList items={data.data.items} title={"Top Books"} />
    </>
  );
}
