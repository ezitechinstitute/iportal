import React, { useEffect, useState } from "react";
import "./InternTopbar.css";

export const InternTopbar = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const StartShift = (e) => {
    if (!isRunning) {
      const id = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
      setIntervalId(id);
      setIsRunning(true);
    }
  };

  const EndShift = (e) => {
    if (isRunning) {
      clearInterval(intervalId);
      setIsRunning(false);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);
  // const [status, setStatus] = useState();
  // const [seconds, setSeconds] = useState(0);
  // const [minutes, setMinutes] = useState(0);
  // const [hours, setHours] = useState(0);
  // let timer = 0;

  // const StartShift = (e) => {
  //   setStatus(e);
  //   timer = setTimeout(() => {
  //     setSeconds(seconds + 1);

  //     if (seconds === 59) {
  //       setMinutes(minutes + 1);
  //       setSeconds(0);
  //     }

  //     if (minutes === 60) {
  //       setHours(hours + 1);
  //       setMinutes(0);
  //     }
  //   }, 1000);

  //   return () => clearInterval(timer);
  // };

  // const EndShift = (e) => {
  //   setStatus(e);
  // };

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
          <ul className="nav navbar-nav align-items-center ml-auto">
            <li className="nav-item mr-25 timer">
              <a
                className="nav-link"
                href="javascript:void(0);"
                data-toggle="dropdown"
              >
                <button className="btn btn-light" disabled>
                  <i className="clock" data-feather="clock"></i>
                  &nbsp;
                  <span className="timer-text">
                    {time}
                    {/* {hours < 10 ? "0" + hours : hours} :{" "}
                    {minutes < 10 ? "0" + minutes : minutes} :{" "}
                    {seconds < 10 ? "0" + seconds : seconds} */}
                  </span>
                </button>
              </a>
            </li>
          </ul>
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
                {/* {status === 1 ? ( */}
                <button className="btn btn-danger" onClick={() => EndShift(0)}>
                  Check Out
                </button>
                {/* ) : ( */}
                <button
                  className="btn btn-success"
                  onClick={() => StartShift(1)}
                >
                  Check In
                </button>
                {/* )} */}
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
                  <span className="user-name font-weight-bolder">John Doe</span>
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
                <a className="dropdown-item" href="page-auth-login-v2.html">
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
