const express = require("express");
const router = express.Router();
const { verifyToken, loginLimiter, apiLimiter } = require('../middleware/auth');

// Import affiliate controllers
const {
  loginAffiliate,
  registerAffiliate,
  updateBankInfo,
  getProfile
} = require('../controller/affiliate/affiliate-auth-controller');

const {
  getAffiliateStats,
  getReferredInterns,
  getEarningsHistory,
  getDashboardStats
} = require('../controller/affiliate/affiliate-stats-controller');

// Health check route
router.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

// Auth routes
router.post('/register', registerAffiliate);
router.post('/login', loginLimiter, loginAffiliate);
router.get('/profile', [verifyToken, apiLimiter], getProfile);
router.put('/bank-info', [verifyToken, apiLimiter], updateBankInfo);

// Stats and data routes
router.get('/stats', [verifyToken, apiLimiter], getAffiliateStats);
router.get('/interns', [verifyToken, apiLimiter], getReferredInterns);
router.get('/earnings', [verifyToken, apiLimiter], getEarningsHistory);
router.get('/dashboard', [verifyToken, apiLimiter], getDashboardStats);

module.exports = router; 