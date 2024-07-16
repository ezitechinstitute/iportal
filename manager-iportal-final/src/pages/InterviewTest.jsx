import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ManagerTopbar } from "../components/ManagerTopbar";
import { ManagerSidebar } from "../components/ManagerSidebar";

export const InterviewTest = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const check = sessionStorage.getItem("isLoggedIn");
  const userEmail = sessionStorage.getItem("email");

  useEffect(() => {
    if (!check) {
      navigate("/");
    }
  });

  const getTestIntern = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8800/get-test-interns/${userEmail}`
      );
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTestIntern();
  });

  const [currentPage, settCurrentPage] = useState(1);
  const recordPerPage = 50;
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

  // function changeCurrentPage(id) {
  //   settCurrentPage(id);
  // }

  function nextPage() {
    if (currentPage !== nPage) {
      settCurrentPage(currentPage + 1);
    }
  }

  const RemoveTestIntern = (email) => {
    axios.post("http://localhost:8800/remove-intern", { email }).then((res) => {
      if (res.data === 1) {
        alert("Removed Successfully");
      } else {
        alert("Something Went Wrong!!!");
      }
    });
  };
  return (
    <>
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
                              <h4 className="font-weight-bolder mb-0">
                                8.549k
                              </h4>
                              <p className="card-text font-small-3 mb-0">
                                Test
                              </p>
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
                              <h4 className="font-weight-bolder mb-0">
                                1.423k
                              </h4>
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
                        <h4 className="card-title">Interview Test</h4>
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
                              <th scope="col">Interview</th>
                              <th scope="col">Status</th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Array.isArray(data)
                              ? data.map((rs) => {
                                  const {
                                    id,
                                    name,
                                    email,
                                    phone,
                                    technology,
                                    interview_type,
                                    status,
                                  } = rs;

                                  return (
                                    <>
                                      <tr>
                                        <th scope="row">{id}</th>
                                        <td>{name}</td>
                                        <td>{email}</td>
                                        <td>{phone}</td>
                                        <td>{technology}</td>
                                        <td>{interview_type}</td>
                                        <td>{status}</td>
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
                                                {/* <li>
                                                  <a
                                                    class="dropdown-item"
                                                    href="#"
                                                    type="button"
                                                    onClick={() =>
                                                      AssignPortal(
                                                        name,
                                                        email,
                                                        phone,
                                                        technology
                                                      )
                                                    }
                                                  >
                                                    Assign Portal
                                                  </a>
                                                </li> */}
                                                <li>
                                                  <a
                                                    class="dropdown-item"
                                                    href="#"
                                                    type="button"
                                                    onClick={() =>
                                                      RemoveTestIntern(email)
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
                            <a
                              href="#"
                              className="page-link"
                              onClick={prevPage}
                            >
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
                          Intern Details
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
                      <div className="modal-body">
                        {/* {Array.isArray(singleIntern)
                          ? singleIntern.map((res) => {
                              console.log(res);
                              const {
                                image,
                                name,
                                email,
                                phone,
                                cnic,
                                join_date,
                                birth_date,
                                university,
                                degree,
                                technology,
                                duration,
                                intern_type,
                              } = res;

                              return (
                                <>
                                  <div className="row shadow rounded p-3">
                                    <div className="col-sm-4"></div>
                                    <div className="col-sm-4 text-center">
                                      <img
                                        src={image}
                                        alt=""
                                        width={100}
                                        height={100}
                                        style={{ borderRadius: "50px" }}
                                      />

                                      <h3 className="mt-2">{name}</h3>
                                    </div>
                                    <div className="col-sm-4"></div>
                                  </div>

                                  <div className="row mt-1 shadow rounded p-3">
                                    <div className="col-sm-6">
                                      <label htmlFor="">Email: </label>
                                      <input
                                        type="text"
                                        name=""
                                        id=""
                                        value={email}
                                        readOnly
                                        className="form-control border-0"
                                      />
                                    </div>

                                    <div className="col-sm-6">
                                      <label htmlFor="">Phone: </label>
                                      <input
                                        type="text"
                                        name=""
                                        id=""
                                        value={phone}
                                        readOnly
                                        className="form-control border-0"
                                      />
                                    </div>
                                  </div>

                               
                                  <div className="row mt-1 shadow rounded p-3">
                                    <div className="col-sm-6">
                                      <label htmlFor="">CNIC: </label>
                                      <input
                                        type="text"
                                        name=""
                                        id=""
                                        value={cnic}
                                        readOnly
                                        className="form-control border-0"
                                      />
                                    </div>

                                    <div className="col-sm-6">
                                      <label htmlFor="">Join Date: </label>
                                      <input
                                        type="text"
                                        name=""
                                        id=""
                                        value={join_date}
                                        readOnly
                                        className="form-control border-0"
                                      />
                                    </div>
                                  </div>

                                  <div className="row mt-1 shadow rounded p-3">
                                    <div className="col-sm-6">
                                      <label htmlFor="">Birth Date: </label>
                                      <input
                                        type="text"
                                        name=""
                                        id=""
                                        value={birth_date}
                                        readOnly
                                        className="form-control border-0"
                                      />
                                    </div>

                                    <div className="col-sm-6">
                                      <label htmlFor="">University: </label>
                                      <input
                                        type="text"
                                        name=""
                                        id=""
                                        value={university}
                                        readOnly
                                        className="form-control border-0"
                                      />
                                    </div>
                                  </div>

                                  <div className="row mt-1 shadow rounded p-3">
                                    <div className="col-sm-6">
                                      <label htmlFor="">Degree: </label>
                                      <input
                                        type="text"
                                        name=""
                                        id=""
                                        value={degree}
                                        readOnly
                                        className="form-control border-0"
                                      />
                                    </div>

                                    <div className="col-sm-6">
                                      <label htmlFor="">Technology: </label>
                                      <input
                                        type="text"
                                        name=""
                                        id=""
                                        value={technology}
                                        readOnly
                                        className="form-control border-0"
                                      />
                                    </div>
                                  </div>

                                  <div className="row mt-1 mb-5 shadow rounded p-3">
                                    <div className="col-sm-6">
                                      <label htmlFor="">Duration</label>
                                      <input
                                        type="text"
                                        name=""
                                        id=""
                                        value={duration}
                                        readOnly
                                        className="form-control border-0"
                                      />
                                    </div>
                                    <div className="col-sm-6">
                                      <label htmlFor="">
                                        Internship Type:{" "}
                                      </label>
                                      <input
                                        type="text"
                                        name=""
                                        id=""
                                        value={intern_type}
                                        readOnly
                                        className="form-control border-0"
                                      />
                                    </div>

                                    
                                  </div>
                                </>
                              );
                            })
                          : " "} */}
                      </div>
                      {/* <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-primary"
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
    </>
  );
};
