import React, { useEffect, useState } from "react";
import { SupervisorTopbar } from "../components/SupervisorTopbar";
import { SupervisorSidebar } from "../components/SupervisorSidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Pagination } from "../../components/Pagination";

const SupervisorLeave = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  // headers: { "x-access-token": token }
  const check = sessionStorage.getItem("isLoggedIn");
  const supid = sessionStorage.getItem("managerid");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination
  const [currentPage, settCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [dataLimit, setDataLimit] = useState(50);

  const [taskData, setTaskData] = useState({
    etiId: null,
    taskNo: null,
    projectId: null,
  });

  useEffect(() => {
    if (!check) {
      navigate("/supervisor");
    }
  });

  const GetInternLeaves = async (page) => {
    // setLoader(true);
    await axios
      .get(`https://api.ezitech.org/get-intern-leaves/${supid}`, {
        params: {
          page: page,
          limit: dataLimit,
        },
        headers: { "x-access-token": token },
      })
      .then((res) => {
        setData(res.data.data);
        setFilteredData(data);
        settCurrentPage(res.data.meta.page);
        setTotalPages(res.data.meta.totalPages);
        // setLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // useEffect(() => {
  //   const filter = data.filter((item) =>
  //     item.leave_status.toLowerCase().includes(searchTerm.toLowerCase())
  //   );

  //   setFilteredData(filter);
  // }, [searchTerm, data]);

  const handlePageChange = (page) => {
    settCurrentPage(page);
  };

  useEffect(() => {
    // console.log(data);
    // setInterval(() => {
    GetInternLeaves(currentPage);
    // }, 2000);
  }, [currentPage, dataLimit]);

  const ApproveLeave = async (id) => {
    await axios
      .put(`http://localhost:8800/approve-int-leave/${id}`)
      .then((res) => {
        alert(res.data.msg);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const RejectLeave = async (id) => {
    await axios
      .put(`http://localhost:8800/reject-int-leave/${id}`)
      .then((res) => {
        alert(res.data.msg);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <SupervisorTopbar />
      <SupervisorSidebar />

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
                      <h4 className="card-title">Leave</h4>

                      <div class="ag-btns d-flex flex-wrap">
                        {/* <input
                        type="text"
                        class="ag-grid-filter form-control w-50 mr-1 mb-1 mb-sm-0 btn1"
                        id="filter-text-box"
                        placeholder="Search...."
                      /> */}
                        <label htmlFor="" style={{ marginTop: "8px" }}>
                          Select Rows
                        </label>
                        &nbsp;
                        <select
                          className="form-control w-25"
                          name=""
                          id=""
                          onChange={(e) => setDataLimit(e.target.value)}
                        >
                          <option value={50}>50</option>
                          <option value={100}>100</option>
                          <option value={200}>200</option>
                          <option value={300}>300</option>
                          <option value={500}>500</option>
                        </select>
                        &nbsp; &nbsp;
                        <label htmlFor="" style={{ marginTop: "8px" }}>
                          By Status
                        </label>
                        &nbsp;
                        <select
                          name="pStatus"
                          id=""
                          className="ag-grid-filter form-control w-25"
                          onChange={(e) => setSearchTerm(e.target.value)}
                        >
                          <option selected disabled>
                            All
                          </option>
                          <option value={null}>Pending</option>
                          <option value={0}>Rejected</option>
                          <option value={1}>Approved</option>
                        </select>
                      </div>
                    </div>

                    <section id="complex-header-datatable">
                      <div class="row">
                        <div class="col-12">
                          <div class="card">
                            <div class="card-datatable">
                              <table class="dt-complex-header table table-bordered table-responsive text-center">
                                <thead>
                                  <tr>
                                    <th>ETI_ID</th>
                                    <th>Name</th>
                                    <th>From-Date</th>
                                    <th>To-Date</th>
                                    <th class="cell-fit">Reason</th>
                                    <th>Days</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {Array.isArray(data)
                                    ? data.map((rs) => {
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

                                        const fromDate = new Date(
                                          from_date
                                        ).toLocaleDateString();
                                        const toDate = new Date(
                                          to_date
                                        ).toLocaleDateString();

                                        return (
                                          <>
                                            <tr>
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
                                                <div class="btn-group">
                                                  <button
                                                    class="btn btn-warning dropdown-toggle"
                                                    type="button"
                                                    id="dropdownMenuButton5"
                                                    data-toggle="dropdown"
                                                    aria-haspopup="true"
                                                    aria-expanded="false"
                                                  >
                                                    Action
                                                  </button>
                                                  <div
                                                    class="dropdown-menu"
                                                    aria-labelledby="dropdownMenuButton5"
                                                  >
                                                    <a
                                                      type="button"
                                                      class="dropdown-item"
                                                      href="javascript:void(0);"
                                                      onClick={() =>
                                                        ApproveLeave(leave_id)
                                                      }
                                                    >
                                                      Approve
                                                    </a>
                                                    <a
                                                      type="button"
                                                      class="dropdown-item"
                                                      href="javascript:void(0);"
                                                      onClick={() =>
                                                        RejectLeave(leave_id)
                                                      }
                                                    >
                                                      Reject
                                                    </a>
                                                  </div>
                                                </div>
                                              </td>
                                            </tr>
                                          </>
                                        );
                                      })
                                    : ""}
                                  <tr></tr>
                                </tbody>
                              </table>
                            </div>
                            <br />
                            {/* Pagination */}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default SupervisorLeave;
