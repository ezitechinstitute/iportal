const { connection } = require("../../config/connection");

const Transactions = (req, res) => {
  const { month } = req.params;
  const currentYear = new Date().getFullYear();

  const sql =
    "SELECT * FROM `transactions` WHERE MONTH(created_at) = ? AND YEAR(created_at) = ?";
  connection.query(sql, [month, currentYear], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
};

const Invoices = (req, res) => {
  const { month } = req.params;
  const currentYear = new Date().getFullYear();

  const sql =
    "SELECT * FROM `invoices` WHERE MONTH(created_at) = ? AND YEAR(created_at) = ?";
  connection.query(sql, [month, currentYear], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
};

const ApproveInvoice = (req, res) => {
  const { email } = req.body;

  const sql = "UPDATE `invoices` SET `status`= 1 WHERE `intern_email` = ?";
  connection.query(sql, [email], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      if (data.affectedRows === 1) {
        const sql_update =
          "UPDATE `complete_test` SET `payment_status`= 1 WHERE `email` = ?";
        connection.query(sql_update, [email], (reject, resolve) => {
          if (reject) {
            return res.json(err);
          } else {
            return res.json("Invoice Approved Successfuly");
          }
        });
      }
    }
  });
};

module.exports = { Transactions, Invoices, ApproveInvoice };
