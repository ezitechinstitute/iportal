import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ManagerDashboard } from "./pages/ManagerDashboard";
import { Onsite } from "./pages/Onsite";
import { Remote } from "./pages/Remote";
import { Login } from "./pages/Login";
import { Test } from "./pages/Test";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Login />} />
          <Route path="/manager-dashboard" element={<ManagerDashboard />} />
          <Route path="/onsite-interns" element={<Onsite />} />
          <Route path="/remote-interns" element={<Remote />} />
          <Route path="/test-interns" element={<Test />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
