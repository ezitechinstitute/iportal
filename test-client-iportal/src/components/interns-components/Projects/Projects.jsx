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
  const [taskData, setTaskData] = useState([]);

  const GetProjects = async () => {
    await axios
      .get(`http://localhost:8800/intern-projects`, {
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

  const GetProjectTask = async (id) => {
    await axios
      .get(`http://localhost:8800/get-project-task`, {
        params: {
          id: id,
        },
      })
      .then((res) => {
        setTaskData(res.data);
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
                          <div className="card-datatable">
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

                                        console.log(`#${project_id}`);
                                        return (
                                          <>
                                            <tr
                                              id="headingCollapse1"
                                              role="button"
                                              data-toggle="collapse"
                                              data-target={`#test${project_id}`}
                                              onClick={() =>
                                                GetProjectTask(project_id)
                                              }
                                              aria-expanded="false"
                                              aria-controls="collapse1"
                                            >
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
                                                      onClick={() =>
                                                        setValues({
                                                          id: id,
                                                          projectId: project_id,
                                                          points: project_marks,
                                                        })
                                                      }
                                                    >
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
                                                        <span>Create Task</span>
                                                      </a>
                                                    ) : (
                                                      ""
                                                    )}
                                                  </div>
                                                </div>
                                              </th>
                                            </tr>

                                            <tr>
                                              <td colSpan={7}>
                                                <div
                                                  id={`test${project_id}`}
                                                  role="tabpanel"
                                                  aria-labelledby="headingCollapse1"
                                                  class="collapse"
                                                >
                                                  <div
                                                    class="card-body"
                                                    style={{
                                                      backgroundColor: "white",
                                                    }}
                                                  >
                                                    <h5>Project Tasks</h5>
                                                    <table
                                                      className="table table-responsive bordered"
                                                      style={{
                                                        backgroundColor:
                                                          "white",
                                                      }}
                                                    >
                                                      <thead>
                                                        <tr>
                                                          <th>NAME</th>
                                                          <th>TITLE</th>
                                                          <th>PROJECT</th>
                                                          <th>DATE</th>
                                                          <th>DURATION</th>
                                                          <th>Days</th>
                                                          <th>POINTS</th>
                                                          <th>REVIEW</th>
                                                          <th>STATUS</th>
                                                          <th>Action</th>
                                                        </tr>
                                                      </thead>

                                                      <tbody>
                                                        {Array.isArray(taskData)
                                                          ? taskData.map(
                                                              (res) => {
                                                                const {
                                                                  task_id,
                                                                  project_id,
                                                                  name,
                                                                  task_title,
                                                                  title,
                                                                  t_start_date,
                                                                  task_duration,
                                                                  task_days,
                                                                  task_mark,
                                                                  task_obt_mark,
                                                                  task_status,
                                                                  approved,
                                                                  review,
                                                                } = res;

                                                                const date =
                                                                  new Date(
                                                                    t_start_date
                                                                  ).toLocaleDateString(
                                                                    "en-PK"
                                                                  );

                                                                return (
                                                                  <>
                                                                    <tr>
                                                                      <td>
                                                                        {name}
                                                                      </td>
                                                                      <td>
                                                                        {
                                                                          task_title
                                                                        }
                                                                      </td>
                                                                      <td>
                                                                        {title}
                                                                      </td>
                                                                      <td>
                                                                        {date}
                                                                      </td>
                                                                      <td>
                                                                        {
                                                                          task_duration
                                                                        }
                                                                      </td>
                                                                      <td>
                                                                        {
                                                                          task_days
                                                                        }
                                                                      </td>
                                                                      <td>
                                                                        {
                                                                          task_obt_mark
                                                                        }{" "}
                                                                        /{" "}
                                                                        {
                                                                          task_mark
                                                                        }
                                                                      </td>
                                                                      <td>
                                                                        {review
                                                                          ? review
                                                                          : "---"}
                                                                      </td>
                                                                      {approved ===
                                                                      null ? (
                                                                        <>
                                                                          <td>
                                                                            {task_status ===
                                                                            "Ongoing" ? (
                                                                              <span className="badge badge-glow badge-info">
                                                                                {" "}
                                                                                {
                                                                                  task_status
                                                                                }{" "}
                                                                              </span>
                                                                            ) : task_status ===
                                                                              "Expired" ? (
                                                                              <span className="badge badge-glow badge-danger">
                                                                                {" "}
                                                                                {
                                                                                  task_status
                                                                                }{" "}
                                                                              </span>
                                                                            ) : task_status ===
                                                                              "Submitted" ? (
                                                                              <span className="badge badge-glow badge-success">
                                                                                {" "}
                                                                                {
                                                                                  task_status
                                                                                }{" "}
                                                                              </span>
                                                                            ) : (
                                                                              " "
                                                                            )}
                                                                          </td>
                                                                        </>
                                                                      ) : approved ===
                                                                        1 ? (
                                                                        <td>
                                                                          <span className="badge badge-glow badge-success">
                                                                            {" "}
                                                                            {
                                                                              task_status
                                                                            }{" "}
                                                                          </span>
                                                                        </td>
                                                                      ) : approved ===
                                                                        0 ? (
                                                                        <td>
                                                                          <span className="badge badge-glow badge-danger">
                                                                            {" "}
                                                                            {
                                                                              task_status
                                                                            }{" "}
                                                                          </span>
                                                                        </td>
                                                                      ) : (
                                                                        <div className="center">
                                                                          <span>
                                                                            {" "}
                                                                            No
                                                                            task
                                                                            found!!!
                                                                          </span>
                                                                        </div>
                                                                      )}
                                                                    </tr>
                                                                  </>
                                                                );
                                                              }
                                                            )
                                                          : ""}
                                                      </tbody>
                                                    </table>
                                                  </div>
                                                </div>
                                              </td>
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
            <ViewProject data={values} />
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
