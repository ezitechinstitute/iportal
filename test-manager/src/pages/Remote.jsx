import axios from "axios";
import React, { useEffect, useState } from "react";
import { TopHeader } from "../components/TopHeader";
import { Sidebar } from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

export const Remote = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const check = sessionStorage.getItem("isLoggedIn");

  useEffect(() => {
    if (!check) {
      navigate("/");
    }
  });

  const getRemoteRegister = () => {
    axios
      .get("https://api.ezitech.org/get-remote-interns")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setInterval(() => {
      getRemoteRegister();
    }, 2000);
  }, []);

  const UpdateRemoteStaus = (email) => {
    axios
      .post("https://api.ezitech.org/update-intern-status", { email })
      .then((res) => {
        if (res.data === 1) {
          alert("Status Updated");
        } else {
          alert("Something Went Wrong!!!");
        }
      });
  };

  const RemoveRemote = (email) => {
    axios
      .post("https://api.ezitech.org/remove-intern", { email })
      .then((res) => {
        if (res.data === 1) {
          alert("Removed Successfully");
        } else {
          alert("Something Went Wrong!!!");
        }
      });
  };
  return (
    <>
      <div class="wrapper">
        <Sidebar />
        <div class="main">
          <TopHeader />

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
                    Remote
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
                            <h4>Welcome, Manager</h4>
                            <p class="mb-0">Manager Dashboard</p>
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
                {/* <div class="col-12 col-md-6 d-flex">
                  <div class="card flex-fill border-0 illustration shadow">
                    <div class="card-body p-0 d-flex flex-fill">
                      <div class="row g-0 w-100">
                        <div class="col-6">
                          <div class="p-3 m-1">
                            <h4>WelcomeBack, Admin</h4>
                            <p class="mb-0">Admin Dashboard, Abdulreman</p>
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
                </div> */}
              </div>
              <div class="card border-0 shadow">
                <div class="card-header">
                  <div class="card-title">Remote Registrations</div>

                  <div class="card-body overflow-x-scroll">
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Full Name</th>
                          <th scope="col">Email</th>
                          <th scope="col">Contact</th>
                          <th scope="col">Technology</th>
                          <th scope="col">Interview</th>
                          <th scope="col">Status</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((rs) => {
                          const {
                            id,
                            name,
                            email,
                            phone,
                            technology,
                            interview_type,
                            status,
                          } = rs;

                          return (
                            <>
                              <tr>
                                <th scope="row">{id}</th>
                                <td>{name}</td>
                                <td>{email}</td>
                                <td>{phone}</td>
                                <td>{technology}</td>
                                <td>{interview_type}</td>
                                <td>{status}</td>
                                <td>
                                  <div class="btn-group">
                                    <button
                                      type="button"
                                      class="btn btn-primary dropdown-toggle"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                    >
                                      Action
                                    </button>
                                    <ul class="dropdown-menu">
                                      <li>
                                        <a class="dropdown-item" href="#">
                                          Send Mail
                                        </a>
                                      </li>
                                      <li>
                                        <a
                                          class="dropdown-item"
                                          href="#"
                                          type="button"
                                          onClick={() =>
                                            UpdateRemoteStaus(email)
                                          }
                                        >
                                          Update Status
                                        </a>
                                      </li>
                                      <li>
                                        <a
                                          class="dropdown-item"
                                          href="#"
                                          type="button"
                                          onClick={() => RemoveRemote(email)}
                                        >
                                          Remove
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </td>
                              </tr>
                            </>
                          );
                        })}
                      </tbody>
                    </table>
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
