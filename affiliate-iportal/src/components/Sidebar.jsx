import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  MdDashboard, 
  MdPeople, 
  MdLink, 
  MdPerson 
} from 'react-icons/md';

const Sidebar = () => {
  const menuItems = [
    { path: '/dashboard', icon: <MdDashboard size={24} />, label: 'Dashboard' },
    { path: '/referred-interns', icon: <MdPeople size={24} />, label: 'Referred Interns' },
    { path: '/referral-link', icon: <MdLink size={24} />, label: 'My Referral Link' },
    { path: '/profile', icon: <MdPerson size={24} />, label: 'Profile' },
  ];

  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <div className="flex items-center justify-center mb-8">
        <h1 className="text-2xl font-bold">Affiliate Portal</h1>
      </div>
      
      <nav>
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-4 px-4 py-3 rounded-lg transition-colors duration-200 ${
                isActive ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700'
              }`
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar; 