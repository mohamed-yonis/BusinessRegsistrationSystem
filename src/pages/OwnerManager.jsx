import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OwnerManager = () => {
  const [owners, setOwners] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newOwner, setNewOwner] = useState({ full_name: "", phone: "", email: "", passport_number: "" });
  const [image, setImage] = useState(null);
  const [editOwner, setEditOwner] = useState(null);
  const [ownerIdToDelete, setOwnerIdToDelete] = useState(null);
  const [validationError, setValidationError] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/owners");
        setOwners(response.data);
      } catch (error) {
        console.error("Error fetching owners:", error);
        toast.error("Failed to fetch owners.");
      }
    };
    fetchOwners();
  }, []);

  // Pagination Logic
  const totalPages = Math.ceil(owners.length / itemsPerPage);
  const currentOwners = owners.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  // Handle input changes with validation
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone" && !/^\d+$/.test(value)) {
      setValidationError("Phone number can only contain digits.");
      return;
    } else if (name === "email" && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
      setValidationError("Invalid email format.");
      return;
    } else {
      setValidationError("");
    }

    if (showEditModal) {
      setEditOwner({ ...editOwner, [name]: value });
    } else {
      setNewOwner({ ...newOwner, [name]: value });
    }
  };

  const handleImageChange = (e) => setImage(e.target.files[0]);

  // Add owner function
  const handleAddOwner = async () => {
    if (!newOwner.full_name || !newOwner.phone || !newOwner.email || validationError) {
      toast.error("Please fill in all required fields with valid data.");
      return;
    }

    const formData = new FormData();
    formData.append("full_name", newOwner.full_name);
    formData.append("phone", newOwner.phone);
    formData.append("email", newOwner.email);
    formData.append("passport_number", newOwner.passport_number);
    if (image) formData.append("image", image);

    try {
      const response = await axios.post("http://localhost:3000/api/owners", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setOwners([...owners, response.data.owner]);
      setShowAddModal(false);
      setNewOwner({ full_name: "", phone: "", email: "", passport_number: "" });
      setImage(null);
      toast.success("Owner added successfully.");
    } catch (error) {
      console.error("Error adding owner:", error);
      toast.error("Failed to add owner.");
    }
  };

  // Update owner function
  const handleUpdateOwner = async () => {
    if (!editOwner.full_name || !editOwner.phone || !editOwner.email || validationError) {
      toast.error("Please fill in all required fields with valid data.");
      return;
    }

    const formData = new FormData();
    formData.append("full_name", editOwner.full_name);
    formData.append("phone", editOwner.phone);
    formData.append("email", editOwner.email);
    formData.append("passport_number", editOwner.passport_number);
    if (image) formData.append("image", image);

    try {
      const response = await axios.put(`http://localhost:3000/api/owners/${editOwner._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setOwners(owners.map(owner => (owner._id === editOwner._id ? response.data.owner : owner)));
      setShowEditModal(false);
      setEditOwner(null);
      setImage(null);
      toast.success("Owner updated successfully.");
    } catch (error) {
      console.error("Error updating owner:", error);
      toast.error("Failed to update owner.");
    }
  };

  // Delete owner function
  const handleDeleteOwner = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/owners/${ownerIdToDelete}`);
      setOwners(owners.filter(owner => owner._id !== ownerIdToDelete));
      setShowDeleteModal(false);
      toast.success("Owner deleted successfully.");
    } catch (error) {
      console.error("Error deleting owner:", error);
      toast.error("Failed to delete owner.");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <ToastContainer />
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Owner Manager</h2>

      <button
        onClick={() => setShowAddModal(true)}
        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500 mb-4"
      >
        Add Owner
      </button>

      <table className="w-full max-w-3xl bg-white rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left text-gray-600">Full Name</th>
            <th className="px-4 py-2 text-left text-gray-600">Phone</th>
            <th className="px-4 py-2 text-left text-gray-600">Email</th>
            <th className="px-4 py-2 text-center text-gray-600">Image</th>
            <th className="px-4 py-2 text-center text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentOwners.map(owner => (
            <tr key={owner._id} className="border-t">
              <td className="px-4 py-2">{owner.full_name}</td>
              <td className="px-4 py-2">{owner.phone}</td>
              <td className="px-4 py-2">{owner.email}</td>
              <td className="px-4 py-2 text-center">
                {owner.image && <img src={`http://localhost:3000/${owner.image}`} alt={owner.full_name} className="h-10 w-10 rounded-full" />}
              </td>
              <td className="px-4 py-2 text-center">
                <button
                  onClick={() => { setEditOwner(owner); setShowEditModal(true); }}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-400 mr-2"
                >
                  Update
                </button>
                <button
                  onClick={() => { setOwnerIdToDelete(owner._id); setShowDeleteModal(true); }}
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

      {/* Add Owner Modal */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add New Owner</h2>
            <input
              type="text"
              name="full_name"
              placeholder="Full Name"
              value={newOwner.full_name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 mb-2"
            />
            {validationError && <p className="text-red-500 text-sm mb-2">{validationError}</p>}
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={newOwner.phone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 mb-4"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={newOwner.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 mb-4"
            />
            <input
              type="text"
              name="passport_number"
              placeholder="Passport Number"
              value={newOwner.passport_number}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 mb-4"
            />
            <input type="file" onChange={handleImageChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 mb-4" />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-3 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleAddOwner}
                className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-500"
              >
                Add Owner
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Owner Modal */}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Update Owner</h2>
            <input
              type="text"
              name="full_name"
              placeholder="Full Name"
              value={editOwner.full_name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 mb-2"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={editOwner.phone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 mb-4"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={editOwner.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 mb-4"
            />
            <input
              type="text"
              name="passport_number"
              placeholder="Passport Number"
              value={editOwner.passport_number}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 mb-4"
            />
            <input type="file" onChange={handleImageChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 mb-4" />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-3 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateOwner}
                className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
              >
                Update Owner
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Delete Owner</h2>
            <p className="mb-4">Are you sure you want to delete this owner?</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-3 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteOwner}
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

export default OwnerManager;
