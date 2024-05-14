// import 'react-calendar/dist/Calendar.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { InternHome } from "./pages/interns-pages/InternHome";
import { ManagerHome } from "./pages/ManagerHome";
import { OnsiteInterns } from "./pages/OnsiteInterns";
// import { InterViews } from "./pages/InterViews";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Index Routes */}

          {/* Manager Routes */}
          <Route index path="/" element={<ManagerHome />} />
          {/* <Route exact path="/interviews" element={<InterViews />} /> */}

        
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
