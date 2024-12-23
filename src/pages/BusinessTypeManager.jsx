import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BusinessTypeManager = () => {
  const [businessTypes, setBusinessTypes] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newBusinessType, setNewBusinessType] = useState({ name: "", description: "" });
  const [editBusinessType, setEditBusinessType] = useState(null);
  const [businessTypeIdToDelete, setBusinessTypeIdToDelete] = useState(null);
  const [validationError, setValidationError] = useState("");
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  // Fetch business types from backend
  useEffect(() => {
    const fetchBusinessTypes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/business-types");
        setBusinessTypes(response.data);
      } catch (error) {
        console.error("Error fetching business types:", error);
        toast.error("Failed to fetch business types.");
      }
    };
    fetchBusinessTypes();
  }, []);

  // Pagination Logic
  const totalPages = Math.ceil(businessTypes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBusinessTypes = businessTypes.slice(startIndex, startIndex + itemsPerPage);

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  // Handle input changes with validation
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const isNumber = /^[0-9]+$/;

    if (isNumber.test(value)) {
      setValidationError("Business Type name cannot contain numbers.");
    } else {
      setValidationError("");
      if (showEditModal) {
        setEditBusinessType({ ...editBusinessType, [name]: value });
      } else {
        setNewBusinessType({ ...newBusinessType, [name]: value });
      }
    }
  };

  // Add business type
  const handleAddBusinessType = async () => {
    if (!newBusinessType.name || validationError) {
      setValidationError("Please enter a valid name without numbers.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/business-types", newBusinessType);
      setBusinessTypes([...businessTypes, response.data.businessType]);
      setShowAddModal(false);
      setNewBusinessType({ name: "", description: "" });
      toast.success("Business type added successfully.");
    } catch (error) {
      console.error("Error adding business type:", error);
      toast.error("Failed to add business type.");
    }
  };

  // Update business type
  const handleUpdateBusinessType = async () => {
    if (!editBusinessType.name || validationError) {
      setValidationError("Please enter a valid name without numbers.");
      return;
    }

    try {
      const response = await axios.put(`http://localhost:3000/api/business-types/${editBusinessType._id}`, {
        name: editBusinessType.name,
        description: editBusinessType.description,
      });
      setBusinessTypes(
        businessTypes.map(type => (type._id === editBusinessType._id ? response.data.businessType : type))
      );
      setShowEditModal(false);
      setEditBusinessType(null);
      toast.success("Business type updated successfully.");
    } catch (error) {
      console.error("Error updating business type:", error);
      toast.error("Failed to update business type.");
    }
  };

  // Delete business type with confirmation
  const handleDeleteBusinessType = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/business-types/${businessTypeIdToDelete}`);
      setBusinessTypes(businessTypes.filter(type => type._id !== businessTypeIdToDelete));
      setShowDeleteModal(false);
      toast.success("Business type deleted successfully.");
    } catch (error) {
      console.error("Error deleting business type:", error);
      toast.error("Failed to delete business type.");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <ToastContainer />
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Business Type Manager</h2>

      <button
        onClick={() => setShowAddModal(true)}
        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500 mb-4"
      >
        Add Business Type
      </button>

      <table className="w-full max-w-3xl bg-white rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left text-gray-600">Name</th>
            <th className="px-4 py-2 text-left text-gray-600">Description</th>
            <th className="px-4 py-2 text-center text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentBusinessTypes.map(type => (
            <tr key={type._id} className="border-t">
              <td className="px-4 py-2">{type.name}</td>
              <td className="px-4 py-2">{type.description}</td>
              <td className="px-4 py-2 text-center">
                <button
                  onClick={() => { setEditBusinessType(type); setShowEditModal(true); }}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-400 mr-2"
                >
                  Update
                </button>
                <button
                  onClick={() => { setBusinessTypeIdToDelete(type._id); setShowDeleteModal(true); }}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-400"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center w-full max-w-3xl mt-4">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="px-3 py-2 bg-gray-200 rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <p className="text-gray-600">
          Page {currentPage} of {totalPages}
        </p>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="px-3 py-2 bg-gray-200 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Add Business Type Modal */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add Business Type</h2>
            <input
              type="text"
              name="name"
              placeholder="Business Type Name"
              value={newBusinessType.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 mb-2"
            />
            {validationError && <p className="text-red-500 text-sm mb-2">{validationError}</p>}
            <textarea
              name="description"
              placeholder="Description"
              value={newBusinessType.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 mb-4"
            ></textarea>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-3 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleAddBusinessType}
                className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-500"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Business Type Modal */}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Update Business Type</h2>
            <input
              type="text"
              name="name"
              placeholder="Business Type Name"
              value={editBusinessType.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 mb-2"
            />
            {validationError && <p className="text-red-500 text-sm mb-2">{validationError}</p>}
            <textarea
              name="description"
              placeholder="Description"
              value={editBusinessType.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 mb-4"
            ></textarea>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-3 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateBusinessType}
                className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Delete Business Type</h2>
            <p className="mb-4">Are you sure you want to delete this business type?</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-3 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteBusinessType}
                className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-500"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessTypeManager;
