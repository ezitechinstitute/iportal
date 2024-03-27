import React from "react";
import { AdminTopbar } from "../../components/admin-components/AdminTopbar";
import { AdminSidebar } from "../../components/admin-components/AdminSidebar";
import { AdminDashboard } from "../../components/admin-components/AdminDashboard";

export const AdminHome = () => {
  return (
    <>
      <AdminTopbar />
      <AdminSidebar />
      <AdminDashboard />
    </>
  );
};
