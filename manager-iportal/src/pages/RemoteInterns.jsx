import axios from "axios";
import React, { useEffect, useState } from "react";
import { ManagerTopbar } from "../components/ManagerTopbar";
import { ManagerSidebar } from "../components/ManagerSidebar";

export const RemoteInterns = () => {
  const [data, setData] = useState([]);

  const GetRemoteInterns = async () => {
    try {
      const res = await axios.get("http://localhost:8800/get-manager-remote");
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetRemoteInterns();
  });

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
              <div class="col-12">
                <div class="card card-statistics">
                  <div class="card-header">
                    <h4 class="card-title">Oniste Interns Statistics</h4>
                    <div class="d-flex align-items-center">
                      <p class="card-text font-small-2 mr-25 mb-0">
                        Updated 1 month ago
                      </p>
                    </div>
                  </div>
                  <div class="card-body statistics-body">
                    <div class="row">
                      <div class="col-xl-3 col-sm-6 col-12 mb-2 mb-xl-0">
                        <div class="media">
                          <div class="avatar bg-light-primary mr-2">
                            <div class="avatar-content">
                              <i data-feather="users" class="avatar-icon"></i>
                            </div>
                          </div>
                          <div class="media-body my-auto">
                            <h4 class="font-weight-bolder mb-0">230k</h4>
                            <p class="card-text font-small-3 mb-0">Interns</p>
                          </div>
                        </div>
                      </div>
                      <div class="col-xl-3 col-sm-6 col-12 mb-2 mb-xl-0">
                        <div class="media">
                          <div class="avatar bg-light-info mr-2">
                            <div class="avatar-content">
                              <i
                                data-feather="clipboard"
                                class="avatar-icon"
                              ></i>
                            </div>
                          </div>
                          <div class="media-body my-auto">
                            <h4 class="font-weight-bolder mb-0">8.549k</h4>
                            <p class="card-text font-small-3 mb-0">Test</p>
                          </div>
                        </div>
                      </div>
                      <div class="col-xl-3 col-sm-6 col-12 mb-2 mb-sm-0">
                        <div class="media">
                          <div class="avatar bg-light-danger mr-2">
                            <div class="avatar-content">
                              <i data-feather="loader" class="avatar-icon"></i>
                            </div>
                          </div>
                          <div class="media-body my-auto">
                            <h4 class="font-weight-bolder mb-0">1.423k</h4>
                            <p class="card-text font-small-3 mb-0">Progress</p>
                          </div>
                        </div>
                      </div>
                      <div class="col-xl-3 col-sm-6 col-12">
                        <div class="media">
                          <div class="avatar bg-light-success mr-2">
                            <div class="avatar-content">
                              <i
                                data-feather="check-square"
                                class="avatar-icon"
                              ></i>
                            </div>
                          </div>
                          <div class="media-body my-auto">
                            <h4 class="font-weight-bolder mb-0">$9745</h4>
                            <p class="card-text font-small-3 mb-0">Completed</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!--/ Statistics Card --> */}

              {/* <!-- Table Hover Animation start --> */}
              <div class="row" id="table-hover-animation">
                <div class="col-12">
                  <div class="card">
                    <div class="card-header">
                      <h4 class="card-title">Onsite Interns</h4>
                      {/* <!-- Button trigger modal --> */}
                      <button
                        type="button"
                        class="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                      >
                        Add Intern
                      </button>

                      {/* <!-- Modal --> */}
                      {/* <div
                          class="modal fade"
                          id="staticBackdrop"
                          data-bs-backdrop="static"
                          data-bs-keyboard="false"
                          tabindex="-1"
                          aria-labelledby="staticBackdropLabel"
                          aria-hidden="true"
                        >
                          <div class="modal-dialog">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h1
                                  class="modal-title fs-5"
                                  id="staticBackdropLabel"
                                >
                                  Modal title
                                </h1>
                                <button
                                  type="button"
                                  class="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>
                              <div class="modal-body">...</div>
                              <div class="modal-footer">
                                <button
                                  type="button"
                                  class="btn btn-secondary"
                                  data-bs-dismiss="modal"
                                >
                                  Close
                                </button>
                                <button type="button" class="btn btn-primary">
                                  Understood
                                </button>
                              </div>
                            </div>
                          </div>
                        </div> */}
                    </div>

                    {/* <div class="card-body">
                        <p class="card-text">
                          Add <code>.table-hover-animation</code> to enable a
                          hover stat with animation on table rows within a
                          <code class="highlighter-rouge">&lt;tbody&gt;</code>.
                        </p>
                      </div> */}
                    <div class="table-responsive text-center">
                      <table class="table table-hover-animation">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Join</th>
                            <th>Duration</th>
                            <th>Technology</th>
                            <th>Hours</th>
                            <th>Projects</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Array.isArray(records)
                            ? records.map((res) => {
                                const {
                                  name,
                                  image,
                                  join_date,
                                  duration,
                                  technology,
                                  status,
                                } = res;

                                return (
                                  <>
                                    <tr>
                                      <td>EZI-I-31/03/24-1</td>
                                      <td>
                                        <div class="avatar-group">
                                          <div
                                            data-toggle="tooltip"
                                            data-popup="tooltip-custom"
                                            data-placement="top"
                                            title=""
                                            class="avatar pull-up my-0"
                                            data-original-title="Lilian Nenez"
                                          >
                                            <img
                                              src={image}
                                              alt="Avatar"
                                              height="30"
                                              width="30"
                                            />
                                          </div>
                                        </div>
                                      </td>
                                      <td>{name}</td>
                                      <td>{join_date}</td>
                                      <td>{duration}</td>
                                      <td>{technology}</td>
                                      <td>0/66</td>
                                      <td>0/6</td>

                                      <td>
                                        <span class="badge badge-pill badge-light-success mr-1">
                                          {status}
                                        </span>
                                      </td>
                                      <td>
                                        <div class="dropdown">
                                          <button
                                            type="button"
                                            class="btn btn-warning"
                                            data-toggle="dropdown"
                                          >
                                            {/* <i data-feather="more-vertical"></i> */}
                                            Action
                                          </button>
                                          <div class="dropdown-menu">
                                            <a
                                              class="dropdown-item"
                                              href="javascript:void(0);"
                                            >
                                              <i
                                                data-feather="edit-2"
                                                class="mr-50"
                                              ></i>
                                              <span>Edit</span>
                                            </a>
                                            <a
                                              class="dropdown-item"
                                              href="javascript:void(0);"
                                            >
                                              <i
                                                data-feather="trash"
                                                class="mr-50"
                                              ></i>
                                              <span>Delete</span>
                                            </a>
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                    <div className="mt-1"></div>
                                  </>
                                );
                              })
                            : " "}
                        </tbody>
                      </table>
                      {/* Pagination */}
                      <div className="p-2">
                        {/* <nav> */}
                        <ul className="pagination">
                          <li className="page-item">
                            <a
                              href="#"
                              className="page-link"
                              onClick={prevPage}
                            >
                              Prev
                            </a>
                          </li>
                          {numbers.map((n, i) => (
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
                          ))}
                          <li className="page-item">
                            <a
                              href="#"
                              className="page-link"
                              onClick={nextPage}
                            >
                              Next
                            </a>
                          </li>
                        </ul>
                        {/* </nav> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- Table head options end --> */}

              {/* <!-- Modal to add new record --> */}
              {/* <div class="modal modal-slide-in fade" id="exampleModal">
                  <div class="modal-dialog sidebar-sm">
                    <form class="add-new-record modal-content pt-0">
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        ×
                      </button>
                      <div class="modal-header mb-1">
                        <h5 class="modal-title" id="exampleModalLabel">
                          New Record
                        </h5>
                      </div>
                      <div class="modal-body flex-grow-1">
                        <div class="form-group">
                          <label
                            class="form-label"
                            for="basic-icon-default-fullname"
                          >
                            Full Name
                          </label>
                          <input
                            type="text"
                            class="form-control dt-full-name"
                            id="basic-icon-default-fullname"
                            placeholder="John Doe"
                            aria-label="John Doe"
                          />
                        </div>
                        <div class="form-group">
                          <label class="form-label" for="basic-icon-default-post">
                            Post
                          </label>
                          <input
                            type="text"
                            id="basic-icon-default-post"
                            class="form-control dt-post"
                            placeholder="Web Developer"
                            aria-label="Web Developer"
                          />
                        </div>
                        <div class="form-group">
                          <label
                            class="form-label"
                            for="basic-icon-default-email"
                          >
                            Email
                          </label>
                          <input
                            type="text"
                            id="basic-icon-default-email"
                            class="form-control dt-email"
                            placeholder="john.doe@example.com"
                            aria-label="john.doe@example.com"
                          />
                          <small class="form-text text-muted">
                            {" "}
                            You can use letters, numbers & periods{" "}
                          </small>
                        </div>
                        <div class="form-group">
                          <label class="form-label" for="basic-icon-default-date">
                            Joining Date
                          </label>
                          <input
                            type="text"
                            class="form-control dt-date"
                            id="basic-icon-default-date"
                            placeholder="MM/DD/YYYY"
                            aria-label="MM/DD/YYYY"
                          />
                        </div>
                        <div class="form-group mb-4">
                          <label
                            class="form-label"
                            for="basic-icon-default-salary"
                          >
                            Salary
                          </label>
                          <input
                            type="text"
                            id="basic-icon-default-salary"
                            class="form-control dt-salary"
                            placeholder="$12000"
                            aria-label="$12000"
                          />
                        </div>
                        <button
                          type="button"
                          class="btn btn-primary data-submit mr-1"
                        >
                          Submit
                        </button>
                        <button
                          type="reset"
                          class="btn btn-outline-secondary"
                          data-dismiss="modal"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div> */}
            </section>
          </div>
        </div>
      </div>
    </>
  );
};
