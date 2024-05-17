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
            <li
              className={
                activeLink === "dashboard" ? "activeLink" : "undefined"
              }
            >
              <NavLink
                className="d-flex align-items-center"
                onClick={() => setActive("dashboard")}
                to="/"
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
              className={activeLink === "interns" ? "activeLink" : "undefined"}
            >
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

            <li
              className={activeLink === "remote" ? "activeLink" : "undefined"}
            >
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

            <li
              className={activeLink === "projects" ? "activeLink" : "undefined"}
            >
              <NavLink
                className="d-flex align-items-center"
                onClick={() => setActive("projects")}
                id={"3"}
                // to="/remote-interns"
              >
                <i data-feather="grid"></i>
                <span className="menu-item" data-i18n="eCommerce">
                  Intern Projects
                </span>
              </NavLink>
            </li>

            <li className={activeLink === "leave" ? "activeLink" : "undefined"}>
              <NavLink
                className="d-flex align-items-center"
                onClick={() => setActive("leave")}
                id={"3"}
                // to="/remote-interns"
              >
                <i data-feather="calendar"></i>
                <span className="menu-item" data-i18n="eCommerce">
                  Leave
                </span>
              </NavLink>
            </li>

            <li
              className={activeLink === "announce" ? "activeLink" : "undefined"}
            >
              <NavLink
                className="d-flex align-items-center"
                onClick={() => setActive("announce")}
                id={"3"}
                // to="/remote-interns"
              >
                {/* <i data-feather="calendar"></i> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 22 22"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="icon icon-tabler icons-tabler-outline icon-tabler-speakerphone"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M18 8a3 3 0 0 1 0 6" />
                  <path d="M10 8v11a1 1 0 0 1 -1 1h-1a1 1 0 0 1 -1 -1v-5" />
                  <path d="M12 8h0l4.524 -3.77a.9 .9 0 0 1 1.476 .692v12.156a.9 .9 0 0 1 -1.476 .692l-4.524 -3.77h-8a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h8" />
                </svg>
                <span className="menu-item" data-i18n="eCommerce">
                  Announcement
                </span>
              </NavLink>
            </li>

            <li
              className={activeLink === "reports" ? "activeLink" : "undefined"}
            >
              <NavLink
                className="d-flex align-items-center"
                onClick={() => setActive("reports")}
                id={"3"}
                // to="/remote-interns"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 22 22"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="icon icon-tabler icons-tabler-outline icon-tabler-report"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M8 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h5.697" />
                  <path d="M18 14v4h4" />
                  <path d="M18 11v-4a2 2 0 0 0 -2 -2h-2" />
                  <path d="M8 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                  <path d="M18 18m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                  <path d="M8 11h4" />
                  <path d="M8 15h3" />
                </svg>
                <span className="menu-item" data-i18n="eCommerce">
                  Reports
                </span>
              </NavLink>
            </li>

            <li
              className={activeLink === "balance" ? "activeLink" : "undefined"}
            >
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

            <li
              className={activeLink === "invoice" ? "activeLink" : "undefined"}
            >
              <NavLink
                className="d-flex align-items-center"
                onClick={() => setActive("invoice")}
                to={"/invoice"}
              >
                <i data-feather="file-text"></i>
                <span className="menu-title text-truncate" data-i18n="User">
                  Invoice
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
