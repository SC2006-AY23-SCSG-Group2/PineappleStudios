import React from "react";

import {ItemCard} from "../../_components/ItemCard";

interface Item {
  thumbnailUrl?: string;
  duration?: string;
  genre?: string;
  itemTitle?: string;
  placeholder?: string;
  showHeart?: boolean;
}

interface ItemsListProps {
  title?: string;
  items: Item[];
}

export const HistoryItemList: React.FC<ItemsListProps> = ({
  title = "",
  items,
}) => {
  return (
    <div className="card w-full">
      <h2 className="card-title mx-6 my-4 text-2xl lg:text-3xl">{title}</h2>
      <div className="m-6 grid grid-cols-3 gap-1">
        {items.map((item, index) => (
          <div key={index} className="my-2 lg:my-4">
            <ItemCard data={item} />
          </div>
        ))}
      </div>
    </div>
  );
};
