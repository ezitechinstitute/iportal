import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ManagerDashboard } from "./pages/ManagerDashboard";
import { Onsite } from "./pages/Onsite";
import { Remote } from "./pages/Remote";
import { Login } from "./pages/Login";
import { Test } from "./pages/Test";
import { CompletedTest } from "./pages/CompletedTest";
import { AdminLogin } from "./pages/admin/AdminLogin";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { InstructorDashboard } from "./pages/instructor/InstructorDashboard";
import { AddAmount } from "./pages/AddAmount";
import { ManagerBalance } from "./pages/ManagerBalance";
import { PendingAmount } from "./pages/PendingAmount";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Login />} />
          <Route path="/manager-dashboard" element={<ManagerDashboard />} />
          <Route path="/add-amount" element={<AddAmount />} />
          <Route path="/pending-amount" element={<PendingAmount />} />
          <Route path="/manager-balance" element={<ManagerBalance />} />
          <Route path="/onsite-interns" element={<Onsite />} />
          <Route path="/remote-interns" element={<Remote />} />
          <Route path="/test-interns" element={<Test />} />
          <Route path="/test-complete" element={<CompletedTest />} />

          {/* ----------------- Admin ------------------- */}
          <Route index path="/admin" element={<AdminLogin />} />
          <Route index path="/admin-dashboard" element={<AdminDashboard />} />

          {/* ----------------- Instructor -------------- */}
          <Route
            index
            path="/instructor-dashboard"
            element={<InstructorDashboard />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
