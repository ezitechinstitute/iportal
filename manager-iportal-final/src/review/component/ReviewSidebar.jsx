import React, { useState } from "react";
import { FaFireExtinguisher } from "react-icons/fa";
import {
  FiHome,
  FiUserCheck,
  FiUsers,
  FiPhone,
  FiClipboard,
  FiUserX,
  FiUserPlus,
} from "react-icons/fi";

import { Link, NavLink } from "react-router-dom";
// import "../../styles/ManagerStyle.css";

export const ReviewSidebar = () => {
  const [activeLink, setActive] = useState(" ");

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
                to="/review-dashboard"
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

            <li
              className={
                activeLink === "reviewInterns" ? "active " : "undefined"
              }
            >
              <NavLink
                className="d-flex align-items-center"
                onClick={() => setActive("activeInterns")}
                to={"/review-interns"}
              >
                <FiUserPlus />
                <span className="menu-title text-truncate" data-i18n="User">
                  New Feedbacks
                </span>
              </NavLink>
            </li>

            <li
              className={
                activeLink === "nonreviewinterns" ? "active" : "undefined"
              }
            >
              <NavLink
                className="d-flex align-items-center"
                onClick={() => setActive("interns")}
                id={"2"}
                to="/non-review-interns"
              >
               <FiUserCheck />
                <span className="menu-item" data-i18n="eCommerce">
                  Approved Feedbacks
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
