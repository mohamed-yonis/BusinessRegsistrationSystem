import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faMap,
  faChevronDown,
  faChevronRight,
  faLayerGroup,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Sidebar = () => {
  const [showBusinessLinks, setShowBusinessLinks] = useState(false);
  const [showReportLinks, setShowReportLinks] = useState(false);
  const [showUserLinks, setShowUserLinks] = useState(false);

  return (
    <div className="w-1/4 bg-gray-100 m-4 text-gray-900  h-screen rounded-md p-5">
      <h2 className="text-lg font-bold bg-gray-900 text-white rounded-lg p-2 mb-8">
        BUSINESS REGISTRATION <span className="text-center">SYSTEM</span>
      </h2>
      <ul>
        {/* Dashboard Link */}
        <li className="py-2 hover:bg-gray-900 text-2xl hover:text-white rounded-md cursor-pointer">
          <FontAwesomeIcon icon={faHome} className="mr-2" />
          <Link to="/">Dashboard</Link>
        </li>

        {/* Business Dropdown */}
        <li
          className="py-2 text-lg flex mt-2 hover:bg-gray-700 hover:text-white rounded-md cursor-pointer"
          onClick={() => setShowBusinessLinks(!showBusinessLinks)}
        >
          <FontAwesomeIcon icon={faLayerGroup} className="mr-2 mt-2" />
          <span className="flex items-center">
            <span>Businesses</span>
            <FontAwesomeIcon
              icon={showBusinessLinks ? faChevronDown : faChevronRight}
              className="ml-2"
            />
          </span>
        </li>
        {showBusinessLinks && (
          <ul className="ml-6 mt-1">
            <li className="py-1 hover:bg-gray-700 hover:text-white rounded-md cursor-pointer">
              <Link to="/city">Cities</Link>
            </li>
            <li className="py-1 hover:bg-gray-700 hover:text-white rounded-md cursor-pointer">
              <Link to="/managebusinestype">Business Types</Link>
            </li>
            <li className="py-1 hover:bg-gray-700 hover:text-white rounded-md cursor-pointer">
              <Link to="/manageowner">Owners</Link>
            </li>
            <li className="py-1 hover:bg-gray-700 hover:text-white rounded-md cursor-pointer">
              <Link to="/ministry">Manage Ministry</Link>
            </li>
            <li className="py-1 hover:bg-gray-700 hover:text-white rounded-md cursor-pointer">
              <Link to="/managebusiness">Add Business</Link>
            </li>
            
            <li className="py-1 hover:bg-gray-700 hover:text-white rounded-md cursor-pointer">
              <Link to="/payment">Payment</Link>
            </li>

           
          </ul>
        )}

        {/* Reports Dropdown */}
        <li
          className="py-2 text-lg flex mt-4 hover:bg-gray-700 hover:text-white rounded-md cursor-pointer"
          onClick={() => setShowReportLinks(!showReportLinks)}
        >
          <FontAwesomeIcon icon={faInfoCircle} className="mr-2 mt-[15px]" />
          <span className="flex items-center">
            <span className="mt-2 ml-1">Reports</span>
            <FontAwesomeIcon
              icon={showReportLinks ? faChevronDown : faChevronRight}
              className="ml-2 mt-[13px] text-md"
            />
          </span>
        </li>
        {showReportLinks && (
          <ul className="ml-6 mt-1">
            <li className="py-1 hover:bg-gray-700 hover:text-white rounded-md cursor-pointer">
              <Link to="/aproved">Approved Businesses</Link>
            </li>
            <li className="py-1 hover:bg-gray-700 hover:text-white rounded-md cursor-pointer">
              <Link to="/rejected">Rejected Businesses</Link>
            </li>
          </ul>
        )}

        {/* Users Dropdown */}
        <li
          className="py-2 text-lg flex mt-2 hover:bg-gray-700 hover:text-white rounded-md cursor-pointer"
          onClick={() => setShowUserLinks(!showUserLinks)}
        >
          <FontAwesomeIcon icon={faUser} className="mr-2 mt-2" />
          <span className="flex items-center">
            <span className="mt-1">Users</span>
            <FontAwesomeIcon
              icon={showUserLinks ? faChevronDown : faChevronRight}
              className="ml-2 mt-2"
            />
          </span>
        </li>
        {showUserLinks && (
          <ul className="ml-6 mt-1">
            <li className="py-1 hover:bg-gray-700 hover:text-white rounded-md cursor-pointer">
              <Link to="/users">Add User</Link>
            </li>
            <li className="py-1 hover:bg-gray-700 hover:text-white rounded-md cursor-pointer">
              <Link to="/manageusers">Manage Users</Link>
            </li>
          </ul>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
