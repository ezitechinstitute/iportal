import React from "react";
import { InternTopbar } from "../../components/interns-components/InternTopbar";
import { InternSidebar } from "../../components/interns-components/InternSidebar";
import { InternDashboard } from "../../components/interns-components/InternDashboard";

export const InternHome = () => {
  return (
    <>
      <InternTopbar />
      <InternSidebar />
      {/* <InternDashboard /> */}
    </>
  );
};
