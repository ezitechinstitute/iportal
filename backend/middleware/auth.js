const jwt = require('jsonwebtoken');
const Affiliate = require('../models/Affiliate');

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] || req.headers['x-access-token'];

    if (!token) {
      return res.status(401).json({ error: 'Access token required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
    // Verify affiliate exists and is active
    const affiliate = await Affiliate.findById(decoded.id);
    if (!affiliate || affiliate.status !== 'active') {
      return res.status(401).json({ error: 'Invalid or inactive account' });
    }

    req.user = {
      id: affiliate._id,
      email: affiliate.email,
      role: 'affiliate'
    };
    
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    console.error('Auth middleware error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Rate limiting middleware
const loginLimiter = (req, res, next) => {
  // Simple rate limiting - in production, use a proper rate limiting library
  next();
};

const apiLimiter = (req, res, next) => {
  // API rate limiting
  next();
};

module.exports = { 
  verifyToken, 
  loginLimiter, 
  apiLimiter 
}; 