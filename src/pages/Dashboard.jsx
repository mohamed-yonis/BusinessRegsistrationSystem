import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import MainContent from "../components/MainContent";
import { Outlet } from "react-router-dom";
import Status from "../components/Status";
import BusinessByCityChart from "../components/BusinessByCityChart";
import BusinessStatusChart from "../components/BusinessStatus";

const Dashboard = () => (



  <>
  <Header/>
      <Status />
     <div className="flex max-w-[500px]">
     <BusinessStatusChart/>
     <BusinessByCityChart/>
     </div>
      <Outlet/>
  </>
);

export default Dashboard;
