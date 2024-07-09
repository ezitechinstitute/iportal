const { connection } = require("../../config/connection");
const {
  SendMailRemote,
  SendMailOnsite,
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
                if (
                  internTechnology === "Digital Marketing" ||
                  internTechnology === "Search Engine Optimization (SEO)" ||
                  internTechnology === "WordPress Development"
                ) {
                  createOtherQueue(internPhone);
                  setInterval(() => {
                    if (dataOther.length > 0) {
                      SendMessageOther(getOtherQueue().slice(1, 13));
                    }
                  }, 60000);
                } else {
                  createQueueRemote(internPhone);
                  setInterval(() => {
                    if (dataRemote.length > 0) {
                      SendMessageRemote(getRemoteQueue().slice(1, 13));
                    }
                  }, 60000);
                }

                // SendMailRemote(
                //   internUsername,
                //   internemail,
                //   interviewDate,
                //   interviewTime
                // );
              } else {
                if (
                  internTechnology === "Digital Marketing" ||
                  internTechnology === "Search Engine Optimization (SEO)" ||
                  internTechnology === "WordPress Development"
                ) {
                  createOtherQueue(internPhone);
                  setInterval(() => {
                    if (dataOther.length > 0) {
                      SendMessageOther(getOtherQueue().slice(1, 13));
                    }
                  }, 60000);
                } else {
                  createQueueOnsite(internPhone);
                  setInterval(() => {
                    if (dataOnsite.length > 0) {
                      SendMessageOnsite(getOnisteQueue().slice(1, 13));
                    }
                  }, 60000);
                }
                // getOnisteQueue();

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

module.exports = { RegisterInterns };
