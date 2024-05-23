
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { InternHome } from "./pages/interns-pages/InternHome";
import { InternDashboard } from "./components/interns-components/Dashboard/InternDashboard";
import Feedback from "./components/interns-components/Feedback/Feedback";
import Projects from "./components/interns-components/Projects/Projects";
import Announcement from "./components/interns-components/Announcement/Announcement";
import Task from "./components/interns-components/Task/Task";
import { Attendence } from "./components/interns-components/Attendence/Attendence";
import InternSidebar from "./components/interns-components/InternSidebar";
import InternTopbar from "./components/interns-components/InternTopbar/InternTopbar";
import Leave from "./components/interns-components/Leave/Leave";
import Page_Attendence from "./components/interns-components/Page_Attendence/Page_Attendence";
import OnGoing from "./components/interns-components/OnGoing/OnGoing";
import Completed from "./components/interns-components/Completed/Completed";



function App() {
  return (
    <>

      <BrowserRouter>
        <InternTopbar />
        <InternSidebar />
        <Routes>

   <Route exact path="/intern-dashboard" element={<InternHome />} />

          <Route path="/internDashboard" element={<InternDashboard />} />
          <Route path="/internFeedback" element={<Feedback />} />
          <Route path="/internProjects" element={<Projects />} />
          <Route path="/internAttendence" element={<Attendence />} />
          <Route path="/internTasks" element={<Task />} />
          <Route path="/internAnnouncement" element={<Announcement />} />
          <Route path="/internLeave" element={<Leave />} />
          <Route path="/internAttend" element={<Page_Attendence />} />
          <Route path="/internOngoing" element={<OnGoing />} />
          <Route path="/internCompleted" element={<Completed />} />


        </Routes>
      </BrowserRouter>
    </>

  );
}

export default App;
