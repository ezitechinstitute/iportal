const Affiliate = require("../../models/Affiliate");
const Intern = require("../../models/Intern");
const AffiliateEarning = require("../../models/AffiliateEarning");

// Get affiliate stats
const getAffiliateStats = async (req, res) => {
  try {
    const affiliateId = req.user.id;

    const stats = await Intern.aggregate([
      {
        $match: { referredBy: affiliateId }
      },
      {
        $group: {
          _id: null,
          total_referrals: { $sum: 1 },
          active_interns: {
            $sum: { $cond: [{ $eq: ['$status', 'active'] }, 1, 0] }
          },
          completed_interns: {
            $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
          }
        }
      }
    ]);

    const result = stats[0] || {
      total_referrals: 0,
      active_interns: 0,
      completed_interns: 0
    };

    return res.json(result);
  } catch (error) {
    console.error("Stats error:", error);
    return res.status(500).json({ error: "Failed to get stats", details: error.message });
  }
};

// Get referred interns
const getReferredInterns = async (req, res) => {
  try {
    const affiliateId = req.user.id;

    const interns = await Intern.find({ referredBy: affiliateId })
      .select('name email joinDate status technology')
      .sort('-joinDate');

    return res.json(interns);
  } catch (error) {
    console.error("Query error:", error);
    return res.status(500).json({ error: "Failed to get interns", details: error.message });
  }
};

// Get earnings history
const getEarningsHistory = async (req, res) => {
  try {
    const affiliateId = req.user.id;

    const earnings = await AffiliateEarning.find({ affiliateId })
      .select('amount transactionDate status')
      .sort('-transactionDate');

    return res.json(earnings);
  } catch (error) {
    console.error("Query error:", error);
    return res.status(500).json({ error: "Failed to get earnings", details: error.message });
  }
};

// Get dashboard stats
const getDashboardStats = async (req, res) => {
  try {
    const affiliateId = req.user.id;

    // Get total referrals and active interns
    const [referralStats, affiliate] = await Promise.all([
      Intern.aggregate([
        {
          $match: { referredBy: affiliateId }
        },
        {
          $group: {
            _id: null,
            totalReferrals: { $sum: 1 },
            activeInterns: {
              $sum: { $cond: [{ $eq: ['$status', 'active'] }, 1, 0] }
            }
          }
        }
      ]),
      Affiliate.findById(affiliateId).select('totalEarnings pendingAmount')
    ]);

    // Get monthly referral data for chart (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyReferrals = await Intern.aggregate([
      {
        $match: {
          referredBy: affiliateId,
          createdAt: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            month: { $month: '$createdAt' },
            year: { $year: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    // Format chart data
    const labels = [];
    const data = [];
    monthlyReferrals.forEach(item => {
      labels.push(`${item._id.month}/${item._id.year}`);
      data.push(item.count);
    });

    const stats = referralStats[0] || { totalReferrals: 0, activeInterns: 0 };

    res.json({
      stats: {
        totalReferrals: stats.totalReferrals,
        activeInterns: stats.activeInterns,
        totalEarnings: affiliate?.totalEarnings || 0,
        pendingAmount: affiliate?.pendingAmount || 0
      },
      chart: {
        labels,
        data
      }
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    return res.status(500).json({ error: "Failed to get dashboard stats", details: error.message });
  }
};

module.exports = {
  getAffiliateStats,
  getReferredInterns,
  getEarningsHistory,
  getDashboardStats
}; 