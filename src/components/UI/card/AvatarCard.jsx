import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAvatar } from "../../../features/Profile/profileSlice";

const AvatarCard = ({ size = "w-64 h-64" }) => {
  const dispatch = useDispatch();
  const { avatar, loading, error } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchAvatar());
  }, [dispatch]);

  if (loading || !avatar) {
    return (
      <div className="flex justify-center items-center">
        <div
          className={`rounded-full bg-gray-300 border animate-pulse ${size} aspect-square`}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center text-red-500">
        Failed to load avatar.
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center">
      <div
        className={`relative overflow-hidden rounded-full  shadow-xl ${size} aspect-square`}
      >
        <img
          src={avatar}
          alt="User Avatar"
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
    </div>
  );
};

export default AvatarCard;
