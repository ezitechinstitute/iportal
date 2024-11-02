import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AttendaceButton } from "../AttendaceButton";
import InternTopbar from "../InternTopbar/InternTopbar";
import InternSidebar from "../InternSidebar";
import { CreateLeave } from "./CreateLeave";
import axios from "axios";

const Leave = () => {
  const checkLoggedIn = sessionStorage.getItem("isLoggedIn");
  const navigate = useNavigate();
  const [leaves, setLeaves] = useState([]);
  // const eziId = sessionStorage.getItem("eziId");
  const eziId = "EZI-23-5-24/7832";

  if (!checkLoggedIn) {
    navigate("/");
  }

  const GetInterLeaves = async () => {
    await axios
      .get(`http://localhost:8800/get-intern-leaves`, {
        params: {
          id: eziId,
        },
      })
      .then((res) => {
        setLeaves(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    GetInterLeaves();
  }, [GetInterLeaves]);
  return (
    <>
      <InternTopbar />
      <InternSidebar />
      <div className="app-content content">
        <div className="content-overlay"></div>
        <div className="header-navbar-shadow"></div>
        <div className="content-wrapper">
          <div className="content-header row"></div>
          <div className="content-body">
            <div>
              <button
                className="btn btn-warning"
                data-toggle="modal"
                data-target="#leaveRequest"
              >
                Leave Request
              </button>
            </div>

            {/* Basic Tables start */}
            <div className="table-responsive mt-1">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>ETI-ID</th>
                    <th>NAME</th>
                    <th>DATE</th>
                    <th>TO</th>
                    <th>FROM</th>
                    <th>REASON</th>
                    <th>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {
                    Array.isArray(leaves) ? leaves.map((res) => {
                      const {eti_id, name, from_date, to_date, }
                    })
                  } */}
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* Leave Modal */}
        <CreateLeave />
        <footer
          className="footer footer-static footer-light"
          style={{ padding: "0px", margin: "0px", marginTop: "195px" }}
        >
          <div></div>
          <p className="clearfix mb-0" style={{ marginLeft: "10px" }}>
            <span className="mt-25">
              COPYRIGHT &copy; 2024
              <a
                className="ml-25"
                href="https://ezitech.org/html-css-internship-opportunities/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ezitech Institute
              </a>
              <span className="d-none d-sm-inline-block">
                , All rights Reserved
              </span>
            </span>
            <span className="float-md-right d-none d-md-block">
              <a href="https://www.facebook.com/" style={{ color: "#75727f" }}>
                <i
                  className="mr-1"
                  data-feather="facebook"
                  style={{ color: "#5E5873" }}
                ></i>
              </a>
              <a href="https://www.instagram.com/">
                <i
                  className="mr-1"
                  data-feather="instagram"
                  style={{ color: "#75727f", marginLeft: "15px" }}
                ></i>
              </a>
              <a href="https://www.linkedin.com/">
                <i
                  className="mr-1"
                  data-feather="linkedin"
                  style={{ color: "#75727f", marginLeft: "15px" }}
                ></i>
              </a>
              <a href="https://twitter.com/i/flow/login">
                <i
                  className="mr-1"
                  data-feather="youtube"
                  style={{ color: "#75727f", marginLeft: "15px" }}
                ></i>
              </a>
            </span>
          </p>
        </footer>
      </div>
    </>
  );
};

export default Leave;
