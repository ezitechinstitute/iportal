import React from "react";
import { ManagerTopbar } from "../components/ManagerTopbar";
import { ManagerSidebar } from "../components/ManagerSidebar";

export const InterViews = () => {
  return (
    <>
      <ManagerTopbar />
      <ManagerSidebar />
      <div className="app-content content">
        <div className="content-overlay"></div>
        <div className="header-navbar-shadow"></div>
        <div className="content-wrapper">
          <div className="content-header row"></div>
          <div className="content-body">
            <section id="chartjs-chart">
              <div className="row">
                {/* <!--Bar Chart Start --> */}
                <div className="col-xl-12 col-6">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-sm-center align-items-start flex-sm-row flex-column">
                      <div className="header-left">
                        <h4 className="card-title">Interviews</h4>
                      </div>
                    </div>
                    <div className="card-body">
                      {/* <ManagerChartOne chartData={userData} /> */}
                      <div class="table-responsive text-center">
                        <table class="table table-hover">
                          <thead>
                            <tr>
                              <th>Avatar</th>
                              <th>Name</th>
                              <th>Contact</th>
                              <th>Technology</th>
                              <th>Type</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <div class="avatar-group">
                                  <div
                                    data-toggle="tooltip"
                                    data-popup="tooltip-custom"
                                    data-placement="top"
                                    title=""
                                    class="avatar pull-up my-0"
                                    data-original-title="Lilian Nenez"
                                  >
                                    <img
                                      src="./app-assets/images/portrait/small/avatar-s-5.jpg"
                                      alt="Avatar"
                                      height="26"
                                      width="26"
                                    />
                                  </div>
                                </div>
                              </td>
                              <td>Peter Charls</td>

                              <td>+923176349954</td>

                              <td>MERN Stack</td>
                              <td>
                                <span class="badge badge-pill badge-light-primary mr-1">
                                  Remote
                                </span>
                              </td>

                              <td>
                                <span class="badge badge-pill badge-light-success mr-1">
                                  Interview
                                </span>
                              </td>
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
                                        data-feather="message-square"
                                        class="mr-50"
                                      ></i>
                                    
                                      <span>Send Message</span>
                                    </a>
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      <i
                                        data-feather="clipboard"
                                        class="mr-50"
                                      ></i>
                                      <span>Assign Test</span>
                                    </a>
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      <i data-feather="monitor" class="mr-50"></i>
                                      <span>Assign Portal</span>
                                    </a>
                                    <a
                                      class="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      <i data-feather="x-square" class="mr-50"></i>
                                      <span>Remove</span>
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
                {/* <!-- Bar Chart End --> */}
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};
