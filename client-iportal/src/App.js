import "react-calendar/dist/Calendar.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { InternHome } from "./pages/InternHome";
import { Register } from "./pages/Register";
import { MailPopup } from "./pages/MailPopup";
// import AdminTestPage from "./pages/admin-pages/AdminTestPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Register />} />
          <Route path="/popup" element={<MailPopup />} />

          {/* Index Routes */}
          {/* <Route exact path="/intern-dashboard" element={<InternHome />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
