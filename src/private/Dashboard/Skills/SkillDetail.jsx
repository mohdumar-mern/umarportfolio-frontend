import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { fetchSingleSkill } from "../../../features/Skills/skillSlice";

const SkillDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { skill, loading, error } = useSelector((state) => state.skill);

  useEffect(() => {
    if (id) dispatch(fetchSingleSkill(id));
  }, [dispatch, id]);

  const renderDetailItem = (label, value) => (
    <p className="text-gray-700 text-base mb-2">
      <span className="font-medium text-gray-900">{label}:</span>{" "}
      {value || "N/A"}
    </p>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Error Message */}
        {error && (
          <div className="text-center text-red-600 font-semibold mb-4">
            {error}
          </div>
        )}

        {/* Skill Detail Card */}
        {skill && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              {skill.name}
            </h2>

            {renderDetailItem("Category", skill.category)}
            {renderDetailItem("Level", skill.level)}
            {renderDetailItem(
              "Date Added",
              skill.createdAt
                ? new Date(skill.createdAt).toLocaleDateString()
                : "N/A"
            )}

            {skill.file?.url && (
              <div className="mt-6 rounded-xl overflow-hidden border border-gray-200">
                <img
                  src={skill.file.url}
                  alt={skill.title || "Skill"}
                  className="w-full object-cover"
                />
              </div>
            )}

             {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            <ChevronLeft size={18} />
            Back to Skills List
          </button>
          <button
            onClick={() => navigate(`/dashboard/skills/${id}/edit`)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Edit Skill
          </button>
        </div>
          </div>
        )}

       
      </div>
    </div>
  );
};

export default SkillDetail;
