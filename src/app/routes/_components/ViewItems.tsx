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
        <h2 className="card-title mx-2 text-3xl mb-4">{title}</h2>
        <div className="flex flex-row flex-wrap overflow-x-auto">
          {items.map((item, index) => (
            <div key={index} className="avatar flex flex-col">
              <div className="mx-2 h-32 w-32 rounded-3xl lg:h-48 lg:w-48 my-2">
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
