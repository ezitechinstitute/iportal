import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ManagerTopbar } from "../components/ManagerTopbar";
import { ManagerSidebar } from "../components/ManagerSidebar";
import { InternStatics } from "../components/InternStatics";
import { Pagination } from "../components/Pagination";

export const InterviewTest = () => {
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

  useEffect(() => {
    if (!check) {
      navigate("/");
    }
  }, [check, navigate]);

  const getTestIntern = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.ezitech.org/get-test-interns/${managerid}`,
        {
          headers: { "x-access-token": token },
          params: {
            page: currentPage,
            limit: dataLimit,
          },
        }
      );
      setData(res.data.data);
      setFilteredData(res.data.data); // Initialize filteredData with all data
      setTotalPages(res.data.meta.totalPages);
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
        (intern) =>
          intern.name.toLowerCase().includes(term) ||
          intern.email.toLowerCase().includes(term) ||
          intern.phone.toLowerCase().includes(term) ||
          intern.technology.toLowerCase().includes(term) ||
          intern.interview_type?.toLowerCase().includes(term) ||
          intern.status?.toLowerCase().includes(term)
      );
      setFilteredData(filtered);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    getTestIntern();
  }, [currentPage, dataLimit]);

  const RemoveTestIntern = (email) => {
    axios
      .post(
        "https://api.ezitech.org/remove-intern",
        { email },
        { headers: { "x-access-token": token } }
      )
      .then((res) => {
        if (res.data === 1) {
          alert("Removed Successfully");
          getTestIntern(); // Refresh data after removal
        } else {
          alert("Something Went Wrong!!!");
        }
      })
      .catch((error) => {
        console.error("Error removing intern:", error);
        alert("Failed to remove intern");
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
                      <h4 className="card-title">Interview Test</h4>
                      <div className="d-flex align-items-center">
                        <input
                          type="text"
                          className="form-control mr-2"
                          placeholder="Search by name, email, phone, etc..."
                          value={searchTerm}
                          onChange={handleSearch}
                          style={{ width: "300px" }}
                        />
                        <select
                          className="form-control"
                          style={{ width: "100px" }}
                          value={dataLimit}
                          onChange={(e) => {
                            setDataLimit(Number(e.target.value));
                            setCurrentPage(1); // Reset to first page when changing limit
                          }}
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
                                          onClick={() => RemoveTestIntern(email)}
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