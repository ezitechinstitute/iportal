const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const internSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  technology: {
    type: String,
    required: true
  },
  joinDate: {
    type: Date,
    default: Date.now
  },
  phone: {
    type: String
  },
  internType: {
    type: String,
    enum: ['onsite', 'remote'],
    default: 'remote'
  },
  image: {
    type: String
  },
  review: {
    type: String,
    enum: ['Review', 'Non-Review'],
    default: 'Non-Review'
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
  referredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Affiliate'
  },
  referralCode: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  city: String,
  gender: String,
  profileImage: String,
  dateOfBirth: Date,
  university: String,
  country: String,
  interviewType: String,
  duration: String,
  interviewDate: Date,
  interviewTime: String,
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  verificationCode: String,
  verificationExpires: Date
}, {
  timestamps: true
});

// Indexes for faster queries
internSchema.index({ referredBy: 1, status: 1 });
internSchema.index({ email: 1 }, { unique: true });

// Hash password before saving
internSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
internSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

module.exports = mongoose.model('Intern', internSchema); 