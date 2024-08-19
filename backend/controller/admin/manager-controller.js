const { connection } = require("../../config/connection");

const CreateManager = (req, res) => {
  const { etiId, name, email, password, phone, joinDate } = req.body.manager;

  const sql =
    "INSERT INTO `manager_accounts`(`eti_id`, `name`, `email`, `contact`, `join_date`, `password`) VALUES (?)";
  const managerData = [etiId, name, email, phone, joinDate, password];
  connection.query(sql, [managerData], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    } else {
      return res.json("Manager Add Successfuly");
    }
  });
};

const GetManagers = (req, res) => {
  const sql = "SELECT * FROM `manager_accounts`";
  connection.query(sql, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
};

const GetSingleManager = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM `manager_accounts` WHERE `id` = ?";
  connection.query(sql, [id], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
};

const UpdateManager = (req, res) => {
  const { id } = req.params;
  const { name, email, password, contact, comission } = req.body;

  const sql =
    "UPDATE `manager_accounts` SET `name`= ?,`email`= ?,`contact`= ?, `password`= ?,`comission`= ? WHERE `id` = ?";
  connection.query(
    sql,
    [name, email, contact, password, comission, id],
    (err, data) => {
      if (err) {
        return res.json(err);
      } else {
        return res.json(data.affectedRows);
      }
    }
  );
};

const FreezeManager = (req, res) => {
  const { email } = req.params;

  const sql = "UPDATE `manager_accounts` SET `status`= 0 WHERE `email` = ?";
  connection.query(sql, [email], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data.affectedRows);
    }
  });
};

const ActiveManager = (req, res) => {
  const { email } = req.params;

  const sql = "UPDATE `manager_accounts` SET `status`= 1 WHERE `email` = ?";
  connection.query(sql, [email], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data.affectedRows);
    }
  });
};

module.exports = {
  CreateManager,
  GetManagers,
  GetSingleManager,
  UpdateManager,
  FreezeManager,
  ActiveManager,
};
