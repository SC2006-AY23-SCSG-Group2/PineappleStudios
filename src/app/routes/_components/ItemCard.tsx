import React, {useState} from "react";

import {SimpleItem} from "../../../lib/interfaces";
import {HeartButton} from "./HeartButton";
import { PlayIcon } from "@heroicons/react/16/solid";

interface ItemCardProps {
  data: SimpleItem;
}

export const ItemCard: React.FC<ItemCardProps> = ({data}: ItemCardProps) => {
  const [fav, setFav] = useState(false);

  return (
    <div className="col-span group relative h-[12vw] m-3">
      <img
        src={data.img}
        alt={data.title || "Item"}
        draggable={false}
        className="h-[12vw] w-full cursor-pointer rounded-md object-cover shadow-xl transition group-hover:opacity-90 sm:group-hover:opacity-0"
      />
      {data.tag.find(str => str === "favorite") && (
        <div className="absolute right-2 top-2">
          <HeartButton onClick={() => setFav(!fav)} />
        </div>
      )}
      <div
        className="absolute inset-0 z-20 duration-400 invisible opacity-0 transition delay-100 group-hover:visible group-hover:opacity-100"
        style={{ height: 'calc(100% + 3rem)' /* 3rem is the total vertical margin */ }}
      >
        <img
          src={data.img}
          alt={data.title || "Item"}
          draggable={false}
          className="
            duration
            h-[12vw]
            w-full
            cursor-pointer
            rounded-t-md
            object-cover
            shadow-xl
            transition
          "
        />
        <div
          className="
            absolute
            z-10
            w-full
            rounded-b-md
            bg-zinc-800
            p-2
            shadow-md
            transition
            lg:p-4
            ">
          <div className="flex flex-row items-center gap-3">
            <div className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-white transition hover:bg-neutral-300 lg:h-10 lg:w-10">
              <PlayIcon className="w-4 text-black lg:w-6" />
            </div>
            <div className="group/item ml-auto flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-2 border-white transition hover:border-neutral-300 lg:h-10 lg:w-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24">
                <path
                  d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"
                  fill="#ffffff"
                />
              </svg>
            </div>
          </div>
          <p className="mt-4 font-semibold text-green-400">
            <span className="text-white">{data.title}</span>
          </p>
          <div className="mt-4 flex flex-row items-center gap-2 text-[8px] text-white lg:text-sm">
            <p>{data.type}</p>
          </div>
        </div>
      </div>
    </div>
  );
};