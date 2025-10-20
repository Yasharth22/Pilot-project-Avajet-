// ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // 🔒 Not logged in → redirect to login
  if (!token || !user) {
    console.log("No token or user found, redirecting...");
    return <Navigate to="/login" replace />;
  }

  // 🧠 Role-based restriction
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    console.warn("Access denied — role not allowed:", user.role);
    return <Navigate to="/dashboard" replace />; // redirect to dashboard
  }

  // ✅ All good — show page
  return children;
};

export default ProtectedRoute;
