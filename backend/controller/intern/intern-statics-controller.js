const { connection } = require("../../config/connection");

const CountProjects = (req, res) => {
  const { id } = req.query;

  const sql =
    "SELECT COUNT(*) as totalProjects FROM `intern_projects` WHERE `eti_id` = ?";
  connection.query(sql, [id], (err, data) => {
    if (err) throw err;
    return res.json(data[0].totalProjects);
  });
};

const CountInPorgressProjects = (req, res) => {
  const { id } = req.query;

  const sql =
    "SELECT COUNT(*) as totalInProgressProjects FROM `intern_projects` WHERE `pstatus`= 'Ongoing' AND `eti_id` = ?";
  connection.query(sql, [id], (err, data) => {
    if (err) throw err;
    return res.json(data[0].totalInProgressProjects);
  });
};

const CountCompletedProjects = (req, res) => {
  const { id } = req.query;

  const sql =
    "SELECT COUNT(*) as totalCompleteProjects FROM `intern_projects` WHERE `pstatus`= 'Completed' AND `eti_id` = ?";
  connection.query(sql, [id], (err, data) => {
    if (err) throw err;
    return res.json(data[0].totalCompleteProjects);
  });
};

const CountAttendance = (req, res) => {
  const { id } = req.query;

  const sql =
    "SELECT COUNT(*) as totalAttendance FROM `intern_attendance` WHERE `status` = 1 AND `eti_id` = ?";
  connection.query(sql, [id], (err, data) => {
    if (err) throw err;
    return res.json(data[0].totalAttendance);
  });
};

const CountHolidays = (req, res) => {
  const { id } = req.query;

  const sql =
    "SELECT COUNT(*) as totalHoldays FROM `intern_attendance` WHERE `status` = 0 AND `eti_id` = ?";
  connection.query(sql, [id], (err, data) => {
    if (err) throw err;
    return res.json(data[0].totalHoldays);
  });
};

const CountLeaves = (req, res) => {
  const { id } = req.query;

  const sql =
    "SELECT COUNT(*) as totalLeaves FROM `intern_leaves` WHERE `leave_status` = 1 AND `eti_id` = ?";
  connection.query(sql, [id], (err, data) => {
    if (err) throw err;
    return res.json(data[0].totalLeaves);
  });
};

module.exports = {
  CountProjects,
  CountInPorgressProjects,
  CountCompletedProjects,
  CountAttendance,
  CountHolidays,
  CountLeaves,
};
