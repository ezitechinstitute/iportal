import Layout from '../../components/Layout';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Interns = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('affiliateToken');

    if (!token) {
      console.log("No token found in localStorage");
      navigate("/login");
      return;
    }

    fetch('http://localhost:8088/api/affiliate/interns', {
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
        console.log("Interns data:", data);
        setStats(data?.results || []); 
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching interns:", error);
        setLoading(false);
        localStorage.removeItem("affiliateToken");
        navigate("/login");
      });
  }, [navigate]);

  return (
    <Layout>
      <div className="min-h-screen mt-4 p-4 sm:p-6 animate-fadeIn">

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto pt-3 bg-white shadow rounded-md">
          <table className="min-w-full divide-y divide-gray-200  sm:text-base font-sans">
            <thead className="bg-gray-100 text-gray-600">
              <tr className=' text-sm'>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Join Date</th>
                <th className="px-4 py-3 text-left">Technology</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {stats.length > 0 ? (
                stats.map((intern, index) => (
                  <tr key={index} className="hover:bg-gray-50 text-gray-500">
                    <td className="px-4 py-3 whitespace-nowrap">{intern.name}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{intern.email}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {new Date(intern.joinDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap capitalize">{intern.technology}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                          intern.status?.toLowerCase().includes('completed')
                            ? 'bg-green-100 text-green-700'
                            : intern.status?.toLowerCase().includes('ongoing')
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {intern.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-400">No interns found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {stats.length > 0 ? (
            stats.map((intern, index) => (
              <div key={index} className="bg-white p-4 rounded-xl shadow border border-gray-200">
                <div className="font-semibold text-lg text-gray-800">{intern.name}</div>
                <div className="text-sm text-gray-600">{intern.email}</div>
                <div className="mt-2 flex flex-col space-y-1 text-sm text-gray-700">
                  <div>
                    <span className="font-medium">Join Date:</span>{' '}
                    {new Date(intern.joinDate).toLocaleDateString()}
                  </div>
                  <div>
                    <span className="font-medium">Technology:</span> {intern.technology}
                  </div>
                  <div>
                    <span className="font-medium">Status:</span>{' '}
                    <span
                      className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                        intern.status?.toLowerCase().includes('complete')
                          ? 'bg-green-100 text-green-700'
                          : intern.status?.toLowerCase().includes('pending')
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {intern.status}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400">No interns found.</div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Interns;
