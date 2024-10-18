import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AttendaceButton } from "../AttendaceButton";
import Page_Attendence from "../Page_Attendence/Page_Attendence";
import InternTopbar from "../InternTopbar/InternTopbar";
import InternSidebar from "../InternSidebar";
import axios from "axios";

export const Attendence = () => {
  const checkLoggedIn = sessionStorage.getItem("isLoggedIn");
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [attendance, setAttendance] = useState([]);

  const GetAttendance = async () => {
    try {
      const res = await axios.get(
        "https://api.ezitech.org/get-intern-attendance",
        { headers: { "x-access-token": token } }
      );
      setAttendance(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetAttendance();
    console.log(attendance);
  }, [GetAttendance]);
  return (
    <>
      <InternTopbar />
      <InternSidebar />
      <div className="app-content content ">
        <div className="content-overlay"></div>
        <div className="header-navbar-shadow"></div>
        <div className="content-wrapper">
          <div className="content-header row"></div>
          <div className="content-body">
            <AttendaceButton />
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>DATE</th>
                    <th>To</th>
                    <th>FROM</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendance.map((res) => {
                    const { start_shift, end_shift } = res;
                    const isoStartDate = start_shift;
                    const startDate = new Date(isoStartDate);
                    const startLocal = startDate.toLocaleTimeString();

                    const isoEndDate = end_shift;
                    const endDate = new Date(isoEndDate);
                    const endLocal = endDate.toLocaleTimeString();
                    return (
                      <>
                        <tr>
                          <td>{res.start_shift.slice(0, 10)}</td>
                          <td>{startLocal}</td>
                          <td>{endLocal}</td>
                          {res.status === 0 ? (
                            <>
                              <td>
                                <button className="btn btn-danger" disabled>
                                  Absent
                                </button>
                              </td>
                            </>
                          ) : (
                            <td>
                              <button className="btn btn-success" disabled>
                                Present
                              </button>
                            </td>
                          )}
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <footer
            className="footer footer-static footer-light"
            style={{ padding: "0px", margin: "0px", marginTop: "154px" }}
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
                <a
                  href="https://www.facebook.com/"
                  style={{ color: "#75727f" }}
                >
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
      </div>
    </>
    // <div>Attendence</div>
  );
};
