import React, { useEffect, useState } from "react";
import { ManagerTopbar } from "../components/ManagerTopbar";
import { ManagerSidebar } from "../components/ManagerSidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { InvoiceModal } from "../components/InvoiceModal";
import { InternStatics } from "../components/InternStatics";
import { Pagination } from "../components/Pagination";

export const OnsiteInterns = () => {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [singleIntern, setSingleIntern] = useState([]);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const check = sessionStorage.getItem("isLoggedIn");
  const userEmail = sessionStorage.getItem("email");
  const managerContact = sessionStorage.getItem("contact");
  // Pagination
  const [currentPage, settCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [dataLimit, setDataLimit] = useState(50);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!check) {
      navigate("/");
    }
  });

  const getOnsiteRegister = async (page) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.ezitech.org/get-onsite-interns/${userEmail}`,
        {
          headers: { "x-access-token": token },
          params: {
            page: page,
            limit: dataLimit,
          },
        }
      );
      setData(res.data.data);
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
    // console.log(data);
    // setInterval(() => {
    getOnsiteRegister(currentPage);
    // }, 2000);
  }, [currentPage, dataLimit]);

  // const [currentPage, settCurrentPage] = useState(1);
  // const recordPerPage = 2;
  // const lastIndex = currentPage * recordPerPage;
  // const firstIndex = lastIndex - recordPerPage;
  // const records = data.slice(firstIndex, lastIndex);
  // const nPage = Math.ceil(data.length / recordPerPage);
  // const numbers = [...Array(nPage + 1).keys()].slice(1);

  function prevPage() {
    // if (currentPage !== firstIndex) {
    //   settCurrentPage(currentPage - 1);
    // }
  }

  // function changeCurrentPage(id) {
  //   settCurrentPage(id);
  // }

  function nextPage() {
    // if (currentPage !== nPage) {
    //   settCurrentPage(currentPage + 1);
    // }
  }

  // const GetSingleIntern = async (id) => {
  //   try {
  //     const res = await axios.post("http://localhost:8800/single-onsite", {
  //       id,
  //     });
  //     setSingleIntern(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const RemoveOnsite = (email) => {
    axios
      .post(
        "https://api.ezitech.org/remove-intern",
        { email },
        { headers: { "x-access-token": token } }
      )
      .then((res) => {
        if (res.data === 1) {
          alert("Removed Successfully");
        } else {
          alert("Something Went Wrong!!!");
        }
      });
  };

  const ContactWith = (email) => {
    axios
      .post(
        "https://api.ezitech.org/update-contact-status",
        { email },
        { headers: { "x-access-token": token } }
      )
      .then((res) => {
        if (res.data === 1) {
          alert("Status Updated from Interview to Contact");
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
              <InternStatics />
              {/* <!--/ Statistics Card --> */}

              {/* <!-- Table Hover Animation start --> */}
              <div className="row" id="table-hover-animation">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title">Onsite Interns</h4>
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

                    <div className="card-body overflow-x-scroll text-center">
                      <table className="table">
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
                          {loading ? (
                            <>
                              <div className="text-center"></div>
                              <h3>Loading...</h3>
                            </>
                          ) : Array.isArray(data) ? (
                            data.map((rs) => {
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
                                    <th className="border px-1" scope="row">
                                      {id}
                                    </th>
                                    <td className="border px-1">{name}</td>
                                    <td className="border px-1">{email}</td>
                                    <td className="border px-1">{phone}</td>
                                    <td className="border px-1">
                                      {technology}
                                    </td>
                                    <td className="border px-1">
                                      {interview_type}
                                    </td>
                                    <td className="border px-1">{status}</td>
                                    <td className="border px-1">
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
                                            {/* <li>
                                              <a className="dropdown-item" href="#">
                                                Send Mail
                                              </a>
                                            </li> */}
                                            <li>
                                              <a
                                                className="dropdown-item"
                                                href="#"
                                                type="button"
                                                onClick={() =>
                                                  ContactWith(email)
                                                }
                                              >
                                                Contact With
                                              </a>
                                            </li>
                                            <li>
                                              <a
                                                className="dropdown-item"
                                                href="#"
                                                type="button"
                                                onClick={() =>
                                                  RemoveOnsite(email)
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
                          ) : (
                            " "
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
                    {/* <div>
                      <nav>
                      <ul className="pagination"> */}
                    {/* <li className="page-item">
                          <a href="#" className="page-link" onClick={prevPage}>
                            Prev
                          </a>
                        </li> */}
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
                    {/* <li className="page-item">
                          <a href="#" className="page-link" onClick={nextPage}>
                            Next
                          </a>
                        </li> */}
                    {/* </ul>
                      </nav>
                    </div> */}
                  </div>
                </div>
              </div>
              <div
                className="modal fade text-left"
                id="large"
                tabindex="-1"
                role="dialog"
                aria-labelledby="myModalLabel17"
                aria-hidden="true"
              >
                <div
                  className="modal-dialog modal-dialog-centered modal-lg"
                  role="document"
                >
                  <div className="modal-content">
                    <div className="modal-header">
                      <h4 className="modal-title" id="myModalLabel17">
                        Intern Details
                      </h4>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      {Array.isArray(singleIntern)
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

                                {/* <h6 className="mt-5">Gender</h6> */}
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
                                    <label htmlFor="">Internship Type: </label>
                                    <input
                                      type="text"
                                      name=""
                                      id=""
                                      value={intern_type}
                                      readOnly
                                      className="form-control border-0"
                                    />
                                  </div>

                                  {/* <div className="col-sm-6">
                                    <label htmlFor="">To</label>
                                    <input
                                      type="text"
                                      name=""
                                      id=""
                                      value={to_address}
                                      readOnly
                                      className="form-control border-0"
                                    />
                                  </div> */}
                                </div>
                              </>
                            );
                          })
                        : " "}
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
};
