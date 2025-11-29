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
import OfferLetter from "./components/interns-components/Offer_Letter/offer_letter";
import { InternLogin } from "./pages/interns-pages/InternLogin";
import { InternTest } from "./pages/interns-pages/InternTest";
import { InternTasks } from "./pages/interns-pages/InternTasks";
import { ProjectTasks } from "./components/interns-components/Projects/ProjectTasks";
import Post from "./components/interns-components/Post/Post"
import Profile from "./components/interns-components/Profile/Profile"
import {ResetPassword} from "./pages/interns-pages/InternResetPassword";
import BirthdayWisher from "./components/interns-components/Birthday_wisher/Birthday_wisher";
import Supervisor_compliant from "./components/interns-components/Feedback/Supervisor_compaliant";
import Manager_compliant from "./components/interns-components/Feedback/Manager_compliant";
import { GetCertificate } from "./components/GetCertificate";
import { InternsGrid } from "./components/interns-components/OurInterns/InternsGrid";
import { InternProfile } from "./components/interns-components/OurInterns/InternProfile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<InternLogin />} />
          <Route path="/intern-test" element={<InternTest />} />
          <Route path="/intern-dashboard" element={<InternDashboard />} />
          <Route path="/intern-leave" element={<Leave />} />
          <Route path="/intern-attendence" element={<Attendence />} />
          <Route path="/intern-projects" element={<Projects />} />
          <Route path="/project-tasks" element={<ProjectTasks />} />
          <Route path="/intern-tasks" element={<InternTasks />} />
          <Route path="/intern-leave" element={<Leave />} />
          <Route path="/get-certificate" element={<GetCertificate />} />


          <Route path="/internFeedback" element={<Feedback />} />
          <Route path="/internAttendence" element={<Attendence />} />
          <Route path="/internTasks" element={<Task />} />
          <Route path="/internAnnouncement" element={<Announcement />} />
          <Route path="/internOngoing" element={<OnGoing />} />
          <Route path="/internCompleted" element={<Completed />} />
          <Route path="/internPost" element={<Post/>}/>
          <Route path="/offer-letter" element={<OfferLetter/>}/>
          <Route path="/intern-profile" element={<Profile/>}/>
          <Route path="/intern-reset-password/:token" element={<ResetPassword/>}/>
          <Route path="/Intern-Birthday-Wisher" element={<BirthdayWisher/>}/>
          <Route path="/supervisor-complaint" element={<Supervisor_compliant/>}/>
          <Route path="/manager-complaint" element={<Manager_compliant/>}/>
          <Route path="/our-interns" element={<InternsGrid/>}/>
          <Route path="/public-profile/:internId" element={<InternProfile/>}/>



        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
