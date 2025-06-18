import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

export const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  // const token = searchParams.get("token");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const token = useParams();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://api.ezitech.org/intern-reset-password",
        {
          token,
          newPassword,
        }
      );
      alert(res.data.message);
      navigate("/");
    } catch (error) {
      console.error("Error resetting password:", error);
      alert("Failed to reset password.");
    }
  };

  return (
    <div className="auth-wrapper auth-v2">
      <div className="auth-inner row m-0">
        <div className="d-flex col-lg-4 align-items-center auth-bg px-2 p-lg-5">
          <div className="col-12 col-sm-8 col-md-6 col-lg-12 px-xl-2 mx-auto">
            <h4 className="card-title mb-1">Reset Password</h4>
            <form onSubmit={handleResetPassword}>
              <div className="form-group">
                <label className="form-label" htmlFor="new-password">
                  New Password
                </label>
                <input
                  className="form-control"
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  required
                />
              </div>
              <button className="btn btn-primary btn-block" type="submit">
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
