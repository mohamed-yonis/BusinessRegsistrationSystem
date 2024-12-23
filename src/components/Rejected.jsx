import React, { useEffect, useState } from "react";
import axios from "axios";

const Rejected = () => {
  const [rejectedBusinesses, setRejectedBusinesses] = useState([]);

  useEffect(() => {
    const fetchRejectedBusinesses = async () => {
      try {
        // Fetch all businesses from the API
        const response = await axios.get("http://localhost:3000/api/businesses");
        // Filter only rejected businesses
        const rejected = response.data.filter(business => business.status === "Rejected");
        setRejectedBusinesses(rejected);
      } catch (error) {
        console.error("Error fetching rejected businesses:", error);
      }
    };

    fetchRejectedBusinesses();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold text-gray-700 mb-6">Rejected Businesses</h2>
      <table className="w-full max-w-4xl bg-white shadow-lg rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="px-4 py-3 text-left font-semibold">Business Name</th>
            <th className="px-4 py-3 text-left font-semibold">Owner</th>
            <th className="px-4 py-3 text-left font-semibold">Location</th>
            <th className="px-4 py-3 text-left font-semibold">Business Type</th>
          </tr>
        </thead>
        <tbody>
          {rejectedBusinesses.map(business => (
            <tr key={business._id} className="border-b hover:bg-gray-100">
              <td className="px-4 py-2">{business.business_name}</td>
              <td className="px-4 py-2">{business.owner_id?.full_name}</td>
              <td className="px-4 py-2">{business.city_id?.name}</td>
              <td className="px-4 py-2">{business.business_type_id?.name}</td>
            </tr>
          ))}
          {rejectedBusinesses.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                No rejected businesses found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Rejected;
