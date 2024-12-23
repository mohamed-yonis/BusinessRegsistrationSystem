import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [userName, setUserName] = useState("");
  const [validationError, setValidationError] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5; // Set number of users per page

  // Fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to fetch users.");
      }
    };
    fetchUsers();
  }, []);

  // Calculate pagination details
  const totalPages = Math.ceil(users.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Handle pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Open the update modal
  const handleEditUser = (user) => {
    setEditUser(user);
    setUserName(user.full_name);
    setShowEditModal(true);
  };

  // Validation for user name
  const validateUserName = () => {
    if (!userName) {
      setValidationError("User name cannot be empty.");
      return false;
    }
    if (!/^[A-Za-z\s]+$/.test(userName)) {
      setValidationError("User name can only contain letters.");
      return false;
    }
    setValidationError("");
    return true;
  };

  // Update user function
  const confirmUpdateUser = async () => {
    if (!validateUserName()) {
      toast.error("Please provide a valid user name.");
      return;
    }

    try {
      const response = await axios.put(`http://localhost:3000/api/users/${editUser._id}`, {
        full_name: userName,
      });
      setUsers(users.map(user => (user._id === editUser._id ? response.data.user : user)));
      setShowEditModal(false);
      toast.success("User updated successfully.");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user.");
    }
  };

  // Open the delete modal
  const handleDeleteUser = (userId) => {
    setUserIdToDelete(userId);
    setShowDeleteModal(true);
  };

  // Delete user function
  const confirmDeleteUser = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/users/${userIdToDelete}`);
      setUsers(users.filter(user => user._id !== userIdToDelete));
      setShowDeleteModal(false);
      toast.success("User deleted successfully.");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user.");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <ToastContainer />
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Manage Users</h2>

      {/* User List */}
      <table className="w-full max-w-3xl bg-white rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left text-gray-600">Name</th>
            <th className="px-4 py-2 text-left text-gray-600">Username</th>
            <th className="px-4 py-2 text-center text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map(user => (
            <tr key={user._id} className="border-t">
              <td className="px-4 py-2">{user.full_name}</td>
              <td className="px-4 py-2">{user.user_name}</td>
              <td className="px-4 py-2 text-center">
                <button
                  onClick={() => handleEditUser(user)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-400 mr-2"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeleteUser(user._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-400"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4 space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`px-3 py-1 rounded-md ${currentPage === index + 1 ? 'bg-indigo-500 text-white' : 'bg-gray-300 text-gray-700'} hover:bg-indigo-400`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Update Confirmation Modal */}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Update User</h2>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 mb-2"
            />
            {validationError && <p className="text-red-600 text-sm mb-4">{validationError}</p>}
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-3 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmUpdateUser}
                className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-500"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Delete User</h2>
            <p className="mb-4">Are you sure you want to delete this user?</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-3 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteUser}
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

export default UserManager;
