const { connection } = require("../../config/connection");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const secretKey = process.env.SECRETKEY;
const bcrypt = require("bcryptjs");
const { DeleteVerificationCode } = require("../combine/Verify-Email");

const UniAuth = (req, res) => {
  const { email, password } = req.body.value;

  const sql =
    "SELECT * FROM `universties` WHERE `uni_email` = ? AND `uni_password`= ? AND `account_status` = 1";

  connection.query(sql, [email, password], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    } else {
      if (data.length > 0) {
        const token = jwt.sign({ email: data[0].email }, secretKey, {
          expiresIn: 86400,
        });
        return res.json({ isLoggedIn: true, uni: data, token });
      } else {
        return res.json({ isLoggedIn: false });
      }
    }
  });
};

// Lets continue from here
const ForgotUniPassword = (req, res) => {
  const { email, password } = req.body;

  let hashPassword = " ";
  bcrypt.hash(password, 10, function (err, hash) {
    if (err) throw err;
    hashPassword = hash;

    const sql =
      "UPDATE `universities` SET `uni_password`= ? WHERE `uni_email` = ?";
    connection.query(sql, [hashPassword, email], (err, data) => {
      if (err) throw err;
      DeleteVerificationCode(email)
      return res.json({ msg: "Password updated" });
    });
  });
};

module.exports = { UniAuth, ForgotUniPassword };
