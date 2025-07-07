import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdPerson, MdExitToApp } from 'react-icons/md';

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem('affiliateToken');
    localStorage.removeItem('affiliateUser');
    // Redirect to login
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <h2 className="text-2xl font-semibold text-gray-800">Welcome, Affiliate</h2>
          
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              <MdPerson size={24} />
              <span>Profile</span>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                >
                  <MdExitToApp size={20} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 