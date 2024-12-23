import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaHourglassHalf, FaCheckCircle, FaTimesCircle } from "react-icons/fa"; // Import icons from react-icons

const Status = () => {
  const [counts, setCounts] = useState({ pending: 0, approved: 0, rejected: 0 });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/businesses/count-by-status");
        setCounts(response.data);
      } catch (error) {
        console.error("Error fetching business counts:", error);
      }
    };
    fetchCounts();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4">
      {/* Pending Box */}
      <div className="bg-yellow-100 p-6 rounded-lg shadow-md flex flex-col items-center">
        <FaHourglassHalf className="text-yellow-600 text-4xl mb-2" />
        <h3 className="text-xl font-semibold text-gray-700">Pending Business</h3>
        <p className="text-3xl font-bold text-yellow-700">{counts.pending}</p>
      </div>

      {/* Approved Box */}
      <div className="bg-green-100 p-6 rounded-lg shadow-md flex flex-col items-center">
        <FaCheckCircle className="text-green-600 text-4xl mb-2" />
        <h3 className="text-xl font-semibold text-gray-700">Approved Business</h3>
        <p className="text-3xl font-bold text-green-700">{counts.approved}</p>
      </div>

      {/* Rejected Box */}
      <div className="bg-red-100 p-6 rounded-lg shadow-md flex flex-col items-center">
        <FaTimesCircle className="text-red-600 text-4xl mb-2" />
        <h3 className="text-xl font-semibold text-gray-700">Rejected Business</h3>
        <p className="text-3xl font-bold text-red-700">{counts.rejected}</p>
      </div>
    </div>
  );
};

export default Status;
