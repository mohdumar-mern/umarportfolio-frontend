import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Cog, Image } from "lucide-react"; // ✅ Fixed import

import { addService } from "../../../features/service/serviceSlice";
import Input from "../../../components/UI/Input/Input";

const AddService = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, message } = useSelector((state) => state.service);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    file: "",
    category: "Frontend",
    status: "active",
  });

  const categories = ["Frontend", "Backend", "Database", "Tools", "Other"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("file", formData.file);
    data.append("category", formData.category);
    data.append("status", formData.status);
  
    dispatch(addService(data))
      .unwrap()
      .then(() => {
        navigate("/dashboard/services");
      })
      .catch((err) => {
        console.error("Failed to add service:", err);
      });
  };
  

  return (
    <div className="max-w-md mx-auto p-6 bg-black rounded-lg shadow">
      <button
        onClick={() => navigate("/dashboard/skills")}
        className="text-white font-semibold text-lg mb-4 inline-flex items-center"
      >
        <ChevronLeft className="mr-1" />
        Back to Skills
      </button>
      <h2 className="text-2xl font-semibold mb-4 text-orange-500">Add Service</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            label="Service Title"
            placeholder="Enter service title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            icon={Cog}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter service description"
            required
            className="w-full bg-black border border-orange-500 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            rows="4"
          ></textarea>
        </div>

        <div>
          <Input
            label="Skill Image"
            type="file"
            name="file"
            onChange={handleFileChange}
            accept="image/*"
            icon={Image}
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-[#BDC3C7]">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full bg-black border border-orange-500 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat} className="bg-black text-orange-500">
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 text-[#BDC3C7]">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full bg-black border border-orange-500 rounded-lg p-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="active" className="bg-black text-orange-500">
              Active
            </option>
            <option value="inactive" className="bg-black text-orange-500">
              Inactive
            </option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
        >
          {loading ? "Adding..." : "Add Service"}
        </button>
      </form>

      {message && <p className="mt-4 text-center text-red-600">{message}</p>}
    </div>
  );
};

export default AddService;
