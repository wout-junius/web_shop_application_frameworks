import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import "../App.css";
import ProtectedRoute from "../components/ProtectedRoute";
import { AuthContext } from "../context/AuthContext";
import AdminPage from "../pages/AdminPage";
import Login from "../pages/Login";
import Register from "../pages/Register";

export default function PagedLayout() {
  const ctx = useContext(AuthContext);
  return (
    <div className="site-layout-content">
      <Routes>
        <Route path="/admin" element={<ProtectedRoute
                isAuth={ctx.user != null && ctx.user.roles.includes("ROLE_ADMIN")}
                element={<AdminPage />}
                redirect="/login"
              />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
      </Routes>
    </div>
  );
}
