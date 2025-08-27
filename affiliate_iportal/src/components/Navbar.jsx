import React, { useEffect, useState } from 'react';
import {
  Menu, User, Settings, LogOut,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = ({ showUserDropdown, setShowUserDropdown, setMobileSidebarOpen }) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({ name: '', email: '', profile_image: '' });

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('affiliateToken');
      const res = await axios.get('http://localhost:8088/api/affiliate/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(res.data.profile);
    } catch (err) {
      console.error('Failed to load profile:', err);
      if (err.response?.status === 401) navigate('/login');
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleLogout = () => {
    toast(<ConfirmLogoutToast />, {
      position: 'top-center',
      autoClose: false,
      closeOnClick: false,
      closeButton: false,
    });
  };

  // ✅ Move inside so you can use `navigate` here
  const ConfirmLogoutToast = () => (
    <div>
      <p>Are you sure you want to logout?</p>
      <div className="flex gap-2 mt-2">
        <button
          onClick={() => {
            localStorage.removeItem('affiliateToken');
            toast.dismiss();
            navigate('/login');
          }}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Yes
        </button>
        <button
          onClick={() => toast.dismiss()}
          className="bg-gray-300 px-3 py-1 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );

  return (
    <header className="fixed top-0 left-0 lg:left-64 right-0 px-6 pt-6 z-50 transition-all">
      <div className="absolute inset-0 bg-[#F6F6F6] -z-10" />
      <div className="bg-white/90 backdrop-blur-md py-1 shadow-md rounded-md">
        <div className="flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden text-gray-600 hover:text-blue-600"
            >
              <Menu size={24} />
            </button>
          </div>
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="relative">
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center space-x-2 px-3 py-2 rounded-xl transition"
              >
                <div className="flex flex-col items-end">
                  <span className="text-sm font-bold text-gray-700 hidden sm:inline">
                    {profile.name || 'Loading...'}
                  </span>
                  <span className="text-xs font-medium text-gray-700 hidden sm:inline">
                    Affiliate
                  </span>
                </div>
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white flex items-center justify-center font-bold">
                  <img
                    src={`http://localhost:8088/uploads/${encodeURIComponent(profile.profile_image)}`}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                </div>
              </button>

              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-2xl z-50 animate-fade-in">
                  <Link to="/profile" className="flex items-center space-x-3 px-4 py-3 hover:bg-blue-50">
                    <User size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-700">Profile</span>
                  </Link>
                  <Link to="/settings" className="flex items-center space-x-3 px-4 py-3 hover:bg-blue-50">
                    <Settings size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-700">Settings</span>
                  </Link>
                  <hr className="my-1" />
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-red-50"
                  >
                    <LogOut size={16} className="text-red-400" />
                    <span className="text-sm text-red-600">Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </header>
  );
};

export default Navbar;
