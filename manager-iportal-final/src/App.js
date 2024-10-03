// import 'react-calendar/dist/Calendar.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { InternHome } from "./pages/interns-pages/InternHome";
import { ManagerHome } from "./pages/ManagerHome";
import { OnsiteInterns } from "./pages/OnsiteInterns";
import { RemoteInterns } from "./pages/RemoteInterns";
// import { InternProjects } from "./pages/InternProjects";
// import { InterViews } from "./pages/InterViews";
import { InternCompleted } from "./pages/InternCompleted";
import ManagerLeave from "./pages/ManagerLeave";
import Balance from "./pages/Balance";
import Invoice from "./pages/Invoice";
import { Login } from "./pages/Login";
import { InterviewTest } from "./pages/InterviewTest";
import { ActiveInterns } from "./pages/ActiveInterns";
import { ContactWith } from "./pages/ContactWith";
import { RemainingAmount } from "./pages/RemainingAmount";
// import { Test } from "./supervisor/pages/Test";
import { SupervisorHome } from "./supervisor/pages/SupervisorHome";
import { SupervisorLogin } from "./supervisor/pages/SupervisorLogin";
import SupervisorInterns from "./supervisor/pages/SupervisorInterns";
import InternProjects from "./supervisor/pages/InternProjects";
import InternTasks from "./supervisor/pages/InternTasks";
import SupervisorLeave from "./supervisor/pages/SupervisorLeave";
import SupervisorBalance from "./supervisor/pages/SupervisorBalance";

function App() {
  return (
    <>
      <BrowserRouter>

        <Routes>
          {/* Index Routes */}

          {/* Manager Routes */}
          <Route index path="/" element={<Login />} />
          <Route index path="/manager-dashboard" element={<ManagerHome />} />
          <Route exact path="/manager-interns" element={<OnsiteInterns />} />
          {/* <Route exact path="/remote-interns" element={<RemoteInterns />} /> */}
          <Route exact path="/contact-with" element={<ContactWith />} />
          <Route exact path="/interview-test" element={<InterviewTest />} />
          <Route exact path="/intern-projects" element={<InternProjects />} />
          <Route exact path="/test-completed" element={<InternCompleted />} />
          <Route exact path="/active-interns" element={<ActiveInterns />} />
          <Route exact path="/remaining-amount" element={<RemainingAmount />} />

          {/* <Route exact path="/manager-leave" element={<ManagerLeave />} /> */}
          {/* <Route exact path="/balance" element={<Balance />} /> */}
          {/* <Route exact path="/invoice" element={<Invoice />} /> */}

          {/* Supervisor Routes*/}
          <Route exact path="/supervisor" element={<SupervisorLogin />} />
          <Route
            exact
            path="/supervisor-dashboard"
            element={<SupervisorHome />}
          />
          <Route
            exact
            path="/supervisor-interns"
            element={<SupervisorInterns />}
          />
          <Route exact path="/intern-projects" element={<InternProjects />} />
          <Route exact path="/intern-tasks" element={<InternTasks />} />
          <Route exact path="/supervisor-leave" element={<SupervisorLeave />} />
          <Route
            exact
            path="/supervisor-balance"
            element={<SupervisorBalance />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
