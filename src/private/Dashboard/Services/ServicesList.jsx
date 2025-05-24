import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Trash, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Skeleton from "../../../components/UI/Skiliton/tableSkeleton";
import {
  deleteservice,
  fetchServices,
} from "../../../features/service/serviceSlice";

const ServicesList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { services, loading, error } = useSelector((state) => state.service);

  // Fetch services when the component mounts
  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  // Handle delete functionality
  const handleDelete = useCallback(
    (id) => {
      if (window.confirm("Are you sure you want to delete this service?")) {
        dispatch(deleteservice(id))
          .unwrap()
          .then(() => {
            dispatch(fetchServices());
          })
          .catch((err) => {
            console.error("Failed to delete service:", err);
          });
      }
    },
    [dispatch]
  );

  // Handle viewing a service
  const handleView = useCallback(
    (id) => {
      navigate(`/dashboard/services/${id}/view`);
    },
    [navigate]
  );

  // Handle adding a new service
  const handleAddService = () => {
    navigate("/dashboard/services/add");
  };

  return (
    <div className="p-4">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Services List</h2>
        <button
          onClick={handleAddService}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
        >
          + Add Service
        </button>
      </div>

      {/* Loading */}
      {loading && <Skeleton rows={6} cols={4} />}

      {/* Error */}
      {error && !loading && (
        <p className="text-red-600 text-center py-4">{error}</p>
      )}

      {/* Empty State */}
      {!loading && services?.length === 0 && (
        <div className="text-center py-4 text-gray-600">
          <p>No services found.</p>
          <button
            onClick={handleAddService}
            className="mt-4 text-orange-600 hover:text-orange-800 transition"
          >
            + Add Your First Service
          </button>
        </div>
      )}

      {/* Table */}
      {!loading && services?.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-orange-300">
            <thead className="bg-orange-100 text-black">
              <tr>
                <th className="px-4 py-2 border">Srno.</th>
                <th className="px-4 py-2 border">Title</th>

                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, index) => (
                <tr key={service?._id} className="hover:bg-[#111] text-gray-300">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{service?.title}</td>

                  <td className="px-4 py-2 border">
                    {service?.createdAt
                      ? new Date(service.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    <div className="flex justify-center items-center gap-3">
                      <button
                        className="text-blue-600 hover:text-blue-800 transition"
                        title="View"
                        onClick={() => handleView(service._id)}
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800 transition"
                        title="Delete"
                        onClick={() => handleDelete(service._id)}
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ServicesList;
