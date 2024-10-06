import React, { useEffect, useState } from "react";
import { SupervisorTopbar } from "../components/SupervisorTopbar";
import { SupervisorSidebar } from "../components/SupervisorSidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Pagination } from "../../components/Pagination";
import { TaskDetails } from "../components/TaskDetails";

const InternTasks = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(sessionStorage.getItem("token"));
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

  const GetTasks = async (page) => {
    // setLoader(true);
    await axios
      .get(`https://api.ezitech.org/get-sup-tasks/${supid}`, {
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
        // setLoader(false);
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
    settCurrentPage(page);
  };

  useEffect(() => {
    // console.log(data);
    // setInterval(() => {
    GetTasks(currentPage);
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
                    <h4 className="card-title">Intern Tasks</h4>
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
                                  <th>ETI_ID</th>
                                  <th>Name</th>
                                  <th>Task No</th>
                                  <th>Task Title</th>
                                  <th>Project Title</th>
                                  <th>Technology</th>
                                  <th>Start Date</th>
                                  <th>Duration</th>
                                  <th>Days</th>
                                  <th>Status</th>
                                  <th>Action</th>
                                </tr>
                              </thead>

                              <tbody>
                                {Array.isArray(filteredData)
                                  ? filteredData.map((rs) => {
                                      const {
                                        eti_id,
                                        project_id,
                                        name,
                                        task_no,
                                        task_title,
                                        title,
                                        int_technology,
                                        t_start_date,
                                        task_duration,
                                        task_days,
                                        task_status,
                                      } = rs;

                                      const date = new Date(
                                        t_start_date
                                      ).toLocaleDateString();

                                      return (
                                        <>
                                          <tr>
                                            <td>
                                              <strong>{eti_id}</strong>
                                            </td>
                                            <td>{name}</td>
                                            <td>{task_no}</td>
                                            <td>{task_title}</td>
                                            <td>{title}</td>
                                            <td>{int_technology}</td>
                                            <td>{date}</td>
                                            <td>{task_duration}</td>
                                            <td>{task_days}</td>

                                            <td>
                                              {task_status === "Ongoing" ? (
                                                <>
                                                  <span className="badge badge-pill badge-glow badge-primary">
                                                    {task_status}
                                                  </span>
                                                </>
                                              ) : task_status ===
                                                "Completed" ? (
                                                <>
                                                  <span className="badge badge-pill badge-glow badge-success">
                                                    {task_status}
                                                  </span>
                                                </>
                                              ) : task_status === "Expired" ? (
                                                <>
                                                  <span className="badge badge-pill badge-glow badge-danger">
                                                    {task_status}
                                                  </span>
                                                </>
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
                                                    data-toggle="modal"
                                                    data-target="#xlarge"
                                                    onClick={() =>
                                                      setTaskData({
                                                        etiId: eti_id,
                                                        projectId: project_id,
                                                        taskNo: task_no,
                                                      })
                                                    }
                                                  >
                                                    Task Details
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
                                  : ""}
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

          {/* Task Details */}
          <TaskDetails values={taskData} />
        </div>
      </div>
    </>
  );
};

export default InternTasks;
