import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { InternTopbar } from "../../components/interns-components/InternTopbar/InternTopbar";
// import { InternSidebar } from "../../components/interns-components/InternSidebar";
import { InternDashboard } from "../../components/interns-components/Dashboard/InternDashboard";
import Feedback from "../../components/interns-components/Feedback/Feedback";
import Projects from "../../components/interns-components/Projects/Projects";
import Attendence from "../../components/interns-components/Attendence/Attendence";
import Task from "../../components/interns-components/Task/Task";
import Announcement from "../../components/interns-components/Announcement/Announcement";

export const InternHome = () => {
  return (
    <>
    {/* <BrowserRouter>
      <InternTopbar />
      <InternSidebar />
      <Routes>
        <Route path="/internDashboard" element={<InternDashboard />} />
        <Route path="/internFeedback" element={<Feedback />} />
        <Route path="/internProjects" element={<Projects />} />
        <Route path="/internAttendence" element={<Attendence />} />
        <Route path="/internTask" element={<Task />} />
        <Route path="/internAnnouncement" element={<Announcement />} />
      </Routes>
    </BrowserRouter> */}
    </>
  );
};
