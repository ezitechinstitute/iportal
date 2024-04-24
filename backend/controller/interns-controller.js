const axios = require("axios");
const { connection } = require("../config/connection");

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

  // const {
  //   name,
  //   email,
  //   phone,
  //   cnic,
  //   gender,
  //   join_date,
  //   birth_date,
  //   university,
  //   degree,
  //   depart,
  //   technonolgy,
  //   duration,
  //   intern_type,
  //   date,
  //   time,
  // } = req.body;

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
    "INSERT INTO `intern_data`(`name`, `email`, `phone`, `cnic`, `gender`, `image`, `join_date`, `birth_date`, `university`, `degree`, `department`, `technology`, `duration`, `intern_type`, `interview_date`, `interview_time`) VALUES (?)";

  connection.query(sql0, [data], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      if (data.affectedRows === 1) {
        check = 1;
        // console.log(internPhone.)
        SendMessage(internUsername, interviewDate, interviewTime);
      }
    }
  });

  // if (check === 1) {
  //   if (internType === "Remote") {
  //     // alert(interview);
  //     axios.post("https://mkt.eziline.com/api/send", {
  //       number: internPhone.slice(1, 12),
  //       type: "text",

  //       message: `
  //       Subject: Registration Successful! Interview Process Details

  //       Dear ${internUsername},

  //       Congratulations! We are delighted to inform you that your registration was successful. Welcome to Ezitech's platform/community! 🎉

  //       Interview Process Details:

  //       Remote Interview:
  //       Date: ${interviewDate}
  //       Time: Date: ${interviewTime}
  //       Platform: [e.g., Zoom, Google Meet]

  //       Please make sure to mark these dates on your calendar and prepare accordingly. If you have any questions or need further assistance, feel free to reach out to us at [Contact Email/Phone].

  //       Once again, congratulations on your successful registration, and we look forward to meeting you during the interview process!

  //       Best regards,
  //       Ibrahim Shah
  //       CEO Ezitech

  //       `,
  //       instance_id: "6543C35B16249",
  //       access_token: "648f4715d6c58",
  //     });
  //   } else {
  //     axios
  //       .post("https://mkt.eziline.com/api/send", {
  //         number: internPhone.slice(1, 12),
  //         type: "text",
  //         message: "Hello From Node",

  //         // message: `
  //         // Subject: Registration Successful! Interview Process Details

  //         // Dear ${internUsername},

  //         // Congratulations! We are delighted to inform you that your registration was successful. Welcome to Ezitech's platform/community! 🎉

  //         // Interview Process Details:

  //         // Onsite Interview:
  //         // Date: ${interviewDate}
  //         // Time: Date: ${interviewTime}
  //         // Location: Ezitech Institute, Amna Plaza, Main Peshawar Rd, Rawalpindi

  //         // Please make sure to mark these dates on your calendar and prepare accordingly. If you have any questions or need further assistance, feel free to reach out to us at [Contact Email/Phone].

  //         // Once again, congratulations on your successful registration, and we look forward to meeting you during the interview process!

  //         // Best regards,
  //         // Ibrahim Shah
  //         // CEO Ezitech

  //         // `,
  //         instance_id: "6543C35B16249",
  //         access_token: "648f4715d6c58",
  //       })
  //       .then((rs) => {
  //         console.log("Message Sent");
  //       })
  //       .catch((err) => {
  //         console.log("aaa", err);
  //       });
  //   }
  // }
};

async function SendMessage(name, date, time) {
  try {
    const response = await axios.post("https://mkt.eziline.com/api/send", {
      number: "923176349954",
      type: "text",
      message: `From Node ${name}, ${date}, ${time}`,
      instance_id: "6543C35B16249",
      access_token: "648f4715d6c58",
    });
    console.log("Send", name, date, time);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { TotalInterns, RegisterInterns };
