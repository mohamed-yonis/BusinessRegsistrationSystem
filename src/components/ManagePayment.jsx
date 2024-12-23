// src/components/ManagePayment.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManagePayment = () => {
  const [payment, setPayment] = useState(null);
  const [amount, setAmount] = useState(15); // Default amount
  const [description, setDescription] = useState("Business Registration Fee");
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchPayment();
  }, []);

  const fetchPayment = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/payment');
      setPayment(response.data);
      setAmount(response.data.amount);
      setDescription(response.data.description);
    } catch (error) {
      console.error('Failed to fetch payment information:', error);
      toast.error("Failed to fetch payment information.");
    }
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value) && Number(value) >= 0) {
      setAmount(value);
      setErrorMessage("");
    } else {
      setErrorMessage("Please enter a valid positive number.");
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!amount || Number(amount) <= 0) {
      setErrorMessage("Amount must be a positive number.");
      return;
    }

    const apiUrl = payment 
      ? `http://localhost:3000/api/payment/update/${payment._id}` 
      : 'http://localhost:3000/api/payment/add';

    try {
      const response = await axios.post(apiUrl, { amount: Number(amount), description });
      setPayment(response.data.payment);
      setShowModal(false);
      fetchPayment();
      toast.success(payment ? "Payment updated successfully!" : "Payment added successfully!");
    } catch (error) {
      console.error('Failed to save payment information:', error);
      toast.error("Failed to save payment information.");
    }
  };

  return (
    <div className="p-6">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Manage Payment</h1>

      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 mb-4"
      >
        {payment ? 'Update Payment' : 'Add Payment'}
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">{payment ? 'Update Payment Amount' : 'Add Payment Amount'}</h2>
            <form onSubmit={handleSave}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Amount ($)</label>
                <input
                  type="text"
                  value={amount}
                  onChange={handleAmountChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  required
                />
                {errorMessage && <p className="text-red-600 text-sm mt-2">{errorMessage}</p>}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 ml-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {payment && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Current Payment Details</h2>
          <p><strong>Amount:</strong> ${payment.amount}</p>
          <p><strong>Description:</strong> {payment.description}</p>
        </div>
      )}
    </div>
  );
};

export default ManagePayment;
