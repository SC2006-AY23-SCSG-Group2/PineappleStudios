import {NavLink} from "@remix-run/react";
import React from "react";

import {SimpleItem} from "../../../lib/interfaces";

interface ItemCardProps {
  data: SimpleItem;
}

export const ItemSmallCard: React.FC<ItemCardProps> = ({
  data,
}: ItemCardProps) => {
  return (
    <>
      {/*<div className="stack">*/}
      <div className="card h-44 max-h-44 w-32 max-w-32 bg-base-200 max-md:h-32 max-md:max-h-32 max-md:w-24 max-md:max-w-24 lg:h-44 lg:max-h-44 lg:w-32 lg:max-w-32 xl:h-52 xl:max-h-52 xl:w-40 xl:max-w-40">
        <figure>
          <NavLink to={`/browser/item/${data.id}`}>
            <img
              src={data.img}
              alt={data.title || "Item"}
              draggable={false}
              className="h-32 max-h-32 min-h-32 w-32 min-w-32 max-w-32 rounded-md shadow-xl max-md:h-24 max-md:max-h-24 max-md:min-h-24 max-md:w-24 max-md:min-w-24 max-md:max-w-24 lg:h-32 lg:max-h-32  lg:min-h-32 lg:w-32 lg:min-w-32 lg:max-w-32 xl:h-40 xl:max-h-40  xl:min-h-40 xl:w-40  xl:min-w-40 xl:max-w-40"
            />
          </NavLink>
        </figure>
        {/*h-12 max-h-12 w-32 max-w-32*/}
        <div className="card-body m-0 h-12 max-h-12 p-0">
          <p className="h-12 max-h-12 truncate text-ellipsis text-balance p-2 text-sm max-md:text-xs">
            {data.title}
          </p>
        </div>
      </div>

      {/*  <figure>*/}
      {/*    <NavLink to={`/browser/item/${data.id}`}>*/}
      {/*      <img*/}
      {/*        src={data.img}*/}
      {/*        alt={data.title || "Item"}*/}
      {/*        draggable={false}*/}
      {/*        className="h-32 max-h-32 w-32 max-w-32 rounded-md shadow-xl max-md:h-24 max-md:max-h-24 max-md:w-24 max-md:max-w-24 lg:h-36 lg:max-h-36 lg:w-36 lg:max-w-36 xl:h-40 xl:max-h-40 xl:w-40 xl:max-w-40"*/}
      {/*      />*/}
      {/*    </NavLink>*/}
      {/*  </figure>*/}
      {/*</div>*/}
    </>
  );
};