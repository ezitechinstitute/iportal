import React, { useEffect } from "react";
import { ManagerTopbar } from "../components/ManagerTopbar";
import { ManagerSidebar } from "../components/ManagerSidebar";
import { ManagerDashboard } from "../components/ManagerDashboard";
import { useNavigate } from "react-router-dom";

export const ManagerHome = () => {
  const navigate = useNavigate();
  const check = sessionStorage.getItem("isLoggedIn");

  useEffect(() => {
    if (!check) {
      navigate("/");
    }
  });

  return (
    <>
      <ManagerTopbar />
      <ManagerSidebar />
      <ManagerDashboard />
    </>
  );
};
