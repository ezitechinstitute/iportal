import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ActiveInterns } from './pages/ActiveInterns';
import CertificateIssuance from './pages/Certificate_Issuance';
import { ContactWith } from './pages/ContactWith';
import { InternationalInterns } from './pages/InternationalInterns';
import { InternCompleted } from './pages/InternCompleted';
import { InterviewTest } from './pages/InterviewTest';
import { Login } from './pages/Login';
import { ManagerHome } from './pages/ManagerHome';
import Offer_letter from './pages/Offer_letter';
import { OnsiteInterns } from './pages/OnsiteInterns';
import Payment_vochar from './pages/Payment_vochar';
import Profile from './pages/Profile';
import { RecipientPaymentVoucher } from './pages/Recept_payemnt '; // Fixed import
import { RemainingAmount } from './pages/RemainingAmount';

// Supervisor Components
import InternProjects from './supervisor/pages/InternProjects';
import InternProjTasks from './supervisor/pages/InternProjTasks';
import InternTasks from './supervisor/pages/InternTasks';
import Supervisor_Profile from './supervisor/pages/Profile';
import SupervisorBalance from './supervisor/pages/SupervisorBalance';
import { SupervisorHome } from './supervisor/pages/SupervisorHome';
import SupervisorInterns from './supervisor/pages/SupervisorInterns';
import SupervisorLeave from './supervisor/pages/SupervisorLeave';
import { SupervisorLogin } from './supervisor/pages/SupervisorLogin';

// Review Components
import Home from './review/pages/Home';
import ReviewLogin from './review/pages/Login';
import NonReview_intern from './review/pages/NonReview_intern';
import Review_intern from './review/pages/Review_intern';

import Certificate_temp from './components/Certificate_temp';
import NotFound from './Not-Found';
import CertificateIssuance_Details from './pages/CertificateIssuance_Details';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ======================== */}
        {/* COMMON/AUTHENTICATION ROUTES */}
        {/* ======================== */}
        <Route index path='/' element={<Login />} />
        <Route path='*' element={<NotFound />} />

        {/* ======================== */}
        {/* MANAGER ROUTES */}
        {/* ======================== */}
        <Route path='/manager-dashboard' element={<ManagerHome />} />
        <Route path='/manager-interns' element={<OnsiteInterns />} />
        <Route path='/intl-interns' element={<InternationalInterns />} />
        <Route path='/contact-with' element={<ContactWith />} />
        <Route path='/interview-test' element={<InterviewTest />} />
        <Route path='/intern-projects' element={<InternProjects />} />
        <Route path='/test-completed' element={<InternCompleted />} />
        <Route path='/active-interns' element={<ActiveInterns />} />
        <Route path='/remaining-amount' element={<RemainingAmount />} />
        <Route path='/manager-profile' element={<Profile />} />
        <Route path='/payment-vochar' element={<Payment_vochar />} />
        <Route path='/payment-recepit' element={<RecipientPaymentVoucher />} />
        <Route path='/offer-letter' element={<Offer_letter />} />
        <Route path='/certificate-issuance' element={<CertificateIssuance />} />

        <Route path='/:email' element={<CertificateIssuance_Details />} />

        {/* ======================== */}
        {/* SUPERVISOR ROUTES */}
        {/* ======================== */}
        <Route path='/supervisor' element={<SupervisorLogin />} />
        <Route path='/supervisor-profile' element={<Supervisor_Profile />} />
        <Route path='/supervisor-dashboard' element={<SupervisorHome />} />
        <Route path='/supervisor-interns' element={<SupervisorInterns />} />
        <Route path='/project-tasks' element={<InternProjTasks />} />
        <Route path='/intern-tasks' element={<InternTasks />} />
        <Route path='/supervisor-leave' element={<SupervisorLeave />} />
        <Route path='/supervisor-balance' element={<SupervisorBalance />} />

        {/* ======================== */}
        {/* REVIEW ROUTES */}
        {/* ======================== */}
        <Route path='/review' element={<ReviewLogin />} />
        <Route path='/review-dashboard' element={<Home />} />
        <Route path='/review-interns' element={<Review_intern />} />
        <Route path='/non-review-interns' element={<NonReview_intern />} />
        <Route path={'/test'} element={<Certificate_temp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
