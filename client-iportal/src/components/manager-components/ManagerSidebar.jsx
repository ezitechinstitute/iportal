import React, { useState } from "react";
import { FiDollarSign } from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";
// import "../../styles/ManagerStyle.css";

export const ManagerSidebar = () => {
  const [active, setActive] = useState();

  const updateMenuStatus = (e) => {
    setActive(e);
  };
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
            <li className={active === "dashboard" ? "active" : undefined}>
              <NavLink
                className="d-flex align-items-center"
                onClick={() => updateMenuStatus("dashboard")}
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

            <li className={active === "interns" ? "active" : undefined}>
              <NavLink
                className="d-flex align-items-center"
                onClick={() => updateMenuStatus("interns")}
                id={"2"}
                to="/onsite-interns"
              >
                <i data-feather="users"></i>
                <span className="menu-item" data-i18n="eCommerce">
                  Interns
                </span>
              </NavLink>
            </li>

            <li className={active === "remote" ? "active" : undefined}>
              <NavLink
                className="d-flex align-items-center"
                onClick={() => updateMenuStatus("remote")}
                id={"3"}
                to="/remote-interns"
              >
                <i data-feather="monitor"></i>
                <span className="menu-item" data-i18n="eCommerce">
                  Remote Interns
                </span>
              </NavLink>
            </li>

            <li className={active === "projects" ? "active" : undefined}>
              <NavLink
                className="d-flex align-items-center"
                onClick={() => updateMenuStatus("projects")}
                id={"3"}
                to="/remote-interns"
              >
                <i data-feather="grid"></i>
                <span className="menu-item" data-i18n="eCommerce">
                  Intern Projects
                </span>
              </NavLink>
            </li>

            <li className={active === "leave" ? "active" : undefined}>
              <NavLink
                className="d-flex align-items-center"
                onClick={() => updateMenuStatus("leave")}
                id={"3"}
                to="/remote-interns"
              >
                <i data-feather="calendar"></i>
                <span className="menu-item" data-i18n="eCommerce">
                  Leave
                </span>
              </NavLink>
            </li>

            <li className={active === "balance" ? "active" : undefined}>
              <NavLink
                className="d-flex align-items-center"
                onClick={() => updateMenuStatus("balance")}
                to={"/"}
              >
                <FiDollarSign />
                <span className="menu-title text-truncate" data-i18n="User">
                  Balance
                </span>
              </NavLink>
            </li>

            <li className={active === "invoice" ? "active" : undefined}>
              <NavLink
                className="d-flex align-items-center"
                onClick={() => updateMenuStatus("invoice")}
                to={"/"}
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
