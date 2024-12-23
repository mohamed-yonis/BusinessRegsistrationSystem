import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Status from "../components/Status";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-grow">
        {/* Header */}
        <Header />
         <Status/>
        {/* Content Area (Displays pages like Approved, Rejected) */}
        <div className="p-4">
          <Outlet /> {/* Nested routes will render here */}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
