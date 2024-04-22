// import 'react-calendar/dist/Calendar.css';
import { AdminHome } from "./pages/AdminHome";
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Index Routes */}
          <Route exact path="/admin-dashboard" element={<AdminHome />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
