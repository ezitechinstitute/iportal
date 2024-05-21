const express = require("express");
const { RegisterInterns } = require("../controller/intern/interns-controller");
const {
  HrAuth,
  HrForgotPassword,
  HrAvatar,
} = require("../controller/hr/hr-auth-controller");
const {
  AssignTest,
  RemoveIntern,
} = require("../controller/hr/hr-interview-controller");
const {
  GetLatestRegister,
  GetOnsiteInterview,
  GetRemoteInterview,
  GetTestIntern,
} = require("../controller/hr/get-interns-controller");
const {
  GetManagerOnsite,
  GetManagerRemote,
  OnsiteSingle,
  RemoteSingle,
  CountOnsite,
  GetInternsEmail,
} = require("../controller/manager/get-manager-interns");
const {
  AssignProject,
} = require("../controller/manager/assignproject-controller");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello from NodeJs Server");
});

/* Interns Endpoints */
router.post("/register-inters", RegisterInterns);

/* Manager Auth Endpoints */
router.post("/manager-auth", HrAuth);
// router.post("/manager-avatar", ManagerAvatar);
// router.post("/manager-forgot-password", ManagerForgotPassword);

/* HR Endpoints */
router.get("/get-latest-interns", GetLatestRegister);
router.get("/get-onsite-interns", GetOnsiteInterview);
router.post("/update-intern-status", AssignTest);
router.post("/remove-intern", RemoveIntern);
router.get("/get-remote-interns", GetRemoteInterview);
router.get("/get-test-interns", GetTestIntern);

/* Manager Endpoints */
router.get("/get-manager-onsite", GetManagerOnsite);
router.get("/get-manager-remote", GetManagerRemote);
router.post("/single-onsite", OnsiteSingle);
router.post("/single-remote", RemoteSingle);
router.post("/get-emails", GetInternsEmail);

/* Assign Project Endpoints */
router.post("/assign-project", AssignProject);

/* Testing Area */
// router.get("/count-onsite", CountOnsite);
module.exports = router;
