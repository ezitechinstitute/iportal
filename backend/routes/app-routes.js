const express = require('express');
const { connection } = require('../config/connection');
const {
  RegisterInterns,
  SendVerificationCode,
  GetRegisterUni,
  GetInternImage,
  GetInternPost,
} = require('../controller/intern/interns-controller');
const {
  GetOfferLetterRequest,
  InsertOfferLetterRequest,
  GetManagerDetails,
} = require('../controller/intern/offer-letter');

const {
  HrAuth,
  HrForgotPassword,
  HrAvatar,
  HrGetProfile,
  HrUpdateProfile,
} = require('../controller/hr/hr-auth-controller');
const {
  AssignTest,
  RemoveIntern,
  GetTestComplete,
  RemoveCompletedInterns,
  MarkAsContact,
} = require('../controller/hr/hr-interview-controller');
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
  GetInternStats,
  GetNewGlobalInternsFrameWork,
} = require('../controller/hr/get-interns-controller');
const {
  GetAllOfferLetterRequests,
  UpdateOfferLetterStatus,
} = require('../controller/hr/intern-offer-letter');
const {
  AssignPortal,
  ActivePortal,
} = require('../controller/hr/assignPortal-controller');
const {
  StartShift,
  EndShift,
  CurrentShift,
  GetInternAttendance,
} = require('../controller/intern/internAttendance-controller');
const {
  InternAuth,
  ForgotInternPassword,
  ResetInternPassword,
  GetAndUpdateInternImage,
  GetInternDetails,
  UpdateInternDetails,
} = require('../controller/intern/internAuth-controller');
const jwt = require('jsonwebtoken');
const {
  GetTask,
  MarkTaskComplete,
} = require('../controller/intern/internTest-controller');
const {
  GetInstructorEmail,
  GetManagerEmail,
} = require('../controller/hr/get-instructorMail-controller');
const { AddAmount } = require('../controller/hr/add-amount-controller');
const {
  GetManagerBalance,
} = require('../controller/hr/get-balance-controller');
const {
  GetAdminBalance,
  GetSalaries,
} = require('../controller/admin/admin-balance-controller');
const { AdminAuth } = require('../controller/admin/admin-auth-controller');
const { GetPendingAmount } = require('../controller/hr/get-pending-amount');
const {
  Transactions,
  Invoices,
  ApproveInvoice,
  GetTotalAmount,
  GetReceivedAmount,
  GetRemainingAmount,
  DeleteInvoice,
} = require('../controller/admin/transaction-controller');
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
} = require('../controller/admin/manager-controller');

const {
  SubmitCertificateReq,
  SupApproveCert,
  ManApproveCert,
  CertificateIssuance,
  GetAllCertificates,
  GetCertificatesByEmail,
  GetAllCertificateReqs,
} = require('../controller/intern/certificate-request');

const {
  AddTechnology,
  FreezeTech,
  ActiveTech,
  GetAdminTech,
  GetFormTech,
  EditTech,
  UpdateTech,
} = require('../controller/admin/tech-controller');
const {
  AdminInterns,
  UpdateIntern,
  AdminActiveInterns,
  UpdateActiveIntern,
  FreezeInternAccount,
  DeleteInternAccount,
  AdminInterviewInt,
  AdminContactInt,
  AdminTestCompInt,
  AdminTestInt,
  AdminActiveInt,
  AdminRemovedInt,
  RemoveInt,
} = require('../controller/admin/get-all-interns');
const {
  AddBalance,
  DebitSum,
  CreditSum,
  GetAllRecords,
} = require('../controller/admin/account-controller');
const {
  LeaveApprove,
  GetEmployeeLeaves,
  LeaveReject,
} = require('../controller/admin/employee-leave-controller');
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
} = require('../controller/admin/supervisor-controller');
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
  GetSubmittedTasks,
  SubmitReview,
  ApproveTask,
  RejectTask,
  AssignTask,
  GetSupTaskDetails,
  GetProjectTasks,
  GetSubmittedProjTasks,
  SubmitProjReview,
  ApproveProjTask,
  RejectProjTask,
  MarkProjectComplete,
} = require('../controller/supervisor/sup-interns-controller');
const { SupervisorAuth } = require('../controller/supervisor/supervisor-auth');
const {
  CreateWithdrawReq,
  GetSupWithdrawReq,
} = require('../controller/supervisor/sup-balance-controller');
const {
  GetInternProjects,
  CreateTask,
  GetInternTasks,
  UploadTask,
  GetProjectDetail,
  GetTaskDetail,
  GetInternProjectTask,
  SubmitProjectTask,
} = require('../controller/intern/intern-projects-controller');
const {
  AssignShift,
  UpdateShift,
} = require('../controller/supervisor/shift-controller');
const {
  SupervisorGetProfile,
  SupervisorAvatar,
  SupervisorUpdateProfile,
} = require('../controller/supervisor/supervisor-auth');
const {
  CountProjects,
  CountInPorgressProjects,
  CountCompletedProjects,
  CountAttendance,
  CountHolidays,
  CountLeaves,
  CountTasksComplete,
  CountTasksInProgress,
  CountTotalTasks,
  GetInternAverage,
  GetTopInternByAverage,
} = require('../controller/intern/intern-statics-controller');
const {
  SubmitLeaveReq,
  GetLeaves,
} = require('../controller/intern/intern-leave');
const {
  AdminIntProjects,
  AdminIntProjectTasks,
  AdminIntTasks,
} = require('../controller/admin/admin-project-controller');
const {
  AdminInterviewCount,
  AdminContactCount,
  AdminTestCount,
  AdminTestCompletedCount,
  AdminCountAllInterns,
  AdminCountAllActive,
  AdminCountAllProjects,
  AdminCountAllTasks,
  CountOngoingProj,
  CountSubmittedProj,
  CountCompletedProj,
  CountExpiredProj,
} = require('../controller/admin/admin-statics-controller');
const {
  GetUniversities,
  CreateUniAccount,
  ActiveUni,
  FreezeUni,
  AddNewUni,
  UpdateUniData,
  DeactivateUniAccount,
  ActivateUniAccount,
} = require('../controller/admin/uni-controller');
const {
  VerifyEmail,
  VerifyCode,
  VerifyUniEmail,
  VerifyInternEmail,
} = require('../controller/combine/Verify-Email');
const {
  ForgotUniPassword,
  UniAuth,
} = require('../controller/university/uni-auth-controller');
const {
  UniCountAllInterns,
  UniCountAllActive,
  UniCountAllProjects,
  UniCountAllTasks,
} = require('../controller/university/uni-statistics-controller');
const {
  GetFeedback,
  InsertFeedback,
  ManagerComplaint,
  SupervisorComplaint,
  GetManagerComplaints,
  GetSupervisorComplaints,
} = require('../controller/intern/intern-feedback');

const {
  AddPayment,
  GetPayment,
  GetPaymentByRecipientId,
  EditPayment,
  EditPaymentByRecipientId,
  DeletePayment,
} = require('../controller/hr/hr_payment_controller');

const {
  AddAnnouncement,
  GetAnnouncements,
  GetAnnouncementById,
  EditAnnouncement,
  DeleteAnnouncement,
} = require('../controller/hr/hr_announcement');
const {
  GetInternAnnouncements,
} = require('../controller/intern/intern_announcements');

//intern-review
const {
  GetReviewInterns,
  GetNonReviewInterns,
  CountReviewInterns,
  CountNonReviewInterns,
  UpdateReviewStatus,
} = require('../controller/review/intern-review');

//supervisor-intern-stats
const {
  GetActiveInternSup,
  GetTestInternSup,
  GetCompletedInternSup,
  GetProgressInternSup,
  GetOnsiteInterns,
  GetRemoteInterns,
} = require('../controller/supervisor/sup_interns_stats_controller');

const GetVerificationLink = require('../services/GetLink');
const CheckMailVerified = require('../services/CheckMailVerified');
const {
  GetAllInternForCertificateIssuance,
  getInernByEmail,
  getInternProjectsByEmail,
} = require('../controller/hr/Certificate_Issuance.controller');

const router = express.Router();
const secretKey = process.env.SECRETKEY;

/* Middleware to verify token */
function verifyToken(req, res, next) {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.json('Token not provided');
  } else {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        console.log(err);
        console.log('Failed to authenticate token');
        return res.json('Failed to authenticate token');
      }

      req.internEmail = decoded.email;
      next();
    });
  }
}

// ==============================================
//                  TEST ROUTE
// ==============================================
router.get('/test', (req, res) => {
  res.send('Hello from NodeJs Server');
});

// ==============================================
//                  COMBINE ROUTES
// ==============================================
router.post('/verify-email', VerifyUniEmail);
router.post('/verify-int-email', GetVerificationLink);
router.get('/verify-email-status', CheckMailVerified);
router.post('/verify-code', VerifyCode);

// ==============================================
//                  INTERN ROUTES
// ==============================================

// Intern Auth & Registration
router.post('/register-inters', RegisterInterns);
router.get('/get-reg-uni', GetRegisterUni);
router.get('/get-int-image', GetInternImage);
router.get('/get-int-post', GetInternPost);
router.post('/intern-auth', InternAuth);
router.post('/intern-forget-password', ForgotInternPassword);
router.post('/intern-reset-password', ResetInternPassword);
router.post('/intern-update-image', GetAndUpdateInternImage);
router.post('/intern-details', GetInternDetails);
router.post('/intern-update-details', UpdateInternDetails);

// Intern Attendance
router.post('/start-shift', verifyToken, StartShift);
router.post('/end-shift', verifyToken, EndShift);
router.get('/current-shift/:email', verifyToken, CurrentShift);
router.get('/get-intern-attendance', verifyToken, GetInternAttendance);

// Intern Test
router.post('/intern-test', verifyToken, GetTask);
router.post('/mark-test-complete', verifyToken, MarkTaskComplete);

// Intern Projects
router.get('/intern-projects', GetInternProjects);
router.get('/projects-details/:id', GetProjectDetail);
router.post('/create-task', CreateTask);
router.get('/intern-tasks', GetInternTasks);
router.post('/upload-task', UploadTask);
router.post('/submit-project-task', SubmitProjectTask);
router.get('/task-details/:id', GetTaskDetail);
router.get('/get-project-task', GetInternProjectTask);

// Intern Leave
router.post('/int-leave-request', SubmitLeaveReq);
router.get('/get-intern-leaves', GetLeaves);

// Intern Feedback
router.post('/intern-feedback', InsertFeedback);
router.get('/get-intern-feedback', GetFeedback);
router.post('/intern-manager-complaint', ManagerComplaint);
router.post('/intern-supervisor-complaint', SupervisorComplaint);
router.get('/manager-complaints', GetManagerComplaints);
router.get('/supervisor-complaints', GetSupervisorComplaints);

// Certificate Request
router.post('/certificate-request/:id', SubmitCertificateReq);
router.put('/sup-approve-cert/:id', SupApproveCert);
router.put('/manager-approve-cert/:id', ManApproveCert, CertificateIssuance);
router.get('/get-all-certificates', GetAllCertificates);
router.get('/get-certificates/:email', GetCertificatesByEmail);
router.get('/get-certificate-requests', GetAllCertificateReqs);

// Offer Letter
router.post('/intern-offer-letter', InsertOfferLetterRequest);
router.get('/get-intern-offer-letter/:id', GetOfferLetterRequest);
router.get('/get-manager', GetManagerDetails);

// Intern Announcements
router.get('/get-intern-announcement', GetInternAnnouncements);

// Intern Statistics
router.get('/count-int-proj', CountProjects);
router.get('/count-int-prog-proj', CountInPorgressProjects);
router.get('/count-int-comp-proj', CountCompletedProjects);
router.get('/count-int-attend', CountAttendance);
router.get('/count-int-holidays', CountHolidays);
router.get('/count-int-leaves', CountLeaves);
router.get('/count-tasks-in-progress', CountTasksInProgress);
router.get('/count-tasks-complete', CountTasksComplete);
router.get('/count-total-tasks', CountTotalTasks);
router.get('/get-int-avg', GetInternAverage);
router.get('/top-intern-by-average', GetTopInternByAverage);

// ==============================================
//                  HR ROUTES
// ==============================================

// HR Auth
router.post('/manager-auth', HrAuth);
router.put('/manager-avatar/:managerId', HrAvatar);
router.get('/manager/profile/:managerId', HrGetProfile);
router.put('/manager/profile/:managerId', HrUpdateProfile);

// HR Intern Management
router.post('/update-contact-status', verifyToken, MarkAsContact);
router.post('/update-intern-status', verifyToken, AssignTest);
router.post('/remove-intern', verifyToken, RemoveIntern);
router.post('/remove-completed', verifyToken, RemoveCompletedInterns);
router.get('/active-interns', verifyToken, GetActiveInterns);
router.get('/get-test-complete/:email', verifyToken, GetTestComplete);
router.get('/count-interview/:managerid', verifyToken, CountInterviewInterns);
router.get('/count-test/:managerid', verifyToken, CountTestInterns);
router.get('/count-test-completed/:managerid', verifyToken, CountTestCompleted);
router.get('/count-contact-with/:managerid', verifyToken, CountContactWith);
router.get('/get-interns/:managerid', verifyToken, GetNewInternsFrameWork);
router.get(
  '/get-contact-interns/:managerid',
  verifyToken,
  GetContactInternsFrameWork
);
router.get('/get-statics', GetInternStats);
router.get(
  '/get-test-interns/:managerid',
  verifyToken,
  GetTestInternsFrameWork
);
router.get(
  '/get-completed-interns/:managerid',
  verifyToken,
  GetTestCompleteInternsFrameWork
);
router.get('/get-intl-interns/:managerid', GetNewGlobalInternsFrameWork);

// HR Offer Letter
router.get('/offer-letter-request', GetAllOfferLetterRequests);
router.put('/offer-letter-request/:id', UpdateOfferLetterStatus);

// HR Payment Management
router.post('/add-payment', AddPayment);
router.get('/get-payment', GetPayment);
router.put('/edit-payment/:id', EditPayment);
router.delete('/delete-payment/:id', DeletePayment);
router.get('/get-payment/recipient/:recipient_id', GetPaymentByRecipientId);
router.put('/edit-payment/recipient/:recipient_id', EditPaymentByRecipientId);
// HR Get All Intern For Certificate Issuance.
router.get(
  '/GetAll-Intern-For-Certificate-Issuance',
  GetAllInternForCertificateIssuance
);
router.get('/get-intern-byemail/:email', getInernByEmail);
router.get('/get-intern-projects-byemail/:email', getInternProjectsByEmail);
// HR Financials
router.post('/add-amount', verifyToken, AddAmount);
router.get('/get-manager-amount/:email', verifyToken, GetManagerBalance);
router.get('/pending-amount', verifyToken, GetPendingAmount);
router.get('/get-statics', verifyToken, CountInterns);
router.post('/assign-portal', verifyToken, AssignPortal);

// HR Announcements
router.post('/announcements', AddAnnouncement);
router.get('/announcements', GetAnnouncements);
router.get('/announcements/:author_id', GetAnnouncementById);
router.put('/announcements/:id', EditAnnouncement);
router.delete('/announcements/:id', DeleteAnnouncement);

// ==============================================
//                  ADMIN ROUTES
// ==============================================

// Admin Auth
router.post('/admin-auth', AdminAuth);

// Admin Financials
router.get('/get-admin-balance', GetAdminBalance);
router.get('/get-salaries', GetSalaries);
router.get('/get-transactions/:month', Transactions);
router.get('/get-invoices/:month', Invoices);
router.put('/approve-invoice/:email', ApproveInvoice);
router.get('/get-total-amount', GetTotalAmount);
router.get('/get-received-amount', GetReceivedAmount);
router.get('/get-remaining-amount', GetRemainingAmount);
router.delete('/delete-invoice/:id', DeleteInvoice);

// Admin Intern Management
router.get('/get-interview-intern', AdminInterviewInt);
router.get('/get-contact-intern', AdminContactInt);
router.get('/get-test-intern', AdminTestInt);
router.get('/get-tcompl-intern', AdminTestCompInt);
router.get('/get-active-intern', AdminActiveInt);
router.get('/get-revmoved-intern', AdminRemovedInt);
router.put('/update-intern/:id', UpdateIntern);
router.get('/intern-accounts', AdminActiveInterns);
router.put('/update-int-account/:id', UpdateActiveIntern);
router.put('/rem-int/:id', RemoveInt);

// Admin Statistics
router.get('/admin-interview-count', AdminInterviewCount);
router.get('/admin-contact-count', AdminContactCount);
router.get('/admin-test-count', AdminTestCount);
router.get('/admin-completed-count', AdminTestCompletedCount);
router.get('/admin-all-intern-count', AdminCountAllInterns);
router.get('/admin-all-active-count', AdminCountAllActive);
router.get('/admin-all-projects-count', AdminCountAllProjects);
router.get('/admin-all-tasks-count', AdminCountAllTasks);
router.get('/count-ongoing', CountOngoingProj);
router.get('/count-submitted', CountSubmittedProj);
router.get('/count-completed', CountCompletedProj);
router.get('/count-expired', CountExpiredProj);

// Admin Projects
router.get('/admin-int-proj', AdminIntProjects);
router.get('/admin-int-proj-tasks', AdminIntProjectTasks);
router.get('/admin-int-tasks', AdminIntTasks);

// Admin Account Management
router.get('/all-account-rec', GetAllRecords);
router.post('/add-balance', AddBalance);
router.get('/get-debit-total', DebitSum);
router.get('/get-credit-total', CreditSum);

// Admin Leave Management
router.get('/get-employee-leaves', GetEmployeeLeaves);
router.put('/approve-leave/:id', LeaveApprove);
router.put('/reject-leave/:id', LeaveReject);

// Admin Manager Management
router.put('/:id', UpdateManager);
router.get('/get-managers', GetManagers);
router.post('/add-manager', CreateManager);
router.put('/freeze-manager/:email', FreezeManager);
router.put('/active-manager/:email', ActiveManager);
router.post('/assign-permissions', AssignPermissions);
router.get('/get-single-manager/:id', GetSingleManager);
router.get('/get-manager-permissions/:id', GetManagerPermissions);
router.get('/get-manager-new-permissions', GetNewPermissionsTech);
router.delete('/remove-manager-permission/:id', RemovePermission);

// Admin Supervisor Management
router.put('/:supid', UpdateSupervisor);
router.get('/get-supervisors', GetSupervisors);
router.post('/add-supervisor', CreateSupervisor);
router.put('/freeze-supervisor/:id', FreezeSupervisor);
router.put('/active-supervisor/:id', ActiveSupervisor);
router.get('/get-single-sup/:id', GetSingleSupervisor);
router.get('/get-sup-permissions/:id', GetSupervisorsPermissions);
router.post('/assign-sup-permissions', AssignSupervisorPermissions);
router.delete('/remove-sup-permission/:id', RemoveSupervisorPermissions);

// Admin Technology Management
router.post('/add-tech', AddTechnology);
router.put('/freeze-tech/:id', FreezeTech);
router.put('/active-tech/:id', ActiveTech);
router.get('/admin-tech', GetAdminTech);
router.get('/form-tech', GetFormTech);
router.get('/edit-tech/:id', EditTech);
router.put('/update-tech/:id', UpdateTech);

// Admin University Management
router.get('/admin-get-uni', GetUniversities);
router.post('/add-uni', AddNewUni);
router.put('/update-uni/:id', UpdateUniData);
router.put('/create-uni-acount/:id', CreateUniAccount);
router.put('/deactivate-uni-acc/:id', DeactivateUniAccount);
router.put('/activate-uni-acc/:id', ActivateUniAccount);
router.put('/active-uni/:id', ActiveUni);
router.put('/freeze-uni/:id', FreezeUni);

// ==============================================
//                  UNIVERSITY ROUTES
// ==============================================
router.post('/uni-auth', UniAuth);
router.post('/update-uni-pass', ForgotUniPassword);
router.get('/count-all-uni-intern/:uniName', UniCountAllInterns);
router.get('/count-all-uni-active/:uniName', UniCountAllActive);
router.get('/count-all-uni-proj/:uniName', UniCountAllProjects);
router.get('/count-all-uni-tasks/:uniName', UniCountAllTasks);

// ==============================================
//                  SUPERVISOR ROUTES
// ==============================================

// Supervisor Auth
router.post('/supervisor-auth', SupervisorAuth);
router.put('/supervisor-avatar/:managerId', SupervisorAvatar);
router.get('/supervisor/profile/:managerId', SupervisorGetProfile);
router.put('/supervisor/profile/:managerId', SupervisorUpdateProfile);

// Supervisor Intern Management
router.get('/get-sup-interns/:supid', verifyToken, GetSupervisorsInterns);
router.post('/assign-project', verifyToken, AssignProject);
router.post('/assign-task', verifyToken, AssignTask);
router.get('/count-attend/:email', verifyToken, GetAttendance);
router.get('/count-all-proj/:email', verifyToken, CountAllProjects);
router.get('/count-comp-proj/:email', verifyToken, CountCompProjects);
router.get('/count-exp-proj/:email', verifyToken, CountExpProjects);
router.get('/get-sup-projects/:supid', verifyToken, GetProjects);
router.get('/get-projects-tasks/:supid', verifyToken, GetProjectTasks);
router.get('/get-sup-tasks/:supid', verifyToken, GetTasks);
router.get('/get-task-details', verifyToken, GetSupTaskDetails);
router.get('/get-intern-leaves/:supid', verifyToken, GetInterLeaves);
router.put('/approve-int-leave/:leave_id', verifyToken, ApproveInternLeave);
router.put('/reject-int-leave/:leave_id', verifyToken, RejectInternLeave);

// Supervisor Intern Stats
router.get('/active-interns/:manager_id', GetActiveInternSup);
router.get('/progress-interns/:manager_id', GetProgressInternSup);
router.get('/completed-interns/:manager_id', GetCompletedInternSup);
router.get('/test-interns/:manager_id', GetTestInternSup);
router.get('/onsite-interns/:manager_id', GetOnsiteInterns);
router.get('/remote-interns/:manager_id', GetRemoteInterns);

// Supervisor Task Management
router.get('/get-submit-task/:id', GetSubmittedTasks);
router.put('/submit-review/:id', SubmitReview);
router.put('/approve-task/:id', ApproveTask);
router.put('/reject-task/:id', RejectTask);
router.get('/get-submit-ptask/:id', GetSubmittedProjTasks);
router.put('/submit-proj-review/:id', SubmitProjReview);
router.put('/approve-proj-task/:id', ApproveProjTask);
router.put('/reject-proj-task/:id', RejectProjTask);
router.put('/mark-project-complete/:id', MarkProjectComplete);

// Supervisor Shift Management
router.post('/assign-shift', AssignShift);
router.put('/update-shift/:check', UpdateShift);

// Supervisor Financials
router.post('/create-withdraw-req', verifyToken, CreateWithdrawReq);
router.get('/get-sup-withdraw-req', verifyToken, GetSupWithdrawReq);

// ==============================================
//                  REVIEW ROUTES
// ==============================================
router.get('/review-interns', GetReviewInterns);
router.get('/non-review-interns', GetNonReviewInterns);
router.get('/count-review-interns', CountReviewInterns);
router.get('/count-non-review-interns', CountNonReviewInterns);
router.put('/update-review-status', UpdateReviewStatus);

module.exports = router;
