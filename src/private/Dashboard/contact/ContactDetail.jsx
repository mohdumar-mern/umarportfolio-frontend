import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleContact } from "../../../features/Contact/contactSlice";

const ContactDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { contact, loading, error } = useSelector((state) => state.contact);

  useEffect(() => {
    if (id) dispatch(fetchSingleContact(id));
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="text-center mt-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mx-auto"></div>
      </div>
    );
  }

  if (error || !contact) {
    return (
      <div className="p-6 text-center text-gray-700">
        <p>{error || "contact not found."}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-orange-500 hover:underline"
        >
          Back to contact List
        </button>
      </div>
    );
  }

  return (
    <div className="p-6  rounded-lg shadow-md max-w-4xl mx-auto mt-4">
      <h2 className="text-2xl font-bold text-white mb-6">Contact Details</h2>

      <div className="space-y-4 text-gray-300">
        <p>
          <strong>Name:</strong> {contact.name || "N/A"}
        </p>
        <p>
          <strong>Email:</strong> {contact.email || "N/A"}
        </p>
        <p>
          <strong>Phone:</strong> {contact.phone || "N/A"}
        </p>
        <p>
          <strong>Message:</strong> {contact.message || "N/A"}
        </p>
        <p>
          <strong>Created At:</strong>{" "}
          {contact.createdAt
            ? new Date(contact.createdAt).toLocaleString()
            : "N/A"}
        </p>

      
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Back to contact List
        </button>
       
      </div>
    </div>
  );
};

export default ContactDetail;
