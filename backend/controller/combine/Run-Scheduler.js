const cron = require("node-cron");
const { DateTime } = require("luxon"); // Install luxon for better date handling
const { TaskDayIncrement } = require("../intern/intern-projects-controller");
const { ProjectDayIncrement } = require("../supervisor/sup-interns-controller");
const { MarkAbsentAuto } = require("../intern/internAttendance-controller");

const isMidnightInPakistan = () => {
  const nowInPakistan = DateTime.now().setZone("Asia/Karachi");
  const hour = nowInPakistan.hour;
  const minute = nowInPakistan.minute;

  return hour === 0 && minute === 0; // Midnight check
};

// Function to check if it's midnight in Pakistan (Asia/Karachi)
const isBeforeMidnightInPakistan = () => {
  const nowInPakistan = DateTime.now().setZone("Asia/Karachi");
  const hour = nowInPakistan.hour;
  const minute = nowInPakistan.minute;

  return hour === 23 && minute === 55; // Midnight check
};

const RunJob = () => {
  cron.schedule("* * * * * *", () => {
    if (isMidnightInPakistan()) {
      TaskDayIncrement();
      ProjectDayIncrement();
    }

    if (isBeforeMidnightInPakistan()) {
      MarkAbsentAuto();
    }
  });
};

module.exports = RunJob;
