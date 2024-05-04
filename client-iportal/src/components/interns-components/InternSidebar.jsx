import React from "react";


export const InternSidebar = () => {
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
            <li className="nav-item">
              <a className="d-flex align-items-center" href="index.html">
                <i data-feather="home"></i>
                <span
                  className="menu-title text-truncate"
                  data-i18n="Dashboards"
                >
                  Dashboards
                </span>
              </a>
            </li>

            <li className="nav-item active">
              <a
                className="d-flex align-items-center"
                href="dashboard-ecommerce.html"
              >
                <i data-feather="grid"></i>
                <span className="menu-item" data-i18n="eCommerce">
                  Porjects
                </span>
              </a>
            </li>

            <li className="nav-item">
              <a
                className="d-flex align-items-center"
                href="dashboard-ecommerce.html"
              >
                <i data-feather='check-square'></i>
                <span className="menu-item" data-i18n="eCommerce">
                  Attendance
                </span>
              </a>
            </li>

            <li className=" nav-item">
              <a className="d-flex align-items-center" href="app-calendar.html">
                <i data-feather="calendar"></i>

                <span className="menu-title text-truncate" data-i18n="Calendar">
                  Leave
                </span>
              </a>
            </li>



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

            <li className="nav-item">
              <a
                className="d-flex align-items-center"
                href="ext-component-sweet-alerts.html"
              >
                <i data-feather="message-square"></i>
                <span className="menu-item" data-i18n="Sweet Alert">
                  Feedback
                </span>
              </a>
            </li>

            <li className="nav-item">
              <a
                className="d-flex align-items-center"
                href="ext-component-sweet-alerts.html"
              >
                <i data-feather="image"></i>
                <span className="menu-item" data-i18n="Sweet Alert">
                  Post
                </span>
              </a>
            </li>

            <li className=" nav-item">
              <a className="d-flex align-items-center" href="#">
                <i data-feather="info"></i>
                <span className="menu-title text-truncate" data-i18n="User">
                  KB Information
                </span>
              </a>
            </li>

            <li className=" nav-item">
              <a className="profile d-flex align-items-center" href="#">
              <i data-feather='user'></i>
                <span className="menu-title text-truncate" data-i18n="User">
                  View Profile
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
