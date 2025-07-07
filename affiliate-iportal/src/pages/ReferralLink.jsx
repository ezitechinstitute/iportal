import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { MdContentCopy } from 'react-icons/md';

const ReferralLink = () => {
  const [referralLink, setReferralLink] = useState('');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalClicks: 0,
    uniqueVisitors: 0,
    conversionRate: 0
  });

  useEffect(() => {
    fetchReferralData();
  }, []);

  const fetchReferralData = async () => {
    try {
      const token = localStorage.getItem('affiliateToken');
      const response = await axios.get('http://localhost:5000/api/affiliate/referral-link', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setReferralLink(response.data.referralLink);
      setStats(response.data.stats);
    } catch (error) {
      toast.error('Failed to fetch referral data');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      toast.success('Referral link copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy link');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">My Referral Link</h1>

      {/* Referral Link Card */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Your Unique Referral Link</h2>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={referralLink}
            readOnly
            className="flex-1 p-3 border rounded-lg bg-gray-50"
          />
          <button
            onClick={copyToClipboard}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <MdContentCopy size={20} />
            <span>Copy</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-500 text-sm font-medium">Total Clicks</h3>
          <p className="text-3xl font-bold">{stats.totalClicks}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-500 text-sm font-medium">Unique Visitors</h3>
          <p className="text-3xl font-bold">{stats.uniqueVisitors}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-500 text-sm font-medium">Conversion Rate</h3>
          <p className="text-3xl font-bold">{stats.conversionRate}%</p>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-white rounded-lg shadow-md p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4">How to Use Your Referral Link</h2>
        <ol className="list-decimal list-inside space-y-3 text-gray-700">
          <li>Share your unique referral link with potential interns</li>
          <li>When someone registers through your link, they'll be automatically tracked as your referral</li>
          <li>You'll earn a commission for each successful registration</li>
          <li>Track your referrals and earnings in the dashboard</li>
        </ol>
      </div>
    </div>
  );
};

export default ReferralLink; 