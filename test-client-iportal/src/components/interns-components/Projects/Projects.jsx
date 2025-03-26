import React, { useEffect, useState } from "react";
import "./Projects.css";
import InternTopbar from "../InternTopbar/InternTopbar";
import InternSidebar from "../InternSidebar";
import { Footer } from "../../Footer";
import { ViewProject } from "../../ViewProject";
import { CreateTask } from "../../CreateTask";
import axios from "axios";

const Projects = () => {
  const id = sessionStorage.getItem("eziId");

  const [values, setValues] = useState({
    id: null,
    projectId: null,
    points: null,
    supid: null,
  });

  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");

  const GetProjects = async () => {
    try {
      const response = await axios.get(`https://api.ezitech.org/intern-projects`, {
        params: { id: id },
      });
      setData(response.data);
      setFiltered(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    GetProjects();
  }, [id]);

  useEffect(() => {
    if (statusFilter === "All") {
      setFiltered(data);
    } else {
      setFiltered(data.filter((project) => project.pstatus === statusFilter));
    }
  }, [statusFilter, data]);

  return (
    <>
      <InternTopbar />
      <InternSidebar />
      <div className="app-content content">
        <div className="content-overlay"></div>
        <div className="header-navbar-shadow"></div>
        <div className="content-wrapper">
          <div className="content-header row"></div>
          <div className="content-body mt-3">
            <section id="dashboard-ecommerce">
              <div className="row" id="table-hover-animation">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h2 className="card-title mb-3 mt-[-5px] font-weight-bold ml-[-10px]">Projects</h2>

                      <div className="btn-group">
                        <button
                          className={`btn ${statusFilter === "All" ? "btn-primary" : "btn-outaline-primary"}`}
                          onClick={() => setStatusFilter("All")}
                        >
                          <i className="fas fa-list mr-1"></i>
                          All Projects
                        </button>

                        <button
                          className={`btn ${statusFilter === "Ongoing" ? "btn-info" : "btn-outline-info"} mx-1`}
                          onClick={() => setStatusFilter("Ongoing")}
                        >
                          <i className="fas fa-hourglass-half mr-1"></i>
                          Ongoing
                        </button>

                        <button
                          className={`btn ${statusFilter === "Completed" ? "btn-success" : "btn-outline-success"} mx-1`}
                          onClick={() => setStatusFilter("Completed")}
                        >
                          <i className="fas fa-check-circle mr-1"></i>
                          Completed
                        </button>

                        <button
                          className={`btn ${statusFilter === "Expired" ? "btn-danger" : "btn-outline-danger"}`}
                          onClick={() => setStatusFilter("Expired")}
                        >
                          <i className="fas fa-times-circle mr-1"></i>
                          Expired
                        </button>
                      </div>
                    </div>

                    <section id="complex-header-datatable">
                      <div className="row">
                        <div className="col-12">
                          <div className="table-responsive">
                            <table className="table table-bordered table-hover text-center">
                              <thead>
                                <tr>
                                  <th>TITLE</th>
                                  <th>START DATE</th>
                                  <th>DURATION</th>
                                  <th>DAYS</th>
                                  <th>POINTS</th>
                                  <th>STATUS</th>
                                  <th>ACTION</th>
                                </tr>
                              </thead>

                              <tbody>
                                {Array.isArray(filtered) && filtered.length > 0 ? (
                                  filtered.map((rs) => {
                                    const {
                                      project_id,
                                      title,
                                      start_date,
                                      duration,
                                      days,
                                      project_marks,
                                      obt_marks,
                                      pstatus,
                                      assigned_by,
                                    } = rs;

                                    const date = new Date(start_date).toLocaleDateString("en-PK");

                                    return (
                                      <tr key={project_id}>
                                        <td className="font-weight-bold">{title}</td>
                                        <td>{date}</td>
                                        <td>{duration}</td>
                                        <td>{days}</td>
                                        <td>{obt_marks} / {project_marks}</td>
                                        <td>
                                          {pstatus === "Ongoing" ? (
                                            <span className="badge badge-glow badge-info">
                                              {pstatus}
                                            </span>
                                          ) : pstatus === "Completed" ? (
                                            <span className="badge badge-glow badge-success">
                                              {pstatus}
                                            </span>
                                          ) : pstatus === "Expired" ? (
                                            <span className="badge badge-glow badge-danger">
                                              {pstatus}
                                            </span>
                                          ) : (
                                            " "
                                          )}
                                        </td>
                                        <td>
                                          <div className="d-flex justify-content-center align-items-center">
                                            <button
                                              className="btn btn-info btn-sm mx-1"
                                              data-toggle="modal"
                                              data-target="#large"
                                              onClick={() =>
                                                setValues({
                                                  id: id,
                                                  projectId: project_id,
                                                  points: project_marks,
                                                })
                                              }
                                            >
                                              <i className="fas fa-eye"></i>
                                            </button>

                                            {pstatus === "Expired" || pstatus === "Completed" ? (
                                              <button
                                                disabled
                                                className="btn btn-danger btn-sm mx-1"
                                              >
                                                <i className="fas fa-tasks"></i>
                                              </button>
                                            ) : (
                                              <button
                                                className="btn btn-danger btn-sm mx-1"
                                                data-toggle="modal"
                                                data-target="#default2"
                                                onClick={() =>
                                                  setValues({
                                                    id: id,
                                                    projectId: project_id,
                                                    points: project_marks,
                                                    supid: assigned_by,
                                                  })
                                                }
                                              >
                                                <i className="fas fa-tasks"></i>
                                              </button>
                                            )}
                                          </div>
                                        </td>
                                      </tr>
                                    );
                                  })
                                ) : (
                                  <tr>
                                    <td colSpan="7">No projects found for selected status</td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </section>

            <ViewProject data={values} />
            <CreateTask data={values} />
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;