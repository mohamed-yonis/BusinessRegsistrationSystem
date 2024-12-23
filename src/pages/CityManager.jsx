import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CityManager = () => {
  const [cities, setCities] = useState([]);
  const [newCity, setNewCity] = useState("");
  const [editCity, setEditCity] = useState(null);
  const [editCityName, setEditCityName] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteCityId, setDeleteCityId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of cities per page

  // Fetch cities
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/cities");
        setCities(response.data);
      } catch (error) {
        console.error("Error fetching cities:", error);
        toast.error("Failed to fetch cities.");
      }
    };
    fetchCities();
  }, []);

  // Pagination Logic
  const totalPages = Math.ceil(cities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCities = cities.slice(startIndex, startIndex + itemsPerPage);

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  // Validate input
  const validateCityName = (name) => {
    const cityPattern = /^[A-Za-z\s]+$/;
    if (!cityPattern.test(name)) {
      setErrorMessage("City name can only contain letters.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  // Add a new city
  const handleAddCity = async () => {
    if (!newCity || !validateCityName(newCity)) {
      toast.error("Please enter a valid city name.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/cities", { name: newCity });
      setCities([...cities, response.data]);
      setNewCity("");
      toast.success("City added successfully.");
    } catch (error) {
      console.error("Error adding city:", error);
      toast.error("Failed to add city.");
    }
  };

  // Update city
  const handleUpdateCity = async () => {
    if (!editCityName || !validateCityName(editCityName)) {
      toast.error("Please enter a valid city name.");
      return;
    }

    try {
      const response = await axios.put(`http://localhost:3000/api/cities/${editCity}`, { name: editCityName });
      setCities(cities.map((city) => (city._id === editCity ? response.data : city)));
      setEditCity(null);
      setEditCityName("");
      setShowEditModal(false);
      toast.success("City updated successfully.");
    } catch (error) {
      console.error("Error updating city:", error);
      toast.error("Failed to update city.");
    }
  };

  // Delete city
  const handleDeleteCity = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/cities/${deleteCityId}`);
      setCities(cities.filter((city) => city._id !== deleteCityId));
      setShowDeleteModal(false);
      toast.success("City deleted successfully.");
    } catch (error) {
      console.error("Error deleting city:", error);
      toast.error("Failed to delete city.");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen w-full bg-gray-100 p-4">
      <ToastContainer />
      <h2 className="text-2xl font-bold text-gray-700 mb-4">City Manager</h2>

      <div className="w-full max-w-md space-y-4">
        {/* Add City */}
        <input
          type="text"
          placeholder="New City"
          value={newCity}
          onChange={(e) => setNewCity(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
        />
        <button
          onClick={handleAddCity}
          className="w-full px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-500"
        >
          Add City
        </button>
        {errorMessage && <p className="text-red-600 text-sm mt-1">{errorMessage}</p>}
      </div>

      {/* List Cities in a Table */}
      <table className="w-full max-w-2xl bg-white mt-6 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="px-4 py-2 text-left">City Name</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentCities.map((city) => (
            <tr key={city._id} className="border-t">
              <td className="px-4 py-2">{city.name}</td>
              <td className="px-4 py-2 text-center space-x-2">
                <button
                  onClick={() => {
                    setEditCity(city._id);
                    setEditCityName(city.name);
                    setShowEditModal(true);
                  }}
                  className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-400"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setDeleteCityId(city._id);
                    setShowDeleteModal(true);
                  }}
                  className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-400"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center w-full max-w-2xl mt-4">
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

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit City</h2>
            <input
              type="text"
              value={editCityName}
              onChange={(e) => setEditCityName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200 mb-4"
            />
            {errorMessage && <p className="text-red-600 text-sm mt-1">{errorMessage}</p>}
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-3 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateCity}
                className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-500"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Delete City</h2>
            <p className="mb-4">Are you sure you want to delete this city?</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-3 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteCity}
                className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CityManager;
