import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { FiMenu, FiUser, FiPower } from "react-icons/fi"; // Importing React Icons

export const ReviewTopbar = () => {
  const navigate = useNavigate(); 

  // Logout function
  const handleLogout = () => {
    // Clear sessionStorage
    sessionStorage.clear();
    // Redirect to the login page
    navigate("/");
  };

  return (
    <>
      {/* BEGIN: Header */}
      <nav className="header-navbar navbar navbar-expand-lg align-items-center floating-nav navbar-light navbar-shadow">
        <div className="navbar-container d-flex content">
          <div className="bookmark-wrapper d-flex align-items-center">
            <ul className="nav navbar-nav d-xl-none">
              <li className="nav-item">
                <a className="nav-link menu-toggle" href="javascript:void(0);">
                  <FiMenu className="ficon" /> {/* Menu icon */}
                </a>
              </li>
            </ul>
          </div>
          <ul className="nav navbar-nav align-items-center ml-auto">
            {/* User Dropdown */}
            <li className="nav-item dropdown dropdown-user">
              <a
                className="nav-link dropdown-toggle dropdown-user-link"
                id="dropdown-user"
                href="javascript:void(0);"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <FiUser className="ficon" /> {/* User icon */}
              </a>
              <div
                className="dropdown-menu dropdown-menu-right"
                aria-labelledby="dropdown-user"
              >
                {/* Logout Button */}
                <a
                  className="dropdown-item"
                  href=""
                  type="button"
                  onClick={handleLogout} // Add onClick handler for logout
                >
                  <FiPower className="mr-50" /> {/* Logout icon */}
                  Logout
                </a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};