const { connection } = require("../../config/connection");
const cron = require("node-cron");

const AddAmount = (req, res) => {
  const { amount, instructorEmail, managerEmail, internEmail } = req.body.data;
  console.log(req.body);

  if (amount == 6000) {
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
  } else if (amount == 4000) {
    const totalAmount = 6000;
    const remainingAmount = totalAmount - amount;

    // amount division
    const companyAmount = 2000;
    const instructorAmount = 1000;
    const managerAmount = 1000;

    // transaction query
    const sql =
      "INSERT INTO `transactions`(`amount`, `instructor_email`, `manager_email`, `company_amount`, `instructor_amout`, `manager_amount`, `remaining_amount`) VALUES (?)";
    const values = [
      amount,
      instructorEmail,
      managerEmail,
      companyAmount,
      instructorAmount,
      managerAmount,
      remainingAmount,
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

          // store remaining amount
          const storeRemainingAmount = (internEmail, remAmount, callback) => {
            const remainingSql = `INSERT INTO intern_remaining_amounts (email, remaining_amount)
    VALUES (?, ?)
    ON DUPLICATE KEY UPDATE remaining_amount = VALUES(remaining_amount)`;

            const remainingValue = [internEmail, remAmount];

            connection.query(remainingSql, remainingValue, callback);
          };

          storeRemainingAmount(internEmail, remainingAmount, (err) => {
            if (err) {
              console.log(err);
              return res.json(err);
            }
            return res.json("Amount added and balances updated successfully");
          });
        });
      });
    });
  } else if (amount == 2000) {
    // amount division
    const companyAmount = 1000;
    const instructorAmount = 500;
    // const managerAmount = 1000;

    // transaction query
    const sql =
      "INSERT INTO `transactions`(`amount`, `instructor_email`, `company_amount`, `instructor_amout`) VALUES (?)";
    const values = [amount, instructorEmail, companyAmount, instructorAmount];
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

        return res.json("Amount added and balances updated successfully");

        // updateBalance(managerEmail, managerAmount, (err) => {
        //   if (err) {
        //     console.log(err);
        //     return res.json(err);
        //   }

        //   return res.json("Amount added and balances updated successfully");
        // });
      });
    });
  } else {
    return res.json(
      "This amount not accept!!! You can add only 6000, 4000, and 2000"
    );
  }
};

cron.schedule("0 0 1 * *", () => {
  const resetBalance = "UPDATE `user_balances` SET `balance`= 0 WHERE 1";
  connection.query(resetBalance, (reject, resolve) => {
    if (reject) {
      return res.json(reject);
    } else {
      console.log("Balance Reset Successfully");
    }
  });
});

module.exports = { AddAmount };
