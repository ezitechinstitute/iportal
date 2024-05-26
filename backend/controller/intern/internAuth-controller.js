const { connection } = require("../../config/connection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const secretKey = process.env.SECRETKEY;

const InternAuth = (req, res) => {
  const { loginEmail, loginPassword } = req.body.values;

  const sql = "SELECT * FROM `intern_accounts` WHERE `email` = ?";
  connection.query(sql, [loginEmail], (err, data) => {
    if (err) throw err;
    if (data.length === 0) {
      return res.json({ userStatus: false });
    }

    const intern = data[0];
    const isPasswordValid = bcrypt.compareSync(loginPassword, intern.password);
    if (!isPasswordValid) {
      return res.json({ passwordStatus: false });
    }
    
    const token = jwt.sign({ email: intern.email }, secretKey, { expiresIn: 86400 });
    return res.json({ loginStatus: true, token, intern });
  });
};

module.exports = { InternAuth };
