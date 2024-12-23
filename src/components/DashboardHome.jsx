// src/components/DashboardHome.jsx
import React from "react";
import MainContent from "./MainContent";
import Sidebar from "./Sidebar";

const DashboardHome = () => (
  <div className="flex">
    <Sidebar/>
    <MainContent />
  </div>
);

export default DashboardHome;
