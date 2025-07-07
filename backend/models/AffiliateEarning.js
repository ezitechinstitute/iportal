const mongoose = require('mongoose');

const affiliateEarningSchema = new mongoose.Schema({
  affiliateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Affiliate',
    required: true
  },
  internEmail: {
    type: String,
    required: true
  },
  internName: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'paid'],
    default: 'pending'
  },
  paymentDate: {
    type: Date
  },
  description: {
    type: String,
    default: 'Intern referral commission'
  }
}, {
  timestamps: true
});

// Index for faster queries
affiliateEarningSchema.index({ affiliateId: 1, status: 1 });

module.exports = mongoose.model('AffiliateEarning', affiliateEarningSchema); 