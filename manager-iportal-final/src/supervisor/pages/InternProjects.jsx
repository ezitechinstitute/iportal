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
  const [searchTerm, setSearchTerm] = useState("");
  const [loader, setLoader] = useState(false);

  // Pagination
  const [currentPage, settCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [dataLimit, setDataLimit] = useState(50);

  useEffect(() => {
    if (!check) {
      navigate("/supervisor");
    }
  });

  const GetProjects = async (page) => {
    // setLoader(true);
    await axios
      .get(`https://api.ezitech.org/get-sup-projects/${supid}`, {
        params: {
          page: page,
          limit: dataLimit,
        },
        headers: { "x-access-token": token },
      })
      .then((res) => {
        setData(res.data);
        setFilteredData(data);
        settCurrentPage(res.data.meta.page);
        setTotalPages(res.data.meta.totalPages);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const filter = data.filter((item) =>
      item.pstatus.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredData(filter);
  }, [searchTerm, data]);

  const handlePageChange = (page) => {
    settCurrentPage(page);
  };

  useEffect(() => {
    // console.log(data);
    // setInterval(() => {
    GetProjects(currentPage);
    // }, 2000);
  }, [currentPage, dataLimit]);
  return (
    <>
      <SupervisorTopbar />
      <SupervisorSidebar />

      <div className="app-content content ">
        <div className="content-overlay"></div>
        <div className="header-navbar-shadow"></div>
        <div className="content-wrapper">
          <div className="content-header row"></div>
          <div className="content-body"></div>

          <section id="dashboard-ecommerce">
            <div className="row" id="table-hover-animation">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Projects</h4>

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
                        Show By Status
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
                        <option value="Ongoing">Ongoing</option>
                        <option value="Expired">Expired</option>
                        <option value="Completed">Completed</option>
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
                                  <th>ETI-ID</th>
                                  <th>Name</th>
                                  <th>Title</th>
                                  <th>Technology</th>
                                  <th>Start Date</th>
                                  <th>Duration</th>
                                  <th>Days</th>
                                  <th>Status</th>
                                  <th>Tasks</th>
                                  <th>Action</th>
                                </tr>
                              </thead>

                              <tbody>
                                {loader ? (
                                  <>
                                    <h3>Loading...</h3>
                                  </>
                                ) : Array.isArray(filteredData) ? (
                                  filteredData.map((rs) => {
                                    const {
                                      eti_id,
                                      name,
                                      title,
                                      int_technology,
                                      start_date,
                                      duration,
                                      days,
                                      pstatus,
                                    } = rs;

                                    return (
                                      <>
                                        <tr>
                                          <td>
                                            <strong>{eti_id}</strong>
                                          </td>
                                          <td>{name}</td>
                                          <td>{title}</td>
                                          <td>{int_technology}</td>
                                          <td>{start_date}</td>
                                          <td>{duration}</td>
                                          <td>{days}</td>

                                          <td>
                                            {pstatus === "Ongoing" ? (
                                              <>
                                                <span className="badge badge-pill badge-glow badge-primary">
                                                  {pstatus}
                                                </span>
                                              </>
                                            ) : pstatus === "Completed" ? (
                                              <>
                                                <span className="badge badge-pill badge-glow badge-success">
                                                  {pstatus}
                                                </span>
                                              </>
                                            ) : pstatus === "Expired" ? (
                                              <>
                                                <span className="badge badge-pill badge-glow badge-danger">
                                                  {pstatus}
                                                </span>
                                              </>
                                            ) : (
                                              ""
                                            )}
                                          </td>
                                          <td>1</td>
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
                                                  class="dropdown-item"
                                                  href="javascript:void(0);"
                                                >
                                                  Edit
                                                </a>
                                                <a
                                                  class="dropdown-item"
                                                  href="javascript:void(0);"
                                                >
                                                  Freeze
                                                </a>
                                              </div>
                                            </div>
                                          </td>
                                        </tr>
                                      </>
                                    );
                                  })
                                ) : (
                                  ""
                                )}
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

                  <div
                    class="modal fade text-left"
                    id="large"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="myModalLabel17"
                    aria-hidden="true"
                  >
                    <div
                      class="modal-dialog modal-dialog-centered modal-lg"
                      role="document"
                    >
                      <div class="modal-content">
                        <div class="modal-header">
                          <h4 class="modal-title" id="myModalLabel17">
                            Add Project
                          </h4>
                          <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                          <div class="card-body">
                            <div class="row">
                              <div class=" col-lg-12 col-md-12 col-12">
                                <div class="card-body">
                                  <form class="form form-horizontal d-flex">
                                    <div class="row ">
                                      <div class="col-6">
                                        <div class="form-group row">
                                          <div class="col-sm-3 col-form-label">
                                            <label for="Project-name">
                                              Name
                                            </label>
                                          </div>
                                          <div class="col-sm-9">
                                            <input
                                              type="text"
                                              id="Project-name"
                                              class="form-control"
                                              name="Pname"
                                              placeholder="Project Name"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div class="col-6">
                                        <div class="form-group row">
                                          <div class="col-sm-3 col-form-label">
                                            <label for="Technology">
                                              Technology
                                            </label>
                                          </div>
                                          <div class="col-sm-9">
                                            <input
                                              type="Technology"
                                              id="Technology"
                                              class="form-control"
                                              name="Technology"
                                              placeholder="Technology"
                                            />
                                          </div>
                                        </div>
                                      </div>

                                      <div class="col-6">
                                        <div class="form-group row">
                                          <div class="col-sm-3 col-form-label">
                                            <label for="email-id">Staff</label>
                                          </div>

                                          <div class="form-group col-sm-9">
                                            <select
                                              class="form-control"
                                              id="basicSelect"
                                            >
                                              <option>Select Staff</option>
                                              <option>Blade Runner</option>
                                              <option>Thor Ragnarok</option>
                                            </select>
                                          </div>
                                        </div>
                                      </div>

                                      <div class="col-6">
                                        <div class="form-group row">
                                          <div class="col-sm-3 col-form-label">
                                            <label for="Module">Module</label>
                                          </div>
                                          <div class="col-sm-9">
                                            <input
                                              type="Module"
                                              id="Module"
                                              class="form-control"
                                              name="Module"
                                              placeholder="Module"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div class="col-6">
                                        <div class="form-group row">
                                          <div
                                            class="col-sm-3 col-form-label"
                                            id="date"
                                          >
                                            <label for="first-name">
                                              Start Date
                                            </label>
                                          </div>
                                          <div class="col-sm-9">
                                            <input
                                              type="date"
                                              id="first-name"
                                              class="form-control"
                                              name="fname"
                                              placeholder="First Name"
                                            />
                                          </div>
                                        </div>
                                      </div>

                                      <div class="col-6">
                                        <div class="form-group row">
                                          <div
                                            class="col-sm-3 col-form-label"
                                            id="date"
                                          >
                                            <label for="Duration">
                                              Duration
                                            </label>
                                          </div>
                                          <div class="col-sm-9">
                                            <input
                                              type="Duration"
                                              id="Duration"
                                              class="form-control"
                                              name="Duration"
                                              placeholder="Duration"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-primary"
                            data-dismiss="modal"
                          >
                            Add Field
                          </button>
                          <button
                            type="button"
                            class="btn btn-primary"
                            data-dismiss="modal"
                          >
                            submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default InternProjects;
