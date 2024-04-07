import React, { useState } from "react";
import { SimpleItem } from "../../../lib/interfaces";
import { ItemCard } from "./ItemCard";

interface ItemsListProps {
  title?: string;
  items: SimpleItem[];
}

export const ItemList: React.FC<ItemsListProps> = ({
  title = "",
  items,
}: ItemsListProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6; 
  const nMinusOne = itemsPerPage - 1;
  const maxPage = Math.ceil(items.length / nMinusOne) - 1;

  const nextPage = () => {
    setCurrentPage((current) => (current < maxPage ? current + 1 : current));
  };

  const prevPage = () => {
    setCurrentPage((current) => (current > 0 ? current - 1 : current));
  };

  const itemWidth = 100 / nMinusOne; // as a percentage

  return (
    <div className="card w-full overflow-visible"> 
      <h2 className="card-title mx-6 my-4 text-2xl lg:text-3xl">{title}</h2>
      <div className="relative">
        {currentPage > 0 && (
          <button className="absolute left-0 z-30 flex h-full items-center justify-center p-4" onClick={prevPage} style={{ top: '50%', transform: 'translateY(-50%)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
          </button>
        )}
        <div className="overflow-visible"> 
          <div className="flex transition-transform duration-700 ease-in-out"
               style={{ transform: `translateX(-${currentPage * (100 / itemsPerPage) * nMinusOne}%)` }}>
            {items.map((item, index) => (
              <div key={index} className="flex-shrink-0" style={{ width: `${itemWidth}%` }}>
                <ItemCard data={item} />
              </div>
            ))}
          </div>
        </div>
        {currentPage < maxPage && (
          <button className="absolute right-0 z-30 flex h-full items-center justify-center p-4" onClick={nextPage} style={{ top: '50%', transform: 'translateY(-50%)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
