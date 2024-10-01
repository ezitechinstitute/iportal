import React, { useEffect } from "react";
import { SupervisorTopbar } from "../components/SupervisorTopbar";
import { SupervisorSidebar } from "../components/SupervisorSidebar";
import { SupervisorDashboard } from "../components/SupervisorDashboard";
import { useNavigate } from "react-router-dom";

export const SupervisorHome = () => {
  const navigate = useNavigate();
  const check = sessionStorage.getItem("isLoggedIn");

  console.log(check);

  useEffect(() => {
    if (!check) {
      navigate("/supervisor");
    }
  });

  return (
    <>
      <SupervisorTopbar />
      <SupervisorSidebar />
      <SupervisorDashboard />
    </>
  );
};
