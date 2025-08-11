import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import WithdrawForm from "../../components/WithdrawForm";
import { useNavigate } from "react-router-dom";

const Withdraw = () => {
  const [showForm, setShowForm] = useState(false);
  const [withdrawRequests, setWithdrawRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("affiliateToken");
    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:8088/api/affiliate/withdraw-requests", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Unauthorized or server error");
        }
        return res.json();
      })
      .then((data) => {
        setWithdrawRequests(data.results || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching withdraw requests:", error);
      });
  }, [navigate]);

  return (
    <Layout>
      <div className="p-6 ">
        <div className="flex justify-end items-end mb-6">
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Request Withdraw
          </button>
        </div>

        <div className="overflow-x-auto bg-white shadow-md rounded-md font-sans">
          <table className="min-w-full text-left border-gray-200 mt-3 text-sm">
            <thead className="bg-gray-100 text-gray-500">
              <tr className="border-b-[1px]">
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-2">Bank</th>
                <th className="px-4 py-2">Account Number</th>
                <th className="px-4 py-2">Account Name</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {withdrawRequests.length > 0 ? (
                withdrawRequests.map((req, index) => (
                  <tr key={req.req_id} className="hover:bg-gray-50 text-gray-500">
                    <td className="px-4 py-4 border-b">{index + 1}</td>
                    <td className="px-4 py-2 border-b">{req.bank}</td>
                    <td className="px-4 py-2 border-b break-words">{req.ac_no}</td>
                    <td className="px-4 py-2 border-b">{req.ac_name}</td>
                    <td className="px-4 py-2 border-b truncate max-w-[150px]">{req.description}</td>
                    <td className="px-4 py-2 border-b">{req.date}</td>
                    <td className="px-4 py-2 border-b">Rs {req.amount}</td>
                    <td className="px-4 py-2 border-b capitalize">
                       <span
                        className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                          req.req_status?.toLowerCase().includes('approved')
                            ? 'bg-green-100 text-green-700'
                            : req.req_status?.toLowerCase().includes('pending')
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {req.req_status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-4 py-6 text-center text-gray-400">
                    No withdraw requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && <WithdrawForm onClose={() => setShowForm(false)} />}
    </Layout>
  );
};

export default Withdraw;
