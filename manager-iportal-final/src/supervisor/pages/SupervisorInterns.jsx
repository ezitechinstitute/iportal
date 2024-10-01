import React, { useEffect, useState } from "react";
import "./Interns.css";
import { SupervisorTopbar } from "../components/SupervisorTopbar";
import { SupervisorSidebar } from "../components/SupervisorSidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Pagination } from "../../components/Pagination";

const SupervisorInterns = () => {
  const navigate = useNavigate();
  const check = sessionStorage.getItem("isLoggedIn");
  const managerid = sessionStorage.getItem("managerid");

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

  const GetInterns = async (page) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:8800/get-sup-interns/${managerid}`,
        {
          // headers: { "x-access-token": token },
          params: {
            page: page,
            limit: dataLimit,
          },
        }
      );
      setData(res.data.data);
      setFilteredData(res.data.data);
      settCurrentPage(res.data.meta.page);
      setTotalPages(res.data.meta.totalPages);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (page) => {
    settCurrentPage(page);
  };

  useEffect(() => {
    const filter = data.filter((item) =>
      item.intern_type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredData(filter);
    console.log(filteredData);
  }, [searchTerm, data]);

  useEffect(() => {
    GetInterns(currentPage);
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
                          <th>ETI-ID</th>
                          <th>Name</th>
                          <th>Image</th>
                          <th>Duration</th>
                          <th>Join</th>
                          <th>Technology</th>
                          <th>Attendence</th>
                          <th>Projects</th>
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
                              image,
                              duration,
                              join_date,
                              technology,
                              intern_type,
                              status,
                            } = rs;

                            return (
                              <>
                                <tr>
                                  <td>
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
                                  <td>{duration}</td>
                                  <td>{join_date}</td>
                                  <td>{technology}</td>
                                  <td>0/0</td>
                                  <td>0/0</td>
                                  <td>{intern_type}</td>
                                  <td>
                                    {status === "Active" ? (
                                      <>
                                        <span
                                          className="px-1 rounded"
                                          style={{
                                            backgroundColor: "limegreen",
                                            color: "white",
                                            fontWeight: "bold",
                                          }}
                                        >
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
                                              // onClick={() => ContactWith(email)}
                                            >
                                              Assign Project
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
        </div>
      </div>
    </>
  );
};

export default SupervisorInterns;
