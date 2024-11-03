import React, { useEffect, useState } from "react";
import { ManagerTopbar } from "../components/ManagerTopbar";
import { ManagerSidebar } from "../components/ManagerSidebar";
import "./Intern.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { EditIntern } from "../components/EditIntern";
import { Pagination } from "../components/Pagination";

const Intern = () => {
  const navigate = useNavigate();
  const check = sessionStorage.getItem("isLoggedIn");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusTerm, setStatusTerm] = useState("");
  // Pagination
  const [currentPage, settCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [dataLimit, setDataLimit] = useState(200);

  const [internData, setInternData] = useState({
    email: null,
    technology: null,
    status: null,
  });

  if (!check) {
    navigate("/");
  }

  const GetData = async (page) => {
    setLoading(true);
    await axios
      .get("https://api.ezitech.org/get-all-interns", {
        params: {
          page: page,
          limit: dataLimit,
        },
      })
      .then((res) => {
        setData(res.data.data);
        setFilteredData(res.data.data);
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
      item.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filter);
  }, [searchTerm, data]);

  useEffect(() => {
    const filter = data.filter((item) =>
      item.status.toLowerCase().includes(statusTerm.toLowerCase())
    );
    setFilteredData(filter);
  }, [statusTerm, data]);

  useEffect(() => {
    GetData(currentPage);
  }, [currentPage]);

  return (
    <>
      <ManagerTopbar />
      <ManagerSidebar />
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

                    <div class="ag-btns d-flex flex-wrap">
                      <div
                        class="btn-export"
                        style={{
                          marginRight: "20px",
                        }}
                      >
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search..."
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />

                        <select
                          name="byStatus"
                          id=""
                          className="form-control"
                          onChange={(e) => setStatusTerm(e.target.value)}
                        >
                          <option selected disabled>
                            --Select--
                          </option>
                          <option value="Interview">Interview</option>
                          <option value="Contact">Contact</option>
                          <option value="Test">Test</option>
                          <option value="Completed">Completed</option>
                          <option value="Active">Active</option>
                          <option value="Removed">Removed</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="card-datatable">
                    <table class="dt-complex-header table table-bordered table-responsive text-center">
                      <thead>
                        <tr>
                          {/* <th>ETI-ID</th> */}
                          <th>#</th>
                          <th>AVATAR</th>
                          <th>NAME</th>
                          <th>EMAIL</th>
                          <th>DURATION</th>
                          <th>JOIN</th>
                          <th>TECH</th>
                          <th>STATUS</th>
                          <th>ALLOW</th>
                          <th>Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        {Array.isArray(filteredData)
                          ? filteredData.map((rs) => {
                              const {
                                id,
                                image,
                                name,
                                email,
                                duration,
                                join_date,
                                technology,
                                status,
                                intern_type,
                              } = rs;

                              return (
                                <>
                                  <tr>
                                    <td>
                                      <strong>{id}</strong>
                                    </td>
                                    <td>
                                      <img
                                        src={image}
                                        alt="avatar"
                                        width={50}
                                        height={50}
                                      />
                                    </td>
                                    <td>{name}</td>
                                    <td>{email}</td>
                                    <td>{duration}</td>
                                    <td>{join_date}</td>
                                    <td>{technology}</td>
                                    <td>
                                      {status === "Active" ? (
                                        <>
                                          <span className="badge badge-pill badge-glow badge-success">
                                            {status}
                                          </span>
                                        </>
                                      ) : status === "Interview" ? (
                                        <>
                                          <span className="badge badge-pill badge-glow badge-info">
                                            {status}
                                          </span>
                                        </>
                                      ) : status === "Contact" ? (
                                        <>
                                          <span className="badge badge-pill badge-glow badge-info">
                                            {status}
                                          </span>
                                        </>
                                      ) : status === "Test" ? (
                                        <>
                                          <span className="badge badge-pill badge-glow badge-info">
                                            {status}
                                          </span>
                                        </>
                                      ) : status === "Completed" ? (
                                        <>
                                          <span className="badge badge-pill badge-glow badge-info">
                                            Test {status}
                                          </span>
                                        </>
                                      ) : (
                                        ""
                                      )}
                                    </td>
                                    <td>{intern_type}</td>

                                    <td>
                                      <div className="dropdown">
                                        <button
                                          type="button"
                                          className="btn btn-warning dropdown-toggle"
                                          data-toggle="dropdown"
                                        >
                                          Action
                                        </button>
                                        <div>
                                          <ul className="dropdown-menu">
                                            <li>
                                              <a
                                                className="dropdown-item"
                                                href="#"
                                                type="button"
                                                data-toggle="modal"
                                                data-target="#default1"
                                                onClick={() =>
                                                  setInternData({
                                                    id: id,
                                                    email: email,
                                                    technology: technology,
                                                    status: status,
                                                  })
                                                }
                                              >
                                                Edit
                                              </a>
                                            </li>
                                            <li>
                                              <a
                                                className="dropdown-item"
                                                href="#"
                                                type="button"
                                                // onClick={() =>
                                                //   RemoveOnsite(email)
                                                // }
                                              >
                                                Remove
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

          {/* Edit Inter */}
          <EditIntern data={internData} />
        </div>
      </div>
    </>
  );
};

export default Intern;
