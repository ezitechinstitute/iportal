const express = require("express");
const { RegisterInterns } = require("../controller/intern/interns-controller");
const {
  ManagerAuth,
  ManagerForgotPassword,
  ManagerAvatar,
} = require("../controller/manager/manager-auth-controller");
const {
  AssignTest,
} = require("../controller/manager/manager-interview-controller");
const router = express.Router();

/* Interns Endpoints */
router.post("/register-inters", RegisterInterns);

/* Manager Auth Endpoints */
router.post("/manager-auth", ManagerAuth);
router.post("manager-avatar", ManagerAvatar);
router.post("/manager-forgot-password", ManagerForgotPassword);

/* Manager Inters Endpoints */
router.post("/assign-test", AssignTest);

module.exports = router;
