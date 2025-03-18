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
  }, [id]); // Fetch only when ID changes

  // Filter projects based on status selection
  useEffect(() => {
    if (statusFilter === "All") {
      setFiltered(data);
    } else {
      setFiltered(data.filter((project) => project.pstatus === statusFilter));
    }
  }, [statusFilter, data]); // Run whenever statusFilter or data changes

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


  {/* Status Filter Buttons */}
  <div className="btn-group">
    <button 
      className={`btn ${statusFilter === "All" ? "btn-primary" : "btn-outline-primary"} `} 
      style={{ border: 'none' }}
      onClick={() => setStatusFilter("All")}
    >
      <i className="fas fa-list"></i> Total Projects ({data.length})
    </button>

    <button 
      className={`btn ${statusFilter === "Ongoing" ? "btn-success" : "btn-outline-success"} mx-1`} 
      style={{ border: 'none' }}
      onClick={() => setStatusFilter("Ongoing")}
    >
      <i className="fas fa-spinner fa-spin"></i> Ongoing
    </button>

    <button 
      className={`btn ${statusFilter === "Completed" ? "btn-info" : "btn-outline-info"} `} 
      style={{ border: 'none' }}
      onClick={() => setStatusFilter("Completed")}
    >
      <i className="fas fa-check"></i> Completed
    </button>
  </div>
</div>

                    <section id="complex-header-datatable">
                      <div className="row">
                        <div className="col-12">
                          <div className="card-datatable">
                            <table className="table table-striped table-hover table-bordered text-center">
                              <thead className="thead-light">
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

                                    return (
                                      <tr key={project_id}>
                                        <td className="font-weight-bold">{title}</td>
                                        <td>{start_date}</td>
                                        <td>{duration}</td>
                                        <td className="text-right">{days}</td>
                                        <td className="text-right">
                                          <span className="badge badge-pill badge-primary px-2 py-1">
                                            {obt_marks} / {project_marks}
                                          </span>
                                        </td>
                                        <td>
                                          <span
                                            className={`badge badge-pill px-2 py-1 ${
                                              pstatus === "Ongoing"
                                                ? "badge-info"
                                                : pstatus === "Completed"
                                                ? "badge-success"
                                                : pstatus === "Expired"
                                                ? "badge-danger"
                                                : "badge-secondary"
                                            }`}
                                          >
                                            {pstatus}
                                          </span>
                                        </td>
                                        <td>
                                          {/* Action Icons in a Row */}
                                          <div className="d-flex justify-content-center">
                                            {/* View Details Icon */}
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

                                            {/* Create Task Icon (Disabled for Expired Projects) */}
                                            <button
                                              className="btn btn-danger btn-sm "
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
                                              disabled={pstatus === "Expired"}
                                            >
                                              <i className="fas fa-tasks px-1/2 py-1"></i>
                                            </button>
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

            {/* View Project Details */}
            <ViewProject data={values} />
            {/* Create Task */}
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
