import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MetricBox = ({ icon, title, amount, growth, color }) => (
  <div className="bg-gray-200 shadow-md rounded-lg p-5 flex items-center space-x-4">
    <div className="text-gray-500 text-3xl">
      <FontAwesomeIcon icon={icon} />
    </div>
    <div>
      <h4 className="text-sm font-semibold">{title}</h4>
      <p className="text-2xl font-bold">{amount}</p>
      <p className={`text-sm ${color}`}>{growth}</p>
    </div>
  </div>
);

export default MetricBox;
