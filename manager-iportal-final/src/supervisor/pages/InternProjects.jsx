import React, { useEffect, useState } from "react";
import { SupervisorTopbar } from "../components/SupervisorTopbar";
import { SupervisorSidebar } from "../components/SupervisorSidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Pagination } from "../../components/Pagination";

const InternProjects = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(sessionStorage.getItem("token"));
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

  useEffect(() => {
    if (!check) {
      navigate("/supervisor");
    }
  }, [check, navigate]);

  const GetProjects = async (page) => {
    setLoader(true);
    try {
      const response = await axios.get(
        `https://api.ezitech.org/get-sup-projects/${supid}`,
        {
          params: {
            page: page,
            limit: dataLimit,
          },
          headers: { "x-access-token": token },
        }
      );
      
      // Check the actual response structure first
      console.log("API Response:", response.data);
      
      // Adjust according to actual response structure
      const projectsData = response.data.data || response.data;
      setData(projectsData);
      setFilteredData(projectsData); // Initialize with all data
      
      // Handle pagination meta data carefully
      if (response.data.meta) {
        setCurrentPage(response.data.meta.page || 1);
        setTotalPages(response.data.meta.totalPages || 1);
      }
    } catch (err) {
      console.error("Error fetching projects:", err);
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
      setFilteredData(data.filter((item) => 
        item.pstatus && item.pstatus.toLowerCase() === statusFilter.toLowerCase()
      ));
    }
  }, [statusFilter, data]);

  const MarkasCompleted = async (id) => {
    if (window.confirm("Are you sure you want to mark this project as completed?")) {
      try {
        const response = await axios.put(
          `https://api.ezitech.org/mark-project-complete/${id}`
        );
        alert(response.data.message);
        GetProjects(currentPage); // Refresh the data
      } catch (err) {
        console.error("Error marking project as complete:", err);
        alert("Failed to mark project as completed");
      }
    }
  };

  useEffect(() => {
    if (statusFilter === "All") {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter((item) => item.pstatus === statusFilter));
    }
  }, [statusFilter, data]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    GetProjects(currentPage);
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
                      <h4 className="card-title mb-2 mb-md-0">Projects</h4>

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
                            All Projects
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
                              statusFilter === "Completed" ? "btn-info" : "btn-outline-info"
                            }`}
                            onClick={() => setStatusFilter("Completed")}
                          >
                            Completed
                          </button>
                          <button
                            className={`btn ${
                              statusFilter === "Expired" ? "btn-info" : "btn-outline-info"
                            }`}
                            onClick={() => setStatusFilter("Expired")}
                          >
                            Expired
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
                                <th>Title</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Duration</th>
                                <th>Days</th>
                                <th>Points</th>
                                <th>Status</th>
                                <th>Tasks</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {loader ? (
                                <tr>
                                  <td colSpan="10" className="text-center py-4">
                                    <div className="spinner-border text-primary" role="status">
                                      <span className="sr-only">Loading...</span>
                                    </div>
                                  </td>
                                </tr>
                              ) : filteredData.length > 0 ? (
                                filteredData.map((project) => (
                                  <tr key={project.project_id}>
                                    <td>{project.name}</td>
                                    <td>{project.title}</td>
                                    <td>{project.start_date}</td>
                                    <td>{project.end_date}</td>
                                    <td>{project.duration}</td>
                                    <td>{project.days}</td>
                                    <td>
                                      {project.obt_marks} / {project.project_marks}
                                    </td>
                                    <td>
                                      {project.pstatus === "Ongoing" ? (
                                        <span className="badge badge-pill badge-glow badge-primary">
                                          {project.pstatus}
                                        </span>
                                      ) : project.pstatus === "Completed" ? (
                                        <span className="badge badge-pill badge-glow badge-success">
                                          {project.pstatus}
                                        </span>
                                      ) : project.pstatus === "Expired" ? (
                                        <span className="badge badge-pill badge-glow badge-danger">
                                          {project.pstatus}
                                        </span>
                                      ) : (
                                        <span className="badge badge-pill badge-glow badge-secondary">
                                          {project.pstatus}
                                        </span>
                                      )}
                                    </td>
                                    <td>{project.taskCount}</td>
                                    <td>
                                      <div className="btn-group">
                                        <button
                                          className="btn btn-warning btn-sm dropdown-toggle"
                                          type="button"
                                          data-toggle="dropdown"
                                          aria-haspopup="true"
                                          aria-expanded="false"
                                        >
                                          Actions
                                        </button>
                                        <div className="dropdown-menu">
                                          <button
                                            className="dropdown-item"
                                            onClick={() => {
                                              /* Edit functionality */
                                            }}
                                          >
                                            <i className="fas fa-edit mr-1"></i> Edit
                                          </button>
                                          <button
                                            className="dropdown-item"
                                            onClick={() => {
                                              /* Freeze functionality */
                                            }}
                                          >
                                            <i className="fas fa-snowflake mr-1"></i> Freeze
                                          </button>
                                          <button
                                            className="dropdown-item"
                                            onClick={() => MarkasCompleted(project.project_id)}
                                            disabled={project.pstatus === "Completed"}
                                          >
                                            <i className="fas fa-check-circle mr-1"></i> Mark Complete
                                          </button>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan="10" className="text-center py-4">
                                    No projects found matching your criteria
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
          </div>
        </div>
      </div>
    </>
  );
};

export default InternProjects;