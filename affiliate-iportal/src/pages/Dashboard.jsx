import React, { useState, useEffect } from 'react';
import { affiliateAPI } from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const response = await affiliateAPI.getDashboardStats();
      setStats(response.data);
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '400px' 
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  if (error) {
    return <div style={{ color: 'red', padding: '20px' }}>{error}</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashbo,,,,ard</h1>
      
      {stats && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
          <div style={{ 
            background: 'white', 
            padding: '20px', 
            borderRadius: '8px', 
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)' 
          }}>
            <h3>Referred Interns</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1976d2' }}>
              {stats.stats?.totalReferrals || 0}
            </p>
          </div>
          
          <div style={{ 
            background: 'white', 
            padding: '20px', 
            borderRadius: '8px', 
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)' 
          }}>
            <h3>Total Earnings</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4caf50' }}>
              Rs. {stats.stats?.totalEarnings || 0}
            </p>
          </div>
          
          <div style={{ 
            background: 'white', 
            padding: '20px', 
            borderRadius: '8px', 
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)' 
          }}>
            <h3>Pending Amount</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ff9800' }}>
              Rs. {stats.stats?.pendingAmount || 0}
            </p>
          </div>
          
          <div style={{ 
            background: 'white', 
            padding: '20px', 
            borderRadius: '8px', 
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)' 
          }}>
            <h3>Conversion Rate</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2196f3' }}>
              {stats.stats?.conversionRate || 0}%
            </p>
          </div>
          
          <div style={{ 
            background: 'white', 
            padding: '20px', 
            borderRadius: '8px', 
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)' 
          }}>
            <h3>Link Clicks</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#9c27b0' }}>
              {stats.stats?.linkClicks || 0}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard; 