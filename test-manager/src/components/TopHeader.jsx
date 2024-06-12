import React from "react";
import { useNavigate } from "react-router-dom";

export const TopHeader = ({ role }) => {
  const navigate = useNavigate();

  const Logout = () => {
    sessionStorage.clear();
    alert("Logged Out Successfully ");
    navigate("/");
  };
  return (
    <>
      <nav class="navbar navbar-expand px-3 border-bottom">
        <button class="btn" id="sidebar-toggle" type="button">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="navbar-collapse navbar">
          <ul class="navbar-nav">
            <li class="nav-item align-self-center flex-wrap px-4">
              <p class="marquee">
                <span>
                  {" "}
                  <strong>{sessionStorage.getItem("username")}</strong>{" "}
                  &nbsp;&nbsp;&nbsp;{" "}
                </span>
              </p>
            </li>
            <li class="nav-item dropdown">
              <a href="#" data-bs-toggle="dropdown" class="nav-icon pe-md-0">
                <img
                  src="assets/images/Profile.jpg"
                  class="avatar img-fluid rounded-circle"
                  alt=""
                />
              </a>
              <div class="dropdown-menu dropdown-menu-end">
                <ul>
                  <li>
                    <a
                      href="#"
                      class="dropdown-item border-top"
                      type="button"
                      onClick={Logout}
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};
