const express = require("express");
const {
  RegisterInterns,
  SendVerificationCode,
} = require("../controller/intern/interns-controller");
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
  MarkAsContact,
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
  CountInterviewInterns,
  CountTestInterns,
  CountTestCompleted,
  CountActive,
  GetContactWith,
  CountContactWith,
  TestFrameWork,
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
  GetTotalAmount,
  GetReceivedAmount,
  GetRemainingAmount,
} = require("../controller/admin/transaction-controller");
const {
  GetManagers,
  FreezeManager,
  ActiveManager,
  GetSingleManager,
  UpdateManager,
  CreateManager,
  GetManagerPermissions,
  GetNewPermissionsTech,
} = require("../controller/admin/manager-controller");
const {
  AddTechnology,
  FreezeTech,
  ActiveTech,
  GetAdminTech,
  GetFormTech,
  EditTech,
  UpdateTech,
} = require("../controller/admin/tech-controller");
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
router.post("/verification-code", SendVerificationCode);
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
router.post("/update-contact-status", verifyToken, MarkAsContact);
router.post("/update-intern-status", verifyToken, AssignTest);
router.post("/remove-intern", verifyToken, RemoveIntern);
router.post("/remove-completed", verifyToken, RemoveCompletedInterns);
router.get("/get-remote-interns/:email", verifyToken, GetRemoteInterview);
router.get("/get-contact-with/:email", verifyToken, GetContactWith);
router.get("/get-test-interns/:email", verifyToken, GetTestIntern);
router.get("/active-interns", verifyToken, GetActiveInterns);
// router.post("/active-portal", verifyToken, ActivePortal);
router.get("/get-test-complete/:email", verifyToken, GetTestComplete);
router.get("/count-interview/:email", verifyToken, CountInterviewInterns);
router.get("/count-test/:email", verifyToken, CountTestInterns);
router.get("/count-test-completed", verifyToken, CountTestCompleted);
router.get("/count-contact-with/:email", verifyToken, CountContactWith);

// Test
// router.get("/test-work/:managerid", TestFrameWork);

// router.get("/get-instructor-emails", verifyToken, GetInstructorEmail);
// router.get("/get-manager-emails", verifyToken, GetManagerEmail);
router.post("/add-amount", verifyToken, AddAmount);
// router.post("/get-intern-emails", GetInternsEmail);
// router.post("/get-intern-phone", GetInternsPhone);
router.get("/get-manager-amount/:email", verifyToken, GetManagerBalance);
// router.get("/get-instructor-amount/:email", GetManagerBalance);
router.get("/pending-amount", verifyToken, GetPendingAmount);
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
router.put("/approve-invoice/:email", ApproveInvoice);
router.get("/get-total-amount", GetTotalAmount);
router.get("/get-received-amount", GetReceivedAmount);
router.get("/get-remaining-amount", GetRemainingAmount);

router.post("/add-manager", CreateManager);
router.get("/get-managers", GetManagers);
router.get("/get-manager-permissions/:id", GetManagerPermissions);
router.get("/get-manager-new-permissions", GetNewPermissionsTech);
router.put("/freeze-manager/:email", FreezeManager);
router.put("/active-manager/:email", ActiveManager);
router.get("/get-single-manager/:id", GetSingleManager);
router.put("/:id", UpdateManager);

router.post("/add-tech", AddTechnology);
router.put("/freeze-tech/:id", FreezeTech);
router.put("/active-tech/:id", ActiveTech);
router.get("/admin-tech", GetAdminTech);
router.get("/form-tech", GetFormTech);
router.get("/edit-tech/:id", EditTech);
router.put("/update-tech/:id", UpdateTech);

/* Testing Area */
// router.get("/count-onsite", CountOnsite);
module.exports = router;
