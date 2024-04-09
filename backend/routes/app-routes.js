const express = require("express");
const {
  TotalInterns,
  RegisterInterns,
} = require("../controller/interns-controller");
const router = express.Router();

router.get("/interns", TotalInterns);
router.post("/register-inters", RegisterInterns);

module.exports = router;
