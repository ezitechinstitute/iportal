import React, { useState } from "react";
import { DataSet1 } from "../../data/manager-data/Data";
import { ManagerChartOne } from "./ManagerChartOne";
import { FiRefreshCw } from "react-icons/fi";

export const ManagerDashboard = () => {
  const [userData, SetUserData] = useState({
    labels: DataSet1.map((rs) => rs.Years),
    datasets: [
      {
        label: "This Year Interns",
        data: DataSet1.map((rs) => rs.Visitors),
        backgroundColor: ["#988ff4"],
        borderColor: "#988ff4",
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

                <div className="col-xl-3 col-md-6 col-12">
                  <div className="card card-congratulation-medal">
                    <div className="card-body text-center mt-2">
                      <i data-feather="users" style={{ color: "#988ff4" }}></i>
                      <h3 className="roboto mb-75 mt-2 pt-10">9</h3>
                      <h5 className="roboto mb-75 mt-2 pt-10">Total Interns</h5>
                    </div>
                  </div>
                </div>

                <div className="col-xl-3 col-md-6 col-12">
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
                </div>

                <div className="col-xl-3 col-md-6 col-12">
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
                </div>
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
                              <td>Peter Charls</td>
                              <td>
                                <div class="avatar-group">
                                  <div
                                    data-toggle="tooltip"
                                    data-popup="tooltip-custom"
                                    data-placement="top"
                                    title=""
                                    class="avatar pull-up my-0"
                                    data-original-title="Lilian Nenez"
                                  ></div>
                                  <div
                                    data-toggle="tooltip"
                                    data-popup="tooltip-custom"
                                    data-placement="top"
                                    title=""
                                    class="avatar pull-up my-0"
                                    data-original-title="Alberto Glotzbach"
                                  ></div>
                                  <div
                                    data-toggle="tooltip"
                                    data-popup="tooltip-custom"
                                    data-placement="top"
                                    title=""
                                    class="avatar pull-up my-0"
                                    data-original-title="Alberto Glotzbach"
                                  ></div>
                                </div>
                              </td>

                              <td>
                                <div class="dropdown">
                                  <button
                                    type="button"
                                    class="btn btn-sm dropdown-toggle hide-arrow"
                                    data-toggle="dropdown"
                                  >
                                    <i data-feather="more-vertical"></i>
                                  </button>
                                  <div class="dropdown-menu">
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      <i
                                        data-feather="edit-2"
                                        class="mr-50"
                                      ></i>
                                      <span>Edit</span>
                                    </a>
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      <i data-feather="trash" class="mr-50"></i>
                                      <span>Delete</span>
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
                              <td>Peter Charls</td>
                              <td>
                                <div class="avatar-group">
                                  <div
                                    data-toggle="tooltip"
                                    data-popup="tooltip-custom"
                                    data-placement="top"
                                    title=""
                                    class="avatar pull-up my-0"
                                    data-original-title="Lilian Nenez"
                                  ></div>
                                  <div
                                    data-toggle="tooltip"
                                    data-popup="tooltip-custom"
                                    data-placement="top"
                                    title=""
                                    class="avatar pull-up my-0"
                                    data-original-title="Alberto Glotzbach"
                                  ></div>
                                  <div
                                    data-toggle="tooltip"
                                    data-popup="tooltip-custom"
                                    data-placement="top"
                                    title=""
                                    class="avatar pull-up my-0"
                                    data-original-title="Alberto Glotzbach"
                                  ></div>
                                </div>
                              </td>

                              <td>
                                <div class="dropdown">
                                  <button
                                    type="button"
                                    class="btn btn-sm dropdown-toggle hide-arrow"
                                    data-toggle="dropdown"
                                  >
                                    <i data-feather="more-vertical"></i>
                                  </button>
                                  <div class="dropdown-menu">
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      <i
                                        data-feather="edit-2"
                                        class="mr-50"
                                      ></i>
                                      <span>Edit</span>
                                    </a>
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      <i data-feather="trash" class="mr-50"></i>
                                      <span>Delete</span>
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
                              <td>Peter Charls</td>
                              <td>
                                <div class="avatar-group">
                                  <div
                                    data-toggle="tooltip"
                                    data-popup="tooltip-custom"
                                    data-placement="top"
                                    title=""
                                    class="avatar pull-up my-0"
                                    data-original-title="Lilian Nenez"
                                  ></div>
                                  <div
                                    data-toggle="tooltip"
                                    data-popup="tooltip-custom"
                                    data-placement="top"
                                    title=""
                                    class="avatar pull-up my-0"
                                    data-original-title="Alberto Glotzbach"
                                  ></div>
                                  <div
                                    data-toggle="tooltip"
                                    data-popup="tooltip-custom"
                                    data-placement="top"
                                    title=""
                                    class="avatar pull-up my-0"
                                    data-original-title="Alberto Glotzbach"
                                  ></div>
                                </div>
                              </td>

                              <td>
                                <div class="dropdown">
                                  <button
                                    type="button"
                                    class="btn btn-sm dropdown-toggle hide-arrow"
                                    data-toggle="dropdown"
                                  >
                                    <i data-feather="more-vertical"></i>
                                  </button>
                                  <div class="dropdown-menu">
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      <i
                                        data-feather="edit-2"
                                        class="mr-50"
                                      ></i>
                                      <span>Edit</span>
                                    </a>
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      <i data-feather="trash" class="mr-50"></i>
                                      <span>Delete</span>
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
                              <td>Ronald Frest</td>
                              <td>
                                <div class="avatar-group">
                                  <div
                                    data-toggle="tooltip"
                                    data-popup="tooltip-custom"
                                    data-placement="top"
                                    title=""
                                    class="avatar pull-up my-0"
                                    data-original-title="Lilian Nenez"
                                  ></div>
                                  <div
                                    data-toggle="tooltip"
                                    data-popup="tooltip-custom"
                                    data-placement="top"
                                    title=""
                                    class="avatar pull-up my-0"
                                    data-original-title="Alberto Glotzbach"
                                  ></div>
                                  <div
                                    data-toggle="tooltip"
                                    data-popup="tooltip-custom"
                                    data-placement="top"
                                    title=""
                                    class="avatar pull-up my-0"
                                    data-original-title="Alberto Glotzbach"
                                  ></div>
                                </div>
                              </td>

                              <td>
                                <div class="dropdown">
                                  <button
                                    type="button"
                                    class="btn btn-sm dropdown-toggle hide-arrow"
                                    data-toggle="dropdown"
                                  >
                                    <i data-feather="more-vertical"></i>
                                  </button>
                                  <div class="dropdown-menu">
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      <i
                                        data-feather="edit-2"
                                        class="mr-50"
                                      ></i>
                                      <span>Edit</span>
                                    </a>
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      <i data-feather="trash" class="mr-50"></i>
                                      <span>Delete</span>
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
                              <td>Jack Obes</td>
                              <td>
                                <div class="avatar-group">
                                  <div
                                    data-toggle="tooltip"
                                    data-popup="tooltip-custom"
                                    data-placement="top"
                                    title=""
                                    class="avatar pull-up my-0"
                                    data-original-title="Lilian Nenez"
                                  ></div>
                                  <div
                                    data-toggle="tooltip"
                                    data-popup="tooltip-custom"
                                    data-placement="top"
                                    title=""
                                    class="avatar pull-up my-0"
                                    data-original-title="Alberto Glotzbach"
                                  ></div>
                                  <div
                                    data-toggle="tooltip"
                                    data-popup="tooltip-custom"
                                    data-placement="top"
                                    title=""
                                    class="avatar pull-up my-0"
                                    data-original-title="Alberto Glotzbach"
                                  ></div>
                                </div>
                              </td>

                              <td>
                                <div class="dropdown">
                                  <button
                                    type="button"
                                    class="btn btn-sm dropdown-toggle hide-arrow"
                                    data-toggle="dropdown"
                                  >
                                    <i data-feather="more-vertical"></i>
                                  </button>
                                  <div class="dropdown-menu">
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      <i
                                        data-feather="edit-2"
                                        class="mr-50"
                                      ></i>
                                      <span>Edit</span>
                                    </a>
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      <i data-feather="trash" class="mr-50"></i>
                                      <span>Delete</span>
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
                              <td>Jerry Milton</td>
                              <td>
                                <div class="avatar-group">
                                  <div
                                    data-toggle="tooltip"
                                    data-popup="tooltip-custom"
                                    data-placement="top"
                                    title=""
                                    class="avatar pull-up my-0"
                                    data-original-title="Lilian Nenez"
                                  ></div>
                                  <div
                                    data-toggle="tooltip"
                                    data-popup="tooltip-custom"
                                    data-placement="top"
                                    title=""
                                    class="avatar pull-up my-0"
                                    data-original-title="Alberto Glotzbach"
                                  ></div>
                                  <div
                                    data-toggle="tooltip"
                                    data-popup="tooltip-custom"
                                    data-placement="top"
                                    title=""
                                    class="avatar pull-up my-0"
                                    data-original-title="Alberto Glotzbach"
                                  ></div>
                                </div>
                              </td>

                              <td>
                                <div class="dropdown">
                                  <button
                                    type="button"
                                    class="btn btn-sm dropdown-toggle hide-arrow"
                                    data-toggle="dropdown"
                                  >
                                    <i data-feather="more-vertical"></i>
                                  </button>
                                  <div class="dropdown-menu">
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      <i
                                        data-feather="edit-2"
                                        class="mr-50"
                                      ></i>
                                      <span>Edit</span>
                                    </a>
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      <i data-feather="trash" class="mr-50"></i>
                                      <span>Delete</span>
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
