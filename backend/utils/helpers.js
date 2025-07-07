const crypto = require('crypto');

// Generate a unique referral code
exports.generateReferralCode = () => {
  // Generate a random string and take first 8 characters
  return crypto.randomBytes(4).toString('hex').toUpperCase();
};

// Format currency
exports.formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR'
  }).format(amount);
}; 