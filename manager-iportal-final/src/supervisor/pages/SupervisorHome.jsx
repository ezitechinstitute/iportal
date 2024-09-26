import React from "react";
import { SupervisorTopbar } from "../components/SupervisorTopbar";
import { SupervisorSidebar } from "../components/SupervisorSidebar";
import { SupervisorDashboard } from "../components/SupervisorDashboard";

export const SupervisorHome = () => {
  return (
    <>
      <SupervisorTopbar />
      <SupervisorSidebar />
      <SupervisorDashboard />
    </>
  );
};
