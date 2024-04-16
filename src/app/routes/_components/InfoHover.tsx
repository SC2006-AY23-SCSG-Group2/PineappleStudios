// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";

interface InfoHoverProps {
  info?: string;
}

export default function InfoHover({
  info = "This is your History",
}: InfoHoverProps): React.JSX.Element {
  return (
    <div className="tooltip" data-tip={info}>
      <button className="btn-circle btn-ghost no-animation btn-xs">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12 2c5.523 0 10 4.477 10 10a10 10 0 0 1-19.995.324L2 12l.004-.28C2.152 6.327 6.57 2 12 2m0 9h-1l-.117.007a1 1 0 0 0 0 1.986L11 13v3l.007.117a1 1 0 0 0 .876.876L12 17h1l.117-.007a1 1 0 0 0 .876-.876L14 16l-.007-.117a1 1 0 0 0-.764-.857l-.112-.02L13 15v-3l-.007-.117a1 1 0 0 0-.876-.876zm.01-3l-.127.007a1 1 0 0 0 0 1.986L12 10l.127-.007a1 1 0 0 0 0-1.986z"
          />
        </svg>
      </button>
    </div>
  );
}
