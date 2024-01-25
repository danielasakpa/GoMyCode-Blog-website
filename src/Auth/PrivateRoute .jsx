import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Adjust the path accordingly
import Loader from "../components/Loader";

const PrivateRoute = () => {
  const { user, userLoading } = useAuth();

  if (userLoading) {
    return <Loader />;
  }

  return user ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
