import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TopHeader } from "../../components/TopHeader";
import { Sidebar } from "../../components/Sidebar";

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const check = sessionStorage.getItem("isAdminLoggedIn");

  // useEffect(() => {
  //   if (!check) {
  //     navigate("/");
  //   }
  // });

  // const getLatestRegister = async () => {
  //   try {
  //     const res = await axios.get("https://api.ezitech.org/get-latest-interns");
  //     setData(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   setInterval(() => {
  //     getLatestRegister();
  //   }, 2000);
  // }, []);

  const localDate = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <>
      <div class="wrapper">
        <Sidebar />
        <div class="main">
          <TopHeader role={"Admin"} />

          <main class="content px-3 py-2">
            <div class="container-fluid">
              <div
                class="mt-4 mb-5"
                // style="--bs-breadcrumb-divider: url(&#34;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='%236c757d'/%3E%3C/svg%3E&#34;);"
                aria-label="breadcrumb"
              >
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <a href="#">Dashboard</a>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    Home
                  </li>
                </ol>
              </div>
              <div class="row">
                <div class="col-12 d-flex">
                  <div class="card flex-fill border-0 illustration shadow">
                    <div class="card-body p-0 d-flex flex-fill">
                      <div class="row g-0 w-100">
                        <div class="col-6">
                          <div class="p-3 m-1">
                            <h4>Welcome, Admin</h4>
                            <p class="mb-0">Admin Dashboard</p>
                          </div>
                        </div>
                        <div class="col-6 align-self-end text-end">
                          <img
                            src="assets/images/customer-support.jpg"
                            class="img-fluid illustration-img"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card border-0 shadow">
                <div class="card-header">
                  <div class="card-title">
                    Latest Updates of {months[localDate.getMonth()]}
                  </div>

                  <div class="card-body">
                    <div className="row">
                      <div className="col-sm-6 shadow rounded p-3">
                        <h5>Ezitech Amount</h5>
                        <br />
                        <h3>PKR-15000</h3>
                      </div>
                      <div className="col-sm-6 shadow rounded p-3">
                        <h5>Ezidonate</h5>
                        <br />
                        <h3>PKR-1500</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>

          <footer class="footer border-top">
            <div class="container-fluid">
              <div class="row text-muted">
                <div class="col-6 text-start p-3">
                  <p class="mb-0">
                    <a href="" class="text-muted">
                      <strong>Manager Dashboard</strong>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};
