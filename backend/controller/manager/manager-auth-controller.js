const { connection } = require("../../config/connection");

const ManagerAuth = (req, res) => {
  const { email, password } = req.body.value;

  const sql =
    "SELECT `image`, `name`, `email`, `password` FROM `manager_accounts` WHERE `email` = ? AND `password`= ?";

  connection.query(sql, [email, password], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
        if(data.length > 0){
           return res.json({isLoggedIn: true, data});
        }
      
    }
  });
};

const ManagerForgotPassword = (req, res) => {
  const { email, password } = req.body;

  const sql = "UPDATE `manager_accounts` SET `password`= ? WHERE `email` = ?";
  connection.query(sql, [password, email], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
};

const ManagerAvatar = (req, res) => {
  const { image, email } = req.body;

  const sql = "UPDATE `manager_accounts` SET `image`= ? WHERE `email` = ?";
  connection.query(sql, [image, email], (err, data) => {
    if (err) {
      res.josn(err);
    } else {
      res.json(data);
    }
  });
};

module.exports = {
  ManagerAuth,
  ManagerForgotPassword,
  ManagerAvatar,
};
