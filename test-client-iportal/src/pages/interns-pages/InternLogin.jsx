import React, { useState } from "react";
import "../../assets/AdminAssets/style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  });

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
          if (res.data.intern.status === "Test") {
            setToken(res.data.token);
            setUser({
              username: res.data.intern.name,
              email: res.data.intern.email,
              phone: res.data.intern.phone,
              status: res.data.intern.status,
              tech: res.data.intern.technology,
            });
            sessionStorage.setItem("isLoggedIn", true);
            sessionStorage.setItem("token", res.data.token);
            sessionStorage.setItem("username", res.data.intern.name);
            sessionStorage.setItem("email", res.data.intern.email);
            sessionStorage.setItem("phone", res.data.intern.phone);
            sessionStorage.setItem("internStatus", res.data.intern.status);
            sessionStorage.setItem("technology", res.data.intern.technology);
            alert("Login Successfully");
            navigate("/internDashboard");
          }

          if (res.data.intern.status === "Active") {
            setToken(res.data.token);
            setUser({
              username: res.data.intern.name,
              email: res.data.intern.email,
              phone: res.data.intern.phone,
              ezi_id: res.data.intern.ezi_id,
              status: res.data.intern.status,
              tech: res.data.intern.technology,
            });
            sessionStorage.setItem("isLoggedIn", true);
            sessionStorage.setItem("token", res.data.token);
            sessionStorage.setItem("username", res.data.intern.name);
            sessionStorage.setItem("email", res.data.intern.email);
            sessionStorage.setItem("eziId", res.data.intern.ezi_id);
            sessionStorage.setItem("internStatus", res.data.intern.status);
            sessionStorage.setItem("technology", res.data.intern.technology);
            alert("Login Successfully");
            navigate("/internDashboard");
          }
        } else {
          alert("Invalid User!!!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      {/* <div class="app-content content ">
        <div class="content-overlay"></div>
        <div class="header-navbar-shadow"></div>
        <div class="content-wrapper">
          <div class="content-header row"></div>
          <div class="content-body"> */}
      <div class="auth-wrapper auth-v2">
        <div class="auth-inner row m-0">
          {/* <!-- Brand logo--> */}
          <a className="brand-logo" href="javascript:void(0);">
            {/* <div className="brand-logo"> */}
            <img src="./images/logo.png" alt="" width={150} />
            {/* </div> */}
          </a>
          {/* <!-- /Brand logo--> */}
          {/* <!-- Left Text--> */}
          <div class="d-none d-lg-flex col-lg-8 align-items-center p-5">
            <div class="w-100 d-lg-flex align-items-center justify-content-center px-5">
              <img
                class="img-fluid"
                src="../../../app-assets/images/pages/login-v2.svg"
                alt="Login V2"
              />
            </div>
          </div>
          {/* <!-- /Left Text--> */}
          {/* <!-- Login--> */}
          <div class="d-flex col-lg-4 align-items-center auth-bg px-2 p-lg-5">
            <div class="col-12 col-sm-8 col-md-6 col-lg-12 px-xl-2 mx-auto">
              <h4 class="card-title mb-1">Welcome to Ezitech! 👋</h4>
              <p class="card-text mb-2">
                Please sign-in to your account and start the adventure
              </p>
              <form class="auth-login-form mt-2" onSubmit={SubmitLogin}>
                <div class="form-group">
                  <label class="form-label" for="login-email">
                    Email
                  </label>
                  <input
                    class="form-control"
                    id="login-email"
                    type="text"
                    name="loginEmail"
                    onChange={handleInput}
                    placeholder="ezitech@example.com"
                    aria-describedby="login-email"
                    autofocus=""
                    tabindex="1"
                    required
                  />
                </div>
                <div class="form-group">
                  <div class="d-flex justify-content-between">
                    <label for="login-password">Password</label>
                    <a href="page-auth-forgot-password-v2.html">
                      <small>Forgot Password?</small>
                    </a>
                  </div>
                  <div class="input-group input-group-merge form-password-toggle">
                    <input
                      class="form-control form-control-merge"
                      id="login-password"
                      type="password"
                      name="loginPassword"
                      onChange={handleInput}
                      placeholder="············"
                      aria-describedby="login-password"
                      tabindex="2"
                      required
                    />
                    <div class="input-group-append">
                      <span class="input-group-text cursor-pointer">
                        <i data-feather="eye"></i>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="custom-control custom-checkbox">
                    <input
                      class="custom-control-input"
                      id="remember-me"
                      type="checkbox"
                      tabindex="3"
                    />
                    <label class="custom-control-label" for="remember-me">
                      {" "}
                      Remember Me
                    </label>
                  </div>
                </div>
                <button
                  class="btn btn-primary btn-block"
                  tabindex="4"
                  type="submit"
                >
                  Login
                </button>
              </form>
              <p class="text-center mt-2">
                <span>New on our platform?</span>
                <a href="https://register.ezitech.org" target="_blank">
                  <span>&nbsp; Register </span>
                </a>
              </p>
              <div class="divider my-2">
                <div class="divider-text">or</div>
              </div>
              <div class="auth-footer-btn d-flex justify-content-center">
                <a class="btn btn-facebook" href="javascript:void(0)">
                  <i data-feather="facebook"></i>
                </a>
                <a class="btn btn-twitter white" href="javascript:void(0)">
                  <i data-feather="twitter"></i>
                </a>
                <a class="btn btn-google" href="javascript:void(0)">
                  <i data-feather="mail"></i>
                </a>
                <a class="btn btn-github" href="javascript:void(0)">
                  <i data-feather="github"></i>
                </a>
              </div>
            </div>
          </div>
          {/* <!-- /Login--> */}
        </div>
      </div>
      {/* </div>
        </div>
      </div> */}
      {/* <!-- END: Content--> */}
    </>
  );
};
