import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ManagerSidebar } from "../components/ManagerSidebar";
import { ManagerTopbar } from "../components/ManagerTopbar";
import axios from "axios";

export const RemainingAmount = () => {
  const [token] = useState(sessionStorage.getItem("token"));
  const navigate = useNavigate();
  const check = sessionStorage.getItem("isLoggedIn");
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // New state for search input
  const [loading, setLoading] = useState(false); // Loading state for better UX

  useEffect(() => {
    if (!check) {
      navigate("/");
    }
  }, [check, navigate]);

  const GetRemainingAmount = async (search = "") => {
    setLoading(true);
    try {
      const res = await axios.get("https://api.ezitech.org/pending-amount", {
        headers: { "x-access-token": token },
        params: {
          search: search, // Add search parameter to API call
        },
      });
      setData(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    GetRemainingAmount(value); // Fetch data with new search term
  };

  useEffect(() => {
    GetRemainingAmount(searchTerm);
  }, []); // Initial fetch without search term

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
      <div className="app-content content">
        <div className="content-overlay"></div>
        <div className="header-navbar-shadow"></div>
        <div className="content-wrapper">
          <div className="content-header row"></div>
          <div className="content-body">
            <section id="dashboard-ecommerce">
              <div className="row" id="table-hover-animation">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h4 className="card-title">Remaining Amount</h4>
                      <div className="d-flex align-items-center">
                        <input
                          type="text"
                          className="form-control mr-2"
                          placeholder="Search by name..."
                          value={searchTerm}
                          onChange={handleSearchChange}
                          style={{ width: "200px" }}
                        />
                        <button
                          type="button"
                          className="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop"
                        >
                          Add Intern
                        </button>
                      </div>
                    </div>

                    <div className="card-body overflow-x-scroll text-center">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Contact</th>
                            <th scope="col">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {loading ? (
                            <tr>
                              <td colSpan="4" className="text-center">
                                <h3>Loading...</h3>
                              </td>
                            </tr>
                          ) : Array.isArray(data) && data.length > 0 ? (
                            data.map((rs) => {
                              const {
                                id,
                                name,
                                email,
                                contact,
                                remaining_amount,
                              } = rs;
// Format phone number for WhatsApp
const whatsappLink = `https://wa.me/${formatPhoneNumberForWhatsApp(contact)}`;
                              return (
                                <tr key={id}>
                                  <td className="border px-1">{name}</td>
                                  <td className="border px-1">{email}</td>
                                  <td className="border px-1">
                                    <a
                                      href={whatsappLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      style={{ color: "#25D366", textDecoration: "none" }}
                                    >
                                      {contact}
                                    </a>
                                  </td>
                                  <td className="border px-1">
                                    {remaining_amount}
                                  </td>
                                </tr>
                              );
                            })
                          ) : (
                            <tr>
                              <td colSpan="4" className="text-center">
                                No data found
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
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