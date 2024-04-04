import React from "react";

import {ItemCard} from "./ItemCard";

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

export const ItemList: React.FC<ItemsListProps> = ({title = "", items}) => {
  return (
    <div className="card w-full">
      <h2 className="card-title mx-6 my-4 text-2xl lg:text-3xl">{title}</h2>
      <div className="m-6 grid grid-cols-4 gap-4 lg:grid-cols-6">
        {items.map((item, index) => (
          <div key={index} className="">
            <ItemCard data={item} />
          </div>
        ))}
      </div>
    </div>
  );
};
