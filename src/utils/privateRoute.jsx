import React from "react";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router";
import { getToken } from "./authToken";

const userAuth = () => {
  const token = getToken();
 
  return token !== null;
};

const ProtectedRoutes = () => {
  const isAuth = userAuth();
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
