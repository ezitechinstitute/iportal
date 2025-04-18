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
  const navigate = useNavigate();
  const check = sessionStorage.getItem("isLoggedIn");
  const [invoiceData, setInvoiceData] = useState({});

  useEffect(() => {
    if (!check) {
      navigate("/");
    }
  }, [check, navigate]);

  const GetActiveInterns = async () => {
    try {
      const res = await axios.get("https://api.ezitech.org/active-interns", {
        headers: { "x-access-token": token },
      });
      setData(res.data);
      setFilteredData(res.data); // Initialize filteredData with all data
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetActiveInterns();
  }, []);

  // Search functionality
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = data.filter(
      (intern) =>
        intern.name.toLowerCase().includes(term) ||
        intern.eti_id.toLowerCase().includes(term)
    );
    setFilteredData(filtered);
  };

  // Function to format phone number for WhatsApp
  const formatPhoneNumberForWhatsApp = (phone) => {
    // Remove any non-numeric characters
    const cleaned = phone.replace(/\D/g, "");
    // Add the international prefix (e.g., +92 for Pakistan)
    return `+${cleaned}`;
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
              <InternStatics />

              <div className="row" id="table-hover-animation">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title">Active Interns</h4>
                      <div className="d-flex align-items-center">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search by Name or ETI-ID"
                          value={searchTerm}
                          onChange={handleSearch}
                          style={{ width: "300px" }}
                        />
                      </div>
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
                          {Array.isArray(filteredData) && filteredData.length > 0 ? (
                            filteredData.map((rs) => {
                              const {
                                eti_id,
                                name,
                                email,
                                phone,
                                int_technology,
                              } = rs;

                              // Format phone number for WhatsApp
                              const whatsappLink = `https://wa.me/${formatPhoneNumberForWhatsApp(phone)}`;

                              return (
                                <tr key={eti_id}>
                                  <th className="border px-1" scope="row">
                                    {eti_id}
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
                                  <td className="border px-1">{int_technology}</td>
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
                              <td colSpan="6">No matching interns found</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                    <br />
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