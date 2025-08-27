import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import StatCard from '../../components/StatCard';
import Loading from '../../components/Loading';
import {
  Users,
  DollarSign,
  CheckCircle,
  Gift,
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const dummyChartData = [
  { name: 'Week 1', referrals: 10 },
  { name: 'Week 2', referrals: 14 },
  { name: 'Week 3', referrals: 7 },
  { name: 'Week 4', referrals: 12 },
];

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalReferrals: 0,
    activeInterns: 0,
    totalEarnings: 0,
    pendingAmount: 0,
  });

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('affiliateToken');

    if (!token) {
      console.log('No token found in localStorage');
      navigate('/login');
      return;
    }

    fetch('http://localhost:8088/api/affiliate/dashboard', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Unauthorized or server error');
        return res.json();
      })
      .then((data) => {
        console.log('Dashboard data:', data);
        setStats(data.stats || {});
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
        localStorage.removeItem('affiliateToken');
        navigate('/login');
      });
  }, []);

  return (
    <Layout>
      <div className="min-h-screen">
        <main className="px-4 py-10 sm:px-6 lg:px-8 animate-fadeIn font-sans">
          {loading ? (
            <Loading text="Loading your dashboard..." />
          ) : (
            <>
              {/* Stat Cards */}
              <div className="flex flex-col lg:flex-row gap-4 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 gap-4 flex-1">
                  <StatCard
                    icon={Users}
                    title="Total Referrals"
                    value={stats.totalReferrals}
                    subtitle="All-time referred users"
                    bgClass="bg-blue-100"
                    textClass="text-blue-600"
                  />
                  <StatCard
                    icon={CheckCircle}
                    title="Active Interns"
                    value={stats.activeInterns}
                    subtitle="Currently active"
                    bgClass="bg-yellow-100"
                    textClass="text-yellow-600"
                  />
                  <StatCard
                    icon={DollarSign}
                    title="Total Earnings"
                    value={`RS. ${stats.totalEarnings}`}
                    subtitle="Total earned amount"
                    bgClass="bg-green-100"
                    textClass="text-green-600"
                  />
                  <StatCard
                    icon={Gift}
                    title="Pending Amount"
                    value={`RS. ${stats.pendingAmount}`}
                    subtitle="Awaiting approval"
                    bgClass="bg-red-100"
                    textClass="text-red-600"
                  />
                </div>

                {/* WhatsApp + Notes */}
                <div className="w-full lg:max-w-sm">
                  <div className="bg-white rounded-md shadow-md p-6 h-full flex flex-col justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-700 mb-2">Read Notes</h2>
                      <p className="text-gray-500 text-sm mb-4">No announcements yet</p>
                    </div>
                    <div>
                      <hr className="my-4" />
                      <div className="flex justify-center">
                        <a
                          href="https://chat.whatsapp.com/your-group-link"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white text-sm font-semibold rounded-lg hover:bg-green-600 transition"
                        >
                          <FaWhatsapp size={18} />
                          Join WhatsApp Group
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chart */}
              <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-8 animate-slideUp">
                <h2 className="text-lg font-semibold mb-4">Referral Trends</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={dummyChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="referrals"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Recent Referrals Table */}
              {/* <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-8 animate-slideUp">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Recent Referrals</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full table-auto text-sm text-left text-gray-700">
                    <thead className="bg-gray-100 text-xs uppercase text-gray-500">
                      <tr>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Date</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Earnings</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-3">Ali Raza</td>
                        <td className="px-4 py-3">July 21, 2025</td>
                        <td className="px-4 py-3 text-green-600 font-medium">Active</td>
                        <td className="px-4 py-3">$20</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3">Fatima Noor</td>
                        <td className="px-4 py-3">July 20, 2025</td>
                        <td className="px-4 py-3 text-yellow-500 font-medium">Pending</td>
                        <td className="px-4 py-3">$0</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3">Usman Khan</td>
                        <td className="px-4 py-3">July 19, 2025</td>
                        <td className="px-4 py-3 text-green-600 font-medium">Active</td>
                        <td className="px-4 py-3">$15</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div> */}

              {/* Leaderboard */}
              <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-8 animate-slideUp">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Top Affiliates</h2>
                <ul className="space-y-3">
                  <li className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">#1 Maria Ahmad</span>
                    <span className="text-blue-600 font-semibold">$1,200</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">#2 Zain Ali</span>
                    <span className="text-blue-600 font-semibold">$980</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">#3 Sara Khan</span>
                    <span className="text-blue-600 font-semibold">$875</span>
                  </li>
                </ul>
              </div>

              {/* Tip Section */}
              <div className="bg-gradient-to-br from-blue-100 to-indigo-200 p-4 sm:p-6 rounded-xl shadow-md animate-slideUp">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">Tip to Earn More</h2>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Promote your referral link on LinkedIn and WhatsApp groups. Affiliates using social sharing earned 40% more last month.
                </p>
              </div>
            </>
          )}
        </main>
      </div>
    </Layout>
  );
};

export default Dashboard;
