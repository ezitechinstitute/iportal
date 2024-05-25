const { connection } = require("../../config/connection");

const GetTask = (req, res) => {
  const { technology } = req.body;

  const sql = "SELECT * FROM `interview_test` WHERE `technology` = ?";
  connection.query(sql, [technology], (err, data) => {
    if (err) throw err;
    return res.json(data);
  });
};

module.exports = { GetTask };
