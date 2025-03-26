import React, { useEffect, useState } from "react";
import InternTopbar from "../../components/interns-components/InternTopbar/InternTopbar";
import InternSidebar from "../../components/interns-components/InternSidebar";
import { Footer } from "../../components/Footer";
import axios from "axios";
import { UploadTask } from "../../components/UploadTask";
import { ViewProject } from "../../components/ViewProject";
import { TaskView } from "../../components/TaskView";

export const InternTasks = () => {
  const id = sessionStorage.getItem("eziId");
  const [values, setValues] = useState({
    id: null,
    projectId: null,
    taskId: null,
    taskTitle: null,
    points: null,
  });
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [taskStatusFilter, setTaskStatusFilter] = useState("All");
  const [loader, setLoader] = useState(false);

  const GetTasks = async () => {
    await axios
      .get("https://api.ezitech.org/intern-tasks", {
        params: {
          id: id,
        },
      })
      .then((res) => {
        setData(res.data);
        setFiltered(res.data); // Set initial filtered data
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    GetTasks();
  }, []); // Fetch tasks when component mounts

  // Filter tasks based on status selection
  useEffect(() => {
    if (taskStatusFilter === "All") {
      setFiltered(data);
    } else {
      setFiltered(data.filter((task) => task.task_status === taskStatusFilter));
    }
  }, [taskStatusFilter, data]); // Re-run whenever taskStatusFilter or data changes

  return (
    <>
      <InternTopbar />
      <InternSidebar />
      <div className="app-content content ">
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
                      <h2 className="card-title mb-3 mt-[-5px] font-weight-bold ml-[-10px]">Tasks</h2>

                      {/* Status Filter Buttons */}
                      <div className="btn-group">
                        <button
                          className={`btn ${taskStatusFilter === "All" ? "btn-primary" : "btn-outline-primary"}`}
                          onClick={() => setTaskStatusFilter("All")}
                        >
                          <i className="fas fa-list mr-1"></i>
                          All Tasks
                        </button>

                        <button
                          className={`btn ${taskStatusFilter === "Ongoing" ? "btn-info" : "btn-outline-info"} mx-1`}
                          onClick={() => setTaskStatusFilter("Ongoing")}
                        >
                          <i className="fas fa-hourglass mr-1"></i>
                          Ongoing
                        </button>

                        <button
                          className={`btn ${taskStatusFilter === "Approved" ? "btn-success" : "btn-outline-success"} mx-1`}
                          onClick={() => setTaskStatusFilter("Approved")}
                        >
                          <i className="fas fa-check-circle mr-1"></i>
                          Approved
                        </button>

                        <button
                          className={`btn ${taskStatusFilter === "Rejected" ? "btn-danger" : "btn-outline-danger"}`}
                          onClick={() => setTaskStatusFilter("Rejected")}
                        >
                          <i className="fas fa-times-circle mr-1"></i>
                          Rejected
                        </button>
                      </div>
                    </div>

                    <section id="complex-header-datatable">
                      <div className="row">
                        <div className="col-12">
                          <div className="card">
                            <div className="card-datatable">
                              {/* Wrapper for horizontal scrolling */}
                              <div style={{ overflowX: "auto" }}>
                                <table className="table table-striped table-hover table-bordered text-center">
                                  <thead className="thead-light">
                                    <tr>
                                      <th>TITLE</th>
                                      <th>START DATE</th>
                                      <th>DURATION</th>
                                      <th>DAYS</th>
                                      <th>POINTS</th>
                                      <th>REVIEW</th>
                                      <th>STATUS</th>
                                      <th>ACTION</th>
                                    </tr>
                                  </thead>

                                  <tbody>
                                    {Array.isArray(filtered) &&
                                      filtered.map((rs) => {
                                        const {
                                          task_id,
                                          task_title,
                                          task_start,
                                          task_duration,
                                          task_days,
                                          task_points,
                                          task_status,
                                          task_approve,
                                          task_obt_points,
                                          review,
                                        } = rs;

                                        const date = new Date(task_start).toLocaleDateString("en-PK");

                                        return (
                                          <tr key={task_id}>
                                            <td className="font-weight-bold">{task_title}</td>
                                            <td>{date}</td>
                                            <td>{task_duration}</td>
                                            <td className="text-right">{task_days}</td>
                                            <td className="text-right">
                                              <span className="badge badge-pill badge-primary px-2 py-1">
                                                {task_obt_points} / {task_points}
                                              </span>
                                            </td>
                                            <td>{review ? review : <span className="text-muted">---</span>}</td>
                                            <td>
                                              <span
                                                className={`badge badge-pill px-2 py-1 ${task_approve === null
                                                    ? task_status === "Ongoing"
                                                      ? "badge-info"
                                                      : task_status === "Rejected"
                                                        ? "badge-danger"
                                                        : task_status === "Approved"
                                                          ? "badge-success"
                                                          : "badge-secondary"
                                                    : task_approve === 1
                                                      ? "badge-success"
                                                      : "badge-danger"
                                                  }`}
                                              >
                                                {task_status}
                                              </span>
                                            </td>
                                            <td>
                                              <div className="dropdown">
                                                <button
                                                  type="button"
                                                  className="btn btn-sm btn-warning dropdown-toggle"
                                                  data-toggle="dropdown"
                                                >
                                                  Actions
                                                </button>
                                                <div className="dropdown-menu">
                                                  <a
                                                    className="dropdown-item"
                                                    href="#!"
                                                    data-toggle="modal"
                                                    data-target="#large"
                                                    onClick={() =>
                                                      setValues({
                                                        id: id,
                                                        taskId: task_id,
                                                        points: task_points,
                                                      })
                                                    }
                                                  >
                                                    <i className="fas fa-eye mr-2"></i> View Details
                                                  </a>
                                                  {task_status !== "Rejected" &&
                                                    task_status !== "Approved" &&
                                                    task_status !== "Rejected" && (
                                                      <a
                                                        className="dropdown-item"
                                                        href="#!"
                                                        data-toggle="modal"
                                                        data-target="#default2"
                                                        onClick={() =>
                                                          setValues({
                                                            id: id,
                                                            taskId: task_id,
                                                            taskTitle: task_title,
                                                            points: task_points,
                                                          })
                                                        }
                                                      >
                                                        <i className="fas fa-upload mr-2"></i> Submit Task
                                                      </a>
                                                    )}
                                                </div>
                                              </div>
                                            </td>
                                          </tr>
                                        );
                                      })}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </section>

            {/* Task Details */}
            <TaskView data={values} />
            {/* Upload Task */}
            <UploadTask values={values} />
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};