import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ManagerHome } from "./pages/ManagerHome";
import { OnsiteInterns } from "./pages/OnsiteInterns";
import { RemoteInterns } from "./pages/RemoteInterns";
import { InternProjects } from "./pages/InternProjects";
import { InternCompleted } from "./pages/InternCompleted";
import CompWithdraw from "./pages/CompWithdraw";
import Leave from "./pages/Leave";
import Balance from "./pages/Balance";
import Invoice from "./pages/Invoice";
import Accounts from "./pages/Accounts";
import Affiliates from "./pages/Affiliates";
import Feedback from "./pages/Feedback";
import intern from "./pages/Intern";
import InternTask from "./pages/InternTask";
import Knowledge from "./pages/Knowledge";
import Manager from "./pages/Manager";
import Setting from "./pages/Setting";
import Technology from "./pages/Technology";
import University from "./pages/University";
import Withdraw from "./pages/Withdraw";
import Intern from "./pages/Intern";
import Supervisor from "./pages/Supervisor";
import { AdminLogin } from "./pages/AdminLogin";
import { InternAccounts } from "./pages/InternAccounts";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Index Routes */}

          {/* Manager Routes */}
          <Route index path="/" element={<AdminLogin />} />
          <Route exact path="/admin-dashboard" element={<ManagerHome />} />
          <Route exact path="/onsite-interns" element={<OnsiteInterns />} />
          <Route exact path="/intern-projects" element={<InternProjects />} />
          <Route exact path="/intern-task" element={<InternTask />} />
          <Route exact path="/intern-completed" element={<InternCompleted />} />
          <Route exact path="/leave" element={<Leave />} />
          <Route exact path="/balance" element={<Balance />} />
          <Route exact path="/invoice" element={<Invoice />} />
          <Route exact path="/accounts" element={<Accounts />} />
          <Route exact path="/withdraw" element={<Withdraw />} />
          <Route exact path="/manager" element={<Manager />} />
          <Route exact path="/Knowledgebase" element={<Knowledge />} />
          <Route exact path="/technology" element={<Technology />} />
          <Route exact path="/university" element={<University />} />
          <Route exact path="/affiliates" element={<Affiliates />} />
          <Route exact path="/setting" element={<Setting />} />
          <Route exact path="/feedback" element={<Feedback />} />
          <Route exact path="/interns" element={<Intern />} />
          <Route exact path="/intern-accounts" element={<InternAccounts />} />
          <Route exact path="/Completed-Withdraw" element={<CompWithdraw />} />
          <Route exact path="/supervisor" element={<Supervisor />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
