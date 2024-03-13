const getAllInterns = require("../model/interns-model");

const TotalInterns = async (req, res) => {
  try {
    const interns = await getAllInterns();
    res.send(interns);
  } catch (error) {
    res.json(error);
  }
};

module.exports = TotalInterns;
