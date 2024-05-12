import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState({});

  const handleInput = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const Login = () => {
    if (value.email !== undefined && value.password !== undefined) {
      axios
        .post("https://api.ezitech.org/hr-auth", { value })
        .then((res) => {
          if (res.data.isLoggedIn === true) {
            // sessionStorage.setItem("username", res.data[0].name);
            // sessionStorage.setItem("email", res.data[0].email);
            sessionStorage.setItem("isLoggedIn", true);
            alert("Login Successfully");
            navigate("/manager-dashboard");
          } else {
            alert("Invalid User!!!");
          }
        });
    } else {
      alert("Please empty fields first!!!");
    }
  };
  return (
    <>
      <div className="main">
        <div className="row">
          <div className="login-img col-lg-8 p-5 text-center">
            <img src="assets/images/login-img.png" width="70%" alt="" />
          </div>
          <div className="col-lg-4 p-lg-5 form-login">
            <div className="container mt-5 px-5">
              <h4 className="pt-5">Welcome Back to EZITECH</h4>

              <div className="form-field">
                <div className="form-group mt-4">
                  <label for="Email">Email</label>
                  <input
                    name="email"
                    type="email"
                    className="form-control"
                    placeholder="Enter Email"
                    onChange={handleInput}
                  />
                </div>
                <div className="form-group mt-4">
                  <label for="Password">Password</label>
                  <input
                    name="password"
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    onChange={handleInput}
                  />
                </div>
                <div className="forget-pass mt-2">
                  <a href="">Forget Password?</a>
                </div>
              </div>
              <div className="container">
                <div className="submit-btn row mt-4">
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={Login}
                  >
                    {" "}
                    SignIn{" "}
                  </button>
                </div>
              </div>
              {/* <div className="row mt-4">
                <div className="col">
                  <hr />
                </div>
                <div className="col">
                  <hr />
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
