import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSocialLinks } from "../../features/Profile/profileSlice";
import SocialLinksCard from "../UI/card/SocialLilnksCard";

const SkeletonCircle = () => (
  <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse" />
);

const SocialLinksComponents = ({ color }) => {
  const dispatch = useDispatch();
  const { socialLinks, loading, error } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchSocialLinks());
  }, [dispatch]);

  // 🔄 Loading
  if (loading) {
    return (
      <div className="flex gap-3 mt-4">
        {[...Array(5)].map((_, i) => (
          <SkeletonCircle key={i} />
        ))}
      </div>
    );
  }

  // ❌ Error
  if (error) {
    return (
      <div className="text-center text-red-500 mt-4">
        Failed to load social links.
      </div>
    );
  }

  // ⚠️ No Data
  if (!socialLinks) {
    return (
      <p className="text-center text-yellow-400 mt-10">
        No social links available.
      </p>
    );
  }

  // ✅ Success
  return <SocialLinksCard socialLinks={socialLinks} color={color} />;
};

export default SocialLinksComponents;
