import React, { useState } from "react";
import { DataSet1 } from "../data/manager-data/Data";
import { ManagerChartOne } from "./ManagerChartOne";
import { FiRefreshCw } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export const ManagerDashboard = () => {
  const navigate = useNavigate();
  const check = sessionStorage.getItem("isLoggedIn");

  if (!check) {
    navigate("/");
  }

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
                      <h5>Congratulations 🎉 John!</h5>
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
                                <i data-feather="users" class="avatar-icon"></i>
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
                            <div class="avatar bg-light-danger mr-2">
                              <div class="avatar-content">
                                <i
                                  data-feather="clipboard"
                                  class="avatar-icon"
                                ></i>
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
                            <div class="avatar bg-light-info mr-2">
                              <div class="avatar-content">
                                <i
                                  data-feather="loader"
                                  class="avatar-icon"
                                ></i>
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
                                <i
                                  data-feather="check-square"
                                  class="avatar-icon"
                                ></i>
                              </div>
                            </div>
                            <div class="media-body my-auto">
                              <h4 class="font-weight-bolder mb-0">$9745</h4>
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

                {/* <div className="col-xl-3 col-md-6 col-12">
                  <div className="card card-congratulation-medal">
                    <div className="card-body text-center mt-2">
                      <i data-feather="users" style={{ color: "#988ff4" }}></i>
                      <h3 className="roboto mb-75 mt-2 pt-10">9</h3>
                      <h5 className="roboto mb-75 mt-2 pt-10">Total Interns</h5>
                    </div>
                  </div>
                </div> */}

                {/* <div className="col-xl-3 col-md-6 col-12">
                  <div className="card card-congratulation-medal">
                    <div className="card-body text-center mt-2">
                      <i
                        data-feather="clipboard"
                        style={{ color: "#988ff4" }}
                      ></i>
                      <h3 className="roboto mb-75 mt-2 pt-10">7</h3>
                      <h5 className="roboto mb-75 mt-2 pt-10">Test</h5>
                    </div>
                  </div>
                </div> */}

                {/* <div className="col-xl-3 col-md-6 col-12">
                  <div className="card card-congratulation-medal">
                    <div className="card-body text-center mt-2">
                      <i data-feather="loader" style={{ color: "#988ff4" }}></i>
                      <h3 className="roboto mb-75 mt-2 pt-10">0</h3>
                      <h5 className="roboto mb-75 mt-2 pt-10">In Progress</h5>
                    </div>
                  </div>
                </div>

                <div className="col-xl-3 col-md-6 col-12">
                  <div className="card card-congratulation-medal">
                    <div className="card-body text-center mt-2">
                      <i
                        data-feather="check-square"
                        style={{ color: "#988ff4" }}
                      ></i>
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
                      <ManagerChartOne chartData={userData} />
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
                      <ManagerChartOne chartData={userData} />
                    </div>
                  </div>
                </div>
                {/* <!-- Bar Chart End --> */}
              </div>
            </section>

            <section id="chartjs-chart">
              <div className="row">
                {/* <!-- Send Message --> */}
                <div className="col-xl-6 col-12">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-sm-center align-items-start flex-sm-row flex-column">
                      <div className="header-left">
                        <h4 className="card-title">Message</h4>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-xl-6 col-12 mt-2">
                          <span>
                            From <input type="date" className="form-control" />
                          </span>
                        </div>
                        <div className="col-xl-6 col-12 mt-2">
                          <span>
                            To <input type="date" className="form-control" />
                          </span>
                        </div>

                        <div className="col-xl-6 col-12 mt-3">
                          <span>
                            Type
                            <select className="form-control" name="" id="">
                              <option value="" disabled selected>
                                --Select--
                              </option>
                              <option value="all">All</option>
                              <option value="test">Test</option>
                              <option value="selective">Selective</option>
                              <option value="ongoing">Ongoing</option>
                              <option value="homebase">Homebase</option>
                              <option value="incomplete">Incomplete</option>
                              <option value="completed">Completed</option>
                            </select>
                          </span>
                        </div>

                        <div className="col-xl-6 col-12 mt-3">
                          <span>
                            Technology
                            <select className="form-control" name="" id="">
                              <option value="" disabled selected>
                                --Select--
                              </option>
                              <option value="all">Web Development</option>
                              <option value="test">MERN Stack</option>
                              <option value="selective">PHP Development</option>
                              <option value="ongoing">Python</option>
                              <option value="homebase">SEO</option>
                              <option value="incomplete">
                                Android Development
                              </option>
                              <option value="completed">Graphic Design</option>
                            </select>
                          </span>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-12 mt-3">
                          <span>
                            Message
                            <textarea
                              className="form-control"
                              cols="30"
                              rows="5"
                              placeholder="Hello!"
                            ></textarea>
                          </span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 mt-3">
                          <button className="btn btn-success w-100">
                            Send
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- Message End --> */}

                {/* <!--Absentees Table Start --> */}
                <div className="col-xl-6 col-12">
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
                                      <i
                                        data-feather="check-square"
                                        class="mr-50"
                                      ></i>
                                      <span>Complete</span>
                                    </a>
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      <i data-feather="x" class="mr-50"></i>
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
                                      <i
                                        data-feather="check-square"
                                        class="mr-50"
                                      ></i>
                                      <span>Complete</span>
                                    </a>
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      <i data-feather="x" class="mr-50"></i>
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
                                      <i
                                        data-feather="check-square"
                                        class="mr-50"
                                      ></i>
                                      <span>Complete</span>
                                    </a>
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      <i data-feather="x" class="mr-50"></i>
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
                                      <i
                                        data-feather="check-square"
                                        class="mr-50"
                                      ></i>
                                      <span>Complete</span>
                                    </a>
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      <i data-feather="x" class="mr-50"></i>
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
                                      <i
                                        data-feather="check-square"
                                        class="mr-50"
                                      ></i>
                                      <span>Complete</span>
                                    </a>
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      <i data-feather="x" class="mr-50"></i>
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
                                      <i
                                        data-feather="check-square"
                                        class="mr-50"
                                      ></i>
                                      <span>Complete</span>
                                    </a>
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      <i data-feather="x" class="mr-50"></i>
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
                                      <i
                                        data-feather="check-square"
                                        class="mr-50"
                                      ></i>
                                      <span>Complete</span>
                                    </a>
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      <i data-feather="x" class="mr-50"></i>
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
