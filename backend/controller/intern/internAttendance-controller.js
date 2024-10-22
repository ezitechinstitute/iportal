const { connection } = require("../../config/connection");
const cron = require("node-cron");
const moment = require("moment-timezone");

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
  const { id, email, currentLat, currentLon } = req.body;
  console.log(req.body);

  checkAttendanceMarked(email, (err, haMarked) => {
    console.log(err);
    if (err) throw err;

    if (haMarked) {
      return res.json({ hasMarkedStatus: true });
    } else {
      const sql = "SELECT lati, longi FROM `office_location` WHERE 1";
      connection.query(sql, (err, officeLocation) => {
        if (err) throw err;
        console.log(officeLocation);
        const radius = 0.5; // 0.5 km radius
        const sql =
          "SELECT `start_shift`, `end_shift`, `onsite_remote` FROM `shift_table` WHERE `eti_id` = ? AND `intern_email` = ?";
        connection.query(sql, [id, email], (err, shiftResult) => {
          if (err) throw err;

          if (shiftResult.length === 0) {
            return res.json({
              message:
                "You are not assigned to any shift! Please contact your supervisor.",
            });
          }

          const shift = shiftResult[0];
          // Get the current date and time in Pakistan time
          const currentDate = new Date();
          const currentTimeInPakistan = new Date(
            currentDate.toLocaleString("en-US", { timeZone: "Asia/Karachi" })
          );

          // Convert shift start and end times to local time in Pakistan
          const startTime = new Date(
            new Date(`1970-01-01T${shift.start_shift}`).toLocaleString(
              "en-US",
              { timeZone: "Asia/Karachi" }
            )
          );
          const endTime = new Date(
            new Date(`1970-01-01T${shift.end_shift}`).toLocaleString("en-US", {
              timeZone: "Asia/Karachi",
            })
          );

          // Check if the current time is within the shift start and end times
          if (
            currentTimeInPakistan < startTime ||
            currentTimeInPakistan > endTime
          ) {
            return res.json({
              message: "Check-in is only allowed during shift hours",
            });
          }
          // const currentTime = moment.tz("Asia/Karachi");
          // const startTime = moment.tz(
          //   `1970-01-01T${shift.start_shift}`,
          //   "Asia/Karachi"
          // );
          // const endTime = moment.tz(
          //   `1970-01-01T${shift.end_shift}`,
          //   "Asia/Karachi"
          // );

          // // Check if the current time is within the shift start and end times
          // if (currentTime.isBefore(startTime) || currentTime.isAfter(endTime)) {
          //   return res.json({
          //     message: `Check-in is only allowed during shift hours`,
          //   });
          // }
          // const startTime = new Date(`1970-01-01T${shift.start_shift}Z`);
          // const endTime = new Date(`1970-01-01T${shift.end_shift}Z`);
          // Stored start and end times in "HH:mm:ss" format (these can still be in UTC or another time zone if required)
          // const currentHourMinute = moment.tz("Asia/Karachi");

          // const startTime = moment.tz(
          //   currentHourMinute.format("YYYY-MM-DD") + shift.start_shift,
          //   "HH:mm:ss",
          //   "Asia/Karachi"
          // );
          // const endTime = moment.tz(
          //   currentHourMinute.format("YYYY-MM-DD") + shift.end_shift,
          //   "HH:mm:ss",
          //   "Asia/Karachi"
          // );

          // Get the current time
          // const currentTime = new Date();
          // const timeFrom1970 = new Date("1970-01-01T00:00:00.000Z");
          // timeFrom1970.setUTCHours(currentTime.getHours());
          // timeFrom1970.setUTCMinutes(currentTime.getMinutes());
          // timeFrom1970.setUTCSeconds(currentTime.getSeconds());
          // timeFrom1970.setMilliseconds(0);

          // // Base date
          // const baseDate = "1970-01-01T";
          // // Convert to Pakistan Standard Time (UTC+5)
          // const pakistanTime = moment.tz().tz("Asia/Karachi");
          // // Create the final date string in the format '1970-01-01T17:00:00Z'

          // const currentHourMinute = `${baseDate}${pakistanTime.format(
          //   "HH:mm:ss"
          // )}Z`; // Add "Z" to indicate UTC

          // Check if the current time is within the shift start and end times
          // if (currentHourMinute < startTime || currentHourMinute > endTime) {
          //   return res.json({
          //     message: `Check-in is only allowed during shift hours`,
          //   });
          // }
          // if (currentHourMinute < startTime || currentHourMinute > endTime) {
          //   return res.json({
          //     message: "Check-in is only allowed during shift hours",
          //   });
          // }

          if (shift.onsite_remote === "Onsite") {
            console.log("Onsite");
            // Calculate the distance from the office
            const distance = calculateDistance(
              officeLocation[0].lati,
              officeLocation[0].longi,
              currentLat,
              currentLon
            );

            if (distance <= radius) {
              console.log("Heelo", distance);
              // Allow check-in
              const checkInTime = moment.utc().format("YYYY-MM-DD HH:mm:ss");

              // Insert check-in details into the database
              const sql =
                "INSERT INTO `intern_attendance`(`eti_id`, `email`, `start_shift`) VALUES (?, ?, ?)";
              connection.query(sql, [id, email, checkInTime], (err, result) => {
                if (err) {
                  console.log(err);
                  return res.json({ error: "Error saving check-in data" });
                } else {
                  return res.json({
                    success: true,
                    message: "Checked in successfully.",
                    startShiftStatus: true,
                  });
                }
              });
            } else {
              // Deny check-in due to location
              res.json({
                message: "You are not at the office. Check-in denied",
              });
            }
          }
          if (shift.onsite_remote === "Remote") {
            console.log("Remote");

            const checkInTime = moment.utc().format("YYYY-MM-DD HH:mm:ss");

            // Insert check-in details into the database
            const sql =
              "INSERT INTO `intern_attendance`(`eti_id`, `email`, `start_shift`) VALUES (?, ?, ?)";
            connection.query(sql, [id, email, checkInTime], (err, result) => {
              if (err) {
                console.log(err);
                return res.json({ error: "Error saving check-in data" });
              } else {
                return res.json({
                  success: true,
                  message: "Checked in successfully.",
                  startShiftStatus: true,
                });
              }
            });
          }
        });
      });
    }
  });
};

const EndShift = (req, res) => {
  console.log("first");
  const { id, email, currentLat, currentLon } = req.body;

  const sql = "SELECT lati, longi FROM `office_location` WHERE 1";
  connection.query(sql, (err, officeLocation) => {
    if (err) throw err;

    const radius = 0.5; // 0.5 km radius
    const sql =
      "SELECT `start_shift`, `end_shift`, `onsite_remote` FROM `shift_table` WHERE `eti_id` = ? AND `intern_email` = ?";
    connection.query(sql, [id, email], (err, shiftResult) => {
      if (err) throw err;

      if (shiftResult.length === 0) {
        return res.json({
          message:
            "You are not assigned to any shift! Please contact your supervisor.",
        });
      }

      const shift = shiftResult[0];
      const endTime = new Date(`1970-01-01T${shift.end_shift}`);

      // Get the current time

      // const currentTime = new Date();
      // const timeFrom1970 = new Date("1970-01-01T00:00:00.000Z");
      // timeFrom1970.setUTCHours(currentTime.getUTCHours());
      // timeFrom1970.setUTCMinutes(currentTime.getUTCMinutes());
      // timeFrom1970.setUTCSeconds(currentTime.getUTCSeconds());
      // timeFrom1970.setUTCMilliseconds(0);

      // const currentHourMinute = new Date(timeFrom1970.toISOString());
      // Base date
      const baseDate = "1970-01-01T";
      // Convert to Pakistan Standard Time (UTC+5)
      const pakistanTime = moment.tz().tz("Asia/Karachi");
      // Create the final date string in the format '1970-01-01T17:00:00Z'

      const currentHourMinute = `${baseDate}${pakistanTime.format(
        "HH:mm:ss"
      )}Z`; // Add "Z" to indicate UTC

      // Check if the current time is after the shift's end time
      if (currentHourMinute > endTime) {
        return res.json({
          message: "Check-out is only allowed during shift hours",
        });
      }

      if (shift.onsite_remote === "Onsite") {
        console.log("Onsite");

        // Calculate the distance from the office
        const distance = calculateDistance(
          officeLocation[0].lati,
          officeLocation[0].longi,
          currentLat,
          currentLon
        );

        if (distance <= radius) {
          console.log("Checking out", distance);
          const checkOutTime = new Date();

          // Update the check-out time in the attendance record
          const sql =
            "UPDATE `intern_attendance` SET `end_shift` = ?, status = 1 WHERE `eti_id` = ? AND `email` = ?";
          connection.query(sql, [checkOutTime, id, email], (err, result) => {
            if (err) {
              console.log(err);
              return res.json({ error: "Error saving check-out data" });
            } else {
              return res.json({
                success: true,
                message: "Checked out successfully.",
                endShiftStatus: true,
              });
            }
          });
        } else {
          // Deny check-out due to location
          res.json({
            message: "You are not at the office. Check-out denied.",
          });
        }
      } else {
        console.log("Remote");

        const checkOutTime = new Date();

        // Update the check-out time in the attendance record
        const sql =
          "UPDATE `intern_attendance` SET `end_shift` = ?, status = 1 WHERE `eti_id` = ? AND `email` = ?";
        connection.query(sql, [checkOutTime, id, email], (err, result) => {
          if (err) {
            console.log(err);
            return res.json({ error: "Error saving check-out data" });
          } else {
            return res.json({
              success: true,
              message: "Checked out successfully.",
              endShiftStatus: true,
            });
          }
        });
      }
    });
  });
};

const MarkAbsentAuto = (req, res) => {
  // SQL query to find interns who checked in but haven't checked out
  const sql = `SELECT id, email FROM intern_attendance 
    WHERE end_shift IS NULL AND status IS NULL AND DATE(start_shift) = CURDATE()`;

  connection.query(sql, (err, results) => {
    if (err) throw err;
    // Get the current time
    const currentTime = new Date();
    // const currentHourMinute = new Date(
    //   `1970-01-01T${currentTime.getHours()}:${currentTime.getMinutes()}:00`
    // );

    if (results.length > 0) {
      results.forEach((intern) => {
        // Mark absent for interns who haven't checked out
        const updateSql = `UPDATE intern_attendance
                SET status = 0, end_shift = ?
                WHERE id = ? AND end_shift IS NULL`;

        connection.query(updateSql, [currentTime, intern.id], (err, result) => {
          if (err) {
            console.log(`Error marking absent for intern ${intern.email}`, err);
          } else {
            console.log(`Intern ${intern.email} marked as absent.`);
          }
        });
      });
    } else {
      console.log("No pending checkouts for today.");
    }
  });
};

cron.schedule(
  "59 23 * * * *",
  () => {
    console.log("running the project schedule");
    // ProjectDayIncrement();
    MarkAbsentAuto();
  },
  {
    scheduled: true,
    timezone: "Asia/Karachi", // Set the timezone to Pakistan
  }
);

// Function to calculate distance using the Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  // console.log(distance);
  return distance;
}

const CurrentShift = (req, res) => {
  const { email } = req.params;

  const sql =
    "SELECT `start_shift` FROM `intern_attendance` WHERE `email` = ? AND `end_shift` IS NULL AND status IS NULL ORDER BY `id` DESC LIMIT 1";

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
