import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  Captions,
  CaptionsIcon,
  ChevronLeft,
  Github,
  Image,
  Layers,
  Link,
  MessageSquareText,
} from "lucide-react";
import {
  addProject,
  updateProject,
  clearError,
  clearMessage,
} from "../../../features/Project/projectSlice";
import Input from "../../../components/UI/Input/Input";

const ProjectAddUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const existingProject = useSelector((state) =>
    state.project.projects.find((project) => project._id === id)
  );
  const { loading, error, message } = useSelector((state) => state.project);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    techStack: "",
    githubLink: "",
    liveDemo: "",
    file: null,
  });

  useEffect(() => {
    if (isEditing && existingProject) {
      setFormData({
        title: existingProject.title || "",
        description: existingProject.description || "",
        techStack: existingProject.techStack || "",
        githubLink: existingProject.githubLink || "",
        liveDemo: existingProject.liveDemo || "",
        file: existingProject.file?.url || null,
      });
    }
  }, [isEditing, existingProject]);

  useEffect(() => {
    if (message || error) {
      const timeout = setTimeout(() => {
        dispatch(clearMessage());
        dispatch(clearError());
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [message, error, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("techStack", formData.techStack);
    form.append("githubLink", formData.githubLink);
    form.append("liveDemo", formData.liveDemo);
    if (formData.file) form.append("file", formData.file);

    try {
      if (isEditing) {
        await dispatch(updateProject({ id, data: form })).unwrap();
      } else {
        await dispatch(addProject(form)).unwrap();
      }
      setTimeout(() => navigate("/dashboard/projects"), 1000);
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-black rounded-lg shadow-md">
      <button
        onClick={() => navigate("/dashboard/projects")}
        className="text-white font-semibold text-lg mb-4 inline-flex items-center"
      >
        <ChevronLeft className="mr-1" />
        Back to Projects
      </button>

      <h2 className="text-2xl font-bold mb-6 text-orange-500">
        {isEditing ? "Update Project" : "Add New Project"}
      </h2>

      {error && (
        <div className="mb-4 p-3 rounded bg-red-100 text-red-700">{error}</div>
      )}
      {message && (
        <div className="mb-4 p-3 rounded bg-green-100 text-green-700">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Project Title"
          type="text"
          name="title"
          placeholder="Project Title"
          value={formData.title}
          onChange={handleChange}
          required
          icon={Captions}
        />

        <div className="space-y-2 relative">
          <label className="block font-medium text-[#BDC3C7]">
            Project Description
          </label>
          <CaptionsIcon className="absolute left-3 top-10 text-orange-500 w-5 h-5" />
          <textarea
            name="description"
            placeholder="Project Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full pl-10 pr-4 py-1 border text-white bg-transparent border-orange-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition resize-none"
          />
        </div>

        <Input
          label="Tech Stack"
          type="text"
          name="techStack"
          placeholder="Tech Stack (comma-separated)"
          value={formData.techStack}
          onChange={handleChange}
          icon={Layers}
        />

        <Input
          label="GitHub Link"
          type="text"
          name="githubLink"
          placeholder="GitHub Link"
          value={formData.githubLink}
          onChange={handleChange}
          icon={Github}
        />

        <Input
          label="Live Demo URL"
          type="text"
          name="liveDemo"
          placeholder="Live Demo URL"
          value={formData.liveDemo}
          onChange={handleChange}
          icon={Link}
        />

        <Input
          label="Project Image"
          type="file"
          name="file"
          onChange={handleFileChange}
          accept="image/*"
          icon={Image}
          required={!isEditing}
        />

        <div className="mt-6 text-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-all duration-300 disabled:opacity-50"
          >
            {loading
              ? isEditing
                ? "Updating..."
                : "Adding..."
              : isEditing
              ? "Update Project"
              : "Add Project"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectAddUpdate;
