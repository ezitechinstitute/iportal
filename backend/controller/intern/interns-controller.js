const axios = require("axios");
const { connection } = require("../../config/connection");
const {
  SendMailRemote,
  SendMailToHr,
  SendMailOnsite,
} = require("../../mail/mailer-controller");
const dotenv = require("dotenv").config();

const id = process.env.INSTANCEID;
const token = process.env.ACCESSTOKEN;

const TotalInterns = async (req, res) => {
  try {
    const interns = await getAllInterns();
    res.send(interns);
  } catch (error) {
    res.json(error);
  }
};

const RegisterInterns = async (req, res) => {
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
    internDpt,
    internTechnology,
    internDuration,
    internType,
    interviewDate,
    interviewTime,
  } = req.body.value;

  let data = [
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
    internDpt,
    internTechnology,
    internDuration,
    internType,
    interviewDate,
    interviewTime,
  ];

  // console.log(data);
  let check = 0;

  const sql0 =
    "INSERT INTO `intern_table`(`name`, `email`, `phone`, `cnic`, `gender`, `image`, `join_date`, `birth_date`, `university`, `degree`, `department`, `technology`, `duration`, `intern_type`, `interview_date`, `interview_time`) VALUES (?)";

  connection.query(sql0, [data], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      if (data.affectedRows === 1) {
        if (internType === "Remote") {
          SendMailRemote(
            internUsername,
            internemail,
            interviewDate,
            interviewTime
          );
          // SendMessageRemote(
          //   internUsername,
          //   internPhone.slice(1, 13),
          //   interviewDate,
          //   interviewTime
          // );
        } else {
          // SendMessageOnsite(internPhone.slice(1, 13), internUsername);
          SendMailOnsite(internUsername, internemail);
        }

        return res.json(data.affectedRows);
      }
    }
  });
};

// async function SendMessageRemote(name, phone, date, time) {
//   console.log(phone);
//   try {
//     const response = await axios.post("https://mkt.eziline.com/api/send", {
//       number: phone,
//       type: "text",
//       message: `
// Send from Automatic System 🤖

// Subject: Registration Successful! Interview Process Details

// Dear ${name},

// We are delighted to inform you that your registration was successful. Welcome to Ezitech's platform/community! 🎉

// Interview Process Details:

// Remote Interview:
// Date: ${date}
// Time: ${time}
// Platform: Google Meet

// Please make sure to mark these dates on your calendar and prepare accordingly. If you have any questions or need further assistance, feel free to reach out to us at [Contact Email/Phone].

// Once again, congratulations on your successful registration, and we look forward to meeting you during the interview process!

// Best regards
//   `,
//       instance_id: "663378C0D9A21",
//       access_token: "648f4715d6c58",
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }

// async function SendMessageOnsite(phone, name) {
//   try {
//     const response = await axios.post("https://mkt.eziline.com/api/send", {
//       number: phone,
//       type: "text",
//       message: `
// Send from Automatic System 🤖

// Subject: Registration Successful! Interview Process Details

// Dear ${name},

// Congratulations! We are delighted to inform you that your registration was successful. Welcome to Ezitech's platform/community! 🎉

// Interview Process Details:

// Onsite Interview:
// Days: Monday to Friday
// Time: 11:00Am to 3:00Pm
// Address: Office #304-B Amna Plaza, Near Radio Pakistan, Rawalpindi, Punjab 46000
// Location: https://maps.app.goo.gl/Q78i6r1DifnBWJtA8

// Please make sure to mark these dates on your calendar and prepare accordingly. If you have any questions or need further assistance, feel free to reach out to us at [Contact Email/Phone].

// Once again, congratulations on your successful registration, and we look forward to meeting you during the interview process!

// Best regards`,
//       instance_id: "6543C35B16249",
//       access_token: "648f4715d6c58",
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }

module.exports = { TotalInterns, RegisterInterns };
