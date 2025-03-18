import React, { useEffect, useState } from "react";
import { ManagerTopbar } from "../components/ManagerTopbar";
import { ManagerSidebar } from "../components/ManagerSidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { InvoiceModal } from "../components/InvoiceModal";
import { InternStatics } from "../components/InternStatics";
import { Pagination } from "../components/Pagination";

export const InternCompleted = () => {
  const [token] = useState(sessionStorage.getItem("token"));
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const check = sessionStorage.getItem("isLoggedIn");
  const managerid = sessionStorage.getItem("managerid");

  const [invoiceData, setInvoiceData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [dataLimit, setDataLimit] = useState(50);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // New state for search input

  useEffect(() => {
    if (!check) {
      navigate("/");
    }
  }, [check, navigate]);

  const getTestComplete = async (page, search = "") => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.ezitech.org/get-completed-interns/${managerid}`,
        {
          headers: { "x-access-token": token },
          params: {
            page: page,
            limit: dataLimit,
            search: search, // Add search parameter to API call
          },
        }
      );
      setData(res.data.data);
      setCurrentPage(res.data.meta.page);
      setTotalPages(res.data.meta.totalPages);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    getTestComplete(page, searchTerm); // Fetch data with current search term
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setCurrentPage(1); // Reset to page 1 when search changes
    getTestComplete(1, value); // Fetch data with new search term
  };

  useEffect(() => {
    getTestComplete(currentPage, searchTerm);
  }, [dataLimit]); // Only re-fetch when dataLimit changes

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
          getTestComplete(currentPage, searchTerm); // Refresh data after removal
        } else {
          alert("Something Went Wrong!!!");
        }
      })
      .catch((error) => {
        console.error("Error removing completed intern:", error);
        alert("Failed to remove intern");
      });
  };
  // Function to format phone number for WhatsApp
  const formatPhoneNumberForWhatsApp = (phone) => {
    // Remove any non-numeric characters
    const cleaned = phone.replace(/\D/g, "");
    // Add the international prefix (e.g., +92 for Pakistan)
    return `+92${cleaned}`;
  };

  return (
    <>
      <ManagerTopbar />
      <ManagerSidebar />
      <div className="app-content content">
        <div className="content-overlay"></div>
        <div className="header-navbar-shadow"></div>
        <div className="content-wrapper">
          <div className="content-header row"></div>
          <div className="content-body">
            <section id="dashboard-ecommerce">
              <InternStatics />
              <div className="row" id="table-hover-animation">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h4 className="card-title">Test Completed</h4>
                      <div className="d-flex align-items-center">
                        <input
                          type="text"
                          className="form-control mr-2"
                          placeholder="Search by name..."
                          value={searchTerm}
                          onChange={handleSearchChange}
                          style={{ width: "200px" }}
                        />
                        <select
                          className="form-control"
                          style={{ width: "100px" }}
                          onChange={(e) => setDataLimit(Number(e.target.value))}
                        >
                          <option value={50}>50</option>
                          <option value={100}>100</option>
                          <option value={200}>200</option>
                          <option value={300}>300</option>
                          <option value={500}>500</option>
                        </select>
                      </div>
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
                            <tr>
                              <td colSpan="6" className="text-center">
                                <h3>Loading...</h3>
                              </td>
                            </tr>
                          ) : Array.isArray(data) && data.length > 0 ? (
                            data.map((rs) => {
                              const { id, name, email, phone, technology } = rs;
                              const whatsappLink = `https://wa.me/${formatPhoneNumberForWhatsApp(phone)}`;

                              return (
                                <tr key={id}>
                                  <th className="border px-1" scope="row">
                                    {id}
                                  </th>
                                  <td className="border px-1">{name}</td>
                                  <td className="border px-1">{email}</td>
                                  <td className="border px-1">
                                    <a
                                      href={whatsappLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      style={{ color: "#25D366", textDecoration: "none" }}
                                    >
                                      {phone}
                                    </a>
                                  </td>
                                  <td className="border px-1">{technology}</td>
                                  <td className="border px-1">
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
                              );
                            })
                          ) : (
                            <tr>
                              <td colSpan="6" className="text-center">
                                No data found
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                    <br />
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