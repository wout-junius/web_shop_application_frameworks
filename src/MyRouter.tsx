import React from "react";
import { Routes, Route } from "react-router-dom";
import PagedLayout from "./layouts/PagedLayout";
import BrowsePage from "./pages/BrowsePage";

export default function MyRouter() {
  return (
    <Routes>
      <Route path="/" element={<BrowsePage />} />
      <Route path="*" element={<PagedLayout />} />
    </Routes>
  );
}
