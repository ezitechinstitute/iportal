import React, { useEffect, useState } from "react";
import "./InternTopbar.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiBell, FiUser, FiPower, FiClock, FiFileText, FiCode, FiCheckCircle } from "react-icons/fi";

export const InternTopbar = () => {
  const navigate = useNavigate();
  const [shiftStarted, setShiftStarted] = useState("checkin");
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [message, setMessage] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [user, setUser] = useState({
    username: sessionStorage.getItem("username"),
    email: sessionStorage.getItem("email"),
    ezi_id: sessionStorage.getItem("eziId"),
    status: sessionStorage.getItem("internStatus"),
    tech: sessionStorage.getItem("tech"),
  });
  const [location, setLocation] = useState({ latitude: null, longitude: null });

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
      });
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  }, []);

  const StartShift = () => {
    axios
      .post(
        "https://api.ezitech.org/start-shift",
        {
          id: user.ezi_id,
          email: user.email,
          currentLat: location.latitude,
          currentLon: location.longitude,
        },
        { headers: { "x-access-token": token } }
      )
      .then((res) => {
        alert(res.data.message);
        if (res.data.startShiftStatus) {
          setShiftStarted("checkout");
        } else {
          setMessage("Today Attendance Marked");
        }
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const EndShift = () => {
    axios
      .post(
        "https://api.ezitech.org/end-shift",
        {
          id: user.ezi_id,
          email: user.email,
          currentLat: location.latitude,
          currentLon: location.longitude,
        },
        { headers: { "x-access-token": token } }
      )
      .then((res) => {
        alert(res.data.message);
        if (res.data.endShiftStatus) {
          setShiftStarted("checkin");
        }
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (user.email) {
      axios
        .get(`https://api.ezitech.org/get-int-image?email=${user.email}`, {
          headers: { "x-access-token": token },
        })
        .then((res) => {
          console.log("Image Response:", res.data);
          const image = res.data.image;
          if (image && image.startsWith("data:image")) {
            setAvatar(image);
          } else {
            setAvatar("./app-assets/images/portrait/small/avatar-s-11.jpg");
          }
        })
        .catch((err) => {
          console.error("Error fetching avatar:", err);
          setAvatar("./app-assets/images/portrait/small/avatar-s-11.jpg");
        });
    }
  }, [user.email, token]);

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
                  <FiMenu className="ficon" /> {/* Menu icon */}
                </a>
              </li>
            </ul>
          </div>
          <ul className="nav navbar-nav align-items-center ml-auto">
            <li className="nav-item dropdown dropdown-notification mr-25">
              <a
                className="nav-link"
                href="javascript:void(0);"
                data-toggle="dropdown"
              >
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
              <a
                className="nav-link"
                href="javascript:void(0);"
                data-toggle="dropdown"
              >
                <FiBell className="ficon" /> {/* Notification bell */}
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
                    src={avatar || "./app-assets/images/portrait/small/avatar-s-11.jpg"}
                    alt="User Avatar"
                    height="40"
                    width="40"
                    onError={() => setAvatar("./app-assets/images/portrait/small/avatar-s-11.jpg")}
                  />
                  <span className="avatar-status-online"></span>
                </span>
              </a>
              <div
                className="dropdown-menu dropdown-menu-right"
                aria-labelledby="dropdown-user"
              >
                {/* <small> */}
                  {/* {user.status === "Test" ? ( */}
                    {/* ""
                  ) : (
                    <a className="dropdown-item"> */}
                      {/* <FiFileText className="mr-50" /> Replaced FiIdCard with FiFileText for ID */}
                      {/* ID <br /> {user.ezi_id}
                    </a>
                  )}
                  <a className="dropdown-item">
                    <FiCode className="mr-50" /> Technology icon 
                    Tech <br /> {user.tech}
                  </a> */}
                  {/* <a className="dropdown-item">
                    <FiCheckCircle className="mr-50" /> Status icon */}
                    {/* Status <br /> {user.status}
                  </a>
                </small> */}
                <Link className="dropdown-item" type="button" to="/intern-profile">
                  <FiUser className="mr-50" /> 
                  Profile
                </Link>
                <a className="dropdown-item" type="button" onClick={Logout}>
                  <FiPower className="mr-50" /> {/* Logout icon */}
                  Logout
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