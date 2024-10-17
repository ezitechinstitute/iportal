import React, { useEffect, useState } from "react";
import "./Interns.css";
import { SupervisorTopbar } from "../components/SupervisorTopbar";
import { SupervisorSidebar } from "../components/SupervisorSidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Pagination } from "../../components/Pagination";
import { AttendanceReport } from "../components/AttendanceReport";
import { ProjectReport } from "../components/ProjectReport";
import { AssignProject } from "../components/AssignProject";
import { AssignShift } from "../components/AssignShift";

const SupervisorInterns = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(sessionStorage.getItem("token"));
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

  useEffect(() => {
    if (!check) {
      navigate("/supervisor");
    }
  });

  // Pagination
  const [currentPage, settCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [dataLimit, setDataLimit] = useState(50);
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const GetInterns = async (page) => {
    setLoading(true);
    await axios
      .get(`https://api.ezitech.org/get-sup-interns/${managerid}`, {
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
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePageChange = (page) => {
    settCurrentPage(page);
  };

  useEffect(() => {
    const filter = data.filter((item) =>
      item.intern_type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredData(filter);
  }, [searchTerm, data]);

  useEffect(() => {
    GetInterns(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <section id="complex-header-datatable">
            <div class="row">
              <div class="col-12">
                <div class="card">
                  <div class="card-header border-bottom">
                    <h2 class="card-title">Interns</h2>
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

                    <select
                      name="interView"
                      id=""
                      className="form-control w-25"
                      onChange={(e) => setSearchTerm(e.target.value)}
                    >
                      <option selected disabled>
                        --Select Remote/Onsite--
                      </option>
                      <option value="Remote">Remote</option>
                      <option value="Onsite">Onsite</option>
                    </select>
                  </div>
                  <div class="card-datatable">
                    <table class="dt-complex-header table table-bordered table-responsive text-center">
                      <thead>
                        <tr>
                          <th colSpan={2}>ETI-ID</th>
                          <th>Name</th>
                          <th>Image</th>
                          <th>Email</th>
                          <th>Duration</th>
                          <th>Join</th>
                          <th>Technology</th>
                          <th>Allow</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        {loading ? (
                          <>
                            <div className="text-center">
                              <h3>Loading...</h3>
                            </div>
                          </>
                        ) : Array.isArray(filteredData) ? (
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
                            let intMonth = 0;
                            if (duration === "1 Month") {
                              intMonth = 1;
                            } else if (duration === "2 Month") {
                              intMonth = 2;
                            } else if (duration === "3 Month") {
                              intMonth = 3;
                            } else if (duration === "6 Month") {
                              intMonth = 6;
                            }

                            return (
                              <>
                                <tr>
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
                                      <>
                                        <span className="badge badge-pill badge-glow badge-success">
                                          {status}
                                        </span>
                                      </>
                                    ) : (
                                      ""
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
                                        {/* <i data-feather="more-vertical"></i> */}
                                      </button>
                                      <div>
                                        <ul className="dropdown-menu">
                                          <li>
                                            <a
                                              className="dropdown-item"
                                              href="#"
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
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              className="dropdown-item"
                                              href="#"
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
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              className="dropdown-item"
                                              href="#"
                                              type="button"
                                              data-toggle="modal"
                                              data-target="#default"
                                              onClick={() =>
                                                setAttendVal({
                                                  join: join_date,
                                                  duration:
                                                    intMonth !== 0
                                                      ? intMonth
                                                      : "",
                                                  intEmail: email,
                                                })
                                              }
                                            >
                                              Attendance
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              className="dropdown-item"
                                              href="#"
                                              type="button"
                                              data-toggle="modal"
                                              data-target="#default1"
                                              onClick={() =>
                                                setProjVal({ intEmail: email })
                                              }
                                            >
                                              Projects
                                            </a>
                                          </li>
                                        </ul>
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

          <AssignShift values={shiftData} />
          <AssignProject id={intId} />
          <AttendanceReport values={attendVal} />
          <ProjectReport values={projVal} />
        </div>
      </div>
    </>
  );
};

export default SupervisorInterns;
