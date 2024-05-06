import React from "react";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  return (
    <>
      <div id="sidebar">
        <div class="sidebar h-100">
          <div class="sidebar-logo">
            <a href="">Manager Dashboard</a>
          </div>
          <ul class="sidebar-nav">
            <li class="sidebar-header">Manager Elements</li>
            <li class="sidebar-item">
              <Link to="/manager-dashboard" class="sidebar-link">
                <i class="fa-solid fa-house pe-2"></i>Dashboard
              </Link>
            </li>
            <li class="sidebar-item">
              <a
                href="#"
                class="sidebar-link collapsed"
                data-bs-target="#pages"
                data-bs-toggle="collapse"
                arua-expended="false"
              >
                Interns
              </a>
              <ul
                id="pages"
                class="sidebar-dropdown list-unstyled collapse"
                data-bs-parent="#sidebar"
              >
                <li class="sidebar-item">
                  <Link to="/onsite-interns" class="sidebar-link">
                    <i class="fa-solid fa-users pe-2"></i>
                    Onsite
                  </Link>
                </li>
                <li class="sidebar-item">
                  <Link to="/remote-interns" class="sidebar-link">
                    <i class="fa-solid fa-users pe-2"></i>Remote
                  </Link>
                </li>
                {/* <li class="sidebar-item">
                  <a href="#" class="sidebar-link">
                    <i class="fa-solid fa-eye pe-2"></i>View Attendance
                  </a>
                </li> */}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
