import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ResetPassword from './pages/Auth/ResetPassword';
import Dashboard from './pages/Dashboard/Dashboard';
import Earnings from './pages/Dashboard/Earnings';
import Interns from './pages/Dashboard/Interns';
import ReferralLink from './pages/Dashboard/ReferralLink';
import ProtectedRoute from './routes/ProtectedRoute';
import NotFound from './pages/NotFound';
import Profile from './components/Profile';
import HelpCenter from './pages/Dashboard/HelpCenter';
import Settings from './components/Settings';
import Withdraw from './pages/Dashboard/Withdraw';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/restPassword" element={<ResetPassword />} />

        <Route path="*" element={<NotFound />} />

        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute> }/>
        <Route path="/earnings" element={<ProtectedRoute><Earnings /></ProtectedRoute>} />
        <Route path="/interns" element={<ProtectedRoute><Interns /></ProtectedRoute>} />
        <Route path="/withdraw" element={<ProtectedRoute><Withdraw /></ProtectedRoute>} />
        <Route path="/referral-link" element={<ProtectedRoute><ReferralLink /></ProtectedRoute>} />
        <Route path="/helpCenter" element={<ProtectedRoute><HelpCenter/></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings/></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>} />


      </Routes>
    <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;
