const { getAllInterns, registerInters } = require("../model/interns-model");

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

  console.log(data)

  // try {
  //   await registerInters(req.body);
  //   res.json("Added");
  // } catch (error) {
  //   res.json(error);
  // }
};

module.exports = { TotalInterns, RegisterInterns };
