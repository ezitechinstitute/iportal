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
import { InternProjTasks } from "./supervisor/pages/InternProjTasks";
import Profile from "./pages/Profile";
import Payment_vochar from "./pages/Payment_vochar";
import { RecipientPaymentVoucher } from "./pages/Recept_payemnt ";
import Offer_letter from "./pages/Offer_letter";
import Supervisor_Profile from "./supervisor/pages/Profile";
// import Announcement from "./pages/Announcement"
import ReviewLogin from "./review/pages/Login";
import Home from "./review/pages/Home";
import Review_intern from "./review/pages/Review_intern";
import NonReview_intern from "./review/pages/NonReview_intern";

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
          <Route path="/manager-profile" element={<Profile />} />
          <Route path="/payment-vochar" element={<Payment_vochar />} />
          <Route
            path="/payment-recepit"
            element={<RecipientPaymentVoucher />}
          />
          <Route path="/offer-letter" element={<Offer_letter />} />
          {/* <Route path="/manager-announcement" element={<Announcement/>}/> */}

          {/* <Route exact path="/manager-leave" element={<ManagerLeave />} /> */}
          {/* <Route exact path="/balance" element={<Balance />} /> */}
          {/* <Route exact path="/invoice" element={<Invoice />} /> */}

          {/* Supervisor Routes*/}
          <Route exact path="/supervisor" element={<SupervisorLogin />} />
          <Route path="/supervisor-profile" element={<Supervisor_Profile />} />
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
          <Route exact path="/project-tasks" element={<InternProjTasks />} />

          <Route exact path="/intern-tasks" element={<InternTasks />} />
          <Route exact path="/supervisor-leave" element={<SupervisorLeave />} />
          <Route
            exact
            path="/supervisor-balance"
            element={<SupervisorBalance />}
          />

          {/* review */}
          <Route exact path="/review" element={<ReviewLogin />} />
          <Route exact path="/review-dashboard" element={<Home />} />
          <Route exact path="/review-interns" element={<Review_intern />} />
          <Route
            exact
            path="/non-review-interns"
            element={<NonReview_intern />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
