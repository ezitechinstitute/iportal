const axios = require('axios');

const API_URL = 'http://localhost:5000/api';
const TEST_EMAIL = 'test@affiliate.com';
const TEST_PASSWORD = 'test123';

async function testAffiliateEndpoints() {
  try {
    console.log('Starting affiliate endpoints test...\n');

    // Test server connection
    console.log('Testing server connection...');
    try {
      await axios.get(`${API_URL}/affiliate/health`);
      console.log('✓ Server is running\n');
    } catch (error) {
      throw new Error('Server is not running or not accessible. Make sure the server is started on port 5000.');
    }

    // 1. Login Test
    console.log('1. Testing Login...');
    console.log('Attempting login with:', { email: TEST_EMAIL });
    const loginResponse = await axios.post(`${API_URL}/affiliate/login`, {
      email: TEST_EMAIL,
      password: TEST_PASSWORD
    });
    
    if (!loginResponse.data.token) {
      throw new Error('Login successful but no token received');
    }
    
    const token = loginResponse.data.token;
    console.log('✓ Login successful\n');

    // Setup headers for authenticated requests
    const headers = { 'x-auth-token': token };

    // 2. Get Affiliate Stats
    console.log('2. Testing Get Stats...');
    const statsResponse = await axios.get(`${API_URL}/affiliate/stats`, { headers });
    console.log('Stats retrieved:', statsResponse.data);
    console.log('✓ Get stats successful\n');

    // 3. Get Referred Interns
    console.log('3. Testing Get Referred Interns...');
    const internsResponse = await axios.get(`${API_URL}/affiliate/interns`, { headers });
    console.log('Referred interns count:', internsResponse.data.length);
    console.log('✓ Get referred interns successful\n');

    // 4. Update Bank Info
    console.log('4. Testing Update Bank Info...');
    const bankInfo = {
      bankName: 'Test Bank',
      accountNumber: '1234567890',
      accountTitle: 'Test Account'
    };
    const bankUpdateResponse = await axios.put(`${API_URL}/affiliate/bank-info`, bankInfo, { headers });
    console.log('✓ Bank info update successful\n');

    // 5. Get Earnings History
    console.log('5. Testing Get Earnings History...');
    const earningsResponse = await axios.get(`${API_URL}/affiliate/earnings`, { headers });
    console.log('Earnings records count:', earningsResponse.data.length);
    console.log('✓ Get earnings history successful\n');

    // 6. Get Dashboard Stats
    console.log('6. Testing Get Dashboard Stats...');
    const dashboardResponse = await axios.get(`${API_URL}/affiliate/dashboard`, { headers });
    console.log('Dashboard stats:', dashboardResponse.data.stats);
    console.log('✓ Get dashboard stats successful\n');

    console.log('All tests completed successfully! ✓');
  } catch (error) {
    console.error('\nTest failed:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Response:', error.response.data);
    } else if (error.request) {
      console.error('No response received from server');
      console.error('Request:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    process.exit(1);
  }
}

testAffiliateEndpoints(); 