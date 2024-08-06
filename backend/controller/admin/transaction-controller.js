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
    "SELECT * FROM `invoices` WHERE MONTH(created_at) = ? AND YEAR(created_at) = ? ORDER BY id DESC";
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
  const { email } = req.params;

  const sql = `UPDATE invoices
JOIN complete_test ON invoices.intern_email = complete_test.email
JOIN intern_accounts ON invoices.intern_email = intern_accounts.email
JOIN intern_table ON invoices.intern_email = intern_table.email
SET invoices.status = 1,
    complete_test.payment_status = 1,
    intern_accounts.status = 'Active',
    intern_table.status = 'Active'

WHERE invoices.intern_email = ?`;

  connection.query(sql, [email], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      const sql_update = "DELETE FROM `complete_test` WHERE `email` = ?";
      connection.query(sql_update, [email], (reject, resolve) => {
        if (reject) {
          return res.json(err);
        } else {
          return res.json(resolve.affectedRows);
        }
      });
    }
  });
};

const GetTotalAmount = (req, res) => {
  const sql = "SELECT SUM(amount) as total_amount FROM transactions";
  connection.query(sql, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data[0].total_amount);
    }
  });
};

const GetReceivedAmount = (req, res) => {
  const sql =
    "SELECT SUM(received_amount) as received_amount FROM invoices WHERE status = 1";
  connection.query(sql, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data[0].received_amount);
    }
  });
};

const GetRemainingAmount = (req, res) => {
  const sql =
    "SELECT SUM(remaining_amount) as remaining_amount FROM intern_remaining_amounts";
  connection.query(sql, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data[0].remaining_amount);
    }
  });
};

module.exports = {
  Transactions,
  Invoices,
  ApproveInvoice,
  GetTotalAmount,
  GetReceivedAmount,
  GetRemainingAmount,
};
