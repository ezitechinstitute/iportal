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
    internEmail,
    internPhone,
    internCnic,
    internGender,
    internJoinDate,
    internDob,
    internUniversity,
    internDegree,
    internDpt,
    internTechnology,
    internDuration,
    internType,
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
    internEmail,
    internPhone,
    internCnic,
    internGender,
    internJoinDate,
    internDob,
    internUniversity,
    internDegree,
    internDpt,
    internTechnology,
    internDuration,
    internType,
  ];

  const sql0 =
    "INSERT INTO `intern_data`(`name`, `email`, `phone`, `cnic`, `gender`, `join_date`, `birth_date`, `university`, `degree`, `department`, `technology`, `duration`, `intern_type`, `date`, `time`) VALUES (?)";

  connection.query(sql0, [data], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
};

module.exports = { TotalInterns, RegisterInterns };
