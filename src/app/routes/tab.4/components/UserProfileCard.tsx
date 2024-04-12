// SomeParentComponent.tsx or similar
import {sha256} from "js-sha256";
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
        imageUrl={`https://gravatar.com/avatar/${sha256(
          user.email,
        )}?d=identicon`}
        title={user.name}
        subtitle={user.email}>
        <div>
          <div className="stat">
            <div className="stat-title">Date Joined</div>
            <div className="stat-value max-lg:text-xl">{user.date}</div>
          </div>
          <div className="stat">
            <div className="stat-title">Time Used</div>
            <div className="stat-value max-lg:text-xl">
              {user.time >= 60
                ? `${Math.floor(user.time / 60)} hours ${user.time % 60} minutes`
                : `${user.time} minutes`}
            </div>
          </div>

          <div className="stat">
            <div className="stat-title">Liked items</div>
            <div className="stat-value max-lg:text-xl">{user.numOfLikes}</div>
          </div>
          <div className="stat">
            <div className="stat-title">Ratings Given</div>
            <div className="stat-value max-lg:text-xl">{user.numOfRatings}</div>
          </div>
        </div>
        <div className="card-actions justify-end">
          <button className="btn btn-secondary my-2">Edit Profile</button>
        </div>
      </LeftCard>
    </>
  );
};
