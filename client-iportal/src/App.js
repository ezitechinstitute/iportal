import { AdminHome } from "./pages/admin-pages/AdminHome";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { InternHome } from "./pages/interns-pages/InternHome";
import { ManagerHome } from "./pages/manager-pages/ManagerHome";
import { OnsiteInterns } from "./pages/manager-pages/OnsiteInterns";
import { Register } from "./pages/Register";
// import AdminTestPage from "./pages/admin-pages/AdminTestPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Index Routes */}
        
          {/* <Route index exact path="/" element={<AdminTestPage />} /> */}

          <Route index exact path="/" element={<Register />} />

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
