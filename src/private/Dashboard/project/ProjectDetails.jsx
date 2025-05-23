import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProject } from "../../../features/Project/projectSlice";

const ProjctDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { project, loading, error } = useSelector((state) => state.project);
  console.log(project);

  useEffect(() => {
    if (id) dispatch(fetchSingleProject(id));
  }, [dispatch, id]);

  if (loading) {
    return (
        <div className="text-center mt-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mx-auto"></div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="p-6 text-center text-gray-700">
        <p>{error || "Project not found."}</p>
        <button
          onClick={() => navigate("/dashboard/projects")}
          className="mt-4 text-blue-600 hover:underline"
        >
          Back to Project List
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto mt-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Project Details</h2>

      <div className="space-y-4 text-gray-700">
        <p>
          <strong>Title:</strong> {project.title || "N/A"}
        </p>
        <p>
          <strong>Description:</strong> {project.description || "N/A"}
        </p>
        <p>
          <strong>Tech Stack:</strong> {project.techStack?.join(", ") || "N/A"}
        </p>
        <p>
          <strong>GitHub:</strong>{" "}
          {project.githubLink ? (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {project.githubLink}
            </a>
          ) : (
            "N/A"
          )}
        </p>
        <p>
          <strong>Live Link:</strong>{" "}
          {project.liveDemo ? (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {project.liveDemo}
            </a>
          ) : (
            "N/A"
          )}
        </p>
        <p>
          <strong>Created At:</strong>{" "}
          {project.createdAt
            ? new Date(project.createdAt).toLocaleString()
            : "N/A"}
        </p>

        {project.file && (
            <div className="relative w-full  rounded-lg overflow-hidden">
              <img
                src={project.file?.url}
                alt={project.title || "Project"}
                className="w-64 h-auto object-cover"
              />
          </div>
        )}
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={() => navigate("/dashboard/projects")}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Back to Project List
        </button>
        <button
          onClick={() => navigate(`/dashboard/projects/${id}/edit`)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Edit Project
        </button>
      </div>
    </div>
  );
};

export default ProjctDetail;
