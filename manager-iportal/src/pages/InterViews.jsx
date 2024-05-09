import React, { useEffect, useState } from "react";
import { ManagerTopbar } from "../components/ManagerTopbar";
import { ManagerSidebar } from "../components/ManagerSidebar";
import axios from "axios";

export const InterViews = () => {
  const [value, setValue] = useState({});
  const [data, setData] = useState([]);

  const handleInput = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const GetInterviews = () => {
    axios
      .post("https://api.ezitech.org/get-interviews", { value })
      .then((res) => {
        setData(res.data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    GetInterviews();
  });
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
                      <label htmlFor="">Select Onsite/Remote: </label>
                      <select
                        name="interviewFilter"
                        id=""
                        className="form-control"
                        required
                        onChange={handleInput}
                      >
                        <option selected disabled>
                          --Select--
                        </option>
                        <option value="Onsite">Onsite</option>
                        <option value="Remote">Remote</option>
                      </select>
                      <br />
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
                            {
                            
                            data.length > 0 ?
                            
                            data.map((rs) => {
                              const {
                                image,
                                name,
                                phone,
                                technology,
                                interview_type,
                                status,
                              } = rs;

                              return (
                                <>
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
                                            src={image}
                                            alt="Avatar"
                                            height="50"
                                            width="50"
                                          />
                                        </div>
                                      </div>
                                    </td>
                                    <td>{name}</td>

                                    <td>{phone}</td>

                                    <td>{technology}</td>
                                    <td>
                                      <span class="badge badge-pill badge-light-primary mr-1">
                                        {interview_type}
                                      </span>
                                    </td>

                                    <td>
                                      <span class="badge badge-pill badge-light-success mr-1">
                                        {status}
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
                                            <i
                                              data-feather="monitor"
                                              class="mr-50"
                                            ></i>
                                            <span>Assign Portal</span>
                                          </a>
                                          <a
                                            class="dropdown-item"
                                            href="javascript:void(0);"
                                          >
                                            <i
                                              data-feather="x-square"
                                              class="mr-50"
                                            ></i>
                                            <span>Remove</span>
                                          </a>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </>
                              );
                            }) : " "}
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
