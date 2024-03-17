import React, {FC, ReactNode, useState} from "react";

import CloseButton from "./CloseButton";

interface PreferenceProps {
  children: ReactNode;
  color: string;
}

const Preference: FC<PreferenceProps> = ({children, color}) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClick = () => {
    setIsVisible(false);
  };

  return (
    <div
      className={`mx-1 my-2 flex items-center justify-center ${isVisible ? "block" : "hidden"}`}>
      <div className="relative">
        <div className="flex min-w-40 items-center justify-center text-xs">
          <button className={`btn btn-${color} no-animation w-full text-lg`}>
            {children}
          </button>
        </div>
        <CloseButton onClick={handleClick} />
      </div>
    </div>
  );
};

export default Preference;
