const { connection } = require("../../config/connection");

const AdminInterns = (req, res) => {
  const sql = "SELECT * FROM `intern_table`";

  connection.query(sql, (err, data) => {
    if (err) throw err;
    return res.json(data);
  });
};

const UpdateIntern = (req, res) => {
  const { id } = req.params;
  const { email, technology, status } = req.body.editableData;

  const sql =
    "UPDATE `intern_table` SET `email`= ?, `technology`= ?,`status`= ? WHERE `id` = ?";
  connection.query(sql, [email, technology, status, id], (err, data) => {
    if (err) throw err;
    return res.json({ message: "Updated Successfuly" });
  });
};

const AdminActiveInterns = (req, res) => {
  const sql = "SELECT * FROM `intern_accounts`";

  connection.query(sql, (err, data) => {
    if (err) throw err;
    return res.json(data);
  });
};

const UpdateActiveIntern = (req, res) => {
  const { id } = req.params;
  const { email, technology, status } = req.body.editableData;

  const sql =
    "UPDATE `intern_accounts` SET `email`= ?, `int_technology`= ?,`int_status`= ? WHERE `int_id` = ?";
  connection.query(sql, [email, technology, status, id], (err, data) => {
    if (err) throw err;
    return res.json({ message: "Updated Successfuly" });
  });
};

// const DeleteInternAccount = (req, res) => {
//   const { id } = req.params;
//   const sql = "DELETE FROM `intern_accounts` WHERE `int_id` = ?";
//   connection.query(sql, [id], (err, data) => {
//     if (err) throw err;
//     return res.json({ message: "Account Deleted Successfuly" });
//   });
// };

module.exports = {
  AdminInterns,
  UpdateIntern,
  AdminActiveInterns,
  UpdateActiveIntern,
  // DeleteInternAccount,
};
