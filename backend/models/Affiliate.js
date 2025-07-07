const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const affiliateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  referralCode: {
    type: String,
    unique: true
  },
  bankAccount: {
    type: String
  },
  bankName: {
    type: String
  },
  accountTitle: {
    type: String
  },
  bankInfo: {
    bankName: String,
    accountNumber: String,
    accountTitle: String
  },
  totalEarnings: {
    type: Number,
    default: 0
  },
  pendingAmount: {
    type: Number,
    default: 0
  },
  linkClicks: {
    type: Number,
    default: 0
  },
  uniqueVisitors: {
    type: Number,
    default: 0
  },
  conversionRate: {
    type: Number,
    default: 0
  },
  pendingEarnings: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  }
}, {
  timestamps: true
});

// Hash password before saving
affiliateSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Generate referral code before saving if not exists
affiliateSchema.pre('save', function(next) {
  if (!this.referralCode) {
    // Generate a unique referral code using first 3 letters of name + random 4 digits
    const namePrefix = this.name.substring(0, 3).toUpperCase();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    this.referralCode = `${namePrefix}${randomNum}`;
  }
  next();
});

// Compare password method
affiliateSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

module.exports = mongoose.model('Affiliate', affiliateSchema); 