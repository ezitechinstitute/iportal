// import 'react-calendar/dist/Calendar.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { InternHome } from "./pages/interns-pages/InternHome";
import { ManagerHome } from "./pages/ManagerHome";
import { OnsiteInterns } from "./pages/OnsiteInterns";
import { RemoteInterns } from "./pages/RemoteInterns";
import { InternProjects } from "./pages/InternProjects";
// import { InterViews } from "./pages/InterViews";
import { InternCompleted } from "./pages/InternCompleted";
import ManagerLeave from "./pages/ManagerLeave";
import Balance from "./pages/Balance";
import Invoice from "./pages/Invoice";
import { Login } from "./pages/Login";
import { InterviewTest } from "./pages/InterviewTest";
import { ActiveInterns } from "./pages/ActiveInterns";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Index Routes */}

          {/* Manager Routes */}
          <Route index path="/" element={<Login />} />
          <Route index path="/manager-dashboard" element={<ManagerHome />} />
          <Route exact path="/onsite-interns" element={<OnsiteInterns />} />
          <Route exact path="/remote-interns" element={<RemoteInterns />} />
          <Route exact path="/interview-test" element={<InterviewTest />} />
          <Route exact path="/intern-projects" element={<InternProjects />} />
          <Route exact path="/test-completed" element={<InternCompleted />} />
          <Route exact path="/active-interns" element={<ActiveInterns />} />
          <Route exact path="/manager-leave" element={<ManagerLeave />} />
          <Route exact path="/balance" element={<Balance />} />
          {/* <Route exact path="/invoice" element={<Invoice />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
