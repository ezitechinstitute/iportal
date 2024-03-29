import { AdminHome } from "./pages/admin-pages/AdminHome";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { InternHome } from "./pages/interns-pages/InternHome";
import { ManagerHome } from "./pages/manager-pages/ManagerHome";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="admin-dashboard" element={<AdminHome />} />
          <Route path="manager-dashboard" element={<ManagerHome />} />
          <Route path="intern-dashboard" element={<InternHome />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
