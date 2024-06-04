const { connection } = require("../../config/connection");

function checkAttendanceMarked(email, callback) {
  const startDay = new Date();
  startDay.setHours(0, 0, 0, 0);

  const sql =
    "SELECT COUNT(*) AS count FROM `intern_attendance` WHERE `email` = ? AND start_shift >= ?";

  connection.query(sql, [email, startDay], (err, data) => {
    if (err) return callback(err, null);
    callback(null, data[0].count > 0);
  });
}

const StartShift = (req, res) => {
  const { email } = req.body;

  checkAttendanceMarked(email, (err, haMarked) => {
    if (err) throw err;

    if (haMarked) {
      return res.json({ hasMarkedStatus: true });
    } else {
      const startTime = new Date();
      const sql =
        "INSERT INTO `intern_attendance`(`email`, `start_shift`) VALUES (?, ?)";
      connection.query(sql, [email, startTime], (err, data) => {
        if (err) {
          return res.json(err);
        } else {
          return res.json({ startShiftStatus: true });
        }
      });
    }
  });
};

function checkAttendanceNotMark(email, callback) {
  const startDay = new Date();
  startDay.setHours(0, 0, 0, 0);

  const sql =
    "SELECT COUNT(*) AS count FROM `intern_attendance` WHERE `email` = ? AND start_shift >= ?";

  connection.query(sql, [email, startDay], (err, data) => {
    if (err) return callback(err, null);
    callback(null, data[0].count > 0);
  });
}

const EndShift = (req, res) => {
  const { email } = req.body;

  checkAttendanceNotMark(email, (err, NotMarked) => {
    if (err) throw err;

    if (NotMarked) {
      return res.json({ notMarked: true });
    } else {
      const endTime = new Date();
      const sql0 =
        "SELECT `start_shift` FROM `intern_attendance` WHERE `email` = ? AND `end_shift` IS NUll ORDER BY `id` DESC LIMIT 1";

      connection.query(sql0, [email], (err, data) => {
        if (err) {
          return res.json(err);
        } else {
          if (data.length > 0) {
            const sql =
              "UPDATE `intern_attendance` SET `end_shift`= (?) WHERE `email` = (?) AND `end_shift` IS NULL ORDER BY `id` DESC LIMIT 1";
            connection.query(sql, [endTime, email], (err, data) => {
              if (err) {
                return res.json(err);
              } else {
                return res.json({ endShiftStatus: true });
              }
            });
          }
        }
      });
    }
  });
};

const CurrentShift = (req, res) => {
  const { email } = req.params;

  const sql =
    "SELECT `start_shift` FROM `intern_attendance` WHERE `email` = ? AND `end_shift` IS NULL ORDER BY `id` DESC LIMIT 1";

  connection.query(sql, [email], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      if (data.length > 0) {
        return res.json({ shiftActive: true });
      } else {
        checkAttendanceMarked(email, (err, hasMarked) => {
          if (err) throw err;
          return res.json({ shiftActive: false, hasMarked });
        });

        checkAttendanceNotMark(email, (err, notMarked) => {
          if (err) throw err;
          return res.json({ shiftActive: "true", notMarked });
        });
      }
    }
  });
};

const GetInternAttendance = (req, res) => {
  const sql = "SELECT * FROM `intern_attendance` WHERE `email` = ?";
  connection.query(sql, [req.internEmail], (err, data) => {
    if (err) throw err;
    return res.json(data);
  });
};

module.exports = {
  StartShift,
  EndShift,
  CurrentShift,
  GetInternAttendance,
};
