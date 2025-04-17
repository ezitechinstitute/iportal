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
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const check = sessionStorage.getItem("isLoggedIn");
  const [invoiceData, setInvoiceData] = useState({});

  useEffect(() => {
    if (!check) {
      navigate("/");
    }
  }, [check, navigate]);

  const GetActiveInterns = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://api.ezitech.org/active-interns", {
        headers: { "x-access-token": token },
      });
      setData(res.data);
      setFilteredData(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetActiveInterns();
  }, []);

  // Enhanced search functionality
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (!term) {
      setFilteredData(data);
      return;
    }

    const filtered = data.filter((intern) => {
      // Search in multiple fields with case insensitivity
      return (
        (intern.name && intern.name.toLowerCase().includes(term)) ||
        (intern.eti_id && intern.eti_id.toLowerCase().includes(term)) ||
        (intern.email && intern.email.toLowerCase().includes(term)) ||
        (intern.phone && intern.phone.toLowerCase().includes(term)) ||
        (intern.int_technology && 
          intern.int_technology.toLowerCase().includes(term))
      );
    });
    setFilteredData(filtered);
  };

  // Debounced search to improve performance
  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const debouncedSearch = debounce(handleSearch, 300);

  const formatPhoneNumberForWhatsApp = (phone) => {
    const cleaned = phone.replace(/\D/g, "");
    return `+${cleaned}`;
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
                      <h4 className="card-title">Active Interns</h4>
                      <div className="d-flex align-items-center">
                        <div className="input-group" style={{ width: "350px" }}>
                          {/* <span className="input-group-text">
                            <i className="fas fa-search"></i>
                          </span> */}
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search by name, ETI-ID, email, phone, or technology..."
                            value={searchTerm}
                            onChange={(e) => {
                              setSearchTerm(e.target.value);
                              debouncedSearch(e);
                            }}
                          />
                          {searchTerm && (
                            <button
                              className="btn btn-outline-secondary"
                              type="button"
                              onClick={() => {
                                setSearchTerm("");
                                setFilteredData(data);
                              }}
                            >
                              <i className="fas fa-times"></i>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="card-body overflow-x-scroll text-center">
                    {loading ? (
                            <tr>
                              <td colSpan="8" className="text-center">
                                <h3>Loading...</h3>
                              </td>
                            </tr>
                          ): (
                        <table className="table table-hover">
                          <thead className="table-light">
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
                            {filteredData.length > 0 ? (
                              filteredData.map((rs) => {
                                const {
                                  eti_id,
                                  name,
                                  email,
                                  phone,
                                  int_technology,
                                } = rs;

                                const whatsappLink = `https://wa.me/${formatPhoneNumberForWhatsApp(phone)}`;

                                return (
                                  <tr key={eti_id}>
                                    <th scope="row">{eti_id}</th>
                                    <td>{name}</td>
                                    <td>{email}</td>
                                    <td>
                                      <a
                                        href={whatsappLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-success"
                                      >
                                        {phone}
                                      </a>
                                    </td>
                                    <td>{int_technology}</td>
                                    <td>
                                      <div className="dropdown">
                                        <button
                                          className="btn btn-sm btn-warning dropdown-toggle"
                                          type="button"
                                          data-bs-toggle="dropdown"
                                          aria-expanded="false"
                                        >
                                          Actions
                                        </button>
                                        <ul className="dropdown-menu">
                                          <li>
                                            <button
                                              className="dropdown-item"
                                              data-bs-toggle="modal"
                                              data-bs-target="#default"
                                              onClick={() =>
                                                setInvoiceData({
                                                  name,
                                                  email,
                                                  phone,
                                                })
                                              }
                                            >
                                              <i className="fas fa-file-invoice me-2"></i>
                                              Invoice
                                            </button>
                                          </li>
                                          <li>
                                            <button className="dropdown-item text-danger">
                                              <i className="fas fa-user-minus me-2"></i>
                                              Remove
                                            </button>
                                          </li>
                                        </ul>
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })
                            ) : (
                              <tr>
                                <td colSpan="6" className="py-4">
                                  {searchTerm ? (
                                    <div className="text-center">
                                      <i className="fas fa-search fa-2x text-muted mb-2"></i>
                                      <p>No interns found matching your search</p>
                                      <button
                                        className="btn btn-sm btn-outline-primary"
                                        onClick={() => {
                                          setSearchTerm("");
                                          setFilteredData(data);
                                        }}
                                      >
                                        Clear search
                                      </button>
                                    </div>
                                  ) : (
                                    <div className="text-center">
                                      <i className="fas fa-users fa-2x text-muted mb-2"></i>
                                      <p>No active interns found</p>
                                    </div>
                                  )}
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      )}
                    </div>
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