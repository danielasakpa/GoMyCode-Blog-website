import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Adjust the path accordingly

const PrivateRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>; // You can show a loading indicator while checking authentication state
  }

  return user ? <Outlet /> : <Navigate to="/signin" />
};

export default PrivateRoute;
