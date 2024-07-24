import React, { useState } from "react";
import { FiDollarSign } from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";
// import "../../styles/ManagerStyle.css";

export const ManagerSidebar = () => {
  const [activeLink, setActive] = useState(" ");

  // const setActive = (e) => {
  //   setActive(e);
  // };
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
                  data-ticon="disc"
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
            <li className={activeLink === "dashboard" ? "active" : "undefined"}>
              <NavLink
                className="d-flex align-items-center"
                onClick={() => setActive("dashboard")}
                to="/manager-dashboard"
              >
                <i data-feather="home"></i>
                <span
                  className="menu-title text-truncate"
                  data-i18n="Dashboards"
                >
                  Dashboard
                </span>
              </NavLink>
            </li>

            <li
              className={
                activeLink === "activeInterns" ? "active " : "undefined"
              }
            >
              <NavLink
                className="d-flex align-items-center"
                onClick={() => setActive("activeInterns")}
                to={"/active-interns"}
              >
                <i data-feather="user-check"></i>
                <span className="menu-title text-truncate" data-i18n="User">
                  Active Interns
                </span>
              </NavLink>
            </li>

            <li className={activeLink === "interns" ? "active" : "undefined"}>
              <NavLink
                className="d-flex align-items-center"
                onClick={() => setActive("interns")}
                id={"2"}
                to="/onsite-interns"
              >
                <i data-feather="users"></i>
                <span className="menu-item" data-i18n="eCommerce">
                  Onsite Interns
                </span>
              </NavLink>
            </li>

            <li className={activeLink === "remote" ? "active" : "undefined"}>
              <NavLink
                className="d-flex align-items-center"
                onClick={() => setActive("remote")}
                id={"3"}
                to="/remote-interns"
              >
                <i data-feather="monitor"></i>
                <span className="menu-item" data-i18n="eCommerce">
                  Remote Interns
                </span>
              </NavLink>
            </li>

            <li className={activeLink === "contact" ? "active" : "undefined"}>
              <NavLink
                className="d-flex align-items-center"
                onClick={() => setActive("contact")}
                id={"3"}
                to="/contact-with"
              >
                <i data-feather="phone"></i>
                <span className="menu-item" data-i18n="eCommerce">
                  Contact With
                </span>
              </NavLink>
            </li>

            <li className={activeLink === "test" ? "active" : "undefined"}>
              <NavLink
                className="d-flex align-items-center"
                onClick={() => setActive("test")}
                id={"3"}
                to="/interview-test"
              >
                <i data-feather="clipboard"></i>
                <span className="menu-item" data-i18n="eCommerce">
                  Interview Test
                </span>
              </NavLink>
            </li>

            <li className={activeLink === "projects" ? "active" : "undefined"}>
              <NavLink
                className="d-flex align-items-center"
                onClick={() => setActive("projects")}
                id={"3"}
                to="/test-completed"
              >
                <i data-feather="check-square"></i>
                <span className="menu-item" data-i18n="eCommerce">
                  Test Completed
                </span>
              </NavLink>
            </li>

            <li className={activeLink === "leave" ? "active" : "undefined"} hidden>
              <NavLink
                className="d-flex align-items-center"
                onClick={() => setActive("leave")}
                id={"3"}
                to="/manager-leave"
              >
                <i data-feather="calendar"></i>
                <span className="menu-item" data-i18n="eCommerce">
                  Leave
                </span>
              </NavLink>
            </li>

            <li className={activeLink === "balance" ? "active " : "undefined"} hidden>
              <NavLink
                className="d-flex align-items-center"
                onClick={() => setActive("balance")}
                to={"/balance"}
              >
                <FiDollarSign />
                <span className="menu-title text-truncate" data-i18n="User">
                  Balance
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
