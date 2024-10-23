import React, { useEffect, useState } from "react";
import InternTopbar from "../../components/interns-components/InternTopbar/InternTopbar";
import InternSidebar from "../../components/interns-components/InternSidebar";
import { Footer } from "../../components/Footer";
import axios from "axios";
import { UploadTask } from "../../components/UploadTask";

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
                                    <th>PROJECT</th>
                                    <th>TITLE</th>
                                    <th>START DATE</th>
                                    <th>DURATION</th>
                                    <th>Days</th>
                                    <th>POINTS</th>
                                    <th>REVIEW</th>
                                    <th>STATUS</th>
                                    <th>ACTION</th>
                                  </tr>
                                </thead>

                                <tbody>
                                  {Array.isArray(filtered)
                                    ? filtered.map((rs) => {
                                        const {
                                          task_id,
                                          project_id,
                                          title,
                                          task_title,
                                          t_start_date,
                                          task_duration,
                                          task_days,
                                          task_mark,
                                          task_status,
                                          task_submit_status,
                                          task_obt_mark,
                                          review,
                                          task_status_final,
                                        } = rs;

                                        const date = new Date(
                                          t_start_date
                                        ).toLocaleDateString();

                                        return (
                                          <>
                                            <tr>
                                              <td>{title}</td>
                                              <td>{task_title}</td>
                                              <td>{date}</td>
                                              <td>{task_duration}</td>
                                              <td>{task_days}</td>
                                              <td>
                                                {task_obt_mark} / {task_mark}
                                              </td>
                                              <td>
                                                {review ? review : <p>---</p>}
                                              </td>
                                              {task_submit_status !== 1 ? (
                                                <td>
                                                  {task_status === "Ongoing" ? (
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
                                                  ) : (
                                                    ""
                                                  )}
                                                </td>
                                              ) : task_status_final === 1 ? (
                                                <td>
                                                  <span className="badge badge-glow badge-success">
                                                    Approve
                                                  </span>
                                                </td>
                                              ) : task_status_final === 0 ? (
                                                <td>
                                                  <span className="badge badge-glow badge-danger">
                                                    Reject
                                                  </span>
                                                </td>
                                              ) : (
                                                <td>
                                                  <span className="badge badge-glow badge-success">
                                                    Submitted
                                                  </span>
                                                </td>
                                              )}

                                              <td>
                                                {task_submit_status === 1 ||
                                                task_status === "Expired" ? (
                                                  <button
                                                    type="button"
                                                    className="btn btn-warning hide-arrow"
                                                    disabled
                                                  >
                                                    Upload
                                                  </button>
                                                ) : (
                                                  <button
                                                    type="button"
                                                    className="btn btn-warning hide-arrow"
                                                    data-toggle="modal"
                                                    data-target="#default2"
                                                    onClick={() =>
                                                      setValues({
                                                        id: id,
                                                        taskId: task_id,
                                                        projectId: project_id,
                                                        taskTitle: task_title,
                                                        points: task_mark,
                                                      })
                                                    }
                                                  >
                                                    Upload
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

            {/* Upload Task */}
            <UploadTask values={values} />
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};
