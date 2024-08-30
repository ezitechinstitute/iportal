const { connection } = require("../../config/connection");
const {
  SendMailRegister,
  SendMailVerifyCode,
} = require("../../mail/mailer-controller");

const {
  SendMessageRemote,
  SendMessageOnsite,
  SendMessageOther,
} = require("../../whatsapp/whatsapp-api.js");
const dotenv = require("dotenv").config();

// const id = process.env.INSTANCEID;
// const token = process.env.ACCESSTOKEN;

const RegisterInterns = (req, res) => {
  const {
    internUsername,
    internemail,
    internCity,
    internPhone,
    internCnic,
    internGender,
    internImage,
    internJoinDate,
    internDob,
    internUniversity,
    internDegree,
    interviewType,
    internTechnology,
    internDuration,
    internType,
    interviewDate,
    interviewTime,
    internCode,
  } = req.body.value;

  let interndata = [
    internUsername,
    internemail,
    internCity,
    internPhone,
    internCnic,
    internGender,
    internImage,
    internJoinDate,
    internDob,
    internUniversity,
    internDegree,
    interviewType,
    internTechnology,
    internDuration,
    internType,
    interviewDate,
    interviewTime,
  ];

  const sql00 = "SELECT `code` FROM `verification_code` WHERE `email` = ?";
  connection.query(sql00, [internemail], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      if (data[0].code !== parseInt(internCode)) {
        ExpireCode(internemail);
        return res.json({ codeMsg: false });
      } else {
        const sql0 = "SELECT * FROM `intern_table` WHERE `email`= (?)";
        connection.query(sql0, [internemail], (err, data) => {
          if (err) {
            return res.json(err);
          } else {
            let flag = 0;

            for (let i = 0; i < data.length; i++) {
              if (data[0].email === internemail) {
                flag = 1;
                return res.json({ exist: true });
              }
            }

            if (flag === 0) {
              const sql1 =
                "INSERT INTO `intern_table`(`name`, `email`, `city`, `phone`, `cnic`, `gender`, `image`, `join_date`, `birth_date`, `university`, `degree`, `interview_type`, `technology`, `duration`, `intern_type`, `interview_date`, `interview_time`) VALUES (?)";

              connection.query(sql1, [interndata], (err, data) => {
                if (err) {
                  console.log(err);
                  return res.json(err);
                } else {
                  if (data.affectedRows === 1) {
                    SendMailRegister(
                      internUsername,
                      internemail,
                      internTechnology,
                      internType,
                      interviewType
                    );
                    // if (interviewType === "Remote") {
                    //   if (
                    //     internTechnology === "Digital Marketing" ||
                    //     internTechnology === "Search Engine Optimization (SEO)" ||
                    //     internTechnology === "WordPress Development"
                    //   ) {
                    //     createOtherQueue(internPhone);
                    //     setInterval(() => {
                    //       if (dataOther.length > 0) {
                    //         SendMessageOther(getOtherQueue().slice(1, 13));
                    //       }
                    //     }, 60000);
                    //   } else {
                    //     createQueueRemote(internPhone);
                    //     setInterval(() => {
                    //       if (dataRemote.length > 0) {
                    //         SendMessageRemote(getRemoteQueue().slice(1, 13));
                    //       }
                    //     }, 60000);
                    //   }

                    //   // SendMailRemote(
                    //   //   internUsername,
                    //   //   internemail,
                    //   //   interviewDate,
                    //   //   interviewTime
                    //   // );
                    // } else {
                    //   if (
                    //     internTechnology === "Digital Marketing" ||
                    //     internTechnology === "Search Engine Optimization (SEO)" ||
                    //     internTechnology === "WordPress Development"
                    //   ) {
                    //     createOtherQueue(internPhone);
                    //     setInterval(() => {
                    //       if (dataOther.length > 0) {
                    //         SendMessageOther(getOtherQueue().slice(1, 13));
                    //       }
                    //     }, 60000);
                    //   } else {
                    //     createQueueOnsite(internPhone);
                    //     setInterval(() => {
                    //       if (dataOnsite.length > 0) {
                    //         SendMessageOnsite(getOnisteQueue().slice(1, 13));
                    //       }
                    //     }, 60000);
                    //   }
                    //   // getOnisteQueue();

                    //   // SendMailOnsite(internUsername, internemail);
                    // }
                    ExpireCode(internemail);
                    return res.json(data.affectedRows);
                  }
                }
              });
            } else {
              ExpireCode(internemail);
            }
          }
        });
      }
    }
  });
};

const SendVerificationCode = (req, res) => {
  const { email, code } = req.body;

  const sql = "INSERT INTO `verification_code`(`email`, `code`) VALUES (?, ?)";
  connection.query(sql, [email, code], (err, data) => {
    if (err) {
      return res.json({ msg: err.sqlMessage });
    } else {
      SendMailVerifyCode(email, code);
      return res.json({ msg: "Verification code send to your email" });
    }
  });
};

function ExpireCode(email) {
  const sql = "DELETE FROM `verification_code` WHERE `email` = ?";
  connection.query(sql, [email], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      console.log("Code Deleted");
    }
  });
}

// cron.schedule('0 * * * * *', () => {
//   console.log('Running a task every 1 minute');

//   // Example: Deleting a file
//   const filePath = './temporaryFile.txt';
//   fs.unlink(filePath, (err) => {
//     if (err) {
//       console.error("Error deleting file:", err);
//     } else {
//       console.log("File deleted successfully.");
//     }
//   });
// });

//   const sql1 =
// "INSERT INTO `intern_table`(`name`, `email`, `phone`, `cnic`, `gender`, `image`, `join_date`, `birth_date`, `university`, `degree`, `interview_type`, `technology`, `duration`, `intern_type`, `interview_date`, `interview_time`) VALUES (?)";

let dataOnsite = [];
let dataRemote = [];
let dataOther = [];

function createQueueOnsite(number) {
  dataOnsite.push(number);
}

function getOnisteQueue() {
  return dataOnsite.pop();
}

function createQueueRemote(number) {
  dataRemote.push(number);
}

function getRemoteQueue() {
  return dataRemote.pop();
}

function createOtherQueue(number) {
  dataOther.push(number);
}

function getOtherQueue() {
  return dataOther.pop();
}

module.exports = { RegisterInterns, SendVerificationCode };
