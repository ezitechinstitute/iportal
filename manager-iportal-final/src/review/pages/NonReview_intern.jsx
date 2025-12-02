import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReviewSidebar } from "../component/ReviewSidebar";
import { ReviewTopbar } from "../component/ReviewTopbar";
import { FiDelete, FiPlay } from "react-icons/fi";
import axios from "axios";

const NonReview_intern = () => {
  const [nonReviewInterns, setNonReviewInterns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [dataLimit, setDataLimit] = useState(10);
  const navigate = useNavigate();

  // Check if the user is logged in
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [navigate]);

  // Fetch non-review interns data from the API with pagination and search
  useEffect(() => {
    const fetchNonReviewInterns = async () => {
      try {
        const url = new URL("https://api.ezitech.org/approved-status-feedback");
        url.searchParams.append("page", currentPage);
        url.searchParams.append("limit", dataLimit);
        if (searchTerm) {
          url.searchParams.append("search", searchTerm);
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const { data, pagination: paginationData } = await response.json();
        setNonReviewInterns(data);
        setCurrentPage(paginationData.currentPage);
        setTotalPages(paginationData.totalPages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        setCurrentPage(1);
      }
      fetchNonReviewInterns();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [currentPage, searchTerm, dataLimit]);

  // Function to format phone number for WhatsApp
  const formatPhoneNumberForWhatsApp = (phone) => {
    const cleaned = phone.replace(/\D/g, "");
    return `+${cleaned}`;
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Function to render pagination buttons dynamically
  const renderPagination = () => {
    const maxButtons = window.innerWidth < 768 ? 5 : 7; // Show fewer buttons on mobile
    const pages = [];
    const startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    const endPage = Math.min(totalPages, startPage + maxButtons - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li
          key={i}
          className={`page-item ${currentPage === i ? "active" : ""}`}
        >
          <button
            className="page-link"
            onClick={() => handlePageChange(i)}
            aria-current={currentPage === i ? "page" : undefined}
          >
            {i}
          </button>
        </li>
      );
    }

    return (
      <>
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>
        {startPage > 1 && (
          <li className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        )}
        {pages}
        {endPage < totalPages && (
          <li className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        )}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <button
            className="page-link"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
      </>
    );
  };

  const DeleteFeedback = async (id) => {
    await axios
      .delete(`https://api.ezitech.org/delete-feedback/${id}`)
      .then((response) => {
        alert(response.data.message);
        // Refresh the list after deletion
        window.location.reload();
      })
      .catch((error) => {
        console.error("There was an error deleting the feedback!", error);
      });
  };

  return (
    <>
      <ReviewSidebar />
      <ReviewTopbar />
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
                    <div className="card-header d-flex justify-content-between align-items-center flex-wrap">
                      <h4 className="card-title">Non-Review Interns</h4>
                      <div className="d-flex align-items-center gap-3 flex-wrap">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search by Name"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          style={{
                            width: "300px",
                            maxWidth: "100%",
                            marginRight: "5px",
                          }}
                        />

                        <select
                          className="form-control"
                          style={{ width: "100px" }}
                          value={dataLimit}
                          onChange={(e) => setDataLimit(Number(e.target.value))}
                        >
                          <option value={10}>10</option>
                          <option value={25}>25</option>
                          <option value={50}>50</option>
                          <option value={100}>100</option>
                        </select>
                      </div>
                    </div>

                    <div className="card-body overflow-x-auto text-center">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">ETI_ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Technology</th>
                            <th scope="col">Video</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {loading ? (
                            <tr>
                              <td colSpan="7">
                                <h3 className="text-center">Loading...</h3>
                              </td>
                            </tr>
                          ) : error ? (
                            <tr>
                              <td colSpan="7">
                                <div className="alert alert-danger">
                                  Error: {error}
                                </div>
                              </td>
                            </tr>
                          ) : nonReviewInterns.length > 0 ? (
                            nonReviewInterns.map((intern, index) => {
                              return (
                                <tr key={index}>
                                  <td className="border px-1 ">
                                    <b>{intern.eti_id}</b>
                                  </td>
                                  <td className="border px-1">{intern.name}</td>
                                  <td className="border px-1">
                                    {intern.email}
                                  </td>
                                  <td className="border px-1">
                                    {intern.technology}
                                  </td>
                                  <td className="border px-1">
                                    <a
                                      href={intern.videoUrl}
                                      className="btn btn-primary"
                                      type="button"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {<FiPlay />} Play Video
                                    </a>
                                  </td>
                                  <td className="border px-1">
                                    <span class="badge badge-pill badge-success">
                                      {intern.status}
                                    </span>
                                  </td>
                                  <td className="border px-1">
                                    <div className="dropdown">
                                      <button
                                        className="btn btn-warning dropdown-toggle"
                                        type="button"
                                        id="dropdownMenuButton"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                      >
                                        Action
                                      </button>
                                      <div
                                        className="dropdown-menu"
                                        aria-labelledby="dropdownMenuButton"
                                      >
                                        <button
                                          className="dropdown-item"
                                          onClick={() =>
                                            DeleteFeedback(intern.id)
                                          }
                                        >
                                          {" "}
                                          {<FiDelete />} &nbsp; Delete
                                        </button>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })
                          ) : (
                            <tr>
                              <td colSpan="7">No interns found</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                    <br />
                    {totalPages > 1 && (
                      <div className="d-flex justify-content-center">
                        <nav aria-label="Page navigation">
                          <ul className="pagination flex-wrap">
                            {renderPagination()}
                          </ul>
                        </nav>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Inline CSS for responsive pagination */}
      <style>{`
                .pagination {
                    margin: 20px 0;
                    gap: 5px;
                }
                .page-item {
                    margin: 0 2px;
                }
                .page-link {
                    padding: 8px 12px;
                    font-size: 1rem;
                    line-height: 1.5;
                    border-radius: 4px;
                    min-width: 40px;
                    text-align: center;
                    transition: all 0.2s ease;
                }
                .page-item.active .page-link {
                    z-index: 1;
                }
                .page-item.disabled .page-link {
                    cursor: not-allowed;
                    opacity: 0.6;
                }
                @media (max-width: 768px) {
                    .pagination {
                        justify-content: center;
                        gap: 3px;
                    }
                    .page-link {
                        padding: 6px 10px;
                        font-size: 0.9rem;
                        min-width: 36px;
                    }
                }
                @media (max-width: 576px) {
                    .page-link {
                        padding: 5px 8px;
                        font-size: 0.85rem;
                        min-width: 32px;
                    }
                }
            `}</style>
    </>
  );
};

export default NonReview_intern;
