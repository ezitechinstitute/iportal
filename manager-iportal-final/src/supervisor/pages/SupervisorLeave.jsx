import React, { useEffect, useState } from "react";
import { SupervisorTopbar } from "../components/SupervisorTopbar";
import { SupervisorSidebar } from "../components/SupervisorSidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Pagination } from "../../components/Pagination";

const SupervisorLeave = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const check = sessionStorage.getItem("isLoggedIn");
  const supid = sessionStorage.getItem("managerid");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [dataLimit, setDataLimit] = useState(50);

  useEffect(() => {
    if (!check) {
      navigate("/supervisor");
    }
  }, [check, navigate]);

  const GetInternLeaves = async (page) => {
    try {
      const response = await axios.get(
        `https://api.ezitech.org/get-intern-leaves/${supid}`,
        {
          params: {
            page: page,
            limit: dataLimit,
          },
          headers: { "x-access-token": token },
        }
      );
      
      console.log(response.data); // Debugging
      setData(response.data.data || response.data);
      setFilteredData(response.data.data || response.data);
      
      if (response.data.meta) {
        setCurrentPage(response.data.meta.page || 1);
        setTotalPages(response.data.meta.totalPages || 1);
      }
    } catch (err) {
      console.error(err);
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
          if (statusFilter === "Pending") {
            return item.leave_status === null;
          } else if (statusFilter === "Approved") {
            return item.leave_status === 1;
          } else if (statusFilter === "Rejected") {
            return item.leave_status === 0;
          }
          return true;
        })
      );
    }
  }, [statusFilter, data]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    GetInternLeaves(currentPage);
  }, [currentPage, dataLimit]);

  const ApproveLeave = async (id) => {
    try {
      const res = await axios.put(
        `https://api.ezitech.org/approve-int-leave/${id}`,
        {},
        { headers: { "x-access-token": token } }
      );
      alert(res.data.msg || "Leave approved successfully");
      GetInternLeaves(currentPage);
    } catch (err) {
      console.error(err);
      alert("Error approving leave: " + (err.response?.data?.error || err.message));
    }
  };
  
  const RejectLeave = async (id) => {
    try {
      const res = await axios.put(
        `https://api.ezitech.org/reject-int-leave/${id}`,
        {},
        { headers: { "x-access-token": token } }
      );
      alert(res.data.msg || "Leave rejected successfully");
      GetInternLeaves(currentPage);
    } catch (err) {
      console.error(err);
      alert("Error rejecting leave: " + (err.response?.data?.error || err.message));
    }
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
            <section id="dashboard-ecommerce">
              <div className="row" id="table-hover-animation">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center flex-wrap">
                      <h4 className="card-title mb-2 mb-md-0">Intern Leaves</h4>

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
                              statusFilter === "Pending" ? "btn-info" : "btn-outline-info"
                            }`}
                            onClick={() => setStatusFilter("Pending")}
                          >
                            Pending
                          </button>
                          <button
                            className={`btn ${
                              statusFilter === "Approved" ? "btn-info" : "btn-outline-info"
                            }`}
                            onClick={() => setStatusFilter("Approved")}
                          >
                            Approved
                          </button>
                          <button
                            className={`btn ${
                              statusFilter === "Rejected" ? "btn-info" : "btn-outline-info"
                            }`}
                            onClick={() => setStatusFilter("Rejected")}
                          >
                            Rejected
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="card-content">
                      <div className="card-body">
                        <div className="table-responsive">
                          <table className="table table-bordered table-hover text-center">
                            <thead>
                              <tr>
                                <th>ETI_ID</th>
                                <th>Name</th>
                                <th>From-Date</th>
                                <th>To-Date</th>
                                <th className="cell-fit">Reason</th>
                                <th>Days</th>
                                <th>Status</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredData.length > 0 ? (
                                filteredData.map((rs) => {
                                  const {
                                    leave_id,
                                    eti_id,
                                    name,
                                    from_date,
                                    to_date,
                                    reason,
                                    days,
                                    leave_status,
                                  } = rs;

                                  const fromDate = from_date
                                    ? new Date(from_date).toLocaleDateString()
                                    : "N/A";
                                  const toDate = to_date
                                    ? new Date(to_date).toLocaleDateString()
                                    : "N/A";

                                  return (
                                    <tr key={leave_id}>
                                      <td>
                                        <strong>{eti_id}</strong>
                                      </td>
                                      <td>{name}</td>
                                      <td>{fromDate}</td>
                                      <td>{toDate}</td>
                                      <td>{reason}</td>
                                      <td>{days}</td>
                                      <td>
                                        {leave_status === null ? (
                                          <span className="badge badge-pill badge-glow badge-primary">
                                            Pending
                                          </span>
                                        ) : leave_status === 0 ? (
                                          <span className="badge badge-pill badge-glow badge-danger">
                                            Rejected
                                          </span>
                                        ) : leave_status === 1 ? (
                                          <span className="badge badge-pill badge-glow badge-success">
                                            Approved
                                          </span>
                                        ) : (
                                          ""
                                        )}
                                      </td>
                                      <td>
                                        <div className="btn-group">
                                          <button
                                            className="btn btn-warning dropdown-toggle"
                                            type="button"
                                            id="dropdownMenuButton5"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                          >
                                            Action
                                          </button>
                                          <div
                                            className="dropdown-menu"
                                            aria-labelledby="dropdownMenuButton5"
                                          >
                                            <a
                                              type="button"
                                              className="dropdown-item"
                                              href="javascript:void(0);"
                                              onClick={() => ApproveLeave(leave_id)}
                                            >
                                              Approve
                                            </a>
                                            <a
                                              type="button"
                                              className="dropdown-item"
                                              href="javascript:void(0);"
                                              onClick={() => RejectLeave(leave_id)}
                                            >
                                              Reject
                                            </a>
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })
                              ) : (
                                <tr>
                                  <td colSpan="8" className="text-center py-4">
                                    No leaves found matching your criteria
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
          </div>
        </div>
      </div>
    </>
  );
};

export default SupervisorLeave;