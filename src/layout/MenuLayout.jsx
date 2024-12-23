import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";


const MenuLayout = ({ user }) => {
  return (
    <div className="flex h-screen">
      
      <Sidebar />
     
      <div className="flex-grow flex flex-col">
      <Outlet />
      </div>
    </div>
  );
};

export default MenuLayout;