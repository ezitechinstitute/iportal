const express = require("express");
const { RegisterInterns } = require("../controller/intern/interns-controller");
const {
  ManagerAuth,
  ManagerForgotPassword,
  ManagerAvatar,
} = require("../controller/manager/manager-auth-controller");
const {
  AssignTest, RemoveIntern
} = require("../controller/manager/manager-interview-controller");
const {GetLatestRegister, GetOnsiteInterview, GetRemoteInterview} = require("../controller/manager/get-interns-controller");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello from NodeJs Server");
});

/* Interns Endpoints */
router.post("/register-inters", RegisterInterns);

/* Manager Auth Endpoints */
router.post("/manager-auth", ManagerAuth);
// router.post("/manager-avatar", ManagerAvatar);
// router.post("/manager-forgot-password", ManagerForgotPassword);

/* Manager Interns Endpoints */
router.get("/get-latest-interns", GetLatestRegister);
router.get("/get-onsite-interns", GetOnsiteInterview)
router.post("/update-intern-status", AssignTest);
router.post("/remove-intern", RemoveIntern)
router.get("/get-remote-interns", GetRemoteInterview)



module.exports = router;
