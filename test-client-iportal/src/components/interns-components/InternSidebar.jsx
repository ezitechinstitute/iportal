import React, { useState } from "react";
import { FiHome, FiClipboard, FiCheckSquare, FiCalendar, FiMessageSquare, 
         FiImage, FiUser, FiGrid, FiCheckCircle, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { NavLink } from "react-router-dom";

export const InternSidebar = () => {
  const [user, setUser] = useState({
    username: sessionStorage.getItem("username"),
    email: sessionStorage.getItem("email"),
    status: sessionStorage.getItem("internStatus"),
    tech: sessionStorage.getItem("technology"),
  });
  const [activeLink, setActive] = useState(" ");
  const [isComplaintsOpen, setComplaintsOpen] = useState(false); // State to manage dropdown

  return (
    <>
      {/* BEGIN: Main Menu */}
      <div
        className="main-menu menu-fixed menu-light menu-accordion menu-shadow"
        data-scroll-to-active="true"
      >
        <div className="navbar-header">
          <ul className="nav navbar-nav flex-row">
            <li className="nav-item mr-auto">
              <a className="navbar-brand" href="/">
                <span className="brand-logo">
                  <img src="./images/ezitech.png" alt="" />
                </span>
                <img
                  src="./images/logo.png"
                  style={{
                    width: "125px",
                    marginLeft: "10px",
                    height: "43.33px",
                  }}
                  alt="ezitech"
                />
              </a>
            </li>
            <li className="nav-item nav-toggle">
              <a
                className="nav-link modern-nav-toggle pr-0"
                data-toggle="collapse"
              >
                <i
                  className="d-block d-xl-none text-primary toggle-icon font-medium-4"
                  data-feather="x"
                ></i>
                <i
                  className="d-none d-xl-block collapse-toggle-icon font-medium-4 text-primary"
                  data-feather="disc"
                ></i>
              </a>
            </li>
          </ul>
        </div>
        <div className="shadow-bottom"></div>
        <div className="main-menu-content mt-2">
          <ul
            className="navigation navigation-main"
            id="main-menu-navigation"
            data-menu="menu-navigation"
          >
            {user.status === "Test" ? (
              <>
                <li className={activeLink === "test" ? "active" : "undefined"}>
                  <NavLink
                    className="d-flex align-items-center"
                    onClick={() => setActive("test")}
                    to="/intern-test"
                  >
                    <FiClipboard />
                    <span className="menu-title text-truncate" data-i18n="Test">
                      Test
                    </span>
                  </NavLink>
                </li>
                {/* Disabled items with opacity */}
                <li className="undefined" style={{ opacity: "0.4" }}>
                  <NavLink className="d-flex align-items-center" to="#">
                    <FiHome />
                    <span
                      className="menu-title text-truncate"
                      data-i18n="Dashboards"
                    >
                      Dashboards
                    </span>
                  </NavLink>
                </li>
                <li className="undefined" style={{ opacity: "0.4" }}>
                  <NavLink className="d-flex align-items-center" to="#">
                    <FiCheckSquare />
                    <span className="menu-item" data-i18n="Attendance">
                      Attendance
                    </span>
                  </NavLink>
                </li>
                <li className="undefined" style={{ opacity: "0.4" }}>
                  <NavLink className="d-flex align-items-center" to="#">
                    <FiCalendar />
                    <span className="menu-item" data-i18n="Leave">
                      Leave
                    </span>
                  </NavLink>
                </li>
                {/* <li className="undefined" style={{ opacity: "0.4" }}>
                  <NavLink className="d-flex align-items-center" to="#">
                    <FiMessageSquare />
                    <span className="menu-item" data-i18n="Feedback">
                      Feedback
                    </span>
                  </NavLink>
                </li> */}
                <li className="undefined" style={{ opacity: "0.4" }}>
                  <NavLink className="d-flex align-items-center" to="#">
                    <FiImage />
                    <span className="menu-item" data-i18n="Post">
                      Post
                    </span>
                  </NavLink>
                </li>
                <li className="undefined" style={{ opacity: "0.4" }}>
                  <NavLink className="d-flex align-items-center" to="#">
                    <FiUser />
                    <span
                      className="menu-title text-truncate"
                      data-i18n="Profile"
                    >
                      Public Profile
                    </span>
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className={activeLink === "dashboard" ? "active" : "undefined"}>
                  <NavLink
                    className="d-flex align-items-center"
                    onClick={() => setActive("dashboard")}
                    to="/intern-dashboard"
                  >
                    <FiHome />
                    <span
                      className="menu-title text-truncate"
                      data-i18n="Dashboards"
                    >
                      Dashboard
                    </span>
                  </NavLink>
                </li>

                <li className={activeLink === "projects" ? "active" : "undefined"}>
                  <NavLink
                    className="d-flex align-items-center"
                    onClick={() => setActive("projects")}
                    to="/intern-projects"
                  >
                    <FiGrid />
                    <span className="menu-item" data-i18n="Projects">
                      Projects
                    </span>
                  </NavLink>
                </li>

                <li className={activeLink === "projectTasks" ? "active" : "undefined"}>
                  <NavLink
                    className="d-flex align-items-center"
                    onClick={() => setActive("projectTasks")}
                    to="/project-tasks"
                  >
                    <FiCheckSquare />
                    <span className="menu-item" data-i18n="ProjectTasks">
                      Project Tasks
                    </span>
                  </NavLink>
                </li>

                <li className={activeLink === "tasks" ? "active" : "undefined"}>
                  <NavLink
                    className="d-flex align-items-center"
                    onClick={() => setActive("tasks")}
                    to="/intern-tasks"
                  >
                    <FiClipboard />
                    <span className="menu-item" data-i18n="Tasks">
                      Tasks
                    </span>
                  </NavLink>
                </li>

                <li className={activeLink === "attendance" ? "active" : "undefined"}>
                  <NavLink
                    className="d-flex align-items-center"
                    onClick={() => setActive("attendance")}
                    to="/intern-attendence"
                  >
                    <FiCheckCircle />
                    <span className="menu-item" data-i18n="Attendance">
                      Attendance
                    </span>
                  </NavLink>
                </li>

                <li className={activeLink === "leave" ? "active" : "undefined"}>
                  <NavLink
                    className="d-flex align-items-center"
                    onClick={() => setActive("leave")}
                    to="/intern-leave"
                  >
                    <FiCalendar />
                    <span className="menu-item" data-i18n="Leave">
                      Leave
                    </span>
                  </NavLink>
                </li>

                {/* Feedback Dropdown */}
                <li className={`nav-item has-sub ${isComplaintsOpen ? "open" : ""}`}>
                  <a
                    className="d-flex align-items-center"
                    onClick={() => setComplaintsOpen(!isComplaintsOpen)}
                  >
                    <FiMessageSquare />
                    <span className="menu-item pr-3" data-i18n="Feedback">
                      Complaints
                    </span>
                    {isComplaintsOpen ? <FiChevronUp /> : <FiChevronDown />}
                  </a>
                  <ul className="menu-content">
                    <li>
                      <NavLink
                        className="d-flex align-items-center"
                        to="/manager-complaint"
                      >
                        <span className="menu-item" data-i18n="ManagerComplaint">
                          Manager Complaint
                        </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="d-flex align-items-center"
                        to="/supervisor-complaint"
                      >
                        <span className="menu-item" data-i18n="SupervisorComplaint">
                          Supervisor Complaint
                        </span>
                      </NavLink>
                    </li>
                    {/* <li>
                  <NavLink className="d-flex align-items-center" to="/internFeedback">
        
                    <span className="menu-item" data-i18n="Feedback">
                      Feedback
                    </span>
                  </NavLink>
                </li> */}
                  </ul>
                </li>

                <li className={activeLink === "post" ? "active" : "undefined"}>
                  <NavLink
                    className="d-flex align-items-center"
                    onClick={() => setActive("post")}
                    to="/internPost"
                  >
                    <FiImage />
                    <span className="menu-item" data-i18n="Post">
                      Post
                    </span>
                  </NavLink>
                </li>

                <li className={activeLink === "offerLetter" ? "active" : "undefined"}>
                  <NavLink
                    className="d-flex align-items-center"
                    onClick={() => setActive("offerLetter")}
                    to="/offer-letter"
                  >
                    <FiUser />
                    <span className="menu-item" data-i18n="OfferLetter">
                      Offer Letter
                    </span>
                  </NavLink>
                </li>

                <li className="undefined" style={{ opacity: "0.1" }}>
                  <NavLink className="d-flex align-items-center" to="#">
                    <FiUser />
                    <span
                      className="menu-title text-truncate"
                      data-i18n="Profile"
                    >
                      Public Profile
                    </span>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default InternSidebar;