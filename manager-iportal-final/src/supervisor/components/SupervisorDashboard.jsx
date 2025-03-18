import React, { useState } from "react";
import { DataSet1 } from "../data/manager-data/Data";
import { SupervisorChartOne } from "./SupervisorChartOne";
import { FiRefreshCw, FiUsers, FiClipboard, FiLoader, FiCheckSquare, FiX } from "react-icons/fi"; // Added relevant icons

export const SupervisorDashboard = () => {
  const username = sessionStorage.getItem("username");
  const [userData, SetUserData] = useState({
    labels: DataSet1.map((rs) => rs.Years),
    datasets: [
      {
        label: "This Year Interns",
        data: DataSet1.map((rs) => rs.Visitors),
        backgroundColor: ["#3275db"],
        borderColor: "#3275db",
      },
    ],
  });
  return (
    <>
      <div className="app-content content ">
        <div className="content-overlay"></div>
        <div className="header-navbar-shadow"></div>
        <div className="content-wrapper">
          <div className="content-header row"></div>
          <div className="content-body">
            {/* <!-- Dashboard --> */}
            <section id="dashboard-ecommerce">
              <div className="card card-congratulation-medal rounded-0">
                <div className="card-body">
                  <h3 className="roboto">Dashboard Statistics</h3>
                </div>
              </div>
              <div className="row match-height">
                {/* <!-- Medal Card --> */}
                <div class="col-xl-4 col-md-6 col-12">
                  <div class="card card-congratulation-medal p-1">
                    <div class="card-body">
                      <h5>Congratulations 🎉 {username}!</h5>
                      <p class="card-text font-small-3">
                        You have earn in March
                      </p>
                      <h3 class="mb-75 pt-70">
                        <a href="javascript:void(0);">PKR : 3,499</a>
                      </h3>
                      <button
                        type="button"
                        class="btn btn-primary"
                        style={{ marginTop: "20px" }}
                      >
                        Withdraw
                      </button>
                      <img
                        src="./images/coin.svg"
                        class="congratulation-medal"
                        alt="Medal Pic"
                        width={100}
                        style={{ marginTop: "85px" }}
                      />
                    </div>
                  </div>
                </div>
                {/* <!--/ Medal Card --> */}

                {/* <!-- Statistics Card --> */}
                <div class="col-12 col-xl-8 col-md-6">
                  <div class="card card-statistics">
                    <div class="card-header">
                      <h4 class="card-title">Statistics</h4>
                      <div class="d-flex align-items-center">
                        <p class="card-text font-small-2 mr-25 mb-0">
                          Updated 1 month ago
                        </p>
                      </div>
                    </div>
                    <div class="card-body statistics-body">
                      <div class="row">
                        <div class="col-xl-3 col-sm-6 col-12 mb-2 mb-xl-0">
                          <div class="media">
                            <div class="avatar bg-light-primary mr-2">
                              <div class="avatar-content">
                                <FiUsers className="avatar-icon" /> {/* Replaced data-feather="users" */}
                              </div>
                            </div>
                            <div class="media-body my-auto">
                              <h4 class="font-weight-bolder mb-0">230k</h4>
                              <p class="card-text font-small-3 mb-0">Interns</p>
                            </div>
                          </div>
                        </div>
                        <div class="col-xl-3 col-sm-6 col-12 mb-2 mb-xl-0">
                          <div class="media">
                            <div class="avatar bg-light-info mr-2">
                              <div class="avatar-content">
                                <FiClipboard className="avatar-icon" /> {/* Replaced data-feather="clipboard" */}
                              </div>
                            </div>
                            <div class="media-body my-auto">
                              <h4 class="font-weight-bolder mb-0">8.549k</h4>
                              <p class="card-text font-small-3 mb-0">Test</p>
                            </div>
                          </div>
                        </div>
                        <div class="col-xl-3 col-sm-6 col-12 mb-2 mb-sm-0">
                          <div class="media">
                            <div class="avatar bg-light-danger mr-2">
                              <div class="avatar-content">
                                <FiLoader className="avatar-icon" /> {/* Replaced data-feather="loader" */}
                              </div>
                            </div>
                            <div class="media-body my-auto">
                              <h4 class="font-weight-bolder mb-0">1.423k</h4>
                              <p class="card-text font-small-3 mb-0">
                                Progress
                              </p>
                            </div>
                          </div>
                        </div>
                        <div class="col-xl-3 col-sm-6 col-12">
                          <div class="media">
                            <div class="avatar bg-light-success mr-2">
                              <div class="avatar-content">
                                <FiCheckSquare className="avatar-icon" /> {/* Replaced data-feather="check-square" */}
                              </div>
                            </div>
                            <div class="media-body my-auto">
                              <h4 class="font-weight-bolder mb-0">9745k</h4>
                              <p class="card-text font-small-3 mb-0">
                                Completed
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!--/ Statistics Card --> */}

                {/* Commented Section with Replaced Icons */}
                {/* <div className="col-xl-3 col-md-6 col-12">
                  <div className="card card-congratulation-medal">
                    <div className="card-body text-center mt-2">
                      <FiUsers style={{ color: "#988ff4" }} /> {/* Replaced data-feather="users" *}
                      <h3 className="roboto mb-75 mt-2 pt-10">9</h3>
                      <h5 className="roboto mb-75 mt-2 pt-10">Total Interns</h5>
                    </div>
                  </div>
                </div> */}

                {/* <div className="col-xl-3 col-md-6 col-12">
                  <div className="card card-congratulation-medal">
                    <div className="card-body text-center mt-2">
                      <FiClipboard style={{ color: "#988ff4" }} /> {/* Replaced data-feather="clipboard" *}
                      <h3 className="roboto mb-75 mt-2 pt-10">7</h3>
                      <h5 className="roboto mb-75 mt-2 pt-10">Test</h5>
                    </div>
                  </div>
                </div> */}

                {/* <div className="col-xl-3 col-md-6 col-12">
                  <div className="card card-congratulation-medal">
                    <div className="card-body text-center mt-2">
                      <FiLoader style={{ color: "#988ff4" }} /> {/* Replaced data-feather="loader" *}
                      <h3 className="roboto mb-75 mt-2 pt-10">0</h3>
                      <h5 className="roboto mb-75 mt-2 pt-10">In Progress</h5>
                    </div>
                  </div>
                </div>

                <div className="col-xl-3 col-md-6 col-12">
                  <div className="card card-congratulation-medal">
                    <div className="card-body text-center mt-2">
                      <FiCheckSquare style={{ color: "#988ff4" }} /> {/* Replaced data-feather="check-square" *}
                      <h3 className="roboto mb-75 mt-2 pt-10">0</h3>
                      <h5 className="roboto mb-75 mt-2 pt-10">Completed</h5>
                    </div>
                  </div>
                </div> */}
              </div>
            </section>

            {/* <!-- ChartJS section start --> */}
            <section id="chartjs-chart">
              <div className="row">
                {/* <!--Bar Chart Start --> */}
                <div className="col-xl-6 col-12">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-sm-center align-items-start flex-sm-row flex-column">
                      <div className="header-left">
                        <h4 className="card-title">Onsite Interns</h4>
                      </div>
                    </div>
                    <div className="card-body">
                      <SupervisorChartOne chartData={userData} />
                    </div>
                  </div>
                </div>
                {/* <!-- Bar Chart End --> */}

                {/* <!--Bar Chart Start --> */}
                <div className="col-xl-6 col-12">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-sm-center align-items-start flex-sm-row flex-column">
                      <div className="header-left">
                        <h4 className="card-title">Remote Interns</h4>
                      </div>
                    </div>
                    <div className="card-body">
                      <SupervisorChartOne chartData={userData} />
                    </div>
                  </div>
                </div>
                {/* <!-- Bar Chart End --> */}
              </div>
            </section>

            <section id="chartjs-chart">
              <div className="row match-height">
                
                {/* <!-- Message End --> */}

                {/* <!--Absentees Table Start --> */}
                <div className="col-xl-12 col-12">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-sm-center align-items-start flex-sm-row flex-column">
                      <div className="header-left">
                        <h4 className="card-title">Absentees</h4>
                      </div>
                    </div>
                    <div className="card-body">
                      <div
                        class="table-responsive"
                        style={{ overflowY: "auto" }}
                      >
                        <table class="table">
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Present</th>
                              <th>Absent</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <span class="font-weight-bold">
                                  Angular Project
                                </span>
                              </td>
                              <td>0/0</td>
                              <td>0/0</td>
                              <td>
                                <div class="dropdown">
                                  <button
                                    type="button"
                                    class="btn btn-warning dropdown-toggle hide-arrow"
                                    data-toggle="dropdown"
                                  >
                                    Action
                                  </button>
                                  <div class="dropdown-menu">
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      <FiCheckSquare className="mr-50" /> {/* Replaced data-feather="check-square" */}
                                      <span>Complete</span>
                                    </a>
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      <FiX className="mr-50" /> {/* Replaced data-feather="x" */}
                                      <span>Incomplete</span>
                                    </a>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <span class="font-weight-bold">
                                  Angular Project
                                </span>
                              </td>
                              <td>0/0</td>
                              <td>0/0</td>
                              <td>
                                <div class="dropdown">
                                  <button
                                    type="button"
                                    class="btn btn-warning dropdown-toggle hide-arrow"
                                    data-toggle="dropdown"
                                  >
                                    Action
                                  </button>
                                  <div class="dropdown-menu">
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      <FiCheckSquare className="mr-50" /> {/* Replaced data-feather="check-square" */}
                                      <span>Complete</span>
                                    </a>
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      <FiX className="mr-50" /> {/* Replaced data-feather="x" */}
                                      <span>Incomplete</span>
                                    </a>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <span class="font-weight-bold">
                                  Angular Project
                                </span>
                              </td>
                              <td>0/0</td>
                              <td>0/0</td>
                              <td>
                                <div class="dropdown">
                                  <button
                                    type="button"
                                    class="btn btn-warning dropdown-toggle hide-arrow"
                                    data-toggle="dropdown"
                                  >
                                    Action
                                  </button>
                                  <div class="dropdown-menu">
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      <FiCheckSquare className="mr-50" /> {/* Replaced data-feather="check-square" */}
                                      <span>Complete</span>
                                    </a>
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      <FiX className="mr-50" /> {/* Replaced data-feather="x" */}
                                      <span>Incomplete</span>
                                    </a>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <span class="font-weight-bold">
                                  React Project
                                </span>
                              </td>
                              <td>0/0</td>
                              <td>0/0</td>
                              <td>
                                <div class="dropdown">
                                  <button
                                    type="button"
                                    class="btn btn-warning dropdown-toggle hide-arrow"
                                    data-toggle="dropdown"
                                  >
                                    Action
                                  </button>
                                  <div class="dropdown-menu">
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      <FiCheckSquare className="mr-50" /> {/* Replaced data-feather="check-square" */}
                                      <span>Complete</span>
                                    </a>
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      <FiX className="mr-50" /> {/* Replaced data-feather="x" */}
                                      <span>Incomplete</span>
                                    </a>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <span class="font-weight-bold">
                                  Vuejs Project
                                </span>
                              </td>
                              <td>0/0</td>
                              <td>0/0</td>
                              <td>
                                <div class="dropdown">
                                  <button
                                    type="button"
                                    class="btn btn-warning dropdown-toggle hide-arrow"
                                    data-toggle="dropdown"
                                  >
                                    Action
                                  </button>
                                  <div class="dropdown-menu">
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      <FiCheckSquare className="mr-50" /> {/* Replaced data-feather="check-square" */}
                                      <span>Complete</span>
                                    </a>
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      <FiX className="mr-50" /> {/* Replaced data-feather="x" */}
                                      <span>Incomplete</span>
                                    </a>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <span class="font-weight-bold">
                                  Bootstrap Project
                                </span>
                              </td>
                              <td>0/0</td>
                              <td>0/0</td>
                              <td>
                                <div class="dropdown">
                                  <button
                                    type="button"
                                    class="btn btn-warning dropdown-toggle hide-arrow"
                                    data-toggle="dropdown"
                                  >
                                    Action
                                  </button>
                                  <div class="dropdown-menu">
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      <FiCheckSquare className="mr-50" /> {/* Replaced data-feather="check-square" */}
                                      <span>Complete</span>
                                    </a>
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      <FiX className="mr-50" /> {/* Replaced data-feather="x" */}
                                      <span>Incomplete</span>
                                    </a>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <span class="font-weight-bold">
                                  Bootstrap Project
                                </span>
                              </td>
                              <td>0/0</td>
                              <td>0/0</td>
                              <td>
                                <div class="dropdown">
                                  <button
                                    type="button"
                                    class="btn btn-warning dropdown-toggle hide-arrow"
                                    data-toggle="dropdown"
                                  >
                                    Action
                                  </button>
                                  <div class="dropdown-menu">
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      <FiCheckSquare className="mr-50" /> {/* Replaced data-feather="check-square" */}
                                      <span>Complete</span>
                                    </a>
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      <FiX className="mr-50" /> {/* Replaced data-feather="x" */}
                                      <span>Incomplete</span>
                                    </a>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- Absentees Table End --> */}
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};