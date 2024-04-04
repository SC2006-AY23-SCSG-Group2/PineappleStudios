import React from "react";

import {SimpleItem} from "../../../../lib/interfaces";
import {ItemCard} from "../../_components/ItemCard";

interface ItemsListProps {
  title?: string;
  items: SimpleItem[];
}

export const HistoryItemList: React.FC<ItemsListProps> = ({
  title = "",
  items,
}) => {
  return (
    <div className="card w-full">
      <div className="card-body">
        <h2 className="card-title mx-6 my-4 text-2xl lg:text-3xl">{title}</h2>
        <div className="m-6 grid grid-cols-4 gap-1 max-md:m-0 max-md:grid-cols-3 lg:grid-cols-3">
          {items.map((item, index) => (
            <div key={index} className="my-2 lg:my-4">
              <ItemCard data={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
