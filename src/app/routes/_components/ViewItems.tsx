import React, {useState} from "react";

import HeartButton from "./HeartButton";

interface Item {
  imageSrc: string;
  placeholder: string;
  showHeart?: boolean;
}

interface ViewItemsProps {
  title: string;
  items: Item[];
}

export const ViewItems: React.FC<ViewItemsProps> = ({title, items}) => {
  const [fav, setFav] = useState(false);

  return (
    <div className="card bg-gray-200">
      <div className="card-body">
        <h2 className="card-title mx-2 mb-4 text-3xl">{title}</h2>
        <div className="flex flex-row flex-wrap overflow-x-auto">
          {items.map((item, index) => (
            <div key={index} className="avatar flex flex-col">
              <div className="relative mx-2 my-2 h-44 w-44 rounded-3xl lg:h-48 lg:w-48">
                <img src={item.imageSrc} alt={item.placeholder} />
                {(item.showHeart || false) && (
                  <HeartButton onClick={() => setFav(!fav)} />
                )}
              </div>
              <div className="h-8 text-center">{item.placeholder}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
