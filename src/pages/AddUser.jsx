// src/pages/AddUser.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const AddUser = () => {
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // Selected role ID
  const [roles, setRoles] = useState([]); // List of roles
  const [message, setMessage] = useState("");

  // Fetch roles from backend
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get("http://localhost:3000/roles");
        console.log("roles fetched", response.data)
        setRoles(response.data); // Save roles to state
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };
    fetchRoles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!fullName || !userName || !password || !role) {
      setMessage("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/users", {
        full_name: fullName,
        user_name: userName,
        password: password,
        role_id: role, // Role ID from dropdown
      });
      setMessage(response.data.message || "User added successfully");
    } catch (error) {
      setMessage("Error adding user");
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700">Add User</h2>
        {message && <p className="text-sm text-green-500">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600">Full Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600">Username</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600">Role</label>
            <select
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              // value={role}
              onChange={(e) =>{
                console.log("Changing", e.target.value)
                setRole(e.target.value)

              } 
            }
              required
            >
              <option value="">Select Role</option>
              {roles.map((role) => {
                console.log("Setting", role)
                return (
                  <option key={role._id} value={role._id}>
                  {role.role_name}
                </option>
                )
              })}
            </select>
          </div>
          <button
            type="submit"
            className="w-full px-3 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-200"
          >
            Add User
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
