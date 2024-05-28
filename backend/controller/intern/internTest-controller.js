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
  const { name, email, phone, technology } = req.body;

  const taskData = [name, email, phone, technology];

  const sql =
    "INSERT INTO `complete_test`(`name`, `email`, `phone`, `technology`) VALUES (?)";
  connection.query(sql, [taskData], (err, data) => {
    if (err) throw err;
    return res.json(data.affectedRows);
  });
};

module.exports = { GetTask, MarkTaskComplete };
