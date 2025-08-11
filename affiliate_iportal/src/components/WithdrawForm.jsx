import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WithdrawForm = ({ onClose }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    bankname: "",
    accountName: "",
    accountNumber: "",
    description: "",
    amount: ""
  });

  const [affiliateInfo, setAffiliateInfo] = useState({ req_by: "", eti_id: "" });
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [loading, setLoading] = useState(false);
  const [amountError, setAmountError] = useState("");

  // Load affiliate profile and earnings
  useEffect(() => {
    const token = localStorage.getItem("affiliateToken");
    if (!token) {
      navigate("/login");
      return;
    }

    // Fetch profile
    axios.get("http://localhost:8088/api/affiliate/profile", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      const { email, referral_code } = res.data;
      setAffiliateInfo({ req_by: email, eti_id: referral_code });
    })
    .catch(() => {
      localStorage.removeItem("affiliateToken");
      navigate("/login");
    });

    // Fetch earnings
    axios.get("http://localhost:8088/api/affiliate/earnings", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      setTotalEarnings(res.data?.[0]?.totalEarnings || 0);
    })
    .catch(() => {
      localStorage.removeItem("affiliateToken");
      navigate("/login");
    });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setAmountError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("affiliateToken");
    if (!token) {
      toast.error("Login required.");
      return;
    }

    const { amount } = formData;
    if (parseFloat(amount) > totalEarnings || parseFloat(amount) <= 0) {
      setAmountError(`You can only withdraw up to Rs ${totalEarnings}`);
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8088/api/affiliate/withdraw", {
        bank: formData.bankname,
        ac_name: formData.accountName,
        ac_no: formData.accountNumber,
        description: formData.description,
        amount: formData.amount,
        req_by: affiliateInfo.req_by,
        eti_id: affiliateInfo.eti_id
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      toast.success("Withdrawal request submitted successfully.");
      onClose();
    } catch (err) {
      const msg = err.response?.data?.message || "Something went wrong.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4 sm:px-6">
      <div className="bg-white rounded-lg shadow-lg w-full py-3 max-w-md sm:max-w-lg md:max-w-xl p-6 relative animate-fadeIn">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-700">Withdraw Request</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black text-2xl font-bold">
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-gray-600 text-sm">
          <div>
            <label className="block mb-1 font-medium">Bank Name</label>
            <input
              type="text"
              name="bankname"
              value={formData.bankname}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:shadow-md focus:border-[#9086F3]"
              placeholder="Enter bank name"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Account Name</label>
            <input
              type="text"
              name="accountName"
              value={formData.accountName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:shadow-md focus:border-[#9086F3]"
              placeholder="Enter account name"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Account Number</label>
            <input
              type="text"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:shadow-md focus:border-[#9086F3]"
              placeholder="Enter account number"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:shadow-md focus:border-[#9086F3]"
              placeholder="Enter description (optional)"
              rows={3}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Amount to Withdraw</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:shadow-md focus:border-[#9086F3]"
              placeholder="0.00"
              required
            />
            {amountError && <p className="text-red-500 text-xs mt-1">{amountError}</p>}
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition duration-200"
            >
              {loading ? "Submitting..." : "Submit Request"}
            </button>
          </div>
        </form>
      </div>
      
    </div>
  );
};

export default WithdrawForm;
