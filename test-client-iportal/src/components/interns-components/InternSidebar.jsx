import React, { useState } from "react";
import { Link } from "react-router-dom";

export const InternSidebar = () => {
  const [user, setUser] = useState({
    username: sessionStorage.getItem("username"),
    email: sessionStorage.getItem("email"),
    status: sessionStorage.getItem("internStatus"),
    tech: sessionStorage.getItem("technology"),
  });
  return (
    <>
      {/* BEGIN: Main Menu */}
      <div
        className="main-menu menu-fixed menu-light menu-accordion menu-shadow"
        data-scroll-to-active="true"
      >
        <div className="navbar-header mb-3">
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
                  data-ticon="disc"
                ></i>
              </a>
            </li>
          </ul>
        </div>
        <div className="shadow-bottom"></div>
        <div className="main-menu-content">
          <ul
            className="navigation navigation-main"
            id="main-menu-navigation"
            data-menu="menu-navigation"
          >
            {user.status === "Test" ? (
              <li className="nav-item">
                <a className="d-flex align-items-center" href="index.html">
                  <Link to={"/intern-test"}>
                    <i data-feather="clipboard"></i>
                    <span
                      className="menu-title text-truncate"
                      data-i18n="Dashboards"
                    >
                      Test
                    </span>
                  </Link>
                </a>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <a className="d-flex align-items-center" href="index.html">
                    <Link to={"/internDashboard"}>
                      <i data-feather="home"></i>
                      <span
                        className="menu-title text-truncate"
                        data-i18n="Dashboards"
                      >
                        Dashboards
                      </span>
                    </Link>
                  </a>
                </li>

                <li className="nav-item" style={{ marginTop: "-10px" }}>
                  <a
                    className="d-flex align-items-center"
                    href="dashboard-ecommerce.html"
                  >
                    <Link to={"/internAttendence"}>
                      <i data-feather="check-square"></i>
                      <span className="menu-item" data-i18n="eCommerce">
                        Attendance
                      </span>
                    </Link>
                  </a>
                </li>
              </>
            )}
            {/* <li className="nav-item">
              <a className="d-flex align-items-center" href="index.html">
                <Link to={"/internDashboard"}>
                  <i data-feather="home"></i>
                  <span
                    className="menu-title text-truncate"
                    data-i18n="Dashboards"
                  >
                    Dashboards
                  </span>
                </Link>
              </a>
            </li> */}

            {/* <li className="nav-item active">
              <a
                className="d-flex align-items-center"
                href="dashboard-ecommerce.html"
              >
                <i data-feather="grid"></i>
                <span className="menu-item" data-i18n="eCommerce">
                  Work
                </span>
              </a>
            </li> */}

            {/* <li class=" nav-item" style={{marginTop:"-10px"}}><a class="d-flex align-items-center" href="#">
            
            <i style={{
              marginLeft:"15px"
            }} data-feather="file-text"></i><span class="menu-title text-truncate" data-i18n="Invoice">Work</span>
           
            </a>
              <ul class="menu-content">
                <li style={{marginTop:"-10px"}}>
              
                    <Link to={"/internProjects"} style={{
                      marginLeft:"40px",
                      marginBottom:"15px"
                    }}>
                      <i data-feather="circle" ></i><span  class="menu-item" data-i18n="List">Project</span>
                    </Link>
                 
                </li>
                <li style={{marginTop:"-10px"}}>
              
                  <Link to={"/internTasks"}>
                    <i data-feather="circle" style={{
                      marginLeft:"40px"
                    }}></i><span class="menu-item" data-i18n="Preview">Task</span>
                  </Link>
              
                </li>

              </ul>
            </li> */}

            {/* <li className="nav-item" style={{ marginTop: "-10px" }}>
              <a
                className="d-flex align-items-center"
                href="dashboard-ecommerce.html"
              >
                <Link to={"/internAttendence"}>
                  <i data-feather="check-square"></i>
                  <span className="menu-item" data-i18n="eCommerce">
                    Attendance
                  </span>
                </Link>
              </a>
            </li> */}

            {/* <li className=" nav-item" style={{marginTop:"-10px"}}>
              <a className="d-flex align-items-center" href="app-calendar.html">
<Link to={"/internLeave"}>
                <i data-feather="calendar"></i>

                <span className="menu-title text-truncate" data-i18n="Calendar">
                  Leave
                </span>
                </Link>
              </a>
            </li> */}

            {/* <li className="nav-item">
              <a
                className="d-flex align-items-center"
                href="ext-component-sweet-alerts.html"
              >
                <i data-feather="shopping-cart"></i>
                <span className="menu-item" data-i18n="Sweet Alert">
                  Shop
                </span>
              </a>
            </li> */}

            {/* <li className="nav-item">
              <a
                className="d-flex align-items-center"
                href="ext-component-sweet-alerts.html"
              >
                <i data-feather="database"></i>
                <span className="menu-item" data-i18n="Sweet Alert">
                  Points
                </span>
              </a>
            </li> */}
            {/* 
            <li className="nav-item" style={{marginTop:"-10px"}}>
              <a
                className="d-flex align-items-center"
                href="ext-component-sweet-alerts.html"
              >
              <Link to={"/internFeedback"}>
                <i data-feather="message-square"></i>
                <span className="menu-item" data-i18n="Sweet Alert">
                  Feedback
                </span>
                </Link>
              </a>
            </li> */}

            {/* <li className="nav-item" style={{ marginTop: "-10px" }}>
              <a
                className="d-flex align-items-center"
                href="ext-component-sweet-alerts.html"
              >
                <Link to={"/internPost"}>
                  <i data-feather="image"></i>
                  <span className="menu-item" data-i18n="Sweet Alert">
                    Post
                  </span>
                </Link>
              </a>
            </li>

            <li className=" nav-item" style={{ marginTop: "-10px" }}>
              <a className="d-flex align-items-center" href="#">
                <Link to={"/internAnnouncement"}>
                  <i data-feather="info"></i>
                  <span className="menu-title text-truncate" data-i18n="User">
                    Announcement
                  </span>
                </Link>
              </a>
            </li> */}

            {/* <li className=" nav-item" style={{marginTop:"-10px"}}>
              <a className="profile d-flex align-items-center" href="#">
              <Link>
                <i data-feather='user'></i>
                <span className="menu-title text-truncate" data-i18n="User">
                  Public Profile
                </span>
                </Link>
              </a>
            </li> */}
          </ul>
        </div>
      </div>
    </>
  );
};

export default InternSidebar;
