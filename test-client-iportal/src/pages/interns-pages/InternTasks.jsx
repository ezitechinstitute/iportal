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
  // const id = "EZI-23-5-24/7832";
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchterm] = useState("");
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
        setFiltered(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    GetTasks();
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
                      <h4 className="card-title">Tasks</h4>
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
                                    <th>REVIEW</th>
                                    <th>STATUS</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>

                                <tbody>
                                  {Array.isArray(filtered)
                                    ? filtered.map((rs) => {
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

                                        const date = new Date(
                                          task_start
                                        ).toLocaleDateString("en-PK");

                                        return (
                                          <>
                                            <tr>
                                              <td>{task_title}</td>
                                              <td>{date}</td>
                                              <td>{task_duration}</td>
                                              <td>{task_days}</td>
                                              <td>
                                                {task_obt_points} /{" "}
                                                {task_points}
                                              </td>
                                              <td>
                                                {review ? review : <p>---</p>}
                                              </td>
                                              {task_approve === null ? (
                                                <>
                                                  <td>
                                                    {task_status ===
                                                    "Ongoing" ? (
                                                      <span className="badge badge-glow badge-info">
                                                        {" "}
                                                        {task_status}{" "}
                                                      </span>
                                                    ) : task_status ===
                                                      "Expired" ? (
                                                      <span className="badge badge-glow badge-danger">
                                                        {" "}
                                                        {task_status}{" "}
                                                      </span>
                                                    ) : task_status ===
                                                      "Submitted" ? (
                                                      <span className="badge badge-glow badge-success">
                                                        {" "}
                                                        {task_status}{" "}
                                                      </span>
                                                    ) : (
                                                      " "
                                                    )}
                                                  </td>
                                                </>
                                              ) : task_approve === 1 ? (
                                                <td>
                                                  <span className="badge badge-glow badge-success">
                                                    {" "}
                                                    {task_status}{" "}
                                                  </span>
                                                </td>
                                              ) : task_approve === 0 ? (
                                                <td>
                                                  <span className="badge badge-glow badge-danger">
                                                    {" "}
                                                    {task_status}{" "}
                                                  </span>
                                                </td>
                                              ) : (
                                                ""
                                              )}

                                              <td>
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
                                                          taskId: task_id,
                                                          points: task_points,
                                                        })
                                                      }
                                                    >
                                                      <span>View Details</span>
                                                    </a>
                                                    {task_status !==
                                                    "Expired" ? (
                                                      <a
                                                        className="dropdown-item"
                                                        href="javascript:void(0);"
                                                        data-toggle="modal"
                                                        data-target="#default2"
                                                        onClick={() =>
                                                          setValues({
                                                            id: id,
                                                            taskId: task_id,
                                                            taskTitle:
                                                              task_title,
                                                            points: task_points,
                                                          })
                                                        }
                                                      >
                                                        <span>Submit Task</span>
                                                      </a>
                                                    ) : (
                                                      ""
                                                    )}
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
