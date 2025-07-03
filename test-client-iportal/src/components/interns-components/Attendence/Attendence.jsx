import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AttendaceButton } from "../AttendaceButton";
import InternTopbar from "../InternTopbar/InternTopbar";
import InternSidebar from "../InternSidebar";
import axios from "axios";
import {Footer} from '../../Footer';

const Attendence = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const token = sessionStorage.getItem("token");
  const id = sessionStorage.getItem("eziId");
  const currentYear = new Date().getFullYear();
  
  useEffect(() => {
    const GetAttendance = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://api.ezitech.org/get-intern-attendance`,
          { params: { id: id }, headers: { "x-access-token": token } }
        );
        
        // Debug: Log the response to see its structure
        console.log('API Response:', res.data);
        console.log('Response type:', typeof res.data);
        console.log('Is array:', Array.isArray(res.data));
        
        // Handle different response structures
        if (Array.isArray(res.data)) {
          setAttendance(res.data);
        } else if (res.data && Array.isArray(res.data.data)) {
          // If response is like { data: [...] }
          setAttendance(res.data.data);
        } else if (res.data && Array.isArray(res.data.attendance)) {
          // If response is like { attendance: [...] }
          setAttendance(res.data.attendance);
        } else {
          // If it's a single object, wrap it in an array
          setAttendance(res.data ? [res.data] : []);
        }
        
        setError(null);
      } catch (error) {
        console.error('Error fetching attendance:', error);
        setError(error.message);
        setAttendance([]);
      } finally {
        setLoading(false);
      }
    };

    GetAttendance();
  }, [id, token]);

  const calculateWorkingHours = (start, end) => {
    if (!start || !end) return "00 Hours 00 Minutes 00 Sec";
    
    const startTime = new Date(start);
    const endTime = new Date(end);
    
    // Check if dates are valid
    if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
      return "Invalid Time";
    }
    
    const diffMs = endTime - startTime;

    if (diffMs <= 0) return "00 Hours 00 Minutes 00 Sec";

    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

    return `${hours} Hours ${minutes} Minutes ${seconds} Sec`;
  };

  // Show loading state
  if (loading) {
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
              <div className="text-center">
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
                <p>Loading attendance records...</p>
              </div>
              <Footer/>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Show error state
  if (error) {
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
              <div className="alert alert-danger text-center">
                <h4>Error Loading Attendance</h4>
                <p>{error}</p>
                <button 
                  className="btn btn-primary" 
                  onClick={() => window.location.reload()}
                >
                  Retry
                </button>
              </div>
              <Footer/>
            </div>
          </div>
        </div>
      </>
    );
  }

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
                  {Array.isArray(attendance) && attendance.length > 0 ? (
                    attendance.map((res, index) => {
                      const { start_shift, end_shift, status } = res;
                      
                      // Handle cases where start_shift or end_shift might be null
                      if (!start_shift) {
                        return (
                          <tr key={index}>
                            <td colSpan="5" className="text-muted">
                              Invalid attendance record
                            </td>
                          </tr>
                        );
                      }
                      
                      const startDate = new Date(start_shift);
                      const endDate = end_shift ? new Date(end_shift) : null;

                      return (
                        <tr key={index}>
                          <td>{start_shift.slice(0, 10)}</td>
                          <td>{startDate.toLocaleTimeString("en-PK")}</td>
                          <td>{endDate ? endDate.toLocaleTimeString("en-PK") : "Not logged out"}</td>
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
            <Footer/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Attendence;