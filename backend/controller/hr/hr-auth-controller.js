const { connection } = require("../../config/connection");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const secretKey = process.env.SECRETKEY;

const HrAuth = (req, res) => {
  const { email, password, loginAs } = req.body.value;

  const sql =
    "SELECT `manager_id`, `image`, `name`, `email`, `contact`, `password`, `loginas`  FROM `manager_accounts` WHERE `email` = ? AND `password`= ? AND `loginas` = ? AND `status` = 1";

  connection.query(sql, [email, password, loginAs], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    } else {
      if (data.length > 0) {
        const token = jwt.sign({ email: data[0].email }, secretKey, {
          expiresIn: 86400,
        });
        return res.json({ isLoggedIn: true, user: data, token });
      } else {
        return res.json({ isLoggedIn: false });
      }
    }
  });
};

const HrForgotPassword = (req, res) => {
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

const HrAvatar = (req, res) => {
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
  HrAuth,
  HrForgotPassword,
  HrAvatar,
};
