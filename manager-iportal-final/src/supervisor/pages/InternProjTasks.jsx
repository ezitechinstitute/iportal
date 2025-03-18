import React, { useEffect, useState } from "react";
import { SupervisorTopbar } from "../components/SupervisorTopbar";
import { SupervisorSidebar } from "../components/SupervisorSidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Pagination } from "../../components/Pagination";
import { ProjectTaskDetails } from "../components/ProjectTaskDetails";

export const InternProjTasks = () => {
  const navigate = useNavigate();
  const [token] = useState(sessionStorage.getItem("token"));
  const check = sessionStorage.getItem("isLoggedIn");
  const supid = sessionStorage.getItem("managerid");

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [dataLimit, setDataLimit] = useState(50);

  const [taskData, setTaskData] = useState({
    taskId: null,
  });

  useEffect(() => {
    if (!check) {
      navigate("/supervisor");
    }
  }, [check, navigate]);

  const GetTasks = async (page) => {
    await axios
      .get(`https://api.ezitech.org/get-projects-tasks/${supid}`, {
        params: {
          page: page,
          limit: dataLimit,
        },
        headers: { "x-access-token": token },
      })
      .then((res) => {
        setData(res.data);
        setFilteredData(res.data); // Initial filtered data should be full data
        setCurrentPage(res.data.meta.page);
        setTotalPages(res.data.meta.totalPages);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const filter = data.filter((item) =>
      item.task_status.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filter);
  }, [searchTerm, data]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    GetTasks(currentPage);
  }, [currentPage, dataLimit]);

  return (
    <>
      <SupervisorTopbar />
      <SupervisorSidebar />

      <div className="app-content content">
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
                      <div className="ag-btns d-flex flex-wrap">
                        <label htmlFor="dataLimit" style={{ marginTop: "8px" }}>
                          Select Rows
                        </label>
                         
                        <select
                          className="form-control w-25"
                          name="dataLimit"
                          id="dataLimit"
                          onChange={(e) => setDataLimit(e.target.value)}
                        >
                          <option value={50}>50</option>
                          <option value={100}>100</option>
                          <option value={200}>200</option>
                          <option value={300}>300</option>
                          <option value={500}>500</option>
                        </select>
                           
                        <label htmlFor="pStatus" style={{ marginTop: "8px" }}>
                          Show By Status
                        </label>
                         
                        <select
                          name="pStatus"
                          id="pStatus"
                          className="ag-grid-filter form-control w-25"
                          onChange={(e) => setSearchTerm(e.target.value)}
                        >
                          <option value="">All</option>
                          <option value="Ongoing">Ongoing</option>
                          <option value="Expired">Expired</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </div>
                    </div>

                    <section id="complex-header-datatable">
                      <div className="row">
                        <div className="col-12">
                          <div className="card">
                            <div className="card-datatable table-responsive">
                              <table
                                className="dt-complex-header table table-bordered w-100" // Added w-100 for full width
                              >
                                <thead>
                                  <tr>
                                    <th>Name</th>
                                    <th>Task Title</th>
                                    <th>Project Title</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Duration</th>
                                    <th>Days</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>

                                <tbody>
                                  {Array.isArray(filteredData) &&
                                    filteredData.map((rs) => {
                                      const {
                                        task_id,
                                        name,
                                        task_title,
                                        title,
                                        t_start_date,
                                        t_end_date,
                                        task_duration,
                                        task_days,
                                        task_status,
                                        approved,
                                      } = rs;

                                      const date = new Date(t_start_date).toLocaleDateString("en-PK");
                                      const endDate = new Date(t_end_date).toLocaleDateString("en-PK");

                                      return (
                                        <tr key={task_id}>
                                          <td>{name}</td>
                                          <td>{task_title}</td>
                                          <td>{title}</td>
                                          <td>{date}</td>
                                          <td>{endDate}</td>
                                          <td>{task_duration}</td>
                                          <td>{task_days}</td>
                                          <td>
                                            {approved === null ? (
                                              task_status === "Ongoing" ? (
                                                <span className="badge badge-glow badge-info">
                                                  {task_status}
                                                </span>
                                              ) : task_status === "Expired" ? (
                                                <span className="badge badge-glow badge-danger">
                                                  {task_status}
                                                </span>
                                              ) : task_status === "Submitted" ? (
                                                <span className="badge badge-glow badge-success">
                                                  {task_status}
                                                </span>
                                              ) : (
                                                " "
                                              )
                                            ) : approved === 1 ? (
                                              <span className="badge badge-glow badge-success">
                                                {task_status}
                                              </span>
                                            ) : approved === 0 ? (
                                              <span className="badge badge-glow badge-danger">
                                                {task_status}
                                              </span>
                                            ) : (
                                              ""
                                            )}
                                          </td>
                                          <td>
                                            <div className="btn-group">
                                              <button
                                                className="btn btn-warning"
                                                type="button"
                                                data-toggle="modal"
                                                data-target="#xlarge"
                                                onClick={() =>
                                                  setTaskData({ taskId: task_id })
                                                }
                                              >
                                                View
                                              </button>
                                            </div>
                                          </td>
                                        </tr>
                                      );
                                    })}
                                </tbody>
                              </table>
                            </div>
                            <br />
                            <Pagination
                              currentPage={currentPage}
                              totalPages={totalPages}
                              onPageChange={handlePageChange}
                            />
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </section>

            {/* Task Details */}
            <ProjectTaskDetails values={taskData} />
          </div>
        </div>
      </div>
    </>
  );
};