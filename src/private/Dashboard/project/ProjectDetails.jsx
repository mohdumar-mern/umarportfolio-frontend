// src/pages/ProjectDetails.jsx
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProject } from "../../../features/Project/projectSlice";
import { ChevronLeft } from "lucide-react";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { project, loading, error } = useSelector((state) => state.project);

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleProject(id));
    }
  }, [id, dispatch]);

  if (loading) {
    return (
      <div className="text-center mt-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mx-auto"></div>
      </div>
    );
  }

  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!project) return <p className="text-center">No project found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
      <p className="mb-2">{project.description}</p>
      <p className="mb-2">
        <strong>Tech Stack:</strong> {project.techStack}
      </p>
      <p className="mb-2">
        <strong>GitHub:</strong>{" "}
        <a
          href={project.githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          {project.githubLink}
        </a>
      </p>
      <p className="mb-4">
        <strong>Live Demo:</strong>{" "}
        <a
          href={project.liveDemo}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-600 underline"
        >
          {project.liveDemo}
        </a>
      </p>

      {project.file?.url && (
        <img
          src={project.file.url}
          alt={project.title}
          className="w-64 h-auto rounded-lg shadow mb-6"
        />
      )}

      {/* Action Buttons */}
      <div className="mt-6 flex flex-wrap gap-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
        >
          <ChevronLeft size={18} />
          Back to Project List
        </button>
        <button
          onClick={() => navigate(`/dashboard/projects/${id}/edit`)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Edit Project
        </button>
      </div>
    </div>
  );
};

export default ProjectDetails;
