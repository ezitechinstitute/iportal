const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server Running on: ${PORT}`);
});
