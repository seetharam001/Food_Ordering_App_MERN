import React from "react";
import { Navigate } from "react-router-dom";
import { getRole, isLoggedIn } from "../utils/auth";

const PrivateRoute = ({ children, role }) => {
  if (!isLoggedIn()) return <Navigate to="/login" />;
  if (getRole() !== role) return <Navigate to="/login" />;

  return children;
};

export default PrivateRoute;
