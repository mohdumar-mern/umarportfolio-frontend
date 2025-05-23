import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  File,
  Github,
  Image,
  Instagram,
  Linkedin,
  Twitter,
  User,
  Youtube,
} from "lucide-react";
import { fetchProfile, updateProfile } from "../../../features/Profile/profileSlice";
import Input from "../../../components/UI/Input/Input";

const UpdateProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { profile } = useSelector((state) => state.profile);
  const [formData, setFormData] = useState({
    name: "",
    avatar: null,
    resume: null,
    github: "",
    linkedin: "",
    twitter: "",
    instagram: "",
    youtube: "",
  });

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile && profile.socialLinks) {
      setFormData({
        name: profile.name || "",
        avatar: null,
        resume: null,
        github: profile.socialLinks.github || "",
        linkedin: profile.socialLinks.linkedin || "",
        twitter: profile.socialLinks.twitter || "",
        instagram: profile.socialLinks.instagram || "",
        youtube: profile.socialLinks.youtube || "",
      });
    }
  }, [profile]);

  const handleChange = useCallback((e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files?.[0] || value,
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("name", formData.name);
      if (formData.avatar) data.append("avatar", formData.avatar);
      if (formData.resume) data.append("resume", formData.resume);

      data.append("github", formData.github);
      data.append("linkedin", formData.linkedin);
      data.append("twitter", formData.twitter);
      data.append("instagram", formData.instagram);
      data.append("youtube", formData.youtube);

      await dispatch(updateProfile({ id, data })).unwrap();
      navigate("/dashboard/profile");
    } catch (error) {
      console.error("Update profile error:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-black rounded-lg shadow-md">
      <button
        type="button"
        onClick={() => navigate("/dashboard/profile")}
        className="text-white font-semibold text-lg mb-4 inline-flex items-center"
      >
        <ArrowLeft className="mr-2" />
        Back to Profile
      </button>

      <h2 className="text-2xl font-bold mb-6 text-center text-orange-500">
        Update Profile
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Name"
          type="text"
          name="name"
          placeholder="Mohd Umar"
          value={formData.name}
          onChange={handleChange}
          required
          icon={User}
        />

        <Input
          label="Avatar Image"
          type="file"
          name="avatar"
          onChange={handleChange}
          accept="image/*"
          icon={Image}
        />

        <Input
          label="Resume (PDF/Doc)"
          type="file"
          name="resume"
          onChange={handleChange}
          accept=".pdf,.doc,.docx"
          icon={File}
        />

        <Input
          label="GitHub"
          type="url"
          name="github"
          placeholder="https://github.com/mohdumar-mern"
          value={formData.github}
          onChange={handleChange}
          icon={Github}
        />

        <Input
          label="LinkedIn"
          type="url"
          name="linkedin"
          placeholder="https://www.linkedin.com/in/mohd-umar-mern-stack-developer"
          value={formData.linkedin}
          onChange={handleChange}
          icon={Linkedin}
        />

        <Input
          label="Twitter"
          type="url"
          name="twitter"
          placeholder="https://x.com/UmarKhan9628"
          value={formData.twitter}
          onChange={handleChange}
          icon={Twitter}
        />

        <Input
          label="Instagram"
          type="url"
          name="instagram"
          placeholder="https://www.instagram.com/merndeveloper_001"
          value={formData.instagram}
          onChange={handleChange}
          icon={Instagram}
        />

        <Input
          label="YouTube"
          type="url"
          name="youtube"
          placeholder="https://www.youtube.com/@merndeveloper_001"
          value={formData.youtube}
          onChange={handleChange}
          icon={Youtube}
        />

        <div className="text-center">
          <button
            type="submit"
            className="bg-orange-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-orange-600 transition duration-200"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
