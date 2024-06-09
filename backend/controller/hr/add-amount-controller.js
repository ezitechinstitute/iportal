const { connection } = require("../../config/connection");
const cron = require("node-cron");

const AddAmount = (req, res) => {
  const { amount, instructorEmail, managerEmail } = req.body.data;
  console.log(req.body);

  // amount division
  const companyAmount = 3500;
  const instructorAmount = 1500;
  const managerAmount = 1000;

  // transaction query
  const sql =
    "INSERT INTO `transactions`(`amount`, `instructor_email`, `manager_email`, `company_amount`, `instructor_amout`, `manager_amount`) VALUES (?)";
  const values = [
    amount,
    instructorEmail,
    managerEmail,
    companyAmount,
    instructorAmount,
    managerAmount,
  ];
  connection.query(sql, [values], (err, results) => {
    if (err) {
      return res.json(err);
    }

    // update balance
    updateBalance = (email, updateAmount, callback) => {
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1;

      const updateSql = `INSERT INTO user_balances (email, balance, year, month)
    VALUES (?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE balance = balance + VALUES(balance)`;

      const updateValues = [email, updateAmount, currentYear, currentMonth];

      console.log(updateValues);

      connection.query(updateSql, updateValues, callback);
    };

    updateBalance(instructorEmail, instructorAmount, (err) => {
      if (err) {
        console.log(err);
        return res.json(err);
      }

      updateBalance(managerEmail, managerAmount, (err) => {
        if (err) {
          console.log(err);
          return res.json(err);
        }

        return res.json("Amount added and balances updated successfully");
      });
    });
  });
};

cron.schedule("0 0 1 * *", () => {
  const resetBalance = "UPDATE `user_balances` SET `balance`= 0 WHERE 1";
  connection.query(resetBalance, (reject, resolve) => {
    if (reject) {
      return res.json(reject);
    } else {
      return res.json("Balance Reset Successfully");
    }
  });
});

module.exports = { AddAmount };
