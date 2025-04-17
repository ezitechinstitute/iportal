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
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!check) {
      navigate("/");
    }
  }, [check, navigate]);

  const GetRemainingAmount = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://api.ezitech.org/pending-amount", {
        headers: { "x-access-token": token },
      });
      setData(res.data);
      setFilteredData(res.data); // Initialize filteredData with all data
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Client-side search functionality
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term === "") {
      setFilteredData(data); // Show all data when search is empty
    } else {
      const filtered = data.filter(
        (item) =>
          item.name.toLowerCase().includes(term) ||
          item.email.toLowerCase().includes(term) ||
          item.contact.toLowerCase().includes(term) ||
          item.remaining_amount.toString().includes(term)
      );
      setFilteredData(filtered);
    }
  };

  useEffect(() => {
    GetRemainingAmount();
  }, []); // Initial fetch

  // Function to format phone number for WhatsApp
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
              <div className="row" id="table-hover-animation">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h4 className="card-title">Remaining Amount</h4>
                      <div className="d-flex align-items-center">
                        <input
                          type="text"
                          className="form-control mr-2"
                          placeholder="Search by name, email, phone, amount..."
                          value={searchTerm}
                          onChange={handleSearch}
                          style={{ width: "300px" }}
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
                          ) : Array.isArray(filteredData) && filteredData.length > 0 ? (
                            filteredData.map((rs) => {
                              const {
                                id,
                                name,
                                email,
                                contact,
                                remaining_amount,
                              } = rs;
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
                                {searchTerm ? "No matching records found" : "No data found"}
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