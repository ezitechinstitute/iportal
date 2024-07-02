const { connection } = require("../../config/connection");

const GetPendingAmount = (req, res) => {
  const sql = "SELECT * FROM `intern_remaining_amounts`";
  connection.query(sql, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
};

module.exports = { GetPendingAmount };
