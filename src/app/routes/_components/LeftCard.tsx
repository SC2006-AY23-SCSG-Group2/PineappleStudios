// LeftCard.tsx
import React, {ReactNode} from "react";

interface LeftCardProps {
  imageUrl: string;
  title: string;
  subtitle: string;
  children: ReactNode;
}

const LeftCard: React.FC<LeftCardProps> = ({
  imageUrl,
  title,
  subtitle,
  children,
}) => {
  return (
    <div className="card m-4 w-1/3 min-w-0 bg-base-100 shadow-xl">
      <div className="avatar">
        <div className="w-36 rounded-full">
          <img src={imageUrl} alt="Profile" />
        </div>
        <h2 className="card-title mx-14 block pt-7 text-2xl">
          {title}
          <span className="mt-2 block text-xl">{subtitle}</span>
        </h2>
      </div>
      <div className="card-body">
        {children}
        <div className="card-actions justify-end">
          <button className="btn btn-secondary my-2">Edit Profile</button>
        </div>
      </div>
    </div>
  );
};

export default LeftCard;
