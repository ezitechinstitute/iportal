// import 'react-calendar/dist/Calendar.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { InternHome } from "./pages/interns-pages/InternHome";
import { ManagerHome } from "./pages/ManagerHome";
import { OnsiteInterns } from "./pages/OnsiteInterns";
import { RemoteInterns } from "./pages/RemoteInterns";
import { InternProjects } from "./pages/InternProjects";
// import { InterViews } from "./pages/InterViews";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Index Routes */}

          {/* Manager Routes */}
          <Route index path="/" element={<ManagerHome />} />
          <Route exact path="/onsite-interns" element={<OnsiteInterns />} />
          <Route exact path="/remote-interns" element={<RemoteInterns />} />
          <Route exact path="/intern-projects" element={<InternProjects />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
