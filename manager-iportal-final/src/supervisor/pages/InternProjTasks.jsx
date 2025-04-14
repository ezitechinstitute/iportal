import React, { useEffect, useState } from "react";
import { SupervisorTopbar } from "../components/SupervisorTopbar";
import { SupervisorSidebar } from "../components/SupervisorSidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Pagination } from "../../components/Pagination";
import { ProjectTaskDetails } from "../components/ProjectTaskDetails";

const InternProjTasks = () => {
  const navigate = useNavigate();
  const [token] = useState(sessionStorage.getItem("token"));
  const check = sessionStorage.getItem("isLoggedIn");
  const supid = sessionStorage.getItem("managerid");

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [loader, setLoader] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [dataLimit, setDataLimit] = useState(50);

  const [taskData, setTaskData] = useState({ taskId: null });

  useEffect(() => {
    if (!check) {
      navigate("/supervisor");
    }
  }, [check, navigate]);

  const GetTasks = async (page) => {
    setLoader(true);
    try {
      const response = await axios.get(
        `https://api.ezitech.org/get-projects-tasks/${supid}`,
        {
          params: {
            page: page,
            limit: dataLimit,
          },
          headers: { "x-access-token": token },
        }
      );

      console.log("API Response:", response.data); // Debugging

      // Handle response structure
      let tasksData = response.data.data || response.data;

      // Ensure tasksData is an array
      if (!Array.isArray(tasksData)) {
        console.warn("tasksData is not an array:", tasksData);
        tasksData = []; // Fallback to empty array
      }

      const formattedData = tasksData.map((item) => ({
        ...item,
        formatted_start_date: item.t_start_date
          ? new Date(item.t_start_date).toLocaleDateString("en-PK")
          : "N/A",
        formatted_end_date: item.t_end_date
          ? new Date(item.t_end_date).toLocaleDateString("en-PK")
          : "N/A",
      }));

      setData(formattedData);
      setFilteredData(formattedData);

      // Handle pagination metadata
      if (response.data.meta) {
        setCurrentPage(response.data.meta.page || 1);
        setTotalPages(response.data.meta.totalPages || 1);
      }
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setData([]);
      setFilteredData([]);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (statusFilter === "All") {
      setFilteredData(data);
    } else {
      setFilteredData(
        data.filter((item) => {
          if (statusFilter === "Approved") {
            return item.approved === 1;
          } else if (statusFilter === "Rejected") {
            return item.approved === 0;
          } else {
            return (
              item.task_status &&
              item.task_status.toLowerCase() === statusFilter.toLowerCase()
            );
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
                      <h4 className="card-title mb-2 mb-md-0">Project Tasks</h4>

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
                              statusFilter === "Submitted" ? "btn-info" : "btn-outline-info"
                            }`}
                            onClick={() => setStatusFilter("Submitted")}
                          >
                            Submitted
                          </button>
                          <button
                            className={`btn ${
                              statusFilter === "Rejected" ? "btn-info" : "btn-outline-info"
                            }`}
                            onClick={() => setStatusFilter("Rejected")}
                          >
                            Rejected
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
                              {loader ? (
                                <tr>
                                  <td colSpan="9" className="text-center py-4">
                                    <div className="spinner-border text-primary" role="status">
                                      <span className="sr-only">Loading...</span>
                                    </div>
                                  </td>
                                </tr>
                              ) : filteredData.length > 0 ? (
                                filteredData.map((rs) => (
                                  <tr key={rs.task_id}>
                                    <td>{rs.name}</td>
                                    <td>{rs.task_title}</td>
                                    <td>{rs.title}</td>
                                    <td>{rs.formatted_start_date}</td>
                                    <td>{rs.formatted_end_date}</td>
                                    <td>{rs.task_duration}</td>
                                    <td>{rs.task_days}</td>
                                    <td>
                                      {rs.approved === null ? (
                                        rs.task_status === "Ongoing" ? (
                                          <span className="badge badge-glow badge-info">
                                            {rs.task_status}
                                          </span>
                                        ) : rs.task_status === "Expired" ? (
                                          <span className="badge badge-glow badge-danger">
                                            {rs.task_status}
                                          </span>
                                        ) : rs.task_status === "Submitted" ? (
                                          <span className="badge badge-glow badge-success">
                                            {rs.task_status}
                                          </span>
                                        ) : (
                                          " "
                                        )
                                      ) : rs.approved === 1 ? (
                                        <span className="badge badge-glow badge-success">
                                          Approved
                                        </span>
                                      ) : rs.approved === 0 ? (
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
                                            setTaskData({ taskId: rs.task_id })
                                          }
                                        >
                                          View
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan="9" className="text-center py-4">
                                    No tasks found matching your criteria
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>

                        {!loader && filteredData.length > 0 && (
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
            <ProjectTaskDetails values={taskData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default InternProjTasks;