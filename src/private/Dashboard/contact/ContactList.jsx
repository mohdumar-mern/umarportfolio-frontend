import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Eye, Trash } from "lucide-react";
import {
  deleteContactMessage,
  fetchContacts,
  clearContactStatus,
} from "../../../features/Contact/contactSlice";
import Pagination from "../../../components/UI/pagination/Pagination";
import Skeleton from "../../../components/UI/Skeleton/TableSkeleton";


const ContactList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    contacts,
    loading,
    error,
    message,
    currentPage,
    totalPages,
    contactPerPage,
  } = useSelector((state) => state.contact); // ✅ correct slice name

  useEffect(() => {
    dispatch(fetchContacts({ page: currentPage, limit: contactPerPage }));
  }, [dispatch, currentPage, contactPerPage]);

  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        dispatch(clearContactStatus());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, error, dispatch]);

  const handleDelete = useCallback(
    (id) => {
      if (window.confirm("Are you sure you want to delete this contact message?")) {
        dispatch(deleteContactMessage(id))
          .unwrap()
          .then(() =>
            dispatch(fetchContacts({ page: currentPage, limit: contactPerPage }))
          )
          .catch((err) => console.error("Failed to delete contact:", err));
      }
    },
    [dispatch, currentPage, contactPerPage]
  );

  const handlePageChange = useCallback(
    (page) => {
      if (page > 0 && page <= totalPages) {
        dispatch(fetchContacts({ page, limit: contactPerPage }));
      }
    },
    [dispatch, totalPages, contactPerPage]
  );

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Contact Messages</h2>
      </div>

      {/* Messages */}
      {(message || error) && (
        <div
          className={`mb-4 p-3 rounded-md ${
            error ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
          }`}
        >
          {message || error}
        </div>
      )}

      {/* Loading */}
      {loading && <Skeleton rows={6} cols={4} />}

      {/* Empty */}
      {!loading && contacts?.length === 0 && (
        <p className="text-center text-gray-600">No contact messages found.</p>
      )}

      {/* Table */}
      {!loading && contacts?.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100 text-gray-900">
              <tr>
                <th className="px-4 py-2 border">Sr No</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, index) => (
                <tr key={contact._id}                   className="hover:bg-[#111] text-gray-300"
>
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{contact.name}</td>
                  <td className="px-4 py-2 border">{contact.email}</td>
                  <td className="px-4 py-2 border text-center">
                    <button
                      title="View"
                      className="text-green-600 hover:text-green-800 transition mr-2"
                      onClick={() =>  navigate(`/dashboard/contacts/${contact._id}/view`)}
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      title="Delete"
                      className="text-red-600 hover:text-red-800 transition"
                      onClick={() => handleDelete(contact._id)}
                    >
                      <Trash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default ContactList;
