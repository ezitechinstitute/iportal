require('dotenv').config();

console.log('Environment Variables Test:');
console.log('-------------------------');
console.log('PORT:', process.env.PORT);
console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('JWT_SECRET:', process.env.JWT_SECRET ? '[HIDDEN]' : 'Not set');
console.log('FRONTEND_URL:', process.env.FRONTEND_URL);
console.log('-------------------------'); 