// SomeParentComponent.tsx or similar
import React from "react";

import LeftCard from "../../_components/LeftCard";

export interface userData {
  name: string;
  email: string;
  date: string;
  time: number;
  numOfLikes: number;
  numOfRatings: number;
}

interface UserProfileCardProps {
  user: userData;
}

export const UserProfileCard: React.FC<UserProfileCardProps> = ({user}) => {
  return (
    <>
      <LeftCard
        imageUrl="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
        title={user.name}
        subtitle={user.email}>
        <div>
          <div className="stat">
            <div className="stat-title">Date Joined</div>
            <div className="stat-value">{user.date}</div>
          </div>
          <div className="stat">
            <div className="stat-title">Time Used</div>
            <div className="stat-value">{user.time} hours</div>
          </div>
          <div className="stat">
            <div className="stat-title">Liked items</div>
            <div className="stat-value">{user.numOfLikes}</div>
          </div>
          <div className="stat">
            <div className="stat-title">Ratings Given</div>
            <div className="stat-value">{user.numOfRatings}</div>
          </div>
        </div>
        <div className="card-actions justify-end">
          <button className="btn btn-secondary my-2">Edit Profile</button>
        </div>
      </LeftCard>
    </>
  );
};
