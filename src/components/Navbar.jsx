// src/components/Navbar.js

import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className=" text-white p-4 flex justify-between items-center ">
      <div className="flex items-center space-x-4">
        {username && (
          <>
            <span>{username}</span>
            <span className="italic text-sm">({role})</span>
          </>
        )}
        <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded-md hover:bg-red-400">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
