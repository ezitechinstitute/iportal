import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaEnvelope, FaGithub, FaEye } from "react-icons/fa"; // Import icons

export const SupervisorLogin = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState({});

  const handleInput = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const Login = () => {
    if (value.email !== undefined && value.password !== undefined) {
      axios
        .post("https://api.ezitech.org/supervisor-auth", { value })
        .then((res) => {
          if (
            res.data.isLoggedIn === true &&
            res.data.user.loginas === "Supervisor"
          ) {
            sessionStorage.setItem("managerid", res.data.user.manager_id);
            sessionStorage.setItem("etiId", res.data.user.eti_id);
            sessionStorage.setItem("username", res.data.user.name);
            sessionStorage.setItem("email", res.data.user.email);
            sessionStorage.setItem("token", res.data.token);
            sessionStorage.setItem("role", res.data.user.loginas);
            sessionStorage.setItem("isLoggedIn", true);
            alert("Login Successfully");
            navigate("/supervisor-dashboard");
          } else {
            alert("Invalid User!!!");
          }
        })
        .catch((err) => {
          console.error("Login error:", err);
          alert("An error occurred during login. Please try again.");
        });
    } else {
      alert("Please fill in all fields!!!");
    }
  };

  return (
    <>
      <div className="auth-wrapper auth-v2">
        <div className="auth-inner row m-0">
          <a className="brand-logo" href="javascript:void(0);">
            <img src="./images/logo.png" alt="" width={150} />
          </a>
          <div className="d-none d-lg-flex col-lg-8 align-items-center p-5">
            <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
              <img
                className="img-fluid"
                src="../../../app-assets/images/pages/login-v2.svg"
                alt="Login V2"
              />
            </div>
          </div>
          <div className="d-flex col-lg-4 align-items-center auth-bg px-2 p-lg-5">
            <div className="col-12 col-sm-8 col-md-6 col-lg-12 px-xl-2 mx-auto">
              <h4 className="card-title mb-1">Welcome to Ezitech! 👋</h4>
              <p className="card-text mb-2">
                Please sign-in to your account and start the adventure
              </p>
              <div className="form-group">
                <label className="form-label" htmlFor="login-email">
                  Email
                </label>
                <input
                  className="form-control"
                  id="login-email"
                  type="text"
                  name="email"
                  onChange={handleInput}
                  placeholder="ezitech@example.com"
                  aria-describedby="login-email"
                  autoFocus
                  tabIndex="1"
                  required
                />
              </div>
              <div className="form-group">
                <div className="d-flex justify-content-between">
                  <label htmlFor="login-password">Password</label>
                  <a href="#" data-toggle="modal" data-target="#exampleModalCenter">
                    <small>Forgot Password?</small>
                  </a>
                </div>
                <div className="input-group input-group-merge form-password-toggle">
                  <input
                    className="form-control form-control-merge"
                    id="login-password"
                    type="password"
                    name="password"
                    onChange={handleInput}
                    placeholder="············"
                    aria-describedby="login-password"
                    tabIndex="2"
                    required
                  />
                 
                </div>
              </div>
              <div className="form-group">
                <div className="custom-control custom-checkbox">
                  <input
                    className="custom-control-input"
                    id="remember-me"
                    type="checkbox"
                    tabIndex="3"
                  />
                  <label className="custom-control-label" htmlFor="remember-me">
                    Remember Me
                  </label>
                </div>
              </div>
              <button
                className="btn btn-primary btn-block"
                tabIndex="4"
                onClick={Login}
              >
                Login
              </button>
              <div className="divider my-2">
                <div className="divider-text">or</div>
              </div>
              <div className="auth-footer-btn d-flex justify-content-center">
                <a className="btn btn-facebook" href="javascript:void(0)">
                  <FaFacebookF /> {/* Replaced Feather icon */}
                </a>
                <a className="btn btn-twitter white" href="javascript:void(0)">
                  <FaTwitter /> {/* Replaced Feather icon */}
                </a>
                <a className="btn btn-google" href="javascript:void(0)">
                  <FaEnvelope /> {/* Replaced Feather mail icon */}
                </a>
                <a className="btn btn-github" href="javascript:void(0)">
                  <FaGithub /> {/* Replaced Feather icon */}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <div
        className="modal fade"
        id="exampleModalCenter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalCenterTitle">
                Forgot Password
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <input
                className="form-control"
                type="email"
                name="email"
                placeholder="Email"
                // onChange={handlePassword}
              />
              <br />
              <input
                className="form-control"
                type="password"
                name="password"
                // onChange={handlePassword}
                placeholder="New Password"
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                // onClick={handlePasswordUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};