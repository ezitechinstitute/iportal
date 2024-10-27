import React, { useEffect, useState } from "react";
import InternTopbar from "../InternTopbar/InternTopbar";
import InternSidebar from "../InternSidebar";
import axios from "axios";
import { UploadProjectTask } from "./UploadProjectTask";

export const ProjectTasks = () => {
  const [taskData, setTaskData] = useState([]);
  const [values, setValues] = useState({
    id: null,
    projectId: null,
    taskId: null,
    taskTitle: null,
    points: null,
  });
  const id = sessionStorage.getItem("eziId");

  //   const id = "EZI-23-5-24/7832";

  const GetProjectTask = async () => {
    await axios
      .get(`https://api.ezitech.org/get-project-task`, {
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
    GetProjectTask();
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
                      <h4 className="card-title">Project Tasks</h4>
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
                                    ? taskData.map((res) => {
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

                                        const date = new Date(
                                          t_start_date
                                        ).toLocaleDateString("en-PK");

                                        return (
                                          <>
                                            <tr>
                                              <td>{name}</td>
                                              <td>{task_title}</td>
                                              <td>{title}</td>
                                              <td>{date}</td>
                                              <td>{task_duration}</td>
                                              <td>{task_days}</td>
                                              <td>
                                                {task_obt_mark} / {task_mark}
                                              </td>
                                              <td>{review ? review : "---"}</td>
                                              {approved === null ? (
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
                                              ) : approved === 1 ? (
                                                <td>
                                                  <span className="badge badge-glow badge-success">
                                                    {" "}
                                                    {task_status}{" "}
                                                  </span>
                                                </td>
                                              ) : approved === 0 ? (
                                                <td>
                                                  <span className="badge badge-glow badge-danger">
                                                    {" "}
                                                    {task_status}{" "}
                                                  </span>
                                                </td>
                                              ) : (
                                                <div className="center">
                                                  <span> No task found!!!</span>
                                                </div>
                                              )}

                                              <td>
                                                {task_status === "Expired" ||
                                                task_status === "Submitted" ||
                                                task_status === "Approved" ||
                                                task_status === "Rejected" ? (
                                                  <button
                                                    disabled
                                                    type="button"
                                                    className="btn btn-warning dropdown-toggle hide-arrow"
                                                  >
                                                    Submit
                                                  </button>
                                                ) : (
                                                  <button
                                                    type="button"
                                                    className="btn btn-warning dropdown-toggle hide-arrow"
                                                    data-toggle="modal"
                                                    data-target="#project-task"
                                                    onClick={() =>
                                                      setValues({
                                                        id: id,
                                                        taskId: task_id,
                                                        taskTitle: title,
                                                      })
                                                    }
                                                  >
                                                    Submit
                                                  </button>
                                                )}
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

            {/* Upload Project Task */}
            <UploadProjectTask values={values} />
          </div>
        </div>
      </div>
    </>
  );
};
