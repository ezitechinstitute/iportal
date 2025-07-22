
const { connection } = require('../../config/connection');

// Get affiliate stats
// const getAffiliateStats = (req, res) => {
//   const affiliateId = req.user.id;
//   const sql = `
//     SELECT 
//       COUNT(*) AS total_referrals,
//       SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) AS active_interns,
//       SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completed_interns
//     FROM intern_table
//     WHERE referred_by = ?
//   `;
//   connection.query(sql, [affiliateId], (err, result) => {
//     if (err) return res.status(500).json({ error: 'Failed to get stats', details: err });
//     return res.json(result[0]);
//   });
// };


// Generate referral link
const generateReferralLink = async (req, res) => {
    try {
        const affiliate = req.user;  

        if (!affiliate || !affiliate.id) {
            return res.status(400).json({
                success: false,
                message: "Affiliate data not found"
            });
        }

        
        const sql = 'SELECT referral_code FROM affiliates WHERE id = ? AND status = "active"';
        connection.query(sql, [affiliate.id], (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({
                    success: false,
                    message: "Database error"
                });
            }

            if (results.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Referral code not found"
                });
            }

            const referralCode = results[0].referral_code;
            const baseUrl = process.env.BASE_URL || 'https://ezitech.org';
            const referralLink = `${baseUrl}/intern-register?ref=${referralCode}`;

            res.status(200).json({
                success: true,
                referralLink: referralLink,
                referralCode: referralCode
            });
        });

    } catch (error) {
        console.error('Error generating referral link:', error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};



// Get referred interns
const getReferredInterns = (req, res) => {
  const affiliateId = req.user.id;
  const sql = `
    SELECT name, email, join_date AS joinDate, status, technology 
    FROM intern_table 
    WHERE referred_by = ? 
    ORDER BY join_date DESC
  `;
  connection.query(sql, [affiliateId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to get interns', details: err });
    
    return res.json({results});
  });
};

// Get earnings history
const getEarningsHistory = (req, res) => {
  const affiliateId = req.user.id;
  const sql = `
    SELECT amount, transaction_date AS transactionDate, status
    FROM affiliate_earnings
    WHERE affiliate_id = ?
    ORDER BY transaction_date DESC
  `;
  connection.query(sql, [affiliateId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to get earnings', details: err });
    return res.json(results);
  });
};

// Get dashboard stats
const getDashboardStats = (req, res) => {
  const affiliateId = req.user.id;
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const statsQuery = `
    SELECT 
      COUNT(*) AS totalReferrals,
      SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) AS activeInterns
    FROM intern_table
    WHERE referred_by = ?
  `;
  

  const earningsQuery = `
    SELECT total_earnings AS totalEarnings, pending_amount AS pendingAmount 
    FROM affiliate_earnings 
    WHERE id = ?
  `;

  const chartQuery = `
    SELECT 
      MONTH(created_at) AS month, 
      YEAR(created_at) AS year, 
      COUNT(*) AS count
    FROM intern_table
    WHERE referred_by = ? AND created_at >= ?
    GROUP BY year, month
    ORDER BY year ASC, month ASC
  `;

  connection.query(statsQuery, [affiliateId], (err, statsResults) => {
    if (err) return res.status(500).json({ error: 'Stats query failed', details: err });

    connection.query(earningsQuery, [affiliateId], (err, earningsResults) => {
      if (err) return res.status(500).json({ error: 'Earnings query failed', details: err });

      connection.query(chartQuery, [affiliateId, sixMonthsAgo], (err, chartResults) => {
        if (err) return res.status(500).json({ error: 'Chart query failed', details: err });

        const labels = [];
        const data = [];
        chartResults.forEach(item => {
          labels.push(`${item.month}/${item.year}`);
          data.push(item.count);
        });

        const stats = statsResults[0] || { totalReferrals: 0, activeInterns: 0 };
        const earnings = earningsResults[0] || { totalEarnings: 0, pendingAmount: 0 };

        return res.json({
          stats: {
            totalReferrals: stats.totalReferrals,
            activeInterns: stats.activeInterns,
            totalEarnings: earnings.totalEarnings,
            pendingAmount: earnings.pendingAmount
          },
          chart: {
            labels,
            data
          }
        });
      });
    });
  });
};

module.exports = {
  // getAffiliateStats,
  generateReferralLink,
  getReferredInterns,
  getEarningsHistory,
  getDashboardStats
};
