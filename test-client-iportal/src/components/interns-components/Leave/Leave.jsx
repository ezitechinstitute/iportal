import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import InternTopbar from "../InternTopbar/InternTopbar";
import InternSidebar from "../InternSidebar";
import { CreateLeave } from "./CreateLeave";
import axios from "axios";

const Leave = () => {
  const navigate = useNavigate();
  const [leaves, setLeaves] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const currentYear = new Date().getFullYear();
  const checkLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
  const eziId = sessionStorage.getItem("eziId");

  useEffect(() => {
    if (!checkLoggedIn) {
      navigate("/");
    }
  }, [checkLoggedIn, navigate]);

  const GetInterLeaves = useCallback(async () => {
    try {
      const res = await axios.get("https://api.ezitech.org/get-intern-leaves", {
        params: { id: eziId },
      });
      setLeaves(res.data);
    } catch (err) {
      console.error("Error fetching leave data:", err);
    }
  }, [eziId]);

  useEffect(() => {
    GetInterLeaves();
  }, [GetInterLeaves]);

  const getStatusBadge = (leave_status) => { // Updated parameter name
    const statusMapping = {
      null: { text: "Pending", className: "badge-primary" },
      0: { text: "Rejected", className: "badge-danger" },
      1: { text: "Approved", className: "badge-success" },
    };
    return statusMapping[leave_status] ? (
      <span className={`badge badge-pill badge-glow ${statusMapping[leave_status].className}`}>
        {statusMapping[leave_status].text}
      </span>
    ) : null;
  };
  

  return (
    <>
      <InternTopbar />
      <InternSidebar />
      <div className="app-content content">
        <div className="content-overlay"></div>
        <div className="header-navbar-shadow"></div>
        <div className="content-wrapper">
          <div className="content-header row"></div>
          <div className="content-body mt-3">
            <div>
              <button className="btn btn-warning" onClick={() => setShowModal(true)}>
                Leave Request
              </button>
            </div>

            {/* Leave Table */}
            <div className="table-responsive mt-1">
              <table className="table table-striped table-hover table-bordered text-center">
                <thead className="thead-light">
                  <tr>
                    <th>ETI-ID</th>
                    <th>NAME</th>
                    <th>FROM</th>
                    <th>TO</th>
                    <th>REASON</th>
                    <th>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(leaves) && leaves.length > 0 ? (
                    leaves.map(({ eti_id, name, from_date, to_date, reason, leave_status }) => (
                      <tr key={eti_id}>
                        <td className="font-weight-bold">{eti_id}</td>
                        <td>{name}</td>
                        <td className="text-right">{new Date(from_date).toLocaleDateString()}</td>
                        <td className="text-right">{new Date(to_date).toLocaleDateString()}</td>
                        <td>{reason}</td>
                        <td>{getStatusBadge(leave_status)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-muted">
                        No leave records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Leave Request Modal */}
        {showModal && <CreateLeave onClose={() => setShowModal(false)} />}

        {/* Footer */}
        <footer className="footer footer-static footer-light" style={{ padding: "0px", margin: "0px", marginTop: "195px" }}>
          <div></div>
          <p className="clearfix mb-0" style={{ marginLeft: "10px" }}>
            <span className="mt-25">
              COPYRIGHT &copy; 2016-{currentYear}
              <a
                className="ml-25"
                href="https://ezitech.org/html-css-internship-opportunities/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ezitech Institute
              </a>
              <span className="d-none d-sm-inline-block">, All rights Reserved</span>
            </span>
            <span className="float-md-right d-none d-md-block">
              <a href="https://www.facebook.com/" style={{ color: "#75727f" }}>
                <i className="mr-1" data-feather="facebook" style={{ color: "#5E5873" }}></i>
              </a>
              <a href="https://www.instagram.com/">
                <i className="mr-1" data-feather="instagram" style={{ color: "#75727f", marginLeft: "15px" }}></i>
              </a>
              <a href="https://www.linkedin.com/">
                <i className="mr-1" data-feather="linkedin" style={{ color: "#75727f", marginLeft: "15px" }}></i>
              </a>
              <a href="https://twitter.com/i/flow/login">
                <i className="mr-1" data-feather="youtube" style={{ color: "#75727f", marginLeft: "15px" }}></i>
              </a>
            </span>
          </p>
        </footer>
      </div>
    </>
  );
};

export default Leave;
