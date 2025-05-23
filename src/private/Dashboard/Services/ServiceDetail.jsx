import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchSingleService } from "../../../features/service/serviceSlice";
import { ArrowLeft, ChevronLeft } from "lucide-react";

const ServiceDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { service, loading, error } = useSelector((state) => state.service);
  console.log(service)

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleService(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500" />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-slate-100 p-6">
     
      {error && <p className="text-red-600 text-center">{error}</p>}

      {!loading && service && (
        <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {service.title}
          </h2>
          <p className="text-gray-600 mb-1">
            <strong>Category:</strong> {service.category}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Description:</strong> {service.description}
          </p>
          <p className="text-gray-600 mb-1">
            <strong>Date Added:</strong>{" "}
            {service.createdAt
              ? new Date(service.createdAt).toLocaleDateString()
              : "N/A"}
          </p>

          {service.file?.url && (
              <div className="mt-6 rounded-xl overflow-hidden ">
                <img
                  src={service.file.url}
                  alt={service.title || "service"}
                  className="w-64 h-auto object-cover shadow-2xl"
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
  );
};

export default ServiceDetail;
