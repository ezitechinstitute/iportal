const express = require("express");
const cors = require("cors");
const { DataBase } = require("./config/connection");
const router = require("./routes/app-routes");
const bodyParser = require("body-parser");
const RunJob = require("./controller/combine/Run-Scheduler");
const { VerifyEmail } = require("./controller/combine/Verify-Email");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT;

const app = express();
app.use(bodyParser.json({ limit: "35mb" })); // Adjust the limit as needed
app.use(bodyParser.urlencoded({ limit: "35mb", extended: true }));
app.use(express.json());

// Configure CORS options
const corsOptions = {
  origin: [
    'https://interns.ezitech.org',
    'https://manager.ezitech.org',
    'https://admin.ezitech.org',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Optional: Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Optional: Allowed headers
  credentials: true, // Optional: Enable credentials if needed
};

app.use(cors(corsOptions));
app.use(router);
DataBase();

app.listen(PORT, () => {
  console.log(`Server Running on: ${PORT}`);
});

RunJob();
// VerifyEmail()
