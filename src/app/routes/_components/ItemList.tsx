import React from "react";

import ItemCard from "./ItemCard";

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

const ItemList: React.FC<ItemsListProps> = ({title = "", items}) => {
  return (
    <div className="w-full bg-gray-200">
      <h2 className="card-title mx-6 my-4 text-3xl">{title}</h2>
      <div className="mx-6 flex flex-wrap justify-start gap-4">
        {items.map((item, index) => (
          <div key={index} className="w-64 m-1">
            <ItemCard data={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;
