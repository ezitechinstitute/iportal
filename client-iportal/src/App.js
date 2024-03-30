import { AdminHome } from "./pages/admin-pages/AdminHome";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { InternHome } from "./pages/interns-pages/InternHome";
import { ManagerHome } from "./pages/manager-pages/ManagerHome";
import { OnsiteInterns } from "./pages/manager-pages/OnsiteInterns";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/admin-dashboard" element={<AdminHome />} />

          {/* Manager Routes */}
          <Route exact path="/manager-dashboard" element={<ManagerHome />} />
          <Route exact path="/onsite-interns" element={<OnsiteInterns />} />

          <Route exact path="/intern-dashboard" element={<InternHome />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
