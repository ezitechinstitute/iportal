import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AttendaceButton } from "../AttendaceButton";
import InternTopbar from "../InternTopbar/InternTopbar";
import InternSidebar from "../InternSidebar";
import axios from "axios";

export const Attendence = () => {
  const [attendance, setAttendance] = useState([]);
  const token = sessionStorage.getItem("token");
  const id = sessionStorage.getItem("eziId");
  const currentYear = new Date().getFullYear();
  useEffect(() => {
    const GetAttendance = async () => {
      try {
        const res = await axios.get(
          `https://api.ezitech.org/get-intern-attendance`,
          { params: { id: id }, headers: { "x-access-token": token } }
        );
        setAttendance(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    GetAttendance();
  }, []); // ✅ No infinite loop!

  const calculateWorkingHours = (start, end) => {
    const startTime = new Date(start);
    const endTime = new Date(end);
    const diffMs = endTime - startTime; // Time difference in milliseconds

    if (diffMs <= 0) return "00 Hours 00 Minutes 00 Sec"; // Prevent negative time

    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

    // Format the time as "X Hours Y Minutes Z Sec"
    return `${hours} Hours ${minutes} Minutes ${seconds} Sec`;
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
            <AttendaceButton />
            <div className="table-responsive">
              <table className="table table-striped table-bordered text-center">
                <thead className="thead-light">
                  <tr>
                    <th>DATE</th>
                    <th>IN-TIME</th>
                    <th>OFF-TIME</th>
                    <th>HOURS WORKING</th>
                    <th>STATUS</th>
                  </tr>
                </thead>
                <tbody style={{ color: "red" }}>
                  {attendance.length > 0 ? (
                    attendance.map((res, index) => {
                      const { start_shift, end_shift, status } = res;
                      const startDate = new Date(start_shift);
                      const endDate = new Date(end_shift);

                      return (
                        <tr key={index}>
                          <td>{start_shift.slice(0, 10)}</td>
                          <td>{startDate.toLocaleTimeString("en-PK")}</td>
                          <td>{endDate.toLocaleTimeString("en-PK")}</td>
                          <td>{calculateWorkingHours(start_shift, end_shift)}</td>
                          <td>
                            <span
                              className={`badge ${status === 1 ? "badge-success" : "badge-danger"}`}
                            >
                              {status === 1 ? "Present" : "Absent"}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-muted">
                        No attendance records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <footer className="footer footer-static footer-light" style={{ padding: "0px", margin: "0px", marginTop: "154px" }}>
            <div></div>
            <p className="clearfix mb-0" style={{ marginLeft: "10px" }}>
              <span className="mt-25">
                COPYRIGHT &copy; 2016-{currentYear}
                <a className="ml-25" href="https://ezitech.org/html-css-internship-opportunities/" target="_blank" rel="noopener noreferrer">
                  Ezitech Institute
                </a>
                <span className="d-none d-sm-inline-block">, All rights Reserved</span>
              </span>
            </p>
          </footer>
        </div>
      </div>
    </>
  );
};
