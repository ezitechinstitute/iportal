import React, { useEffect, useState } from "react";
import { ManagerTopbar } from "../components/ManagerTopbar";
import { ManagerSidebar } from "../components/ManagerSidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { InternStatics } from "../components/InternStatics";
import { Pagination } from "../components/Pagination";

export const OnsiteInterns = () => {
  const [token] = useState(sessionStorage.getItem("token"));
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();
  const check = sessionStorage.getItem("isLoggedIn");
  const managerid = sessionStorage.getItem("managerid");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [dataLimit, setDataLimit] = useState(50);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [interviewType, setInterviewType] = useState("");

  useEffect(() => {
    if (!check) {
      navigate("/");
    }
  }, [check, navigate]);

  const getOnsiteRegister = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.ezitech.org/get-interns/${managerid}`,
        {
          headers: { "x-access-token": token },
          params: {
            page: currentPage,
            limit: dataLimit,
            interview_type: interviewType,
          },
        }
      );
      setData(res.data.data);
      setFilteredData(res.data.data); // Initialize filteredData
      setTotalPages(res.data.meta.totalPages);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Search functionality
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = data.filter(
      (intern) =>
        intern.name.toLowerCase().includes(term) ||
        intern.email.toLowerCase().includes(term) ||
        intern.phone.toLowerCase().includes(term) ||
        intern.technology.toLowerCase().includes(term)
    );
    setFilteredData(filtered);
  };

  const handleInterviewTypeChange = (e) => {
    const value = e.target.value;
    setInterviewType(value);
    setCurrentPage(1);
  };

  useEffect(() => {
    getOnsiteRegister();
  }, [currentPage, dataLimit, interviewType]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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
          getOnsiteRegister();
        } else {
          alert("Something Went Wrong!!!");
        }
      })
      .catch((error) => {
        console.error("Error removing intern:", error);
        alert("Failed to remove intern");
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
          getOnsiteRegister();
        } else {
          alert("Something Went Wrong!!!");
        }
      })
      .catch((error) => {
        console.error("Error updating contact status:", error);
        alert("Failed to update status");
      });
  };

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
                      <h4 className="card-title">New Interns</h4>
                      <div className="d-flex align-items-center">
                        <input
                          type="text"
                          className="form-control mr-2"
                          placeholder="Search by name, email, phone or technology..."
                          value={searchTerm}
                          onChange={handleSearch}
                          style={{ width: "300px" }}
                        />
                        <select
                          className="form-control mr-2"
                          value={interviewType}
                          onChange={handleInterviewTypeChange}
                          style={{ width: "150px" }}
                        >
                          <option value="">All</option>
                          <option value="Onsite">Onsite</option>
                          <option value="Remote">Remote</option>
                        </select>
                        <select
                          className="form-control mr-2"
                          style={{ width: "100px" }}
                          value={dataLimit}
                          onChange={(e) => {
                            setDataLimit(Number(e.target.value));
                            setCurrentPage(1);
                          }}
                        >
                          <option value={50}>50</option>
                          <option value={100}>100</option>
                          <option value={200}>200</option>
                          <option value={300}>300</option>
                          <option value={500}>500</option>
                        </select>
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
                              <td colSpan="8" className="text-center">
                                <h3>Loading...</h3>
                              </td>
                            </tr>
                          ) : Array.isArray(filteredData) && filteredData.length > 0 ? (
                            filteredData.map((rs, index) => {
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
                                    {(currentPage - 1) * dataLimit + index + 1}
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
                                      </button>
                                      <div className="dropdown-menu">
                                        <button
                                          className="dropdown-item"
                                          type="button"
                                          onClick={() => ContactWith(email)}
                                        >
                                          Contact With
                                        </button>
                                        <button
                                          className="dropdown-item"
                                          type="button"
                                          onClick={() => RemoveOnsite(email)}
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })
                          ) : (
                            <tr>
                              <td colSpan="8" className="text-center">
                                {searchTerm ? "No matching interns found" : "No data found"}
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
            </section>
          </div>
        </div>
      </div>
    </>
  );
};