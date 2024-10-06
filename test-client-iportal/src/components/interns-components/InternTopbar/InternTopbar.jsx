import React, { useEffect, useState } from "react";
import "./InternTopbar.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export const InternTopbar = () => {
  const navigate = useNavigate();
  const [shiftStarted, setShiftStarted] = useState("checkin");
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [message, setMessage] = useState("");
  const [user, setUser] = useState({
    username: sessionStorage.getItem("username"),
    email: sessionStorage.getItem("email"),
    ezi_id: sessionStorage.getItem("eziId"),
    status: sessionStorage.getItem("internStatus"),
    tech: sessionStorage.getItem("technology"),
  });

  useEffect(() => {
    axios
      .get(`https://api.ezitech.org/current-shift/${user.email}`, {
        headers: { "x-access-token": token },
      })
      .then((res) => {
        if (res.data.shiftActive) {
          setShiftStarted("checkout");
        } else if (res.data.hasMarked) {
          setShiftStarted("marked");
          setMessage("Attendance Marked");
        }
        // else if(res.data.notMarked){
        // setShiftStarted("checkin")
        // }
      });
  }, []);

  const StartShift = () => {
    axios
      .post(
        "https://api.ezitech.org/start-shift",
        { email: user.email },
        { headers: { "x-access-token": token } }
      )
      .then((res) => {
        if (res.data.startShiftStatus) {
          setShiftStarted("checkout");
          alert("Shift Start");
          window.location.reload();
        } else {
          setMessage("Today Attendance Marked");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const EndShift = () => {
    axios
      .post(
        "https://api.ezitech.org/end-shift",
        { email: user.email },
        { headers: { "x-access-token": token } }
      )
      .then((res) => {
        if (res.data.endShiftStatus) {
          setShiftStarted("checkin");
          alert("Shift End");
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Logout = () => {
    sessionStorage.clear();
    alert("Logged Out");
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
                  <i className="ficon" data-feather="menu"></i>
                </a>
              </li>
            </ul>
          </div>
          {/* <ul className="nav navbar-nav align-items-center ml-auto">
            <li className="nav-item mr-25 timer">
              <a
                className="nav-link"
                href="javascript:void(0);"
                data-toggle="dropdown"
              >
                <button className="btn btn-light" disabled>
                  <i className="clock" data-feather="clock"></i>
                  &nbsp;
                  <span className="timer-text">{Number(timer)}</span>
                </button>
              </a>
            </li>
          </ul> */}
          <ul className="nav navbar-nav align-items-center ml-auto">
            {/* <div className="timer"> */}

            {/* </div> */}

            <li className="nav-item dropdown dropdown-notification mr-25">
              <a
                className="nav-link"
                href="javascript:void(0);"
                data-toggle="dropdown"
              >
                {/* <i className="ficon" data-feather="bell"></i> */}
                {/* {shiftStarted ? (
                  <button className="btn btn-danger" onClick={EndShift}>
                    Check Out
                  </button>
                ) : (
                  <button className="btn btn-success" onClick={StartShift}>
                    Check In
                  </button>
                )} */}
                {user.status === "Test" ? (
                  <Link to={"/intern-test"}>
                    <button className="btn btn-warning">{user.status}</button>
                  </Link>
                ) : (
                  <>
                    {shiftStarted === "checkin" && (
                      <button className="btn btn-success" onClick={StartShift}>
                        Check In
                      </button>
                    )}
                    {shiftStarted === "checkout" && (
                      <button className="btn btn-danger" onClick={EndShift}>
                        Check Out
                      </button>
                    )}
                    {shiftStarted === "marked" && (
                      <button className="btn btn-danger">{message}</button>
                    )}
                  </>
                )}
              </a>
            </li>
            <li className="nav-item dropdown dropdown-notification mr-25 show-profile">
              {/* <div className="clock d-flex" style={{ marginRight: "680px" }}>
                <i
                  data-feather="clock"
                  style={{
                    // marginRight: "10px",
                    fontSize: "5px",
                  }}
                ></i>
                <p
                  className="clock-para"
                  style={{
                    alignItems: "end",
                    paddingTop: "13px",
                    fontSize: "16px",
                  }}
                >
                  00:00:00
                </p>
              </div> */}

              <a
                className="nav-link"
                href="javascript:void(0);"
                data-toggle="dropdown"
              >
                <i className="ficon" data-feather="bell"></i>
                <span className="badge badge-pill badge-danger badge-up">
                  5
                </span>
              </a>
            </li>

            <li className="nav-item dropdown dropdown-user">
              <a
                className="nav-link dropdown-toggle dropdown-user-link profile-set"
                id="dropdown-user"
                href="javascript:void(0);"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <div className="user-nav d-sm-flex d-none show-profile">
                  <span className="user-name font-weight-bolder">
                    {user.username}
                  </span>
                  <span className="user-status">Intern</span>
                </div>
                <span className="avatar">
                  <img
                    className="round"
                    src="./app-assets/images/portrait/small/avatar-s-11.jpg"
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
                {/* <a className="dropdown-item" href="page-profile.html">
                  <i className="mr-50" data-feather="user"></i> Profile
                </a>
                <a className="dropdown-item" href="app-email.html">
                  <i className="mr-50" data-feather="mail"></i> Inbox
                </a>
                <a className="dropdown-item" href="app-todo.html">
                  <i className="mr-50" data-feather="check-square"></i> Task
                </a>
                <a className="dropdown-item" href="app-chat.html">
                  <i className="mr-50" data-feather="message-square"></i> Chats
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="page-account-settings.html">
                  <i className="mr-50" data-feather="settings"></i> Settings
                </a>
                <a className="dropdown-item" href="page-pricing.html">
                  <i className="mr-50" data-feather="credit-card"></i> Pricing
                </a>
                <a className="dropdown-item" href="page-faq.html">
                  <i className="mr-50" data-feather="help-circle"></i> FAQ
                </a> */}
                <small>
                  {user.status === "Test" ? (
                    ""
                  ) : (
                    <a className="dropdown-item">
                      <i className="mr-0"></i>ID <br /> {user.ezi_id}
                    </a>
                  )}

                  <a className="dropdown-item">
                    <i className="mr-0"></i>Tech <br /> {user.tech}
                  </a>
                  <a className="dropdown-item">
                    <i className="mr-0"></i>Status <br /> {user.status}
                  </a>
                </small>

                <a className="dropdown-item" type="button" onClick={Logout}>
                  <i className="mr-50" data-feather="power"></i> Logout
                </a>
              </div>
            </li>
          </ul>
        </div>
      </nav>

      {/* End Header */}
    </>
  );
};

export default InternTopbar;
