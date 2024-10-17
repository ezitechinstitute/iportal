import React, { useEffect, useState } from "react";
import "./Projects.css";
import InternTopbar from "../InternTopbar/InternTopbar";
import InternSidebar from "../InternSidebar";
import { Footer } from "../../Footer";
import { ViewProject } from "../../ViewProject";
import { CreateTask } from "../../CreateTask";
import axios from "axios";

const Projects = () => {
  // const id = sessionStorage.getItem("eziId");
  const [values, setValues] = useState({
    id: null,
    projectId: null,
    points: null,
  });
  const id = "EZI-23-5-24/7832";
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchterm] = useState("");
  const [loader, setLoader] = useState(false);

  const GetProjects = async () => {
    await axios
      .get(`https://api.ezitech.org/intern-projects`, {
        params: {
          id: id,
        },
      })
      .then((res) => {
        setData(res.data);
        setFiltered(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    GetProjects();
  });
  return (
    <>
      <InternTopbar />
      <InternSidebar />
      <div className="app-content content ">
        <div className="content-overlay"></div>
        <div className="header-navbar-shadow"></div>
        <div className="content-wrapper">
          <div className="content-header row"></div>
          <div className="content-body">
            <section id="dashboard-ecommerce">
              <div className="row" id="table-hover-animation">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title">Projects</h4>
                      {/* <!-- Button trigger modal --> */}

                      <select
                        name="pstatus"
                        id=""
                        className="form-control w-25"
                      >
                        <option value="All">All</option>
                        <option value="Ongoing">Ongoing</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>

                    <section id="complex-header-datatable">
                      <div className="row">
                        <div className="col-12">
                          <div className="card">
                            <div className="card-datatable">
                              <table className="dt-complex-header table table-bordered table-responsive">
                                <thead>
                                  <tr>
                                    <th>TITLE</th>
                                    <th>START DATE</th>
                                    <th>DURATION</th>
                                    <th>Days</th>
                                    <th>POINTS</th>
                                    <th>STATUS</th>
                                    <th>ACTION</th>
                                  </tr>
                                </thead>

                                <tbody>
                                  {Array.isArray(filtered)
                                    ? filtered.map((rs) => {
                                        const {
                                          project_id,
                                          title,
                                          start_date,
                                          duration,
                                          days,
                                          project_marks,
                                          pstatus,
                                        } = rs;

                                        return (
                                          <>
                                            <tr>
                                              <td>{title}</td>
                                              <td>{start_date}</td>
                                              <td>{duration}</td>
                                              <td>{days}</td>
                                              <td>{project_marks}</td>
                                              <td>
                                                {pstatus === "Ongoing" ? (
                                                  <span className="badge badge-glow badge-info">
                                                    {" "}
                                                    {pstatus}{" "}
                                                  </span>
                                                ) : pstatus === "Completed" ? (
                                                  <span className="badge badge-glow badge-success">
                                                    {" "}
                                                    {pstatus}{" "}
                                                  </span>
                                                ) : pstatus === "Expired" ? (
                                                  <span className="badge badge-glow badge-danger">
                                                    {" "}
                                                    {pstatus}{" "}
                                                  </span>
                                                ) : (
                                                  ""
                                                )}
                                              </td>
                                              <th>
                                                <div className="dropdown">
                                                  <button
                                                    type="button"
                                                    className="btn btn-warning dropdown-toggle hide-arrow"
                                                    data-toggle="dropdown"
                                                  >
                                                    Action
                                                  </button>
                                                  <div className="dropdown-menu">
                                                    <a
                                                      className="dropdown-item"
                                                      href="javascript:void(0);"
                                                      data-toggle="modal"
                                                      data-target="#large"
                                                    >
                                                      <i
                                                        data-feather="eye"
                                                        className="mr-50"
                                                      ></i>
                                                      <span>View Details</span>
                                                    </a>
                                                    {pstatus !== "Expired" ? (
                                                      <a
                                                        className="dropdown-item"
                                                        href="javascript:void(0);"
                                                        data-toggle="modal"
                                                        data-target="#default2"
                                                        onClick={() =>
                                                          setValues({
                                                            id: id,
                                                            projectId:
                                                              project_id,
                                                            points:
                                                              project_marks,
                                                          })
                                                        }
                                                      >
                                                        <i
                                                          data-feather="plus-square"
                                                          className="mr-50"
                                                        ></i>
                                                        <span>Create Task</span>
                                                      </a>
                                                    ) : (
                                                      ""
                                                    )}
                                                  </div>
                                                </div>
                                              </th>
                                            </tr>
                                          </>
                                        );
                                      })
                                    : ""}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </section>

            {/* View Project Details */}
            <ViewProject />
            {/* Create Tasl */}
            <CreateTask data={values} />
            {/* Footer */}
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;
