const express = require("express");
const cors = require("cors");
const { DataBase } = require("./config/connection");
const router = require("./routes/app-routes");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(bodyParser.json({ limit: '10mb' })); // Adjust the limit as needed
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());
app.use(router);
DataBase();

app.listen(PORT, () => {
  console.log(`Server Running on: ${PORT}`);
});
