const { connection } = require("../../config/connection");
// const {
//   SendMailRemote,
//   SendMailOnsite,
// } = require("../../mail/mailer-controller");

const {
  SendMessageRemote,
  SendMessageOnsite,
} = require("../../whatsapp/whatsapp-api.js");
const dotenv = require("dotenv").config();

const id = process.env.INSTANCEID;
const token = process.env.ACCESSTOKEN;

const RegisterInterns = (req, res) => {
  const {
    internUsername,
    internemail,
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
  } = req.body.value;

  let interndata = [
    internUsername,
    internemail,
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

  // console.log(data);

  // createQueueOnsite(internPhone.slice(1, 13));
  // getOnisteQueue();

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
        console.log("hello");
        const sql1 =
          "INSERT INTO `intern_table`(`name`, `email`, `phone`, `cnic`, `gender`, `image`, `join_date`, `birth_date`, `university`, `degree`, `interview_type`, `technology`, `duration`, `intern_type`, `interview_date`, `interview_time`) VALUES (?)";

        connection.query(sql1, [interndata], (err, data) => {
          if (err) {
            console.log(err);
            return res.json(err);
          } else {
            if (data.affectedRows === 1) {
              if (interviewType === "Remote") {
                createQueueRemote(internPhone);

                // SendMailRemote(
                //   internUsername,
                //   internemail,
                //   interviewDate,
                //   interviewTime
                // );
                setTimeout(() => {
                  SendMessageRemote(getRemoteQueue().slice(1, 13));
                }, 30000);
              } else {
                createQueueOnsite(internPhone);
                // getOnisteQueue();
                setTimeout(() => {
                  SendMessageOnsite(getOnisteQueue().slice(1, 13));
                }, 30000);
                // SendMailOnsite(internUsername, internemail);
              }

              return res.json(data.affectedRows);
            }
          }
        });
      }
    }
  });
};

let dataOnsite = [];
let dataRemote = [];

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
module.exports = { RegisterInterns };
