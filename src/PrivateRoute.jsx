
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ Component }) => {
  const isAuthenticated = !!localStorage.getItem("token"); 
console.log(isAuthenticated)
  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
