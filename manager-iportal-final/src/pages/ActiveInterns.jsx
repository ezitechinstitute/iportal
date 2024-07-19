import React, { useEffect, useState } from "react";
import { ManagerSidebar } from "../components/ManagerSidebar";
import { ManagerTopbar } from "../components/ManagerTopbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { InvoiceModal } from "../components/InvoiceModal";
import { InternStatics } from "../components/InternStatics";

export const ActiveInterns = () => {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const check = sessionStorage.getItem("isLoggedIn");
  //   const userEmail = sessionStorage.getItem("email");
  //   const managerContact = sessionStorage.getItem("contact");

  useEffect(() => {
    if (!check) {
      navigate("/");
    }
  });

  const GetActiveInterns = async () => {
    try {
      const res = await axios.get("https://api.ezitech.org/active-interns", {
        headers: { "x-access-token": token },
      });
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetActiveInterns();
  }, [GetActiveInterns]);

  // const [currentPage, settCurrentPage] = useState(1);
  // const recordPerPage = 2;
  // const lastIndex = currentPage * recordPerPage;
  // const firstIndex = lastIndex - recordPerPage;
  // const records = data.slice(firstIndex, lastIndex);
  // const nPage = Math.ceil(data.length / recordPerPage);
  // const numbers = [...Array(nPage + 1).keys()].slice(1);

  // function prevPage() {
  //   if (currentPage !== firstIndex) {
  //     settCurrentPage(currentPage - 1);
  //   }
  // }

  // function changeCurrentPage(id) {
  //   settCurrentPage(id);
  // }

  // function nextPage() {
  //   if (currentPage !== nPage) {
  //     settCurrentPage(currentPage + 1);
  //   }
  // }
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
              <InternStatics/>
              {/* <!--/ Statistics Card --> */}

              {/* <!-- Table Hover Animation start --> */}
              <div className="row" id="table-hover-animation">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title">Active Interns</h4>
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

                    <div className="card-body overflow-x-scroll text-center">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">ETI-ID</th>
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
                                const {
                                  ezi_id,
                                  name,
                                  email,
                                  phone,
                                  technology,
                                } = rs;

                                return (
                                  <>
                                    <tr>
                                      <th className="border px-1" scope="row">
                                        {ezi_id}
                                      </th>
                                      <td className="border px-1">{name}</td>
                                      <td className="border px-1">{email}</td>
                                      <td className="border px-1">{phone}</td>
                                      <td className="border px-1">{technology}</td>

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
                                              <li>
                                                <a
                                                  className="dropdown-item"
                                                  href="#"
                                                  type="button"
                                                  data-toggle="modal"
                                                  data-target="#default"
                                                >
                                                  Invoice
                                                </a>
                                              </li>
                                              {/* <li>
                                              <a className="dropdown-item" href="#">
                                                Send Mail
                                              </a>
                                            </li> */}
                                              {/* <li>
                                                <a
                                                  className="dropdown-item"
                                                  href="#"
                                                  type="button"
                                                  onClick={() =>
                                                    ActivePortal(email)
                                                  }
                                                >
                                                  Active Portal
                                                </a>
                                              </li> */}
                                              <li>
                                                <a
                                                  className="dropdown-item"
                                                  href="#"
                                                  type="button"
                                                  //   onClick={() =>
                                                  //     RemoveCompletedIntern(email)
                                                  //   }
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
                    {/* <div>
                      <nav>
                      <ul className="pagination">
                        <li className="page-item">
                          <a href="#" className="page-link" onClick={prevPage}>
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
                          <a href="#" className="page-link" onClick={nextPage}>
                            Next
                          </a>
                        </li>
                      </ul>
                      </nav>
                    </div> */}
                  </div>
                </div>
              </div>
              <InvoiceModal />
            </section>
          </div>
        </div>
      </div>
    </>
  );
};
