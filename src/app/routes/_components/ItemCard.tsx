import {NavLink} from "@remix-run/react";
import React, {useState} from "react";
import {SimpleItem} from "../../../lib/interfaces";
import {HeartButton} from "./HeartButton";
import { getSession } from "src/app/session";

interface ItemCardProps {
  data: SimpleItem;
}


export const ItemCard: React.FC<ItemCardProps> = ({data}: ItemCardProps) => {
  const [fav, setFav] = useState(false);

  const type = ["Book", "Song", "Movie"];

  return (
    <div className="col-span group relative m-3 h-[12vw]">
      <NavLink to={`/browser/item/${data.id}`}>
        <img
          src={data.img}
          alt={data.title || "Item"}
          draggable={false}
          className="h-[12vw] w-full cursor-pointer rounded-md object-cover shadow-xl transition group-hover:opacity-90 sm:group-hover:opacity-0"
        />
      </NavLink>
      {data.tag.find((str) => str === "favorite") && (
        <div className="absolute right-2 top-2">
          <HeartButton onClick={() => setFav(!fav)} />
        </div>
      )}
      <div
        className="duration-400 invisible absolute top-0 z-50 w-full scale-0 opacity-0 transition
          delay-100 group-hover:-translate-y-[6vw] group-hover:scale-110 group-hover:opacity-100 sm:visible">
        <NavLink to={`/browser/item/${data.id}`}>
          <img
            src={data.img}
            alt={data.title || "Item"}
            draggable={false}
            className="duration h-[12vw] w-full cursor-pointer rounded-t-md object-cover shadow-xl transition"
          />
        </NavLink>
        <div className="absolute z-50 w-full rounded-b-md bg-zinc-800 p-2 shadow-md transition lg:p-4">
          <div className="flex flex-row items-center gap-3">
            <div className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-2 border-white transition hover:border-neutral-300 lg:h-10 lg:w-10">
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
            Add to favourites
          </div>
          <p className="ml-1 mt-4 font-semibold text-green-400">
            <span className="text-white">{data.title}</span>
          </p>
          <div className="ml-1 mt-4 flex flex-row items-center gap-2 text-[8px] text-white lg:text-sm">
            <p>Type: {type[data.type]}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
