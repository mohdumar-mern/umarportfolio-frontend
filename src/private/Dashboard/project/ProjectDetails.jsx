import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleSkill } from "../../../features/Skills/skillSlice";

const SkillDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { skill, loading, error } = useSelector((state) => state.skill);
  console.log(skill);

  useEffect(() => {
    if (id) dispatch(fetchSingleSkill(id));
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="text-center mt-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mx-auto"></div>
      </div>
    );
  }

  if (error || !skill) {
    return (
      <div className="p-6 text-center text-gray-700">
        <p>{error || "Skill not found."}</p>
        <button
          onClick={() => navigate("/dashboard/skills")}
          className="mt-4 text-blue-600 hover:underline"
        >
          Back to Skill List
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto mt-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Skill Details</h2>

      <div className="space-y-4 text-gray-700">
        <p>
          <strong>Name:</strong> {skill.name || "N/A"}
        </p>
        <p>
          <strong>Category:</strong> {skill.category || "N/A"}
        </p>
        <p>
          <strong>Level:</strong> {skill.level || "N/A"}
        </p>
        <p>
          <strong>Created At:</strong>{" "}
          {skill.createdAt
            ? new Date(skill.createdAt).toLocaleString()
            : "N/A"}
        </p>

        {skill.file?.url && (
          <div className="relative w-full rounded-lg overflow-hidden">
            <img
              src={skill.file.url}
              alt={skill.name || "Skill"}
              className="w-64 h-auto object-cover"
            />
          </div>
        )}
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Back to Skill List
        </button>
        <button
          onClick={() => navigate(`/dashboard/skills/${id}/edit`)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Edit Skill
        </button>
      </div>
    </div>
  );
};

export default SkillDetail;
