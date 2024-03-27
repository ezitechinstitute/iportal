import { AdminHome } from "./pages/admin-pages/AdminHome";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { InternHome } from "./pages/interns-pages/InternHome";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="admin-dashboard" element={<AdminHome />} />
          <Route path="intern-dashboard" element={<InternHome />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
