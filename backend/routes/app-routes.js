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
  GetTestComplete,
  RemoveCompletedInterns,
} = require("../controller/hr/hr-interview-controller");
const {
  GetLatestRegister,
  GetOnsiteInterview,
  GetRemoteInterview,
  GetTestIntern,
  GetUmairInternsOnsite,
  GetUmairInternsRemote,
  GetActiveInterns,
  CountInterns,
} = require("../controller/hr/get-interns-controller");
const {
  GetManagerOnsite,
  GetManagerRemote,
  OnsiteSingle,
  RemoteSingle,
  CountOnsite,
  GetInternsEmail,
  GetInternsPhone,
} = require("../controller/manager/get-manager-interns");
const {
  AssignProject,
} = require("../controller/manager/assignproject-controller");
const {
  AssignPortal,
  ActivePortal,
} = require("../controller/manager/assignPortal-controller");
const {
  StartShift,
  EndShift,
  CurrentShift,
  GetInternAttendance,
} = require("../controller/intern/internAttendance-controller");
const {
  InternAuth,
  ForgotInternPassword,
} = require("../controller/intern/internAuth-controller");
const jwt = require("jsonwebtoken");
const {
  GetTask,
  MarkTaskComplete,
} = require("../controller/intern/internTest-controller");
const {
  GetInstructorEmail,
  GetManagerEmail,
} = require("../controller/hr/get-instructorMail-controller");
const { AddAmount } = require("../controller/hr/add-amount-controller");
const {
  GetManagerBalance,
} = require("../controller/hr/get-balance-controller");
const {
  GetAdminBalance,
  GetSalaries,
} = require("../controller/admin/admin-balance-controller");
const { AdminAuth } = require("../controller/admin/admin-auth-controller");
const { GetPendingAmount } = require("../controller/hr/get-pending-amount");
const {
  Transactions,
  Invoices,
  ApproveInvoice,
} = require("../controller/admin/transaction-controller");
const dotenv = require("dotenv").config();
const router = express.Router();
const secretKey = process.env.SECRETKEY;

/* Middleware to verify token */
function verifyToken(req, res, next) {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.json({ tokenMessage: "Token not provided" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.json({ authMessage: "Failed to authenticate token" });
    }

    req.internEmail = decoded.email;
    next();
  });
}

router.get("/", (req, res) => {
  res.send("Hello from NodeJs Server");
});

/* Interns Endpoints */
router.post("/register-inters", RegisterInterns);
router.post("/intern-auth", InternAuth);
router.post("/start-shift", verifyToken, StartShift);
router.post("/end-shift", verifyToken, EndShift);
router.get("/current-shift/:email", verifyToken, CurrentShift);
router.post("/intern-test", verifyToken, GetTask);
router.get("/get-intern-attendance", verifyToken, GetInternAttendance);
router.post("/mark-test-complete", verifyToken, MarkTaskComplete);
router.post("/update-intern-password", ForgotInternPassword);

/* Manager Auth Endpoints */
router.post("/manager-auth", HrAuth);
// router.post("/manager-avatar", ManagerAvatar);
// router.post("/manager-forgot-password", ManagerForgotPassword);

/* HR All Endpoints */
router.get("/get-latest-interns/:email", GetLatestRegister);
router.get("/get-onsite-interns/:email", verifyToken, GetOnsiteInterview);
router.post("/update-intern-status", verifyToken, AssignTest);
router.post("/remove-intern", verifyToken, RemoveIntern);
router.post("/remove-completed", verifyToken, RemoveCompletedInterns);
router.get("/get-remote-interns/:email", verifyToken, GetRemoteInterview);
router.get("/get-test-interns/:email", verifyToken, GetTestIntern);
router.get("/active-interns", verifyToken, GetActiveInterns);
router.post("/active-portal", verifyToken, ActivePortal);
router.get("/get-test-complete/:email", verifyToken, GetTestComplete);
// router.get("/get-instructor-emails", verifyToken, GetInstructorEmail);
// router.get("/get-manager-emails", verifyToken, GetManagerEmail);
// router.post("/add-amount", AddAmount);
// router.post("/get-intern-emails", GetInternsEmail);
// router.post("/get-intern-phone", GetInternsPhone);
router.get("/get-manager-amount/:email", verifyToken, GetManagerBalance);
// router.get("/get-instructor-amount/:email", GetManagerBalance);
// router.get("/pending-amount", GetPendingAmount);
router.get("/get-statics", CountInterns);

/* Manager Endpoints */
router.get("/get-manager-onsite", GetManagerOnsite);
router.get("/get-manager-remote", GetManagerRemote);
router.post("/single-onsite", OnsiteSingle);
router.post("/single-remote", RemoteSingle);
router.post("/get-emails", GetInternsEmail);

/* Assign Portal Endpoint */
router.post("/assign-portal", AssignPortal);

/* Assign Project Endpoints */
router.post("/assign-project", AssignProject);

/* Admin Endpoint */
router.post("/admin-auth", AdminAuth);
router.get("/get-admin-balance", GetAdminBalance);
router.get("/get-salaries", GetSalaries);
router.get("/get-transactions/:month", Transactions);
router.get("/get-invoices/:month", Invoices);
router.post("/approve-invoice", ApproveInvoice);

/* Testing Area */
// router.get("/count-onsite", CountOnsite);
module.exports = router;
