const express = require("express");
const TotalInterns = require("../controller/interns-controller");
const router = express.Router();

router.get("/interns", TotalInterns);

module.exports = router;
