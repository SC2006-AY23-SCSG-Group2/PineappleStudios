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
        <h2 className="card-title mx-2 text-3xl">{title}</h2>
        <div className="flex flex-row flex-wrap justify-between overflow-x-auto">
          {items.map((item, index) => (
            <div key={index} className="avatar flex flex-col">
              <div className="mx-2 h-28 w-28 rounded-3xl lg:h-32 lg:w-32 ">
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
