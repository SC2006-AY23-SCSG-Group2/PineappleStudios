import {useLoaderData} from "@remix-run/react";
import React from "react";

import {ItemList} from "../_components/ItemList";

interface LoaderData {
  user: {
    items: Array<{
      imageSrc: string;
      placeholder: string;
    }>;
  };
}

export const loader = async (): Promise<LoaderData> => {
  return {
    user: {
      items: [
        {
          imageSrc: "https://picsum.photos/200.webp",
          placeholder: "Itefwrfwrgvefgvetffgb rgergvefgvergttefgtfem",
        },
        {
          imageSrc: "https://picsum.photos/200.webp",
          placeholder: "Item fewf few f2f f",
        },
        {
          imageSrc: "https://picsum.photos/200.webp",
          placeholder: "Item",
        },
        {
          imageSrc: "https://picsum.photos/200.webp",
          placeholder: "Item",
        },
        {
          imageSrc: "https://picsum.photos/200.webp",
          placeholder: "Item",
        },
        {
          imageSrc: "https://picsum.photos/200.webp",
          placeholder: "Item",
        },
        {
          imageSrc: "https://picsum.photos/200.webp",
          placeholder: "Item",
        },
        {
          imageSrc: "https://picsum.photos/200.webp",
          placeholder: "Item",
        },
        {
          imageSrc: "https://picsum.photos/200.webp",
          placeholder: "Item",
        },
        {
          imageSrc: "https://picsum.photos/200.webp",
          placeholder: "Item",
        },
        {
          imageSrc: "https://picsum.photos/200.webp",
          placeholder: "Item",
        },
      ],
    },
  };
};

const sampleData = [
  {
    itemTitle: "Title",
    thumbnailUrl: "https://picsum.photos/200/300",
    duration: "117 min",
    genre: "Comedy",
    year: "2021",
    placeholder: "Comedy Movie",
    showHeart: true,
  },
  {
    itemTitle: "Title",
    thumbnailUrl: "https://picsum.photos/200/301",
    duration: "142 min",
    genre: "Drama",
    year: "2019",
    placeholder: "Drama Movie",
    showHeart: false,
  },
  {
    itemTitle: "Title",
    thumbnailUrl: "https://picsum.photos/200/302",
    duration: "129 min",
    genre: "Action",
    year: "2022",
    placeholder: "Action Movie",
    showHeart: true,
  },
  {
    itemTitle: "Title",
    thumbnailUrl: "https://picsum.photos/200.webp",
    duration: "95 min",
    genre: "Sci-Fi",
    year: "2020",
    placeholder: "Sci-Fi Movie",
    showHeart: false,
  },
  {
    itemTitle: "Title",
    thumbnailUrl: "https://picsum.photos/200.webp",
    duration: "103 min",
    genre: "Horror",
    year: "2018",
    placeholder: "Horror Movie",
    showHeart: true,
  },
  {
    itemTitle: "Title",
    thumbnailUrl: "https://picsum.photos/200/300",
    duration: "117 min",
    genre: "Comedy",
    year: "2021",
    placeholder: "Comedy Movie",
    showHeart: true,
  },
  {
    itemTitle: "Title",
    thumbnailUrl: "https://picsum.photos/200/301",
    duration: "142 min",
    genre: "Drama",
    year: "2019",
    placeholder: "Drama Movie",
    showHeart: false,
  },
  {
    itemTitle: "Title",
    thumbnailUrl: "https://picsum.photos/200/302",
    duration: "129 min",
    genre: "Action",
    year: "2022",
    placeholder: "Action Movie",
    showHeart: true,
  },
  {
    itemTitle: "Title",
    thumbnailUrl: "https://picsum.photos/200.webp",
    duration: "95 min",
    genre: "Sci-Fi",
    year: "2020",
    placeholder: "Sci-Fi Movie",
    showHeart: false,
  },
  {
    itemTitle: "Title",
    thumbnailUrl: "https://picsum.photos/200.webp",
    duration: "103 min",
    genre: "Horror",
    year: "2018",
    placeholder: "Horror Movie",
    showHeart: true,
  },
];

export default function tab_index(): React.JSX.Element {
  const {user} = useLoaderData<typeof loader>();

  return (
    <>
      {/*<div className="flex bg-gray-100 p-2">*/}
      {/*  <div className="flex transform items-center space-x-6 rounded-xl bg-white p-3 shadow-lg transition duration-200 hover:scale-95 hover:shadow-xl">*/}
      {/*    <div className="flex w-72 space-x-4 rounded-lg bg-gray-100 p-2">*/}
      {/*      <svg*/}
      {/*        xmlns="http://www.w3.org/2000/svg"*/}
      {/*        className="h-6 w-6 opacity-30"*/}
      {/*        fill="none"*/}
      {/*        viewBox="0 0 24 24"*/}
      {/*        stroke="currentColor">*/}
      {/*        <path*/}
      {/*          stroke-linecap="round"*/}
      {/*          stroke-linejoin="round"*/}
      {/*          stroke-width="2"*/}
      {/*          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"*/}
      {/*        />*/}
      {/*      </svg>*/}
      {/*      <input*/}
      {/*        className="bg-gray-100 outline-none"*/}
      {/*        type="text"*/}
      {/*        placeholder="Item name or keyword..."*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*    <div className="flex cursor-pointer rounded-lg px-4 py-2 font-semibold text-gray-500">*/}
      {/*      <span>All categories</span>*/}
      {/*      <button>*/}
      {/*        <svg*/}
      {/*          xmlns="http://www.w3.org/2000/svg"*/}
      {/*          className="h-6 w-6"*/}
      {/*          fill="none"*/}
      {/*          viewBox="0 0 24 24"*/}
      {/*          stroke="currentColor">*/}
      {/*          <path*/}
      {/*            stroke-linecap="round"*/}
      {/*            stroke-linejoin="round"*/}
      {/*            stroke-width="2"*/}
      {/*            d="M19 9l-7 7-7-7"*/}
      {/*          />*/}
      {/*        </svg>*/}
      {/*      </button>*/}
      {/*    </div>*/}
      {/*    <div className="duration-3000 cursor-pointer rounded-lg bg-gray-800 px-5 py-2 font-semibold text-white transition hover:shadow-lg">*/}
      {/*      <span>Search</span>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}

      <h1 className="mx-6 mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-4xl font-extrabold text-transparent">
        Today's Hits
      </h1>
      <ItemList items={sampleData} title={"Top Music"} />
      <ItemList items={sampleData} title={"Top Movies"} />
      <ItemList items={sampleData} title={"Top TV Shows"} />
      <ItemList items={sampleData} title={"Top Books"} />
    </>
  );
}
