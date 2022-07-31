import { Navigate } from "react-router-dom";
import React from "react";

interface ProtectedRouteProps {
  isAuth: boolean,
  element: JSX.Element,
  redirect?: string
}

const ProtectedRoute = ({ isAuth, element, redirect = "/login"} : ProtectedRouteProps) => {
  return isAuth ? element : <Navigate to={redirect} />;
};
export default ProtectedRoute;
