import React, { useEffect, useState } from "react";
import axios from "axios";
import CertificateGenerator from "../components/CertificateGenerator";

const BusinessRegistrationManager = () => {
  const [businesses, setBusinesses] = useState([]);
  const [businessTypes, setBusinessTypes] = useState([]);
  const [owners, setOwners] = useState([]);
  const [cities, setCities] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [currentBusiness, setCurrentBusiness] = useState()


  const [newBusiness, setNewBusiness] = useState({
    business_name: "",
    business_type_id: "",
    owner_id: "",
    city_id: "",
    full_address: "",
    description: "",
    payment_status: false,
  });
  const [editBusiness, setEditBusiness] = useState(null);
  const [businessIdToDelete, setBusinessIdToDelete] = useState(null);
 
  const [paymentInfo, setPaymentInfo] = useState({ method: "", phoneNumber: "", amount: "" });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [typeResponse, ownerResponse, cityResponse, businessResponse] = await Promise.all([
          axios.get("http://localhost:3000/api/business-types"),
          axios.get("http://localhost:3000/api/owners"),
          axios.get("http://localhost:3000/api/cities"),
          axios.get("http://localhost:3000/api/businesses"),
        ]);

        setBusinessTypes(typeResponse.data);
        setOwners(ownerResponse.data);
        setCities(cityResponse.data);
        setBusinesses(businessResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);





// pending business

const [pendingBusinesses, setPendingBusinesses] = useState([]);

  useEffect(() => {
    const fetchPendingBusinesses = async () => {
      try {
        // Fetch all businesses from the API
        const response = await axios.get("http://localhost:3000/api/businesses");
        // Filter only pending businesses
        const pending = response.data.filter(business => business.status === "Pending");
        setPendingBusinesses(pending);
      } catch (error) {
        console.error("Error fetching pending businesses:", error);
      }
    };

    fetchPendingBusinesses();
  }, []);






  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    if (showEditModal) {
      setEditBusiness({ ...editBusiness, [name]: fieldValue });
    } else {
      setNewBusiness({ ...newBusiness, [name]: fieldValue });
    }
  };

  const handleAddBusiness = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/businesses", newBusiness);
      setBusinesses([...businesses, response.data.business]);
      setShowAddModal(false);
      setNewBusiness({
        business_name: "",
        business_type_id: "",
        owner_id: "",
        city_id: "",
        full_address: "",
        description: "",
        payment_status: false,
      });
    } catch (error) {
      console.error("Error adding business:", error);
    }
  };

  const handleUpdateBusiness = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/api/businesses/${editBusiness._id}`, editBusiness);
      setBusinesses(businesses.map(business => (business._id === editBusiness._id ? response.data.business : business)));
      setShowEditModal(false);
      setEditBusiness(null);
    } catch (error) {
      console.error("Error updating business:", error);
    }
  };



  const handlePaymentSubmit = async () => {
    const status = paymentInfo.amount >= 15 ? "Approved" : "Rejected";
    try {
      await axios.put(`http://localhost:3000/api/businesses/${currentBusiness._id}`, { status });
      setBusinesses(businesses.map(business => (business._id === currentBusiness._id ? { ...business, status } : business)));
      setShowPaymentModal(false);
      setPaymentInfo({ method: "", phoneNumber: "", amount: "" });
      if (status === "Approved") setShowCertificate(true); // Show Certificate option after payment approval
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  const filteredBusinesses = businesses.filter(business =>
    business.business_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    business.business_type_id?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Business Registration Manager</h2>
      <input
        type="text"
        placeholder="Search businesses..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full max-w-md p-2 border rounded mb-4"
      />
      <button onClick={() => setShowAddModal(true)} className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500 mb-4">
        Add Business
      </button>

      <table className="w-full max-w-4xl bg-white rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left text-gray-600">Business Name</th>
            <th className="px-4 py-2 text-left text-gray-600">Business Type</th>
            <th className="px-4 py-2 text-left text-gray-600">Owner</th>
            <th className="px-4 py-2 text-left text-gray-600">City</th>
            <th className="px-4 py-2 text-center text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pendingBusinesses.map(business => (
            <tr key={business._id} className="border-t">
              <td className="px-4 py-2">{business.business_name}</td>
              <td className="px-4 py-2">{business.business_type_id?.name}</td>
              <td className="px-4 py-2">{business.owner_id?.full_name}</td>
              <td className="px-4 py-2">{business.city_id?.name}</td>
              <td className="px-4 py-2 text-center">
                <button onClick={() => { setCurrentBusiness(business); setShowPaymentModal(true); }} className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-400 mr-2">
                  Payment
                </button>
                <button onClick={() => { setEditBusiness(business); setShowEditModal(true); }} className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-400 mr-2">
                  Update
                </button>
              
              
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add New Business</h2>
            <input type="text" name="business_name" placeholder="Business Name" value={newBusiness.business_name} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md mb-2" />
            <select name="business_type_id" value={newBusiness.business_type_id} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md mb-2">
              <option value="">Select Business Type</option>
              {businessTypes.map(type => (
                <option key={type._id} value={type._id}>{type.name}</option>
              ))}
            </select>
            <select name="owner_id" value={newBusiness.owner_id} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md mb-2">
              <option value="">Select Owner</option>
              {owners.map(owner => (
                <option key={owner._id} value={owner._id}>{owner.full_name}</option>
              ))}
            </select>
            <select name="city_id" value={newBusiness.city_id} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md mb-2">
              <option value="">Select City</option>
              {cities.map(city => (
                <option key={city._id} value={city._id}>{city.name}</option>
              ))}
            </select>
            <input type="text" name="full_address" placeholder="Full Address" value={newBusiness. full_address} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md mb-2" />
            <input type="text" name="description" placeholder="Business Description" value={newBusiness. description} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md mb-2" />

            <div className="flex justify-end space-x-2">
              <button onClick={() => setShowAddModal(false)} className="px-3 py-2 bg-gray-300 rounded-md">Cancel</button>
              <button onClick={handleAddBusiness} className="px-3 py-2 bg-green-600 text-white rounded-md">Add</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Update Business</h2>
            <input type="text" name="business_name" placeholder="Business Name" value={editBusiness?.business_name || ""} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md mb-2" />
            <select name="business_type_id" value={editBusiness?.business_type_id || ""} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md mb-2">
              <option value="">Select Business Type</option>
              {businessTypes.map(type => (
                <option key={type._id} value={type._id}>{type.name}</option>
              ))}
            </select>
            <select name="owner_id" value={editBusiness?.owner_id || ""} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md mb-2">
              <option value="">Select Owner</option>
              {owners.map(owner => (
                <option key={owner._id} value={owner._id}>{owner.full_name}</option>
              ))}
            </select>
            <select name="city_id" value={editBusiness?.city_id || ""} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-md mb-2">
              <option value="">Select City</option>
              {cities.map(city => (
                <option key={city._id} value={city._id}>{city.name}</option>
              ))}
            </select>
            <div className="flex justify-end space-x-2">
            
            
              <button onClick={() => setShowEditModal(false)} className="px-3 py-2 bg-gray-300 rounded-md">Cancel</button>
              <button onClick={handleUpdateBusiness} className="px-3 py-2 bg-blue-600 text-white rounded-md">Update</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {/* {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Delete Business</h2>
            <p className="mb-4">Are you sure you want to delete this business?</p>
            <div className="flex justify-end space-x-2">
              <button onClick={() => setShowDeleteModal(false)} className="px-3 py-2 bg-gray-300 rounded-md">Cancel</button>
              <button onClick={handleDeleteBusiness} className="px-3 py-2 bg-red-600 text-white rounded-md">Confirm</button>
            </div>
          </div>
        </div>
      )} */}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Complete Payment</h2>
            <select value={paymentInfo.method} onChange={(e) => setPaymentInfo({ ...paymentInfo, method: e.target.value })} className="w-full px-3 py-2 border rounded-md mb-2">
              <option value="">Select Payment Method</option>
              <option value="EVC PLUS">EVC PLUS</option>
              <option value="E-DAHAB">E-DAHAB</option>
              <option value="JEEB">JEEB</option>
            </select>
            <input type="text" placeholder="Phone Number" value={paymentInfo.phoneNumber} onChange={(e) => setPaymentInfo({ ...paymentInfo, phoneNumber: e.target.value })} className="w-full px-3 py-2 border rounded-md mb-2" />
            <input type="number" placeholder="Amount" value={paymentInfo.amount} onChange={(e) => setPaymentInfo({ ...paymentInfo, amount: e.target.value })} className="w-full px-3 py-2 border rounded-md mb-2" />
            <div className="flex justify-end space-x-2">
              <button onClick={() => setShowPaymentModal(false)} className="px-3 py-2 bg-gray-300 rounded-md">Cancel</button>
              <button onClick={handlePaymentSubmit} className="px-3 py-2 bg-green-600 text-white rounded-md">Submit Payment</button>
            </div>
          </div>
        </div>
      )}

    
    </div>
  );
};

export default BusinessRegistrationManager;
