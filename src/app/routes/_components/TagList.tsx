import React from "react";

import Tag from "./Tag";

interface Category {
  name: string;
  values: string[];
}

interface TagsProps {
  tag: Category[];
  colors: string[];
  buttonType: "close" | "plus" | "none";
}

export const TagList: React.FC<TagsProps> = ({tag, colors, buttonType}) => {
  return (
    <>
      {tag.map((tag, i) => (
        <React.Fragment key={i}>
          {tag.values.map((value, j) => (
            <Tag
              key={`${i}-${j}`}
              color={colors[i % colors.length]}
              buttonType={buttonType} // Pass the button type to each Tag
            >
              {value}
            </Tag>
          ))}
        </React.Fragment>
      ))}
    </>
  );
};
