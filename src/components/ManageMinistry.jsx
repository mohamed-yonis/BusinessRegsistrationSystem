// components/MinistryManager.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MinistryManager = () => {
  const [ministries, setMinistries] = useState([]);
  const [selectedMinistry, setSelectedMinistry] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [ministryName, setMinistryName] = useState('');
  const [signature, setSignature] = useState(null);

  useEffect(() => {
    fetchMinistries();
  }, []);

  // Fetch all ministries
  const fetchMinistries = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/ministry/info');
      setMinistries(response.data.ministry ? [response.data.ministry] : []);
    } catch (error) {
      console.error('Failed to fetch ministry information:', error);
    }
  };

  // Open modal for adding or updating ministry
  const handleOpenModal = (ministry = null) => {
    setSelectedMinistry(ministry);
    setMinistryName(ministry?.ministryName || '');
    setSignature(null);
    setShowModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Save or update ministry information
  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('ministryName', ministryName);
    if (signature) formData.append('signature', signature);

    const apiUrl = selectedMinistry
      ? `http://localhost:3000/api/ministry/update/${selectedMinistry._id}`
      : 'http://localhost:3000/api/ministry/add';
    const method = selectedMinistry ? 'put' : 'post';

    try {
      const response = await axios({
        method,
        url: apiUrl,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      fetchMinistries();
      handleCloseModal();
    } catch (error) {
      console.error('Failed to save ministry information:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Ministry Management</h1>
      {/* <button
        onClick={() => handleOpenModal()}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 mb-4"
      >
        Add Ministry
      </button> */}

      {/* Ministry Table */}
      {ministries.length > 0 ? (
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-3 px-6 text-left">Ministry Name</th>
              <th className="py-3 px-6 text-left">Signature</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ministries.map((ministry) => (
              <tr key={ministry._id} className="border-b">
                <td className="py-3 px-6">{ministry.ministryName}</td>
                <td className="py-3 px-6">
                  {ministry.signatureUrl && (
                    <img
                      src={`http://localhost:3000${ministry.signatureUrl}?t=${new Date().getTime()}`}
                      alt="Signature"
                      className="h-10 w-auto"
                    />
                  )}
                </td>
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleOpenModal(ministry)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No ministry information available. Please add one.</p>
      )}

      {/* Modal for Add/Update */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {selectedMinistry ? 'Update Ministry Information' : 'Add Ministry Information'}
            </h2>
            <form onSubmit={handleSave}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Ministry Name</label>
                <input
                  type="text"
                  value={ministryName}
                  onChange={(e) => setMinistryName(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Signature Image</label>
                <input
                  type="file"
                  onChange={(e) => setSignature(e.target.files[0])}
                  className="mt-1 block w-full"
                  accept="image/*"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 ml-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  {selectedMinistry ? 'Update' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MinistryManager;
