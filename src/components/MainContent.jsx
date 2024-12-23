// src/components/MainContent.jsx
import React from "react";
import MetricBox from "./MetricBox";
import { faWallet, faUsers, faUserPlus, faChartLine } from "@fortawesome/free-solid-svg-icons";

const MainContent = () => (
  <div className="flex-grow p-5">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <MetricBox icon={faWallet} title="Total Business" amount="1,200"  color="text-green-500" />
      <MetricBox icon={faUsers} title="Total Users" amount="2,300"  color="text-green-500" />
      <MetricBox icon={faUserPlus} title="Total Owner's" amount="3,462"  color="text-red-500" />
      <MetricBox icon={faChartLine} title="Sales" amount="$103,430"  color="text-green-500" />
    </div>
  </div>
);

export default MainContent;


