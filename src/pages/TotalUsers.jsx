import React, { useEffect, useState } from "react";
import axios from "axios";

const TotalUsers = () => {
  const [totalUsers, setTotalUsers] = useState(0);

  // Fetch total users when component mounts
  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/users");
        setTotalUsers(response.data.total);
      } catch (error) {
        console.error("Error fetching total users:", error);
      }
    };

    fetchTotalUsers();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Dashboard</h2>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
        <p className="text-4xl font-bold text-indigo-600">{totalUsers}</p>
      </div>
    </div>
  );
};

export default TotalUsers;
