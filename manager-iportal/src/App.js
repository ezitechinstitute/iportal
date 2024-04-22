// import 'react-calendar/dist/Calendar.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { InternHome } from "./pages/interns-pages/InternHome";
import { ManagerHome } from "./pages/ManagerHome";
import { OnsiteInterns } from "./pages/OnsiteInterns";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Index Routes */}

          {/* Manager Routes */}
          <Route exact path="/manager-dashboard" element={<ManagerHome />} />
          <Route exact path="/onsite-interns" element={<OnsiteInterns />} />
          {/* <Route exact path="/intern-dashboard" element={<InternHome />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
