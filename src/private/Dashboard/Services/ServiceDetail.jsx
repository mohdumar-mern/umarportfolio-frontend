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
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
     

      {!loading && service && (
        <div className=" rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold  mb-2">
            {service.title}
          </h2>
          <p className="text-gray-200 mb-1">
            <strong>Category:</strong> {service.category}
          </p>
          <p className="text-gray-200 mb-1">
            <strong>Description:</strong> {service.description}
          </p>
          <p className="text-gray-200 mb-1">
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
                  className="w-64 h-auto object-cover "
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
        
        </div>
        </div>
      )}
    </div>
  );
};

export default ServiceDetail;
