const { connection } = require("../../config/connection");

const GetTask = (req, res) => {
  const { technology } = req.body;

  const sql = "SELECT * FROM `interview_test` WHERE `technology` = ?";
  connection.query(sql, [technology], (err, data) => {
    if (err) throw err;
    return res.json(data);
  });
};

const MarkTaskComplete = (req, res) => {
  const { name, email, technology } = req.body;

  const taskData = [name, email, technology];

  const sql =
    "INSERT INTO `complete_test`(`name`, `email`, `technology`) VALUES (?)";
  connection.query(sql, [taskData], (err, data) => {
    if (err) throw err;
    return res.json(data.affectedRows);
  });
};

module.exports = { GetTask, MarkTaskComplete };
