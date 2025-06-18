import React, { useState } from "react";
import "../../assets/AdminAssets/style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaEnvelope, FaGithub } from "react-icons/fa"; // Import React Icons

export const InternLogin = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({});
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [user, setUser] = useState({
    username: sessionStorage.getItem("username"),
    email: sessionStorage.getItem("email"),
    phone: sessionStorage.getItem("phone"),
    ezi_id: sessionStorage.getItem("eziId"),
    status: sessionStorage.getItem("internStatus"),
    tech: sessionStorage.getItem("technology"),
    interntype: sessionStorage.getItem("intern_type"),
    duration: sessionStorage.getItem("duration"),
    join_date: sessionStorage.getItem("join_date"),
    int_id: sessionStorage.getItem("int_id"),
  });
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const SubmitLogin = (e) => {
    e.preventDefault();

    axios
      .post("https://api.ezitech.org/intern-auth", { values })
      .then((res) => {
        if (
          !res.data.userStatus &&
          res.data.loginStatus &&
          !res.data.passwordStatus
        ) {
          if (res.data.intern.int_status === "Test") {
            setToken(res.data.token);
            setUser({
              username: res.data.intern.name,
              email: res.data.intern.email,
              phone: res.data.intern.phone,
              status: res.data.intern.int_status,
              tech: res.data.intern.int_technology,
              duration: res.data.intern.duration,
              interntype: res.data.intern.intern_type,
              join_date: res.data.intern.join_date,
              int_id: res.data.intern.int_id,
            });
            sessionStorage.setItem("isLoggedIn", true);
            sessionStorage.setItem("token", res.data.token);
            sessionStorage.setItem("username", res.data.intern.name);
            sessionStorage.setItem("email", res.data.intern.email);
            sessionStorage.setItem("phone", res.data.intern.phone);
            sessionStorage.setItem("internStatus", res.data.intern.int_status);
            sessionStorage.setItem(
              "technology",
              res.data.intern.int_technology
            );
            sessionStorage.setItem("duration", res.data.intern.duration);
            sessionStorage.setItem("interntype", res.data.intern.intern_type);
            sessionStorage.setItem("join_date", res.data.intern.join_date);
            sessionStorage.setItem("int_id", res.data.intern.int_id);
            alert("Login Successfully");
            navigate("/intern-dashboard");
          }

          if (res.data.intern.int_status === "Active") {
            setToken(res.data.token);
            setUser({
              username: res.data.intern.name,
              email: res.data.intern.email,
              phone: res.data.intern.phone,
              ezi_id: res.data.intern.eti_id,
              status: res.data.intern.int_status,
              tech: res.data.intern.int_technology,
              interntype: res.data.intern.intern_type,
              duration: res.data.intern.duration,
              join_date: res.data.intern.join_date,
              int_id: res.data.intern.int_id,
            });
            sessionStorage.setItem("isLoggedIn", true);
            sessionStorage.setItem("token", res.data.token);
            sessionStorage.setItem("username", res.data.intern.name);
            sessionStorage.setItem("email", res.data.intern.email);
            sessionStorage.setItem("eziId", res.data.intern.eti_id);
            sessionStorage.setItem("tech", res.data.intern.technology);
            sessionStorage.setItem("interntype", res.data.intern.intern_type);
            sessionStorage.setItem("internStatus", res.data.intern.int_status);
            sessionStorage.setItem("duration", res.data.intern.duration);
            sessionStorage.setItem("join_date", res.data.intern.join_date);
            sessionStorage.setItem("int_id", res.data.intern.int_id);
            alert("Login Successfully");
            navigate("/intern-dashboard");
          }
        } else {
          alert("Invalid User!!!");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("An error occurred during login. Please try again.");
      });
  };

  const handleForgotPassword = async () => {
    try {
      const res = await axios.post(
        "https://api.ezitech.org/intern-forget-password",
        {
          email: formData.email,
        }
      );
      alert(res.data.message);
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to send reset email.");
    }
  };

  return (
    <>
      <div className="auth-wrapper auth-v2">
        <div className="auth-inner row m-0">
          {/* Brand Logo */}
          <a className="brand-logo" href="javascript:void(0);">
            <img src="./images/logo.png" alt="" width={150} />
          </a>

          {/* Left Text */}
          <div className="d-none d-lg-flex col-lg-8 align-items-center p-5">
            <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
              <img
                className="img-fluid"
                src="../../../app-assets/images/pages/login-v2.svg"
                alt="Login V2"
              />
            </div>
          </div>

          {/* Login Form */}
          <div className="d-flex col-lg-4 align-items-center auth-bg px-2 p-lg-5">
            <div className="col-12 col-sm-8 col-md-6 col-lg-12 px-xl-2 mx-auto">
              <h4 className="card-title mb-1">Welcome to Ezitech! 👋</h4>
              <p className="card-text mb-2">
                Please sign-in to your account and start the adventure
              </p>
              <form className="auth-login-form mt-2" onSubmit={SubmitLogin}>
                <div className="form-group">
                  <label className="form-label" htmlFor="login-email">
                    Email
                  </label>
                  <input
                    className="form-control"
                    id="login-email"
                    type="text"
                    name="loginEmail"
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
                    <a
                      href="#"
                      data-toggle="modal"
                      data-target="#exampleModalCenter"
                    >
                      <small>Forgot Password?</small>
                    </a>
                  </div>
                  <div className="input-group input-group-merge form-password-toggle">
                    <input
                      className="form-control form-control-merge"
                      id="login-password"
                      type="password"
                      name="loginPassword"
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
                    <label
                      className="custom-control-label"
                      htmlFor="remember-me"
                    >
                      Remember Me
                    </label>
                  </div>
                </div>
                <button
                  className="btn btn-primary btn-block"
                  tabIndex="4"
                  type="submit"
                >
                  Login
                </button>
              </form>
              <p className="text-center mt-2">
                <span>New on our platform?</span>
                <a
                  href="https://register.ezitech.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span> Register </span>
                </a>
              </p>
              <div className="divider my-2">
                <div className="divider-text">or</div>
              </div>
              <div className="auth-footer-btn d-flex justify-content-center">
                <a className="btn btn-facebook" href="javascript:void(0)">
                  <FaFacebookF /> {/* Replaced Feather facebook icon */}
                </a>
                <a className="btn btn-twitter white" href="javascript:void(0)">
                  <FaTwitter /> {/* Replaced Feather twitter icon */}
                </a>
                <a className="btn btn-google" href="javascript:void(0)">
                  <FaEnvelope /> {/* Replaced Feather mail icon */}
                </a>
                <a className="btn btn-github" href="javascript:void(0)">
                  <FaGithub /> {/* Replaced Feather github icon */}
                </a>
              </div>
            </div>
          </div>
          {/* End Login Form */}
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
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <br />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleForgotPassword}
              >
                Send Reset Link
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
