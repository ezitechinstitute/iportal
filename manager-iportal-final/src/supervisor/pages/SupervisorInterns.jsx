import React, { useEffect, useState } from "react";
import "./Interns.css";
import { SupervisorTopbar } from "../components/SupervisorTopbar";
import { SupervisorSidebar } from "../components/SupervisorSidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AttendanceReport } from "../components/AttendanceReport";
import { ProjectReport } from "../components/ProjectReport";
import { AssignProject } from "../components/AssignProject";
import { AssignShift } from "../components/AssignShift";
import { AssignTask } from "../components/AssignTask";

const SupervisorInterns = () => {
  const navigate = useNavigate();
  const [token] = useState(sessionStorage.getItem("token"));
  const check = sessionStorage.getItem("isLoggedIn");
  const managerid = sessionStorage.getItem("managerid");
  const [intId, setIntId] = useState({});
  const [attendVal, setAttendVal] = useState({
    join: null,
    duration: null,
    intEmail: null,
  });
  const [projVal, setProjVal] = useState({
    intEmail: null,
  });
  const [shiftData, setShiftData] = useState({
    email: null,
    etiId: null,
  });
  const [data, setData] = useState([]);

  // Pagination and filtering
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [dataLimit, setDataLimit] = useState(50);
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [internTypeFilter, setInternTypeFilter] = useState("All");
  const [rowsPerPage, setRowsPerPage] = useState(50);

  useEffect(() => {
    if (!check) {
      navigate("/supervisor");
    }
  }, [check, navigate]);

  const GetInterns = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.ezitech.org/get-sup-interns/${managerid}`,
        {
          params: {
            page: page,
            limit: dataLimit,
          },
          headers: { "x-access-token": token },
        }
      );
      console.log("API Response:", response.data); // Debug API response
      setData(response.data.data || []);
      setFilteredData(response.data.data || []);
      setCurrentPage(Number(response.data.meta?.page) || 1);
      setTotalPages(Number(response.data.meta?.totalPages) || 1);
    } catch (err) {
      console.error("Error fetching interns:", err);
      setData([]);
      setFilteredData([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    console.log("handlePageChange called with page:", page); // Debug page change
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const handleRowsPerPageChange = (limit) => {
    console.log("handleRowsPerPageChange called with limit:", limit); // Debug rows change
    setDataLimit(limit);
    setRowsPerPage(limit);
    setCurrentPage(1); // Reset to first page
  };

  useEffect(() => {
    if (internTypeFilter === "All") {
      setFilteredData(data);
    } else {
      setFilteredData(
        data.filter((item) =>
          item.intern_type.toLowerCase().includes(internTypeFilter.toLowerCase())
        )
      );
    }
  }, [internTypeFilter, data]);

  // Fetch interns when currentPage or dataLimit changes
  useEffect(() => {
    console.log("Fetching interns for page:", currentPage, "limit:", dataLimit); // Debug fetch
    GetInterns(currentPage);
  }, [currentPage, dataLimit]);

  // Simple Pagination Component
  const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>
          {pageNumbers.map((page) => (
            <li
              key={page}
              className={`page-item ${currentPage === page ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    );
  };

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
            <section id="complex-header-datatable">
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header border-bottom d-flex justify-content-between align-items-center flex-wrap">
                      <h2 className="card-title mb-2 mb-md-0">Interns</h2>

                      <div className="d-flex align-items-center flex-wrap">
                        {/* Rows per page selector */}
                        <div className="btn-group mr-2 mb-2 mb-md-0">
                          <button
                            className={`btn ${
                              rowsPerPage === 50 ? "btn-primary" : "btn-outline-primary"
                            }`}
                            onClick={() => handleRowsPerPageChange(50)}
                          >
                            50
                          </button>
                          <button
                            className={`btn ${
                              rowsPerPage === 100 ? "btn-primary" : "btn-outline-primary"
                            }`}
                            onClick={() => handleRowsPerPageChange(100)}
                          >
                            100
                          </button>
                          <button
                            className={`btn ${
                              rowsPerPage === 200 ? "btn-primary" : "btn-outline-primary"
                            }`}
                            onClick={() => handleRowsPerPageChange(200)}
                          >
                            200
                          </button>
                        </div>

                        {/* Intern type filter */}
                        <div className="btn-group">
                          <button
                            className={`btn ${
                              internTypeFilter === "All" ? "btn-info" : "btn-outline-info"
                            }`}
                            onClick={() => setInternTypeFilter("All")}
                          >
                            All
                          </button>
                          <button
                            className={`btn ${
                              internTypeFilter === "Remote" ? "btn-info" : "btn-outline-info"
                            }`}
                            onClick={() => setInternTypeFilter("Remote")}
                          >
                            Remote
                          </button>
                          <button
                            className={`btn ${
                              internTypeFilter === "Onsite" ? "btn-info" : "btn-outline-info"
                            }`}
                            onClick={() => setInternTypeFilter("Onsite")}
                          >
                            Onsite
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="card-datatable">
                      <div className="table-responsive">
                        <table className="table table-bordered text-center">
                          <thead>
                            <tr>
                              <th colSpan={2}>ETI-ID</th>
                              <th>Name</th>
                              <th>Image</th>
                              <th>Email</th>
                              <th>Duration</th>
                              <th>Join</th>
                              <th>Technology</th>
                              <th>Type</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>

                          <tbody>
                            {loading ? (
                              <tr>
                                <td colSpan="11" className="text-center py-4">
                                  <div className="spinner-border text-primary" role="status">
                                    <span className="sr-only">Loading...</span>
                                  </div>
                                </td>
                              </tr>
                            ) : filteredData.length > 0 ? (
                              filteredData.map((rs) => {
                                const {
                                  eti_id,
                                  name,
                                  email,
                                  image,
                                  duration,
                                  join_date,
                                  technology,
                                  intern_type,
                                  status,
                                } = rs;
                                const intMonth =
                                  duration === "1 Month"
                                    ? 1
                                    : duration === "2 Month"
                                    ? 2
                                    : duration === "3 Month"
                                    ? 3
                                    : duration === "6 Month"
                                    ? 6
                                    : 0;

                                return (
                                  <tr key={eti_id}>
                                    <td colSpan={2}>
                                      <strong>{eti_id}</strong>
                                    </td>
                                    <td>{name}</td>
                                    <td>
                                      <img
                                        src={image}
                                        alt="avatar"
                                        width={50}
                                        height={50}
                                        className="rounded"
                                      />
                                    </td>
                                    <td>{email}</td>
                                    <td>{duration}</td>
                                    <td>{join_date}</td>
                                    <td>{technology}</td>
                                    <td>{intern_type}</td>
                                    <td>
                                      {status === "Active" ? (
                                        <span className="badge badge-pill badge-glow badge-success">
                                          {status}
                                        </span>
                                      ) : (
                                        <span className="badge badge-pill badge-glow badge-secondary">
                                          {status}
                                        </span>
                                      )}
                                    </td>
                                    <td>
                                      <div className="dropdown">
                                        <button
                                          type="button"
                                          className="btn btn-warning dropdown-toggle"
                                          data-toggle="dropdown"
                                        >
                                          Action
                                        </button>
                                        <div className="dropdown-menu">
                                          <button
                                            className="dropdown-item"
                                            type="button"
                                            data-toggle="modal"
                                            data-target="#shiftModal"
                                            onClick={() =>
                                              setShiftData({
                                                email: email,
                                                etiId: eti_id,
                                              })
                                            }
                                          >
                                            Assign Shift
                                          </button>
                                          <button
                                            className="dropdown-item"
                                            type="button"
                                            data-toggle="modal"
                                            data-target="#default2"
                                            onClick={() =>
                                              setIntId({
                                                intEmail: email,
                                                idInt: eti_id,
                                                idMan: managerid,
                                              })
                                            }
                                          >
                                            Assign Project
                                          </button>
                                          <button
                                            className="dropdown-item"
                                            type="button"
                                            data-toggle="modal"
                                            data-target="#taskModal"
                                            onClick={() =>
                                              setIntId({
                                                intEmail: email,
                                                idInt: eti_id,
                                                idMan: managerid,
                                              })
                                            }
                                          >
                                            Assign Task
                                          </button>
                                          <button
                                            className="dropdown-item"
                                            type="button"
                                            data-toggle="modal"
                                            data-target="#default"
                                            onClick={() =>
                                              setAttendVal({
                                                join: join_date,
                                                duration: intMonth,
                                                intEmail: email,
                                              })
                                            }
                                          >
                                            Attendance
                                          </button>
                                          <button
                                            className="dropdown-item"
                                            type="button"
                                            data-toggle="modal"
                                            data-target="#default1"
                                            onClick={() =>
                                              setProjVal({ intEmail: email })
                                            }
                                          >
                                            Projects
                                          </button>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })
                            ) : (
                              <tr>
                                <td colSpan="11" className="text-center py-4">
                                  No interns found matching your criteria
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {!loading && totalPages > 0 && (
                      <div className="card-footer">
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
            </section>

            <AssignShift values={shiftData} />
            <AssignProject id={intId} />
            <AssignTask id={intId} />
            <AttendanceReport values={attendVal} />
            <ProjectReport values={projVal} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SupervisorInterns;