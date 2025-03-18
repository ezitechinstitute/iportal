import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { ManagerSidebar } from "../components/ManagerSidebar";
import { ManagerTopbar } from "../components/ManagerTopbar";

const Announcement = () => {
  const navigate = useNavigate();

  // Store user data from sessionStorage
  const [user, setUser] = useState({
    managerid: sessionStorage.getItem("managerid"),
    eti_id: sessionStorage.getItem("etiid"),
    username: sessionStorage.getItem("username"),
    email: sessionStorage.getItem("email"),
    token: sessionStorage.getItem("token"),
    role: sessionStorage.getItem("role"),
    contact: sessionStorage.getItem("contact"),
    isLoggedIn: sessionStorage.getItem("isLoggedIn"),
  });

  const [announcements, setAnnouncements] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const [error, setError] = useState(null);

  // Redirect if not logged in or not a manager
  useEffect(() => {
    if (!user.isLoggedIn || user.role !== "Manager") {
      navigate("/login");
    }
  }, [user.isLoggedIn, user.role, navigate]);

  // Fetch announcements by author_id
  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://api.ezitech.org/announcements/${user.eti_id}`, {
        headers: { "x-access-token": user.token },
       
      });
      setAnnouncements(response.data.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching announcements:", err.message);
      setError("Failed to fetch announcements");
    } finally {
      setLoading(false);
    }
  };

  // Fetch announcements on mount or when search term or user data changes
  useEffect(() => {
    if (user.token && user.eti_id) {
      fetchAnnouncements(searchTerm);
    }
  }, [user.token, user.eti_id, searchTerm]);

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Modal controls
  const handleShowModal = (announcement = null) => {
    setEditingAnnouncement(announcement);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingAnnouncement(null);
  };

  // Form submission with debugging
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const values = {
      title: formData.get("title"),
      message: formData.get("message"),
      author_name: user.username || "Unknown",
      author_id: user.eti_id || "0", // Use eti_id from sessionStorage
    };

    // Debug: Log the user object and payload
    console.log("User object:", user);
    console.log("Payload being sent:", values);

    try {
      if (editingAnnouncement) {
        await axios.put(
          `https://api.ezitech.org/announcements/${editingAnnouncement.id}`,
          values,
          { headers: { "x-access-token": user.token } }
        );
      } else {
        await axios.post("https://api.ezitech.org/announcements", values, {
          headers: { "x-access-token": user.token },
        });
      }
      handleCloseModal();
      fetchAnnouncements(searchTerm);
      setError(null);
    } catch (err) {
      console.error("Error saving announcement:", err.message);
      console.log("Server response:", err.response?.data);
      setError(err.response?.data?.message || "Failed to save announcement");
    }
  };

  // Delete announcement
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://api.ezitech.org/announcements/${id}`, {
        headers: { "x-access-token": user.token },
      });
      fetchAnnouncements(searchTerm);
      setError(null);
    } catch (err) {
      console.error("Error deleting announcement:", err.message);
      setError("Failed to delete announcement");
    }
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
          <div className="content-body mt-3">
            <h2 className="mb-3">Your Announcements</h2>

            {error && (
              <div className="alert alert-danger mb-3">{error}</div>
            )}

            <div className="d-flex justify-content-between mb-3">
              <input
                type="text"
                className="form-control w-25"
                placeholder="Search by title..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <button
                className="btn btn-primary"
                onClick={() => handleShowModal()}
              >
                Add New Announcement
              </button>
            </div>

            <div className="table-responsive mb-3">
              <table className="table table-bordered table-striped">
                <thead className="thead-light">
                  <tr>
                    <th>Title</th>
                    <th>Message</th>
                    <th>Author</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="4" className="text-center">
                        Loading...
                      </td>
                    </tr>
                  ) : announcements.length > 0 ? (
                    announcements.map((announcement) => (
                      <tr key={announcement.id}>
                        <td>{announcement.title}</td>
                        <td>{announcement.message}</td>
                        <td>{announcement.author_name}</td>
                        <td>
                          <button
                            className="btn btn-info btn-sm mr-2"
                            onClick={() => handleShowModal(announcement)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(announcement.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">
                        No announcements found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {showModal && (
              <div className="modal fade show" style={{ display: "block" }}>
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">
                        {editingAnnouncement
                          ? "Edit Announcement"
                          : "Add New Announcement"}
                      </h5>
                      <button
                        type="button"
                        className="close"
                        onClick={handleCloseModal}
                      >
                        <span aria-hidden="true">×</span>
                      </button>
                    </div>
                    <form onSubmit={handleFormSubmit}>
                      <div className="modal-body">
                        <div className="form-group">
                          <label htmlFor="title">Title</label>
                          <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            defaultValue={editingAnnouncement?.title || ""}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="message">Message</label>
                          <textarea
                            className="form-control"
                            id="message"
                            name="message"
                            rows="5"
                            defaultValue={editingAnnouncement?.message || ""}
                            required
                          />
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={handleCloseModal}
                        >
                          Close
                        </button>
                        <button type="submit" className="btn btn-primary">
                          {editingAnnouncement ? "Update" : "Add"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
            {showModal && <div className="modal-backdrop fade show"></div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Announcement;