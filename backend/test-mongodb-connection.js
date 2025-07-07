const mongoose = require('mongoose');

// Test different connection strings
const connectionStrings = [
  // Current one
  'mongodb+srv://mubashir6028:KOeMm1xXaSMRoYXa@affilation.wrwfa48.mongodb.net/affilation?retryWrites=true&w=majority',
  
  // Try without database name
  'mongodb+srv://mubashir6028:KOeMm1xXaSMRoYXa@affilation.wrwfa48.mongodb.net/?retryWrites=true&w=majority',
  
  // Try with different database name
  'mongodb+srv://mubashir6028:KOeMm1xXaSMRoYXa@affilation.wrwfa48.mongodb.net/test?retryWrites=true&w=majority'
];

async function testConnection(uri, description) {
  console.log(`\n🔍 Testing: ${description}`);
  console.log(`Connection string: ${uri.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')}`);
  
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000
    });
    
    console.log('✅ SUCCESS: Connected to MongoDB!');
    console.log('Database name:', mongoose.connection.name);
    console.log('Host:', mongoose.connection.host);
    console.log('Port:', mongoose.connection.port);
    
    await mongoose.disconnect();
    return true;
  } catch (error) {
    console.log('❌ FAILED:', error.message);
    console.log('Error code:', error.code);
    return false;
  }
}

async function runTests() {
  console.log('🚀 MongoDB Connection Test Suite');
  console.log('================================');
  
  for (let i = 0; i < connectionStrings.length; i++) {
    const success = await testConnection(connectionStrings[i], `Test ${i + 1}`);
    if (success) {
      console.log('\n🎉 Found working connection!');
      break;
    }
  }
  
  console.log('\n📋 Troubleshooting Tips:');
  console.log('1. Check your MongoDB Atlas username and password');
  console.log('2. Verify the cluster name is correct');
  console.log('3. Make sure your IP is whitelisted in Atlas');
  console.log('4. Check if the database user has proper permissions');
  console.log('5. Try creating a new database user in Atlas');
}

runTests().catch(console.error); 