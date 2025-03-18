import React, { useEffect, useState } from "react";
import { ManagerTopbar } from "../components/ManagerTopbar";
import { ManagerSidebar } from "../components/ManagerSidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { InvoiceModal } from "../components/InvoiceModal";
import { InternStatics } from "../components/InternStatics";
import { Pagination } from "../components/Pagination";

export const ContactWith = () => {
  const [token] = useState(sessionStorage.getItem("token"));
  const [singleIntern] = useState([]);
  const [data, setData] = useState([]); // Ensure initial value is an empty array
  const [filteredData, setFilteredData] = useState([]); // Ensure initial value is an empty array
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const check = sessionStorage.getItem("isLoggedIn");
  const managerid = sessionStorage.getItem("managerid");
  const managerContact = sessionStorage.getItem("contact");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [dataLimit, setDataLimit] = useState(50);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!check) {
      navigate("/");
    }
  }, [check, navigate]);

  const getContactWith = async (page) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.ezitech.org/get-contact-interns/${managerid}`,
        {
          headers: { "x-access-token": token },
          params: {
            page: page,
            limit: dataLimit,
          },
        }
      );
      const newData = res.data.data || []; // Fallback to empty array if data is undefined
      setData(newData);
      setFilteredData(newData);
      setCurrentPage(res.data.meta.page);
      setTotalPages(res.data.meta.totalPages);
    } catch (error) {
      console.log(error);
      setData([]); // Set to empty array on error
      setFilteredData([]);
    } finally {
      setLoading(false);
    }
  };

  // Search functionality with safety check
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    // Only filter if data exists and is an array
    if (Array.isArray(data)) {
      const filtered = data.filter((intern) =>
        intern?.name?.toLowerCase().includes(term) || false
      );
      setFilteredData(filtered);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    getContactWith(currentPage);
  }, [currentPage, dataLimit]);

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
          getContactWith(currentPage);
        } else {
          alert("Something Went Wrong!!!");
        }
      });
  };

  const AssignPortal = (name, email, phone, technology) => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+<>?";
    const length = 8;
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }

    const day = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear().toLocaleString();
    const id = Math.floor(1000 + Math.random() * 9000);

    let EZI_ID = "ETI-" + day + "-" + month + "-" + year.slice(3, 5) + "/" + id;

    axios
      .post(
        "https://api.ezitech.org/assign-portal",
        {
          EZI_ID,
          name,
          email,
          password,
          phone,
          technology,
          managerContact,
        },
        { headers: { "x-access-token": token } }
      )
      .then((res) => {
        if (res.data === 1) {
          alert("Assign Portal Successfully");
          getContactWith(currentPage);
        } else {
          alert("Something Went Wrong!!!");
        }
      })
      .catch((err) => {
        console.log(err);
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
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h4 className="card-title">Contact With</h4>
                      <div className="d-flex align-items-center gap-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search by Name"
                          value={searchTerm}
                          onChange={handleSearch}
                          style={{ width: "300px", marginRight:"10px" }}
                        />
                        <select
                          className="form-control"
                          style={{ width: "100px" }}
                          onChange={(e) => setDataLimit(e.target.value)}
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
                            <th scope="col">Interview</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {loading ? (
                            <tr>
                              <td colSpan="8">
                                <h3 className="text-center">Loading...</h3>
                              </td>
                            </tr>
                          ) : filteredData.length > 0 ? (
                            filteredData.map((rs) => {
                              const {
                                id,
                                name,
                                email,
                                phone,
                                technology,
                                interview_type,
                                status,
                              } = rs;
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
                                  <td className="border px-1">{interview_type}</td>
                                  <td className="border px-1">{status}</td>
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
                                              onClick={() =>
                                                AssignPortal(name, email, phone, technology)
                                              }
                                            >
                                              Assign Portal
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              className="dropdown-item"
                                              href="#"
                                              type="button"
                                              onClick={() => RemoveOnsite(email)}
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
                              <td colSpan="8">No matching interns found</td>
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
              {/* Rest of your modal code remains unchanged */}
            </section>
          </div>
        </div>
      </div>
    </>
  );
};