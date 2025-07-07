require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/mongodb');

// Import routes
const affiliateRoutes = require('./routes/affiliate-routes');
const appRoutes = require('./routes/app-routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/affiliate', affiliateRoutes); // Use existing affiliate routes
app.use('/', appRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: process.env.NODE_ENV === 'production' ? 'Something went wrong!' : err.message 
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📊 MongoDB connected successfully`);
  console.log(`🔗 API available at http://localhost:${PORT}/api/affiliate`);
});
