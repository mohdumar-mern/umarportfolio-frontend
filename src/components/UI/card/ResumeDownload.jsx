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
    if (!resume) {
      dispatch(fetchResume());
    }
  }, [dispatch, resume]);

  const handleDownload = () => {
    if (resume) {
      window.open(resume, "_blank", "noopener,noreferrer");
    } else {
      console.error("Resume URL is not available.");
    }
  };

  return (
    <div className="text-center">
      {loading && <SkeletonBlock width="w-32" height="h-10" />}
      {error && !loading && (
        <p className="text-red-500 text-sm mt-2">❌ Failed to load resume</p>
      )}
      {!loading && resume && (
        <button
          onClick={handleDownload}
          className="inline-block bg-orange-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-orange-600 transition-colors duration-300 ease-in-out"
          aria-label="View Mohd Umar Resume"
        >
          Resume
        </button>
      )}
    </div>
  );
};

export default ResumeDownload;
