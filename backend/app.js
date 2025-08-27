// Load environment variables from .env file
const dotenv = require('dotenv').config();

// Core Express Setup
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

// Local imports (custom modules)
const { DataBase } = require('./config/connection'); // MySQL database connection
const router = require('./routes/app-routes'); // Main application routes
const downloadRoutes = require('./routes/downloadRoutes'); // File download routes
const affiliateRoutes = require('./routes/affiliate-routes'); // Affiliate-related routes

// Scheduled jobs and verification functions
const RunJob = require('./controller/combine/Run-Scheduler'); // Background job scheduler
const { VerifyEmail } = require('./controller/combine/Verify-Email'); // Email verification logic

// Set server port
const PORT = 8000;

// Initialize express app
const app = express();

/* ──────────────────────────────────────────────────────────────── */
/* 🧠 BODY PARSER SETUP - Handle large incoming JSON & form data */
app.use(bodyParser.json({ limit: '35mb' }));
app.use(bodyParser.urlencoded({ limit: '35mb', extended: true }));
app.use(express.json());

/* ──────────────────────────────────────────────────────────────── */
/* 🌐 CORS SETUP - Define which domains can access this API */
const corsOptions = {
  origin: [
    'https://interns.ezitech.org',
    'https://manager.ezitech.org',
    'https://admin.ezitech.org',
    'https://register.ezitech.org',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:3003',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  // allowedHeaders: ['Content-Type', 'Authorization'], // Uncomment if needed
  // credentials: true, // Uncomment if credentials (cookies, auth) are needed
};
app.use(cors(corsOptions));

/* ──────────────────────────────────────────────────────────────── */
/* 📄 STATIC CERTIFICATES - Serve files from certificates folder */
const certPath = path.join(__dirname, 'public/certificates');
app.use('/certificates', express.static(certPath));

/* ──────────────────────────────────────────────────────────────── */
/* 📁 API ROUTES - Register your route files */
app.use(router); // Main routes
app.use('/api/affiliate', affiliateRoutes); // Affiliate module routes
app.use('/', downloadRoutes); // File download routes

/* ──────────────────────────────────────────────────────────────── */
/* 📂 LIST CERTIFICATES API - Read files from certificates folder */
app.get('/list-certs', (req, res) => {
  const dir = path.join(__dirname, 'public/certificates');
  fs.readdir(dir, (err, files) => {
    if (err) return res.status(500).send('Cannot read directory');
    res.send(files); // Send list of certificate files
  });
});

/* ──────────────────────────────────────────────────────────────── */
/* 🗄️ CONNECT TO MYSQL DATABASE */
DataBase();

/* ──────────────────────────────────────────────────────────────── */
/* 🏃 RUN BACKGROUND JOBS & SCHEDULERS */
RunJob(); // Start cron jobs or schedulers
// VerifyEmail(); // Uncomment if you want to verify emails on startup

/* ──────────────────────────────────────────────────────────────── */
/* 🚀 START EXPRESS SERVER */
app.listen(PORT, () => {
  console.log(`✅ Server Running on: http://localhost:${PORT}`);
});

/* ──────────────────────────────────────────────────────────────── */
/* ⚛️ (OPTIONAL) FOR SERVING FRONTEND BUILD FILES (e.g. React) */
// app.use(express.static(path.join(__dirname, "build")));
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "build", "index.html"));
// });
