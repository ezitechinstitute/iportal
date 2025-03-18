import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const CreateLeave = ({ onClose }) => {
  const navigate = useNavigate();
  const check = sessionStorage.getItem("isLoggedIn");
  const name = sessionStorage.getItem("username");
  const email = sessionStorage.getItem("email");
  const eziId = sessionStorage.getItem("eziId");

  useEffect(() => {
    if (!check) {
      navigate("/");
    }
  }, [check, navigate]);

  const [data, setData] = useState({
    fromDate: "",
    toDate: "",
    reason: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  // Calculate leave duration using useMemo to prevent unnecessary re-renders
  const durationDays = useMemo(() => {
    if (data.fromDate && data.toDate) {
      const fromDate = new Date(data.fromDate);
      const toDate = new Date(data.toDate);
      return Math.max(0, Math.floor((toDate - fromDate) / (1000 * 60 * 60 * 24)));
    }
    return 0;
  }, [data.fromDate, data.toDate]);

  const SubmitRequest = async () => {
    const leaveData = {
      data: {
        ...data,
        durationDays,
        intName: name,
        intEmail: email,
        id: eziId,
      },
    };

    if (leaveData.data.toDate && leaveData.data.fromDate && leaveData.data.durationDays >= 0 && leaveData.data.reason) {
      try {
        let attempts = 0;
        const maxAttempts = 3;
        let response;

        // Retry logic
        while (attempts < maxAttempts) {
          try {
            response = await axios.post("https://api.ezitech.org/int-leave-request", leaveData);
            break; // Exit loop if successful
          } catch (err) {
            attempts += 1;
            if (attempts >= maxAttempts) throw err;
            console.log(`Retrying request... attempt ${attempts}`);
            await new Promise(resolve => setTimeout(resolve, 2000));  // Wait for 2 seconds before retrying
          }
        }

        alert(response.data.message);
        onClose();  // Close modal after successful request
      } catch (err) {
        console.error("Error submitting leave request:", err);
        alert("Server is temporarily unavailable. Please try again later.");
      }
    } else {
      alert("Please fill in all required fields.");
    }
  };

  return (
    <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Leave Request</h5>
            <button type="button" className="close" onClick={onClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="fromDate">From</label>
              <input
                type="date"
                name="fromDate"
                onChange={handleInput}
                className="form-control"
                value={data.fromDate}
              />
            </div>
            <div className="form-group">
              <label htmlFor="toDate">To</label>
              <input
                type="date"
                name="toDate"
                onChange={handleInput}
                className="form-control"
                value={data.toDate}
              />
            </div>
            <div className="form-group">
              <label htmlFor="duration">Duration (Days)</label>
              <input
                value={durationDays || ""}
                type="text"
                name="duration"
                className="form-control"
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor="reason">Reason</label>
              <textarea
                name="reason"
                className="form-control"
                placeholder="Write reason here..."
                onChange={handleInput}
                value={data.reason}
              ></textarea>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-success" onClick={SubmitRequest}>
              Submit Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
