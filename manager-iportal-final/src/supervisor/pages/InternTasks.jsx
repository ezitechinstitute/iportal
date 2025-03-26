import React, { useEffect, useState } from "react";
import { SupervisorTopbar } from "../components/SupervisorTopbar";
import { SupervisorSidebar } from "../components/SupervisorSidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Pagination } from "../../components/Pagination";
import { TaskDetails } from "../components/TaskDetails";

const InternTasks = () => {
  const navigate = useNavigate();
  const [token] = useState(sessionStorage.getItem("token"));
  const check = sessionStorage.getItem("isLoggedIn");
  const supid = sessionStorage.getItem("managerid");

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");

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
    try {
      const response = await axios.get(
        `https://api.ezitech.org/get-sup-tasks/${supid}`,
        {
          params: {
            page: page,
            limit: dataLimit,
          },
          headers: { "x-access-token": token },
        }
      );
      
      setData(response.data.data || response.data);
      setFilteredData(response.data.data || response.data);
      
      if (response.data.meta) {
        setCurrentPage(response.data.meta.page || 1);
        setTotalPages(response.data.meta.totalPages || 1);
      }
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setData([]);
      setFilteredData([]);
    }
  };

  useEffect(() => {
    if (statusFilter === "All") {
      setFilteredData(data);
    } else {
      setFilteredData(
        data.filter((item) => {
          if (statusFilter === "Approved") {
            return item.task_approve === 1;
          } else {
            return item.task_status && 
              item.task_status.toLowerCase() === statusFilter.toLowerCase();
          }
        })
      );
    }
  }, [statusFilter, data]);

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
                    <div className="card-header d-flex justify-content-between align-items-center flex-wrap">
                      <h4 className="card-title mb-2 mb-md-0">Intern Tasks</h4>

                      <div className="d-flex align-items-center flex-wrap">
                        {/* Rows per page selector */}
                        <div className="btn-group mr-2 mb-2 mb-md-0">
                          <button
                            className={`btn ${
                              dataLimit === 50 ? "btn-primary" : "btn-outline-primary"
                            }`}
                            onClick={() => setDataLimit(50)}
                          >
                            50
                          </button>
                          <button
                            className={`btn ${
                              dataLimit === 100 ? "btn-primary" : "btn-outline-primary"
                            }`}
                            onClick={() => setDataLimit(100)}
                          >
                            100
                          </button>
                          <button
                            className={`btn ${
                              dataLimit === 200 ? "btn-primary" : "btn-outline-primary"
                            }`}
                            onClick={() => setDataLimit(200)}
                          >
                            200
                          </button>
                        </div>

                        {/* Status filter buttons */}
                        <div className="btn-group">
                          <button
                            className={`btn ${
                              statusFilter === "All" ? "btn-info" : "btn-outline-info"
                            }`}
                            onClick={() => setStatusFilter("All")}
                          >
                            All
                          </button>
                          <button
                            className={`btn ${
                              statusFilter === "Ongoing" ? "btn-info" : "btn-outline-info"
                            }`}
                            onClick={() => setStatusFilter("Ongoing")}
                          >
                            Ongoing
                          </button>
                          <button
                            className={`btn ${
                              statusFilter === "Submitted" ? "btn-info" : "btn-outline-info"
                            }`}
                            onClick={() => setStatusFilter("Submitted")}
                          >
                            Submitted
                          </button>
                          <button
                            className={`btn ${
                              statusFilter === "Expired" ? "btn-info" : "btn-outline-info"
                            }`}
                            onClick={() => setStatusFilter("Expired")}
                          >
                            Expired
                          </button>
                          <button
                            className={`btn ${
                              statusFilter === "Approved" ? "btn-info" : "btn-outline-info"
                            }`}
                            onClick={() => setStatusFilter("Approved")}
                          >
                            Approved
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="card-content">
                      <div className="card-body">
                        <div className="table-responsive">
                          <table className="table table-bordered table-hover">
                            <thead>
                              <tr>
                                <th>Name</th>
                                <th>Task Title</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Duration</th>
                                <th>Days</th>
                                <th>Status</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredData.length > 0 ? (
                                filteredData.map((rs) => {
                                  const {
                                    task_id,
                                    name,
                                    task_title,
                                    task_start,
                                    task_end,
                                    task_duration,
                                    task_days,
                                    task_status,
                                    task_approve,
                                  } = rs;

                                  const date = new Date(task_start).toLocaleDateString("en-PK");
                                  const endDate = new Date(task_end).toLocaleDateString("en-PK");

                                  return (
                                    <tr key={task_id}>
                                      <td>{name}</td>
                                      <td>{task_title}</td>
                                      <td>{date}</td>
                                      <td>{endDate}</td>
                                      <td>{task_duration}</td>
                                      <td>{task_days}</td>
                                      <td>
                                        {task_approve === null ? (
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
                                        ) : task_approve === 1 ? (
                                          <span className="badge badge-glow badge-success">
                                            Approved
                                          </span>
                                        ) : task_approve === 0 ? (
                                          <span className="badge badge-glow badge-danger">
                                            Rejected
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
                                })
                              ) : (
                                <tr>
                                  <td colSpan="8" className="text-center py-4">
                                    No tasks found matching your criteria
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>

                        {filteredData.length > 0 && (
                          <div className="d-flex justify-content-center mt-2">
                            <Pagination
                              currentPage={currentPage}
                              totalPages={totalPages}
                              onPageChange={handlePageChange}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Task Details Modal */}
            <TaskDetails values={taskData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default InternTasks;