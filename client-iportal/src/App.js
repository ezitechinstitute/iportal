import "react-calendar/dist/Calendar.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { InternHome } from "./pages/InternHome";
import { Register } from "./pages/Register";
// import AdminTestPage from "./pages/admin-pages/AdminTestPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/register" element={<Register />} />
          {/* Index Routes */}
          {/* <Route exact path="/intern-dashboard" element={<InternHome />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
