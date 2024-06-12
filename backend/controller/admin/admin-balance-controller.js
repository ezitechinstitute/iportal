const { connection } = require("../../config/connection");

const GetAdminBalance = (req, res) => {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const sql = `SELECT SUM(company_amount) AS total_amount
    FROM transactions
    WHERE MONTH(created_at) = ? AND YEAR(created_at) = ?`;
  connection.query(sql, [currentMonth, currentYear], (err, data) => {
    if (err) {
      //   console.log(err);
      return res.json(err);
    } else {
      //   console.log(data);
      return res.json(data[0].total_amount);
    }
  });
};

module.exports = { GetAdminBalance };
