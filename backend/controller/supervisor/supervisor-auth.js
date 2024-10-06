const { connection } = require("../../config/connection");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const secretKey = process.env.SECRETKEY;

const SupervisorAuth = (req, res) => {
  const { email, password } = req.body.value;

  const sql =
    "SELECT `eti_id`, `manager_id`, `image`, `name`, `email`, `loginas` FROM `manager_accounts` WHERE `email` = ? AND `password`= ? AND `loginas` = 'Supervisor' AND `status` = 1";

  connection.query(sql, [email, password], (err, data) => {
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

module.exports = { SupervisorAuth };
