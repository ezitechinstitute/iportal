import React, { useEffect, useRef, useState } from "react";
import { ManagerTopbar } from "../components/ManagerTopbar";
// import ReactDOM from 'react-dom';
import { ManagerSidebar } from "../components/ManagerSidebar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
// import { Editor, EditorState } from "draft-js";
// import "draft-js/dist/Draft.css";

export const InternCompleted = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const check = sessionStorage.getItem("isLoggedIn");
  const userEmail = sessionStorage.getItem("email");

  useEffect(() => {
    if (!check) {
      navigate("/");
    }
  });

  const getTestComplete = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8800/get-test-complete/${userEmail}`
      );
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTestComplete();
  }, [getTestComplete]);

  const [currentPage, settCurrentPage] = useState(1);
  const recordPerPage = 15;
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const records = data.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(data.length / recordPerPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);

  function prevPage() {
    if (currentPage !== firstIndex) {
      settCurrentPage(currentPage - 1);
    }
  }

  function changeCurrentPage(id) {
    settCurrentPage(id);
  }

  function nextPage() {
    if (currentPage !== nPage) {
      settCurrentPage(currentPage + 1);
    }
  }

  // const handleInput = (e) => {
  //   setValues({ ...values, [e.target.name]: e.target.value });
  // };

  // const SubmitProject = (e) => {
  //   e.preventDefault();

  //   if (
  //     values.title !== undefined &&
  //     values.startDate !== undefined &&
  //     values.endDate !== undefined &&
  //     values.supervisor &&
  //     values.email !== undefined &&
  //     values.technology !== undefined
  //   ) {
  //     axios
  //       .post("http://localhost:8800/assign-project", { values })
  //       .then((res) => {
  //         if (res.data === 1) {
  //           alert("Project Assigned Successfuly");
  //           window.location.reload();
  //         } else {
  //           alert("Something Went Wrong!!!");
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   } else {
  //     alert("Please fill empty field first!!!");
  //   }
  // };

  const RemoveCompletedIntern = (email) => {
    axios
      .post("http://localhost:8800/remove-completed", { email })
      .then((res) => {
        if (res.data.status) {
          alert(res.data.msg);
        } else {
          alert("Something Went Wrong!!!");
        }
      });
  };

  const ActivePortal = (email) => {
    axios.post("http://localhost:8800/active-portal", { email }).then((res) => {
      if (res.data === 1) {
        alert("Portal Activated");
      } else {
        alert("Something Went Wrong!!!");
      }
    });
  };

  return (
    <>
      <ManagerTopbar />
      <ManagerSidebar />
      <div className="app-content content ">
        <div className="content-overlay"></div>
        <div className="header-navbar-shadow"></div>
        <div className="content-wrapper">
          <div className="content-header row"></div>
          <div className="content-body">
            <section id="dashboard-ecommerce">
              {/* <!-- Statistics Card --> */}
              <div className="col-12">
                <div className="card card-statistics">
                  <div className="card-header">
                    <h4 className="card-title">Oniste Interns Statistics</h4>
                    <div className="d-flex align-items-center">
                      <p className="card-text font-small-2 mr-25 mb-0">
                        Updated 1 month ago
                      </p>
                    </div>
                  </div>
                  <div className="card-body statistics-body">
                    <div className="row">
                      <div className="col-xl-3 col-sm-6 col-12 mb-2 mb-xl-0">
                        <div className="media">
                          <div className="avatar bg-light-primary mr-2">
                            <div className="avatar-content">
                              <i
                                data-feather="users"
                                className="avatar-icon"
                              ></i>
                            </div>
                          </div>
                          <div className="media-body my-auto">
                            <h4 className="font-weight-bolder mb-0">230k</h4>
                            <p className="card-text font-small-3 mb-0">
                              Interns
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-3 col-sm-6 col-12 mb-2 mb-xl-0">
                        <div className="media">
                          <div className="avatar bg-light-info mr-2">
                            <div className="avatar-content">
                              <i
                                data-feather="clipboard"
                                className="avatar-icon"
                              ></i>
                            </div>
                          </div>
                          <div className="media-body my-auto">
                            <h4 className="font-weight-bolder mb-0">8.549k</h4>
                            <p className="card-text font-small-3 mb-0">Test</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-3 col-sm-6 col-12 mb-2 mb-sm-0">
                        <div className="media">
                          <div className="avatar bg-light-danger mr-2">
                            <div className="avatar-content">
                              <i
                                data-feather="loader"
                                className="avatar-icon"
                              ></i>
                            </div>
                          </div>
                          <div className="media-body my-auto">
                            <h4 className="font-weight-bolder mb-0">1.423k</h4>
                            <p className="card-text font-small-3 mb-0">
                              Progress
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-3 col-sm-6 col-12">
                        <div className="media">
                          <div className="avatar bg-light-success mr-2">
                            <div className="avatar-content">
                              <i
                                data-feather="check-square"
                                className="avatar-icon"
                              ></i>
                            </div>
                          </div>
                          <div className="media-body my-auto">
                            <h4 className="font-weight-bolder mb-0">$9745</h4>
                            <p className="card-text font-small-3 mb-0">
                              Completed
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!--/ Statistics Card --> */}

              {/* <!-- Table Hover Animation start --> */}
              <div className="row" id="table-hover-animation">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title">Test Completed</h4>
                      {/* <!-- Button trigger modal --> */}
                      {/* <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                      >
                        Add Intern
                      </button> */}
                    </div>

                    <div class="card-body overflow-x-scroll">
                      <table class="table">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Contact</th>
                            <th scope="col">Technology</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Array.isArray(data)
                            ? data.map((rs) => {
                                const { id, name, email, phone, technology } =
                                  rs;

                                return (
                                  <>
                                    <tr>
                                      <th scope="row">{id}</th>
                                      <td>{name}</td>
                                      <td>{email}</td>
                                      <td>{phone}</td>
                                      <td>{technology}</td>

                                      <td>
                                        <div class="dropdown">
                                          <button
                                            type="button"
                                            class="btn btn-warning dropdown-toggle"
                                            data-toggle="dropdown"
                                          >
                                            Action
                                            {/* <i data-feather="more-vertical"></i> */}
                                          </button>
                                          <div>
                                            <ul class="dropdown-menu">
                                              {/* <li>
                                              <a class="dropdown-item" href="#">
                                                Send Mail
                                              </a>
                                            </li> */}
                                              <li>
                                                <a
                                                  class="dropdown-item"
                                                  href="#"
                                                  type="button"
                                                  onClick={() =>
                                                    ActivePortal(email)
                                                  }
                                                >
                                                  Active Portal
                                                </a>
                                              </li>
                                              <li>
                                                <a
                                                  class="dropdown-item"
                                                  href="#"
                                                  type="button"
                                                  onClick={() =>
                                                    RemoveCompletedIntern(email)
                                                  }
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
                            : " "}
                        </tbody>
                      </table>
                    </div>
                    <br />
                    {/* Pagination */}
                    <div>
                      {/* <nav> */}
                      <ul className="pagination">
                        <li className="page-item">
                          <a href="#" className="page-link" onClick={prevPage}>
                            Prev
                          </a>
                        </li>
                        {/* {numbers.map((n, i) => (
                          <li
                            className={`page-item ${
                              currentPage === n ? "active" : "   "
                            }`}
                            key={i}
                          >
                            <a
                              href="#"
                              className="page-link"
                              onClick={changeCurrentPage}
                            >
                              {n}
                            </a>
                          </li>
                        ))} */}
                        <li className="page-item">
                          <a href="#" className="page-link" onClick={nextPage}>
                            Next
                          </a>
                        </li>
                      </ul>
                      {/* </nav> */}
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
