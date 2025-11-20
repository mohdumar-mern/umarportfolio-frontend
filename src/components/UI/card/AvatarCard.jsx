
import React from "react";
import avatar from "../../../assets/avatar.jpg";

const AvatarCard = ({ size = "w-64 h-64" }) => {

  return (
    <div className="flex justify-center items-center">
      <div
        className={`relative overflow-hidden rounded-full shadow-xl ${size} aspect-square`}
      >
        <img
          src={avatar}
          alt="User Avatar"
          loading="lazy"
          decoding="async"
          fetchpriority="high"
          className="w-full h-full object-cover transition-transform duration-300  hover:scale-105"
        />
      </div>
    </div>
  );
};

export default React.memo(AvatarCard);
