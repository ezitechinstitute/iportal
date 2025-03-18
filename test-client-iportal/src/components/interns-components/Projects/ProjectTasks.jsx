import React, { useEffect, useState } from "react";
import InternTopbar from "../InternTopbar/InternTopbar";
import InternSidebar from "../InternSidebar";
import axios from "axios";
import { UploadProjectTask } from "./UploadProjectTask";

export const ProjectTasks = () => {
  const [taskData, setTaskData] = useState([]);
  const [filteredTaskData, setFilteredTaskData] = useState([]);
  const [taskStatusFilter, setTaskStatusFilter] = useState("All");
  const [values, setValues] = useState({
    id: null,
    projectId: null,
    taskId: null,
    taskTitle: null,
    points: null,
  });
  const id = sessionStorage.getItem("eziId");

  const GetProjectTask = async () => {
    await axios
      .get(`https://api.ezitech.org/get-project-task`, {
        params: {
          id: id,
        },
      })
      .then((res) => {
        setTaskData(res.data);
        setFilteredTaskData(res.data); // Set the initial filtered data
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    GetProjectTask();
  }, []); // Fetch data on component mount

  // Filter tasks based on status selection
  useEffect(() => {
    if (taskStatusFilter === "All") {
      setFilteredTaskData(taskData);
    } else {
      setFilteredTaskData(
        taskData.filter((task) => task.task_status === taskStatusFilter)
      );
    }
  }, [taskStatusFilter, taskData]); // Re-run whenever taskStatusFilter or taskData changes

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
                      <h2 className="card-title mb-3 mt-[-5px] font-weight-bold ml-[-10px]">Project Tasks</h2>

                      {/* Status Filter Buttons */}
                      <div className="btn-group">
                        <button
                          className={`btn ${taskStatusFilter === "All" ? "btn-primary" : "btn-outline-primary"} `}
                          onClick={() => setTaskStatusFilter("All")}
                        >
                          <i className="fas fa-list mr-1"></i>
                          All Tasks
                        </button>

                        <button
                          className={`btn ${taskStatusFilter === "Ongoing" ? "btn-info" : "btn-outline-info"} mx-1`}
                          onClick={() => setTaskStatusFilter("Ongoing")}
                        >
                          <i className="fas fa-hourglass-half mr-1"></i>
                          Ongoing
                        </button>

                        <button
                          className={`btn ${taskStatusFilter === "Completed" ? "btn-success" : "btn-outline-success"} mx-1`}
                          onClick={() => setTaskStatusFilter("Complete")}
                        >
                          <i className="fas fa-check-circle mr-1"></i>
                          Completed
                        </button>

                        <button
                          className={`btn ${taskStatusFilter === "Expired" ? "btn-danger" : "btn-outline-danger"}`}
                          onClick={() => setTaskStatusFilter("Expired")}
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
                                {Array.isArray(filteredTaskData)
                                  ? filteredTaskData.map((res) => {
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
                                        <tr key={task_id}>
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
                                            <td>
                                              {task_status === "Ongoing" ? (
                                                <span className="badge badge-glow badge-info">
                                                  {task_status}
                                                </span>
                                              ) : task_status === "Expired" ? (
                                                <span className="badge badge-glow badge-danger">
                                                  {task_status}
                                                </span>
                                              ) : task_status === "Complete" ? (
                                                <span className="badge badge-glow badge-success">
                                                  {task_status}
                                                </span>
                                              ) : (
                                                " "
                                              )}
                                            </td>
                                          ) : approved === 1 ? (
                                            <td>
                                              <span className="badge badge-glow badge-success">
                                                {task_status}
                                              </span>
                                            </td>
                                          ) : approved === 0 ? (
                                            <td>
                                              <span className="badge badge-glow badge-danger">
                                                {task_status}
                                              </span>
                                            </td>
                                          ) : (
                                            <div className="center">
                                              <span>No task found!!!</span>
                                            </div>
                                          )}

                                          <td>
                                            {task_status === "Expired" ||
                                            task_status === "Complete" ||
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
                                      );
                                    })
                                  : ""}
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

            {/* Upload Project Task */}
            <UploadProjectTask values={values} />
          </div>
        </div>
      </div>
    </>
  );
};
