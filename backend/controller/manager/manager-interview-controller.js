const { connection } = require("../../config/connection");
const SendMail = require("../../mail/mailer-controller");

const SendMaessage = (req, res) => {};

const AssignTest = (req, res) => {
  const { email } = req.body;

  const sql = "UPDATE `intern_table` SET `status`='Test' WHERE `email` = ?";
  connection.query(sql, [email], (err, data) => {
    if (err) {
      res.json(err);
    } else {
      res.json(data.affectedRows);
    }
  });
};

const RemoveIntern = (req, res) => {
    const { email } = req.body;

  const sql = "UPDATE `intern_table` SET `status`='Removed' WHERE `email` = ?";
  connection.query(sql, [email], (err, data) => {
    if (err) {
      res.json(err);
    } else {
      res.json(data.affectedRows);
    }
  });
} 

module.exports = {
  AssignTest,
  RemoveIntern
};
