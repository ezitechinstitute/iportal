require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Affiliate = require('../models/Affiliate');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ezitech_portal';

async function createTestAffiliate() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Create test affiliate
    const hashedPassword = await bcrypt.hash('test123', 10);
    const affiliate = new Affiliate({
      name: 'Test Affiliate',
      email: 'test@affiliate.com',
      password: hashedPassword,
      phone: '1234567890'
    });

    await affiliate.save();
    console.log('Test affiliate created successfully');
    console.log('Email: test@affiliate.com');
    console.log('Password: test123');

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

createTestAffiliate(); 