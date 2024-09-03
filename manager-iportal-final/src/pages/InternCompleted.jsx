import React, { useEffect, useRef, useState } from "react";
import { ManagerTopbar } from "../components/ManagerTopbar";
// import ReactDOM from 'react-dom';
import { ManagerSidebar } from "../components/ManagerSidebar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { InvoiceModal } from "../components/InvoiceModal";
import { InternStatics } from "../components/InternStatics";
import { Pagination } from "../components/Pagination";
// import { Editor, EditorState } from "draft-js";
// import "draft-js/dist/Draft.css";

export const InternCompleted = () => {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const check = sessionStorage.getItem("isLoggedIn");
  const userEmail = sessionStorage.getItem("email");
  const managerid = sessionStorage.getItem("managerid");

  const [invoiceData, setInvoiceData] = useState({});
  const [currentPage, settCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [dataLimit, setDataLimit] = useState(50);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!check) {
      navigate("/");
    }
  });

  const getTestComplete = async (page) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.ezitech.org/get-completed-interns/${managerid}`,
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
    getTestComplete(currentPage);
  }, [currentPage, dataLimit]);

  const RemoveCompletedIntern = (email) => {
    axios
      .post(
        "https://api.ezitech.org/remove-completed",
        { email },
        { headers: { "x-access-token": token } }
      )
      .then((res) => {
        if (res.data.status) {
          alert(res.data.msg);
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
                      <h4 className="card-title">Test Completed</h4>
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
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Contact</th>
                            <th scope="col">Technology</th>
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
                              const { id, name, email, phone, technology } = rs;

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

                                            {/*<li>
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
                                              </li>*/}
                                            <li>
                                              <a
                                                className="dropdown-item"
                                                href="#"
                                                type="button"
                                                data-toggle="modal"
                                                data-target="#default"
                                                onClick={() =>
                                                  setInvoiceData({
                                                    name: name,
                                                    email: email,
                                                    phone: phone,
                                                  })
                                                }
                                              >
                                                Invoice
                                              </a>
                                            </li>
                                            <li>
                                              <a
                                                className="dropdown-item"
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
                  </div>
                </div>
              </div>

              <InvoiceModal invoiceData={invoiceData} />
            </section>
          </div>
        </div>
      </div>
    </>
  );
};
