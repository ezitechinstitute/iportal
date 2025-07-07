const jwt = require("jsonwebtoken");
const Affiliate = require("../../models/Affiliate");
const dotenv = require("dotenv").config();
const secretKey = process.env.JWT_SECRET || 'fallback-secret-key-for-development-only';

// Login affiliate
const loginAffiliate = async (req, res) => {
  try {
    const { loginEmail: email, loginPassword: password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Find affiliate by email
    const affiliate = await Affiliate.findOne({ email, status: 'active' });
    if (!affiliate) {
      return res.status(401).json({ isLoggedIn: false, message: "Invalid credentials" });
    }

    // Verify password
    const isMatch = await affiliate.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ isLoggedIn: false, message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { email: affiliate.email, id: affiliate._id },
      secretKey,
      { expiresIn: "24h" }
    );

    return res.status(200).json({
      isLoggedIn: true,
      loginStatus: true,
      passwordStatus: true,
      userStatus: true,
      user: {
        affiliate_id: affiliate._id,
        name: affiliate.name,
        email: affiliate.email,
        referral_code: affiliate.referralCode,
        bank_info: affiliate.bankInfo
      },
      token
    });
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(500).json({ error: "Login failed", details: error.message });
  }
};

// Register affiliate
const registerAffiliate = async (req, res) => {
  try {
    // Handle both possible field name variations
    const { 
      internUsername, 
      internemail, 
      name: nameFromBody, 
      email: emailFromBody, 
      password, 
      phone = '03101234567' 
    } = req.body;

    // Use the appropriate field names
    const name = internUsername || nameFromBody;
    const email = internemail || emailFromBody;

    console.log('Registration attempt for:', { name, email }); // Debug log

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Validate password strength
    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters long" });
    }

    // Check if affiliate already exists
    const existingAffiliate = await Affiliate.findOne({ email });
    if (existingAffiliate) {
      return res.status(409).json({ error: "Email already registered" });
    }

    // Generate unique referral code
    const generateReferralCode = () => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let result = '';
      for (let i = 0; i < 8; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    };

    let referralCode = generateReferralCode();
    let isUnique = false;
    
    // Ensure referral code is unique
    while (!isUnique) {
      const existingCode = await Affiliate.findOne({ referralCode });
      if (!existingCode) {
        isUnique = true;
      } else {
        referralCode = generateReferralCode();
      }
    }

    console.log('Creating affiliate with data:', { name, email, referralCode }); // Debug log

    // Create new affiliate
    const newAffiliate = new Affiliate({
      name,
      email,
      password, // Will be hashed by the model's pre-save middleware
      phone,
      referralCode,
      status: 'active',
      joinDate: new Date()
    });

    await newAffiliate.save();

    console.log('Affiliate created successfully:', newAffiliate._id); // Debug log

    // Generate JWT token
    const token = jwt.sign(
      { email: newAffiliate.email, id: newAffiliate._id },
      secretKey,
      { expiresIn: "24h" }
    );

    return res.status(201).json({
      message: "Affiliate registered successfully",
      user: {
        affiliate_id: newAffiliate._id,
        name: newAffiliate.name,
        email: newAffiliate.email,
        phone: newAffiliate.phone,
        referral_code: newAffiliate.referralCode
      },
      token
    });

  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ error: "Registration failed", details: error.message });
  }
};

// Update bank info
const updateBankInfo = async (req, res) => {
  try {
    const affiliateId = req.user.id;
    const { bankName, accountNumber, accountTitle } = req.body;

    if (!bankName || !accountNumber || !accountTitle) {
      return res.status(400).json({ error: "All bank details are required" });
    }

    const affiliate = await Affiliate.findById(affiliateId);
    if (!affiliate) {
      return res.status(404).json({ message: "Affiliate not found" });
    }

    affiliate.bankInfo = {
      bankName,
      accountNumber,
      accountTitle
    };

    await affiliate.save();
    return res.json({ message: "Bank info updated successfully" });
  } catch (error) {
    console.error("Bank info update error:", error);
    return res.status(500).json({ error: "Update failed", details: error.message });
  }
};

// Get affiliate profile
const getProfile = async (req, res) => {
  try {
    const affiliateId = req.user.id;

    const affiliate = await Affiliate.findById(affiliateId)
      .select('name email phone referralCode bankInfo');

    if (!affiliate) {
      return res.status(404).json({ message: "Affiliate not found" });
    }

    return res.json({
      profile: {
        affiliate_id: affiliate._id,
        name: affiliate.name,
        email: affiliate.email,
        phone: affiliate.phone,
        referral_code: affiliate.referralCode,
        bank_info: affiliate.bankInfo
      }
    });
  } catch (error) {
    console.error("Profile fetch error:", error);
    return res.status(500).json({ error: "Failed to fetch profile", details: error.message });
  }
};

module.exports = {
  loginAffiliate,
  registerAffiliate,
  updateBankInfo,
  getProfile
}; 