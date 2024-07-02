const { connection } = require("../../config/connection");
const cron = require("node-cron");
const {
  SendInvoiceTotal,
  SendInvoiceRemaining,
  SendInvoiceOther,
} = require("../../whatsapp/whatsapp-api");

const AddAmount = (req, res) => {
  const { amount, instructorEmail, managerMail, internEmail, internPhone } =
    req.body.data;
  console.log(req.body);

  const invId = "INV-" + Math.floor(Math.random() * 9999);
  const todayDate = new Date().toLocaleDateString("en-US");
  createInvoiceQueue(internPhone);

  if (amount == 6000) {
    // amount division
    const companyAmount = 3500;
    const instructorAmount = 1500;
    const managerAmount = 1000;

    // invoice data
    const receivedAmount = 6000;

    // transaction query
    const sql =
      "INSERT INTO `transactions`(`amount`, `instructor_email`, `manager_email`, `company_amount`, `instructor_amout`, `manager_amount`) VALUES (?)";
    const values = [
      amount,
      instructorEmail,
      managerMail,
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

      // create invoice
      createInvoice = (
        inv_id,
        intern_email,
        received_amount,
        received_by,
        callback
      ) => {
        // const dueDate = new Date().getDay() + 10;

        const invoiceSql =
          "INSERT INTO invoices (inv_id, intern_email, received_amount, received_by) VALUES (?,?,?,?)";
        const invoiceData = [
          inv_id,
          intern_email,
          received_amount,
          received_by,
        ];
        console.log(invoiceData);
        connection.query(invoiceSql, invoiceData, callback);
      };

      updateBalance(instructorEmail, instructorAmount, (err) => {
        if (err) {
          console.log(err);
          return res.json(err);
        }

        updateBalance(managerMail, managerAmount, (err) => {
          if (err) {
            console.log(err);
            return res.json(err);
          }

          // here whatsapp

          createInvoice(
            invId,
            internEmail,
            receivedAmount,
            managerMail,
            (err) => {
              if (err) {
                console.log(err);
                return res.json(err);
              }
            }
          );

          const totalAmount = 6000;

          setInterval(() => {
            if (invoiceQueue.length > 0) {
              SendInvoiceTotal(
                getInvoiceQueue().slice(1, 13),
                internEmail,
                invId,
                todayDate,
                totalAmount,
                receivedAmount,
                managerMail
              );
            }
          }, 60000);

          return res.json("Amount added and balances updated successfully");
        });
      });
    });
  } else if (amount == 4000) {
    const totalAmount = 6000;
    const remainingAmount = totalAmount - amount;
    const receivedAmount = 4000;

    const today = new Date();

    // Create a new date object for the due date
    const dueDate = new Date(today);

    // Set the month to the next month
    dueDate.setMonth(today.getMonth() + 1);

    // Format the due date as a string (optional)
    const options = { year: "numeric", month: "long", day: "numeric" };
    const dueDateString = dueDate.toLocaleDateString("en-US", options);

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
      managerMail,
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

      // creare invoice
      createInvoice = (
        inv_id,
        intern_email,
        received_amount,
        remaining_amount,
        due_date,
        received_by,
        callback
      ) => {
        // const dueDate = new Date().getDay() + 10;

        const invoiceSql =
          "INSERT INTO invoices (inv_id, intern_email, received_amount, remaining_amount, due_date, received_by) VALUES (?,?,?,?,?,?)";
        const invoiceData = [
          inv_id,
          intern_email,
          received_amount,
          remaining_amount,
          due_date,
          received_by,
        ];
        console.log(invoiceData);
        connection.query(invoiceSql, invoiceData, callback);
      };

      updateBalance(instructorEmail, instructorAmount, (err) => {
        if (err) {
          console.log(err);
          return res.json(err);
        }

        updateBalance(managerMail, managerAmount, (err) => {
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

            // call create invoice message and function
            createInvoice(
              invId,
              internEmail,
              receivedAmount,
              remainingAmount,
              dueDateString,
              managerMail,
              (err) => {
                if (err) {
                  console.log(err);
                  return res.json(err);
                }
              }
            );

            setInterval(() => {
              if (invoiceQueue.length > 0) {
                SendInvoiceRemaining(
                  getInvoiceQueue().slice(1, 13),
                  internEmail,
                  invId,
                  todayDate,
                  totalAmount,
                  receivedAmount,
                  remainingAmount,
                  dueDateString,
                  managerMail
                );
              }
            }, 60000);

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

    // invoice data
    const totalAmount = 6000;
    const receivedAmount = 2000;

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

      // create invoice
      createInvoice = (
        inv_id,
        intern_email,
        received_amount,
        received_by,
        callback
      ) => {
        // const dueDate = new Date().getDay() + 10;

        const invoiceSql =
          "INSERT INTO invoices (inv_id, intern_email, received_amount, received_by) VALUES (?,?,?,?)";
        const invoiceData = [
          inv_id,
          intern_email,
          received_amount,
          received_by,
        ];
        console.log(invoiceData);
        connection.query(invoiceSql, invoiceData, callback);
      };

      updatePendingAmount = (email, callback) => {
        const updatePendingSql =
          "DELETE FROM intern_remaining_amounts WHERE email = (?)";
        connection.query(updatePendingSql, email, callback);
      };

      updateBalance(instructorEmail, instructorAmount, (err) => {
        if (err) {
          console.log(err);
          return res.json(err);
        }

        // here whatsapp

        createInvoice(
          invId,
          internEmail,
          receivedAmount,
          managerMail,
          (err) => {
            if (err) {
              console.log(err);
              return res.json(err);
            }
          }
        );

        updatePendingAmount(internEmail, (err) => {
          if (err) {
            console.log(err);
            return res.json(err);
          }
        });

        setInterval(() => {
          if (invoiceQueue.length > 0) {
            SendInvoiceOther(
              getInvoiceQueue().slice(1, 13),
              internEmail,
              invId,
              todayDate,
              totalAmount,
              receivedAmount,
              managerMail
            );
          }
        }, 60000);

        return res.json("Amount added and balances updated successfully");

        // updateBalance(managerMail, managerAmount, (err) => {
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

let invoiceQueue = [];

function createInvoiceQueue(phone) {
  invoiceQueue.push(phone);
}

function getInvoiceQueue() {
  return invoiceQueue.pop();
}

module.exports = { AddAmount };
