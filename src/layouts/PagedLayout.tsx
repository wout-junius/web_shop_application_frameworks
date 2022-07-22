import React from "react";
import { Route, Routes } from "react-router-dom";
import "../App.css";
import AddProduct from "../pages/AddProduct";
import AdminPage from "../pages/AdminPage";
import DetailedPage from "../pages/DetailedPage";
import Login from "../pages/Login";
import Register from "../pages/Register";

export default function PagedLayout() {
  return (
    <div className="site-layout-content">
      <Routes>
        <Route path="/product/{productId}" element={<DetailedPage />}/>
        <Route path="/product/add" element={<AddProduct />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}
