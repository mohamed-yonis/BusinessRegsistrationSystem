import React, { useEffect, useState } from "react";
import axios from "axios";
import CertificateGenerator from "./CertificateGenerator";

const Approved = () => {
  const [showCertificate, setShowCertificate] = useState(false);
  const [approvedBusinesses, setApprovedBusinesses] = useState([]);
  const [currentBusiness, setCurrentBusiness] = useState(null);

  useEffect(() => {
    const fetchApprovedBusinesses = async () => {
      try {
        // Fetch businesses from the API
        const response = await axios.get("http://localhost:3000/api/businesses");
        // Filter only approved businesses
        const approved = response.data.filter(business => business.status === "Approved");
        setApprovedBusinesses(approved);
      } catch (error) {
        console.error("Error fetching approved businesses:", error);
      }
    };

    fetchApprovedBusinesses();
  }, []);

  const handleShowCertificate = (business) => {
    setCurrentBusiness(business);
    setShowCertificate(true);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold text-gray-700 mb-6">Approved Businesses</h2>
      <table className="w-full max-w-4xl bg-white shadow-lg rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="px-4 py-3 text-left font-semibold">Business Name</th>
            <th className="px-4 py-3 text-left font-semibold">Owner</th>
            <th className="px-4 py-3 text-left font-semibold">Location</th>
            <th className="px-4 py-3 text-left font-semibold">Business Type</th>
            <th className="px-4 py-3 text-left font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {approvedBusinesses.map(business => (
            <tr key={business._id} className="border-b hover:bg-gray-100">
              <td className="px-4 py-2">{business.business_name}</td>
              <td className="px-4 py-2">{business.owner_id?.full_name}</td>
              <td className="px-4 py-2">{business.city_id?.name}</td>
              <td className="px-4 py-2">{business.business_type_id?.name}</td>
              <td>
                <button
                  onClick={() => handleShowCertificate(business)}
                  className="bg-green-500 text-white px-3 py-1 my-1 rounded-md hover:bg-green-400 ml-2"
                >
                  Download Certificate
                </button>
              </td>
            </tr>
          ))}
          {approvedBusinesses.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center py-4 text-gray-500">
                No approved businesses found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Certificate Generator (Visible after Download Click) */}
      {showCertificate && currentBusiness && (
        <CertificateGenerator business={currentBusiness} onClose={() => setShowCertificate(false)} />
      )}
    </div>
  );
};

export default Approved;
