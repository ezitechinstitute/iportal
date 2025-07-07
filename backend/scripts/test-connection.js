const mongoose = require('mongoose');
const Affiliate = require('../models/Affiliate');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ezitech_portal';

async function testConnection() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const affiliate = await Affiliate.findOne({ email: 'test@affiliate.com' });
    console.log('Found affiliate:', affiliate);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

testConnection(); 