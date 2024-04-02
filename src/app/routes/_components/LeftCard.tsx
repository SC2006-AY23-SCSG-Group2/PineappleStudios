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
    <div className="lg:m-sm card w-full min-w-0 bg-base-100 shadow-xl lg:sticky lg:bottom-[16px] lg:max-w-md">
      <div className="card-title">
        <div className="avatar m-6">
          <div className="h-24 w-24 rounded-full">
            <img src={imageUrl} alt="Profile" />
          </div>
        </div>
        <h2 className="block pt-7 lg:text-2xl">
          {title}
          <span className="mt-2 block lg:text-xl">{subtitle}</span>
        </h2>
      </div>
      <div className="card-body">{children}</div>
    </div>
  );
};

export default LeftCard;
