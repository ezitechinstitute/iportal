import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaEnvelope, FaGithub, FaEye } from "react-icons/fa"; // Import React Icons

const ReviewLogin = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); // State for error messages

  // Handle input changes
  const handleInput = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = value;

    // Static credentials
    const staticEmail = "review@ezitech.org";
    const staticPassword = "review123";

    if (!email || !password) {
      setError("Please fill in all fields first!");
      return;
    }

    // Check if credentials match
    if (email === staticEmail && password === staticPassword) {
      // Simulate successful login
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("email", email);
      alert("Login Successful!");
      navigate("/review-dashboard"); // Redirect to review-dashboard
    } else {
      setError("Invalid email or password!");
    }
  };

  return (
    <>
      <div className="auth-wrapper auth-v2">
        <div className="auth-inner row m-0">
          {/* Brand Logo */}
          <a className="brand-logo" href="javascript:void(0);">
            <img src="./images/logo.png" alt="Logo" width={150} />
          </a>

          {/* Left Image (hidden on small screens) */}
          <div className="d-none d-lg-flex col-lg-8 align-items-center p-5">
            <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
              <img
                className="img-fluid"
                src="../../../app-assets/images/pages/login-v2.svg"
                alt="Login Illustration"
              />
            </div>
          </div>

          {/* Login Form */}
          <div className="d-flex col-lg-4 align-items-center auth-bg px-2 p-lg-5">
            <div className="col-12 col-sm-8 col-md-6 col-lg-12 px-xl-2 mx-auto">
              <h4 className="card-title mb-1">Welcome to Ezitech! 👋</h4>
              <p className="card-text mb-2">
                Please sign in to your account and start the adventure
              </p>

              {/* Display error message */}
              {error && <div className="alert alert-danger">{error}</div>}

              <form className="auth-login-form mt-2" onSubmit={handleLogin}>
                <div className="form-group">
                  <label className="form-label" htmlFor="login-email">
                    Email
                  </label>
                  <input
                    className="form-control"
                    id="login-email"
                    type="email"
                    name="email"
                    value={value.email}
                    onChange={handleInput}
                    placeholder="admin@gmail.com"
                    aria-describedby="login-email"
                    autoFocus
                    tabIndex="1"
                    required
                  />
                </div>

                <div className="form-group">
                  <div className="d-flex justify-content-between">
                    <label htmlFor="login-password">Password</label>
                    {/* <a href="#" data-toggle="modal" data-target="#exampleModalCenter">
                      <small>Forgot Password?</small>
                    </a> */}
                  </div>
                  <div className="input-group input-group-merge form-password-toggle">
                    <input
                      className="form-control form-control-merge"
                      id="login-password"
                      type="password"
                      name="password"
                      value={value.password}
                      onChange={handleInput}
                      placeholder="············"
                      aria-describedby="login-password"
                      tabIndex="2"
                      required
                    />
                    <div className="input-group-append">
                      <span className="input-group-text cursor-pointer">
                        {/* <FaEye />  */}
                      </span>
                    </div>
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
                  type="submit"
                  tabIndex="4"
                >
                  Login
                </button>
              </form>

              <div className="divider my-2">
                <div className="divider-text">or</div>
              </div>

              <div className="auth-footer-btn d-flex justify-content-center">
                <a className="btn btn-facebook" href="javascript:void(0)">
                  <FaFacebookF /> {/* Facebook icon */}
                </a>
                <a className="btn btn-twitter white" href="javascript:void(0)">
                  <FaTwitter /> {/* Twitter icon */}
                </a>
                <a className="btn btn-google" href="javascript:void(0)">
                  <FaEnvelope /> {/* Email icon */}
                </a>
                <a className="btn btn-github" href="javascript:void(0)">
                  <FaGithub /> {/* GitHub icon */}
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
                // Add onChange and logic for password reset if needed
              />
              <br />
              <input
                className="form-control"
                type="password"
                name="password"
                placeholder="New Password"
                // Add onChange and logic for password reset if needed
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                // Add onClick handler for password reset if implemented
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

export default ReviewLogin;