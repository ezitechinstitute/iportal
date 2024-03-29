import React from "react";
import { ManagerTopbar } from "../../components/manager-components/ManagerTopbar";
import { ManagerSidebar } from "../../components/manager-components/ManagerSidebar";
import { ManagerDashboard } from "../../components/manager-components/ManagerDashboard";

export const ManagerHome = () => {
  return (
    <>
      <ManagerTopbar />
      <ManagerSidebar />
      {/* <ManagerDashboard /> */}
    </>
  );
};
