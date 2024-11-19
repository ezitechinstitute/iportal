const { connection } = require("../../config/connection");

/* Manager Statistics */
const AdminInterviewCount = (req, res) => {
  const sql =
    "SELECT COUNT(*) as interviewCount FROM `intern_table` WHERE `status` = 'Interview'";
  connection.query(sql, (err, data) => {
    if (err) throw err;
    return res.json(data[0].interviewCount);
  });
};

const AdminContactCount = (req, res) => {
  const sql =
    "SELECT COUNT(*) as contactCount FROM `intern_table` WHERE `status` = 'Contact'";
  connection.query(sql, (err, data) => {
    if (err) throw err;
    return res.json(data[0].contactCount);
  });
};

const AdminTestCount = (req, res) => {
  const sql =
    "SELECT COUNT(*) as testCount FROM `intern_table` WHERE `status` = 'Test'";
  connection.query(sql, (err, data) => {
    if (err) throw err;
    return res.json(data[0].testCount);
  });
};

const AdminTestCompletedCount = (req, res) => {
  const sql =
    "SELECT COUNT(*) as testCompletedCount FROM `intern_table` WHERE `status` = 'Completed'";
  connection.query(sql, (err, data) => {
    if (err) throw err;
    return res.json(data[0].testCompletedCount);
  });
};

/* Intern Statistics */
const AdminCountAllInterns = (req, res) => {
  const sql = "SELECT COUNT(*) as allInterns FROM `intern_table`";
  connection.query(sql, (err, data) => {
    if (err) throw err;
    return res.json(data[0].allInterns);
  });
};

const AdminCountAllActive = (req, res) => {
  const sql =
    "SELECT COUNT(*) as activeInterns FROM `intern_table` WHERE `status` = 'Active'";
  connection.query(sql, (err, data) => {
    if (err) throw err;
    return res.json(data[0].activeInterns);
  });
};

const AdminCountAllProjects = (req, res) => {
  const sql = "SELECT COUNT(*) as allProjects FROM `intern_projects`";
  connection.query(sql, (err, data) => {
    if (err) throw err;
    return res.json(data[0].allProjects);
  });
};

const AdminCountAllTasks = (req, res) => {
  const sql = "SELECT COUNT(*) as allTasks FROM `intern_tasks`";
  connection.query(sql, (err, data) => {
    if (err) throw err;
    return res.json(data[0].allTasks);
  });
};

// Project Statistics
const CountOngoingProj = (req, res) => {
  const sql =
    "SELECT COUNT(*) as ongoingProjects FROM `intern_projects` WHERE `pstatus` = 'Ongoing'";
  connection.query(sql, (err, data) => {
    if (err) throw err;
    return res.json(data[0].ongoingProjects);
  });
};

const CountSubmittedProj = (req, res) => {
  const sql =
    "SELECT COUNT(*) as submitProjects FROM `intern_projects` JOIN project_tasks ON intern_projects.project_id = project_tasks.project_id WHERE project_tasks.task_status = 'Submitted'";
  connection.query(sql, (err, data) => {
    if (err) throw err;
    return res.json(data[0].submitProjects);
  });
};

const CountCompletedProj = (req, res) => {
  const sql =
    "SELECT COUNT(*) as completedProjects FROM `intern_projects` WHERE `pstatus` = 'Completed'";
  connection.query(sql, (err, data) => {
    if (err) throw err;
    return res.json(data[0].completedProjects);
  });
};

const CountExpiredProj = (req, res) => {
  const sql =
    "SELECT COUNT(*) as expiredProjects FROM `intern_projects` WHERE `pstatus` = 'Expired'";
  connection.query(sql, (err, data) => {
    if (err) throw err;
    return res.json(data[0].expiredProjects);
  });
};

module.exports = {
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
};
