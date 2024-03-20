import React from "react";

interface Item {
  imageSrc: string;
  placeholder: string;
}

interface ViewItemsProps {
  title: string;
  items: Item[];
}

export const ViewItems: React.FC<ViewItemsProps> = ({title, items}) => {
  return (
    <div className="card bg-gray-200">
      <div className="card-body">
        <div className="flex flex-row">
          <h2 className="card-title mx-2 text-2xl">{title}</h2>
        </div>
        <div className="my-4 flex flex-row flex-wrap overflow-x-auto">
          {items.map((item, index) => (
            <div key={index} className="avatar flex flex-col">
              <div className="mx-12 w-32 rounded">
                <img src={item.imageSrc} alt="Item" />
              </div>
              <div className="h-8 text-center">{item.placeholder}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
