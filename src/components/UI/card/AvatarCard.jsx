import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAvatar } from "../../../features/Profile/profileSlice";
import { CloudCog } from "lucide-react";

const AvatarCard = ({ size = "w-64 h-64" }) => {
  const dispatch = useDispatch();
  const { avatar, loading, error } = useSelector((state) => state.profile);
  console.log(avatar);
  

  useEffect(() => {
    if (!avatar) {
      dispatch(fetchAvatar());
    }
  }, [dispatch, avatar]);

  if (loading) {
    return (
      <div className="flex justify-center items-center" role="status" aria-label="Loading avatar">
        <div
          className={`rounded-full bg-gray-300 border animate-pulse ${size} aspect-square`}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="flex justify-center items-center text-red-500"
        role="alert"
        aria-label="Avatar load error"
      >
        Failed to load avatar.
      </div>
    );
  }

  if (!avatar) {
    return null; // avoids flicker on first render or fallback
  }

  return (
    <div className="flex justify-center items-center">
      <div
        className={`relative overflow-hidden rounded-full shadow-xl ${size} aspect-square`}
      >
        <img
          src={avatar}
          alt="User Avatar"
          loading="lazy"
          // decoding="async"
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
    </div>
  );
};

export default React.memo(AvatarCard);
