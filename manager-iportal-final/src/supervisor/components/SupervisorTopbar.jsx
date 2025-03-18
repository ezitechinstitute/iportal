import React, { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import { FiMenu, FiBell, FiUser, FiPower } from "react-icons/fi"; // Importing React Icons

export const SupervisorTopbar = () => {
  const username = sessionStorage.getItem("username");
  const role = sessionStorage.getItem("role");
  const token = sessionStorage.getItem("token");
  const managerId = sessionStorage.getItem("managerid");
  const navigate = useNavigate();

  // State to store the profile image
  const [image, setImage] = useState("https://via.placeholder.com/40"); // Default placeholder

  // Fetch profile data including the image
  useEffect(() => {
    const fetchProfileImage = async () => {
      if (!managerId || !token) {
        return; // Exit if no managerId or token
      }

      try {
        const response = await axios.get(
          `https://api.ezitech.org/supervisor/profile/${managerId}`,
          {
            headers: { "x-access-token": token }
          }
        );
        if (response.data.success && response.data.user.image) {
          setImage(response.data.user.image); // Set the Base64 image string
        }
      } catch (error) {
        console.error("Error fetching profile image:", error);
        // Keep placeholder if fetch fails
      }
    };

    fetchProfileImage();
  }, [managerId, token]);

  const Logout = () => {
    sessionStorage.clear();
    alert("Logged Out Successfully");
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
                  <FiMenu className="ficon" /> {/* Replaced data-feather="menu" */}
                </a>
              </li>
            </ul>
          </div>
          <ul className="nav navbar-nav align-items-center ml-auto">
            <li className="nav-item dropdown dropdown-notification mr-25">
              <a
                className="nav-link"
                href="javascript:void(0);"
                data-toggle="dropdown"
              >
                <FiBell className="ficon" /> {/* Replaced data-feather="bell" */}
                <span className="badge badge-pill badge-danger badge-up">
                  5
                </span>
              </a>
            </li>

            <li className="nav-item dropdown dropdown-user">
              <a
                className="nav-link dropdown-toggle dropdown-user-link"
                id="dropdown-user"
                href="javascript:void(0);"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <div className="user-nav d-sm-flex d-none">
                  <span className="user-name font-weight-bolder">
                    {username}
                  </span>
                  <span className="user-status">{role}</span>
                </div>
                <span className="avatar">
                  <img
                    className="round"
                    src={image} // Use the fetched image or placeholder
                    alt="avatar"
                    height="40"
                    width="40"
                  />
                  <span className="avatar-status-online"></span>
                </span>
              </a>
              <div
                className="dropdown-menu dropdown-menu-right"
                aria-labelledby="dropdown-user"
              >
                <Link className="dropdown-item" to="/supervisor-profile">
                  <FiUser className="mr-50" /> {/* Replaced data-feather="user" */}
                  Profile
                </Link>
                <a
                  className="dropdown-item"
                  href="/supervisor"
                  type="button"
                  onClick={Logout}
                >
                  <FiPower className="mr-50" /> {/* Replaced data-feather="power" */}
                  Logout
                </a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      {/* Commented sections remain unchanged */}
    </>
  );
};