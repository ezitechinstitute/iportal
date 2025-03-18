import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ManagerTopbar } from "../components/ManagerTopbar";
import { ManagerSidebar } from "../components/ManagerSidebar";

export const RecipientPaymentVoucher = () => {
  const [token] = useState(sessionStorage.getItem("token"));
  const [vouchers, setVouchers] = useState([]);
  const navigate = useNavigate();
  const check = sessionStorage.getItem("isLoggedIn");
  const eti_id = sessionStorage.getItem("etiid");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!check) {
      navigate("/");
    }
  }, [check, navigate]);

  const fetchVouchersByManagerId = async () => {
    if (!eti_id) {
      console.error("eti_id is null or undefined");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.ezitech.org/get-payment/recipient/${eti_id}`,
        {
          headers: { "x-access-token": token },
        }
      );
      setVouchers(res.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching vouchers:", error);
      setLoading(false);
    }
  };

  const updateStatus = async (voucherId, newStatus) => {
    try {
      const response = await axios.put(
        `https://api.ezitech.org/edit-payment/recipient/${eti_id}`,
        { status: newStatus },
        { headers: { "x-access-token": token } }
      );
      if (response.data.success) {
        fetchVouchersByManagerId();
      }
    } catch (error) {
      console.error(
        "Error updating status:",
        error.response?.data?.message || error.message
      );
    }
  };

  useEffect(() => {
    fetchVouchersByManagerId();
  }, [eti_id]);

  return (
    <>
      <ManagerTopbar />
      <ManagerSidebar />
      <div className="app-content content">
        <div className="content-overlay"></div>
        <div className="header-navbar-shadow"></div>
        <div className="content-wrapper">
          <div className="content-header row">
            <h1 className="content-header-title">
              Payment Vouchers for Manager ID: {eti_id}
            </h1>
          </div>
          <div className="content-body">
            <section id="dashboard-ecommerce">
              <div className="row" id="table-hover-animation">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title">Payment Vouchers</h4>
                    </div>
                    <div className="card-body overflow-x-auto">
                      {!eti_id ? (
                        <div className="alert alert-danger" role="alert">
                          Error: eti_id is missing. Please log in again.
                        </div>
                      ) : (
                        <div className="table-responsive">
                          <table className="table table-bordered table-hover align-middle">
                            <thead className="table-light">
                              <tr>
                                <th>Recipient</th>
                                <th>Account No</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {loading ? (
                                <tr>
                                  <td colSpan="6" className="text-center">
                                    <h4>Loading...</h4>
                                  </td>
                                </tr>
                              ) : Array.isArray(vouchers) && vouchers.length > 0 ? (
                                vouchers.map(
                                  ({
                                    id,
                                    recipient_name,
                                    recipient_id,
                                    admin_account_no,
                                    amount,
                                    date,
                                    status,
                                  }) => (
                                    <tr key={id}>
                                      <td className="fw-bold">
                                        {recipient_name} ({recipient_id})
                                      </td>
                                      <td className="text-secondary">{admin_account_no || "N/A"}</td>
                                      <td className="text-primary">{amount.toFixed(2)}</td>
                                      <td>{new Date(date).toLocaleDateString()}</td>
                                      <td>
                                        <span
                                          className={`badge ${
                                            status === "Pending" ? "bg-warning" : "bg-success"
                                          }`}
                                        >
                                          {status}
                                        </span>
                                      </td>
                                      <td>
                                        <select
                                          value={status}
                                          onChange={(e) => updateStatus(id, e.target.value)}
                                          className="form-select w-auto"
                                          disabled={status === "Paid"} // Disable if Paid
                                        >
                                          <option value="Pending">Pending</option>
                                          <option value="Paid">Received</option>
                                        </select>
                                      </td>
                                    </tr>
                                  )
                                )
                              ) : (
                                <tr>
                                  <td colSpan="6" className="text-center">
                                    <h5 className="text-muted">No data found</h5>
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
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
