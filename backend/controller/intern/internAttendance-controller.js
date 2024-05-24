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

  //   console.log(startTime);

  checkAttendanceMarked(email, (err, haMarked) => {
    if (err) throw err;

    if (haMarked) {
      return res.json({ message: true });
    } else {
      const startTime = new Date();
      const sql =
        "INSERT INTO `intern_attendance`(`email`, `start_shift`) VALUES (?, ?)";
      connection.query(sql, [email, startTime], (err, data) => {
        if (err) {
          return res.json(err);
        } else {
          return res.json({ status: "success", startTime });
        }
      });
    }
  });
};

const EndShift = (req, res) => {
  const { email } = req.body;
  const endTime = new Date();
  const sql0 =
    "SELECT `start_shift` FROM `intern_attendance` WHERE `email` = ? AND `end_shift` IS NUll ORDER BY `id` DESC LIMIT 1";

  connection.query(sql0, [email], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      if (data.length > 0) {
        const startTime = new Date();
        const duration = Math.floor(endTime - startTime / 1000);

        console.log(duration);

        const sql =
          "UPDATE `intern_attendance` SET `end_shift`= (?), `duration` = (?) WHERE `email` = (?) AND `end_shift` IS NULL ORDER BY `id` DESC LIMIT 1";
        connection.query(sql, [endTime, duration, email], (err, data) => {
          if (err) {
            return res.json(err);
          } else {
            return res.json({ status: "Shift Ended", endTime, duration });
          }
        });
      }
    }
  });
};

const CurrentShift = (req, res) => {
  const { email } = req.params;
  console.log(email);

  const sql =
    "SELECT start_shift FROM attendance WHERE email = ? AND end_shift IS NULL ORDER BY `id DESC LIMIT 1'";

  connection.query(sql, [email], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      if (data.length > 0) {
        return res.json({ shiftActive: true, shiftTime: data[0].start_shift });
      } else {
        checkAttendanceMarked(email, (err, hasMarked) => {
          if (err) throw err;
          return res.json({ shiftActive: false, hasMarked });
        });
      }
    }
  });
};

module.exports = {
  StartShift,
  EndShift,
  CurrentShift,
};
