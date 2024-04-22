import React from "react";
import { AdminTopbar } from "../components/AdminTopbar";
import { AdminSidebar } from "../components/AdminSidebar";
import { AdminDashboard } from "../components/AdminDashboard";

export const AdminHome = () => {
  return (
    <>
      <AdminTopbar />
      <AdminSidebar />
      <AdminDashboard />
    </>
  );
};
