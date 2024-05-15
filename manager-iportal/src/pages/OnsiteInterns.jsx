import React, { useEffect, useState } from "react";
import { ManagerTopbar } from "../components/ManagerTopbar";
import { ManagerSidebar } from "../components/ManagerSidebar";
import axios from "axios";

export const OnsiteInterns = () => {
  const [data, setData] = useState([]);
  const [singleIntern, setSingleIntern] = useState([]);

  const GetOnsiteInterns = async () => {
    try {
      const res = await axios.get("http://localhost:8800/get-manager-onsite");
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetOnsiteInterns();
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

  const GetSingleIntern = async (id) => {
    alert(id);
    try {
      const res = await axios.post("http://localhost:8800/single-onsite", {
        id,
      });
      setSingleIntern(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // let dataOnsite = singleIntern.forEach((item) => {
  //   return item
  // });

  // console.log(dataOnsite);

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
                      <h4 className="card-title">Onsite Interns</h4>
                      {/* <!-- Button trigger modal --> */}
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                      >
                        Add Intern
                      </button>
                    </div>

                    <div className="table-responsive text-center">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Avatar</th>
                            <th>Name</th>
                            {/* <th>CNIC</th> */}
                            <th>Duration</th>
                            <th>Technology</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Array.isArray(records)
                            ? records.map((res) => {
                                const {
                                  id,
                                  name,
                                  image,
                                  duration,
                                  technology,
                                  status,
                                } = res;

                                return (
                                  <>
                                    <tr>
                                      <td>EZI-I-31/03/24-1</td>
                                      <td>
                                        <div className="avatar-group">
                                          <div
                                            data-toggle="tooltip"
                                            data-popup="tooltip-custom"
                                            data-placement="top"
                                            title=""
                                            className="avatar pull-up my-0"
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
                                      {/* <td>{cnic}</td> */}
                                      <td>{duration}</td>
                                      <td>{technology}</td>
                                      <td>
                                        <span className="badge badge-pill badge-light-success mr-1">
                                          {status}
                                        </span>
                                      </td>
                                      <td>
                                        <div className="dropbottom">
                                          <button
                                            type="button"
                                            className="btn btn-warning arrow"
                                            data-toggle="dropdown"
                                          >
                                            {/* <i data-feather="more-vertical"></i> */}
                                            Action
                                          </button>

                                          <div className="dropdown-menu">
                                            <a
                                              className="dropdown-item"
                                              href="javascript:void(0);"
                                              type="button"
                                              data-toggle="modal"
                                              data-target="#exampleModalCenter"
                                              onClick={() =>
                                                GetSingleIntern(id)
                                              }
                                            >
                                              <i
                                                data-feather="eye"
                                                className="mr-50"
                                              ></i>
                                              <span>View</span>
                                            </a>

                                            <a
                                              className="dropdown-item"
                                              href="javascript:void(0);"
                                            >
                                              <i
                                                data-feather="edit-2"
                                                className="mr-50"
                                              ></i>
                                              <span>Edit</span>
                                            </a>
                                            <a
                                              className="dropdown-item"
                                              href="javascript:void(0);"
                                            >
                                              <i
                                                data-feather="trash"
                                                className="mr-50"
                                              ></i>
                                              <span>Delete</span>
                                            </a>

                                            <a
                                              className="dropdown-item"
                                              href="javascript:void(0);"
                                            >
                                              <i
                                                data-feather="trash"
                                                className="mr-50"
                                              ></i>
                                              <span>Ledger</span>
                                            </a>

                                            <a
                                              className="dropdown-item"
                                              href="javascript:void(0);"
                                            >
                                              <i
                                                data-feather="trash"
                                                className="mr-50"
                                              ></i>
                                              <span>Status</span>
                                            </a>

                                            <a
                                              className="dropdown-item"
                                              href="javascript:void(0);"
                                            >
                                              <i
                                                data-feather="trash"
                                                className="mr-50"
                                              ></i>
                                              <span>Create Post</span>
                                            </a>

                                            <a
                                              className="dropdown-item"
                                              href="javascript:void(0);"
                                            >
                                              <i
                                                data-feather="trash"
                                                className="mr-50"
                                              ></i>
                                              <span>
                                                Print Intern Certificate
                                              </span>
                                            </a>

                                            <a
                                              className="dropdown-item"
                                              href="javascript:void(0);"
                                            >
                                              <i
                                                data-feather="trash"
                                                className="mr-50"
                                              ></i>
                                              <span>
                                                Print Course Certificate
                                              </span>
                                            </a>

                                            {/* <a
                                              className="dropdown-item"
                                              href="javascript:void(0);"
                                            >
                                              <i
                                                data-feather="trash"
                                                className="mr-50"
                                              ></i>
                                              <span>Report</span>
                                            </a> */}
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                    {/* <div className="mt-1"></div> */}
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

              <div
                class="modal fade"
                id="exampleModalCenter"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalCenterTitle">
                        Intern Details
                      </h5>
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
                      <table className="table">
                        <thead>
                          <tr>
                            <th></th>
                          </tr>
                        </thead>

                      </table>
                      {singleIntern.map((res) => {
                        const {image, name, email, phone, cnic, join_date, birth_date, university, degree, technology, duration, internship_type} = res;

                        return(
                          <>
                          
                          </>
                        )
})}
                    </div>
                    {/* <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-primary"
                        data-dismiss="modal"
                      >
                        Accept
                      </button>
                    </div> */}
                  </div>
                </div>
              </div>

              {/* <!-- Table head options end --> */}

              {/* <!-- Modal to add new record --> */}
              {/* <div className="modal modal-slide-in fade" id="exampleModal">
                <div className="modal-dialog sidebar-sm">
                  <form className="add-new-record modal-content pt-0">
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      ×
                    </button>
                    <div className="modal-header mb-1">
                      <h5 className="modal-title" id="exampleModalLabel">
                        New Record
                      </h5>
                    </div>
                    <div className="modal-body flex-grow-1">
                      <div className="form-group">
                        <label
                          className="form-label"
                          for="basic-icon-default-fullname"
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          className="form-control dt-full-name"
                          id="basic-icon-default-fullname"
                          placeholder="John Doe"
                          aria-label="John Doe"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" for="basic-icon-default-post">
                          Post
                        </label>
                        <input
                          type="text"
                          id="basic-icon-default-post"
                          className="form-control dt-post"
                          placeholder="Web Developer"
                          aria-label="Web Developer"
                        />
                      </div>
                      <div className="form-group">
                        <label
                          className="form-label"
                          for="basic-icon-default-email"
                        >
                          Email
                        </label>
                        <input
                          type="text"
                          id="basic-icon-default-email"
                          className="form-control dt-email"
                          placeholder="john.doe@example.com"
                          aria-label="john.doe@example.com"
                        />
                        <small className="form-text text-muted">
                          {" "}
                          You can use letters, numbers & periods{" "}
                        </small>
                      </div>
                      <div className="form-group">
                        <label className="form-label" for="basic-icon-default-date">
                          Joining Date
                        </label>
                        <input
                          type="text"
                          className="form-control dt-date"
                          id="basic-icon-default-date"
                          placeholder="MM/DD/YYYY"
                          aria-label="MM/DD/YYYY"
                        />
                      </div>
                      <div className="form-group mb-4">
                        <label
                          className="form-label"
                          for="basic-icon-default-salary"
                        >
                          Salary
                        </label>
                        <input
                          type="text"
                          id="basic-icon-default-salary"
                          className="form-control dt-salary"
                          placeholder="$12000"
                          aria-label="$12000"
                        />
                      </div>
                      <button
                        type="button"
                        className="btn btn-primary data-submit mr-1"
                      >
                        Submit
                      </button>
                      <button
                        type="reset"
                        className="btn btn-outline-secondary"
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
