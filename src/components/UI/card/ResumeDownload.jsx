import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchResume } from "../../../features/Profile/profileSlice";

// 🔧 Skeleton Block UI
const SkeletonBlock = ({ width = "w-full", height = "h-4" }) => (
  <div className={`bg-gray-300 rounded-md animate-pulse ${width} ${height}`} />
);

const ResumeDownload = () => {
  const dispatch = useDispatch();
  const { resume, error, loading } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchResume());
  }, [dispatch]);

  return (
    <div className="text-center">
      {/* 🔄 Show skeleton while loading */}
      {loading && <SkeletonBlock width="w-32" height="h-10" />}

      {/* ❌ Show error if available */}
      {error && !loading && (
        <p className="text-red-500 text-sm mt-2">Failed to load resume</p>
      )}

      {/* ✅ Resume Download Button */}
      {!loading && resume && (
        <a
          href={resume}
          download="Mohd_Umar_Resume.pdf"
          target="_blank" rel="noopener noreferrer"
          className="inline-block bg-orange-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-orange-600 transition-colors duration-300 ease-in-out"
        >
          Download Resume
        </a>
      )}
    </div>
  );
};

export default ResumeDownload;
