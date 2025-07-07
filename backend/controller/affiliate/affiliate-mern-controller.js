const Affiliate = require('../../models/Affiliate');
const AffiliateEarning = require('../../models/AffiliateEarning');
const Intern = require('../../models/Intern');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Affiliate Authentication
const affiliateLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const affiliate = await Affiliate.findOne({ email });
    if (!affiliate) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await affiliate.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (affiliate.status !== 'active') {
      return res.status(403).json({ error: 'Account is inactive' });
    }

    const token = jwt.sign(
      { 
        id: affiliate._id, 
        email: affiliate.email,
        role: 'affiliate'
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      affiliate: {
        id: affiliate._id,
        name: affiliate.name,
        email: affiliate.email,
        referralCode: affiliate.referralCode,
        totalEarnings: affiliate.totalEarnings,
        pendingAmount: affiliate.pendingAmount
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const affiliateRegister = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingAffiliate = await Affiliate.findOne({ email });
    if (existingAffiliate) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const affiliate = new Affiliate({
      name,
      email,
      password,
      phone
    });

    await affiliate.save();

    const token = jwt.sign(
      { 
        id: affiliate._id, 
        email: affiliate.email,
        role: 'affiliate'
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      token,
      affiliate: {
        id: affiliate._id,
        name: affiliate.name,
        email: affiliate.email,
        referralCode: affiliate.referralCode
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Affiliate Dashboard Data
const getDashboardStats = async (req, res) => {
  try {
    const affiliateId = req.user.id;

    const affiliate = await Affiliate.findById(affiliateId);
    if (!affiliate) {
      return res.status(404).json({ error: 'Affiliate not found' });
    }

    // Get referred interns count
    const referredInternsCount = await Intern.countDocuments({ referredBy: affiliateId });

    // Get earnings history
    const earningsHistory = await AffiliateEarning.find({ affiliate: affiliateId })
      .sort({ date: -1 })
      .limit(10);

    res.json({
      stats: {
        totalInterns: referredInternsCount,
        totalEarnings: affiliate.totalEarnings,
      }
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};