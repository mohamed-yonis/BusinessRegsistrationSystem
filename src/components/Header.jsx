// src/components/Header.jsx
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUser, faCog } from "@fortawesome/free-solid-svg-icons";
import Navbar from "./Navbar";
import { jwtDecode } from "jwt-decode";

const Header = () => {
  const [userInfo, setUserInfo] = useState({ name: "User", role: "Role" });

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Decode the token if it exists
    if (token) {
      const decoded = jwtDecode(token);
      setUserInfo({
        name: decoded.name || "User",
        role: decoded.role || "Role",
      });
    }
  }, []);

  return (
    <div className="p-4 flex justify-between items-center">
      <h1 className="text-lg font-semibold">Dashboard / Home</h1>
      <div className="flex items-center gap-4">
        <h1 className="font-semibold">{userInfo.name}</h1>
        <p className="text-2xl font-extrabold">{userInfo.role}</p>
      </div>
      <Navbar />
    </div>
  );
};

export default Header;
