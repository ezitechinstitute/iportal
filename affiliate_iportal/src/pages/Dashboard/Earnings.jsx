import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { useNavigate } from 'react-router-dom';
import StatCard from '../../components/StatCard'; // Make sure this path is correct

import {
  DollarSign,
  CreditCard,
  Clock,
  CheckCircle,
} from 'lucide-react';

const Earnings = () => {
  const [earningHistory, setEarningHistory] = useState([]);
  const [stats, setStats] = useState({
    totalEarnings: 0,
    withdrawn: 0,
    pendingPayouts: 0,
    successfulPayouts: 0,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('affiliateToken');

    if (!token) {
      console.log("No token found in localStorage");
      navigate("/login");
      return;
    }

    fetch('http://localhost:8088/api/affiliate/earnings', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Unauthorized or server error');
        }
        return res.json();
      })
      .then((data) => {
        // console.log("Earnings data:", data);
        setStats(data);
        setEarningHistory(data.history || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching earnings data:", error);
        setLoading(false);
        localStorage.removeItem("affiliateToken");
        navigate("/login");
      });
  }, [navigate]);


  const earningsStats = [
    {
      title: 'Total Earnings',
      value: `Rs. ${stats?.totalEarnings || 0}`,
      icon: DollarSign,
      bgClass: 'bg-pink-100',
      textClass: 'text-pink-600',
      subtitle: 'Lifetime earnings',
    },
    {
      title: 'Withdrawn',
      value: `Rs. ${stats?.withdrawn || 0}`,
      icon: CreditCard,
      bgClass: 'bg-blue-100',
      textClass: 'text-blue-600',
      subtitle: 'Total amount withdrawn',
    },
    {
      title: 'Pending Payouts',
      value: `Rs. ${stats?.pendingPayouts || 0}`,
      icon: Clock,
      bgClass: 'bg-orange-100',
      textClass: 'text-orange-600',
      subtitle: 'Waiting for approval',
    },
    {
      title: 'Successful Payouts',
      value: stats?.successfulPayouts || 0,
      icon: CheckCircle,
      bgClass: 'bg-green-100',
      textClass: 'text-green-600',
      subtitle: 'Total completed transactions',
    },
  ];



  return (
    <Layout>
      <div className="min-h-screen pt-10 p-6 animate-fadeIn">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg: xl:grid-cols-4 gap-6 mb-8">
          {earningsStats.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              title={stat.title}
              value={stat.value}
              subtitle={stat.subtitle}
              bgClass={stat.bgClass}
              textClass={stat.textClass}
            />
          ))}

        </div>

        {/* Earning History Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Earning History</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="px-6 py-3 text-left">Date</th>
                  <th className="px-6 py-3 text-left">Description</th>
                  <th className="px-6 py-3 text-left">Amount</th>
                  <th className="px-6 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {earningHistory.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-6">No earnings yet.</td>
                  </tr>
                ) : (
                  earningHistory.map((item, idx) => (
                    <tr key={idx} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">{item.date}</td>
                      <td className="px-6 py-4">{item.description || 'N/A'}</td>
                      <td className={`px-6 py-4 font-medium ${item.amount > 0 ? 'text-green-600' : 'text-red-500'}`}>
                        {item.amount > 0 ? `+$${item.amount}` : `-$${Math.abs(item.amount)}`}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${item.status === 'Completed'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'}`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <style jsx>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fadeIn {
            animation: fadeIn 0.5s ease-in;
          }
        `}</style>
      </div>
    </Layout>
  );
};

export default Earnings;
