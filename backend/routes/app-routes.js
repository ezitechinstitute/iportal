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
  GetActiveInterns,
  CountInterns,
  CountInterviewInterns,
  CountTestInterns,
  CountTestCompleted,
  CountContactWith,
  GetNewInternsFrameWork,
  GetContactInternsFrameWork,
  GetTestInternsFrameWork,
  GetTestCompleteInternsFrameWork,
} = require("../controller/hr/get-interns-controller");
const {
  AssignPortal,
  ActivePortal,
} = require("../controller/hr/assignPortal-controller");
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
  AssignPermissions,
  RemovePermission,
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
const { AdminInterns } = require("../controller/admin/get-all-interns");
const {
  AddBalance,
  DebitSum,
  CreditSum,

  GetAllRecords,
} = require("../controller/admin/account-controller");
const {
  LeaveApprove,
  GetEmployeeLeaves,
  LeaveReject,
} = require("../controller/admin/employee-leave-controller");
const {
  CreateSupervisor,
  GetSupervisors,
  GetSupervisorsPermissions,
  AssignSupervisorPermissions,
  RemoveSupervisorPermissions,
  FreezeSupervisor,
  ActiveSupervisor,
  GetSingleSupervisor,
  UpdateSupervisor,
} = require("../controller/admin/supervisor-controller");
const {
  GetSupervisorsInterns,
  AssignProject,
  GetProjects,
  GetTasks,
  GetAttendance,
  CountAllProjects,
  CountCompProjects,
  CountExpProjects,
  GetTaskDetails,
  GetInterLeaves,
  RejectInternLeave,
  ApproveInternLeave,
} = require("../controller/supervisor/sup-interns-controller");
const { SupervisorAuth } = require("../controller/supervisor/supervisor-auth");
const {
  CreateWithdrawReq,
  GetSupWithdrawReq,
} = require("../controller/supervisor/sup-balance-controller");
const dotenv = require("dotenv").config();
const router = express.Router();
const secretKey = process.env.SECRETKEY;

/* Middleware to verify token */
function verifyToken(req, res, next) {
  const token = req.headers["x-access-token"];

  // console.log(token)

  if (!token) {
    return res.json("Token not provided");
    // console.log("Token not provided");
  } else {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        console.log(err);
        console.log("Failed to authenticate token");
       return res.json("Failed to authenticate token");
      }

      req.internEmail = decoded.email;
      next();
    });
  }
}

router.get("/test", (req, res) => {
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
router.post("/update-contact-status", verifyToken, MarkAsContact);
router.post("/update-intern-status", verifyToken, AssignTest);
router.post("/remove-intern", verifyToken, RemoveIntern);
router.post("/remove-completed", verifyToken, RemoveCompletedInterns);
router.get("/active-interns", verifyToken, GetActiveInterns);
router.get("/get-test-complete/:email", verifyToken, GetTestComplete);
router.get("/count-interview/:managerid", verifyToken, CountInterviewInterns);
router.get("/count-test/:managerid", verifyToken, CountTestInterns);
router.get("/count-test-completed/:managerid", verifyToken, CountTestCompleted);
router.get("/count-contact-with/:managerid", verifyToken, CountContactWith);
router.get("/get-interns/:managerid", verifyToken, GetNewInternsFrameWork);
router.get(
  "/get-contact-interns/:managerid",
  verifyToken,
  GetContactInternsFrameWork
);
router.get(
  "/get-test-interns/:managerid",
  verifyToken,
  GetTestInternsFrameWork
);
router.get(
  "/get-completed-interns/:managerid",
  verifyToken,
  GetTestCompleteInternsFrameWork
);
router.post("/add-amount", verifyToken, AddAmount);
router.get("/get-manager-amount/:email", verifyToken, GetManagerBalance);
router.get("/pending-amount", verifyToken, GetPendingAmount);
router.get("/get-statics", CountInterns);
router.post("/assign-portal", AssignPortal);

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

// Admin Inters
router.get("/get-all-interns", AdminInterns);

// Admin Account Credit Debit Endpoints
router.get("/all-account-rec", GetAllRecords);
router.post("/add-balance", AddBalance);
router.get("/get-debit-total", DebitSum);
router.get("/get-credit-total", CreditSum);

// Admin Employee Leave Endpoints
// router.get("/get-employee-leaves", GetEmployeeLeaves);
// router.put("/approve-leave/:id", LeaveApprove);
// router.put("/reject-leave/:id", LeaveReject);

// Admin To Manager Endpoints
router.put("/:id", UpdateManager);
router.get("/get-managers", GetManagers);
router.post("/add-manager", CreateManager);
router.put("/freeze-manager/:email", FreezeManager);
router.put("/active-manager/:email", ActiveManager);
router.post("/assign-permissions", AssignPermissions);
router.get("/get-single-manager/:id", GetSingleManager);
router.get("/get-manager-permissions/:id", GetManagerPermissions);
router.get("/get-manager-new-permissions", GetNewPermissionsTech);
router.delete("/remove-manager-permission/:id", RemovePermission);

// Admin To Supervisor Endpoints
router.put("/:supid", UpdateSupervisor);
router.get("/get-supervisors", GetSupervisors);
router.post("/add-supervisor", CreateSupervisor);
router.put("/freeze-supervisor/:id", FreezeSupervisor);
router.put("/active-supervisor/:id", ActiveSupervisor);
router.get("/get-single-sup/:id", GetSingleSupervisor);
router.get("/get-sup-permissions/:id", GetSupervisorsPermissions);
router.post("/assign-sup-permissions", AssignSupervisorPermissions);
router.delete("/remove-sup-permission/:id", RemoveSupervisorPermissions);

// Admin Tech Endpoints
router.post("/add-tech", AddTechnology);
router.put("/freeze-tech/:id", FreezeTech);
router.put("/active-tech/:id", ActiveTech);
router.get("/admin-tech", GetAdminTech);
router.get("/form-tech", GetFormTech);
router.get("/edit-tech/:id", EditTech);
router.put("/update-tech/:id", UpdateTech);

// Supervisor To Interns Controller
router.post("/supervisor-auth", SupervisorAuth);
router.get("/get-sup-interns/:supid", verifyToken, GetSupervisorsInterns);
router.post("/assign-project", verifyToken, AssignProject);
router.get("/count-attend/:email", verifyToken, GetAttendance);
router.get("/count-all-proj/:email", verifyToken, CountAllProjects);
router.get("/count-comp-proj/:email", verifyToken, CountCompProjects);
router.get("/count-exp-proj/:email", verifyToken, CountExpProjects);
router.get("/get-sup-projects/:supid", verifyToken, GetProjects);
router.get("/get-sup-tasks/:supid", verifyToken, GetTasks);
router.get("/get-task-details", verifyToken, GetTaskDetails);
router.get("/get-intern-leaves/:supid", verifyToken, GetInterLeaves);
router.put("/approve-int-leave/:intId", verifyToken, ApproveInternLeave);
router.put("/reject-int-leave/:intId", verifyToken, RejectInternLeave);

// Supervisor Balance Controller
router.post("/create-withdraw-req", verifyToken, CreateWithdrawReq);
router.get("/get-sup-withdraw-req", verifyToken, GetSupWithdrawReq);

/* Testing Area */
// router.get("/count-onsite", CountOnsite);
module.exports = router;
