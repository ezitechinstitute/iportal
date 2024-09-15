// import 'react-calendar/dist/Calendar.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ManagerHome } from "./pages/ManagerHome";
import Leave from "./pages/Leave";
import Balance from "./pages/Balance";
import InternProjects from "./pages/InternProjects";
import Interns from "./pages/Interns";
import InternTasks from "./pages/InternTasks";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Index Routes */}

          {/* Manager Routes */}
          <Route index path="/" element={<ManagerHome />} />
          <Route exact path="/leave" element={<Leave />} />
          <Route exact path="/balance" element={<Balance />} />
          <Route exact path="/interns" element={<Interns />} />
          <Route exact path="/intern-projects" element={<InternProjects />} />
          <Route exact path="/intern-tasks" element={<InternTasks />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
