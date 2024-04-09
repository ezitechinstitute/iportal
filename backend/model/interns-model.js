// const { resolve } = require("path");
const { connection } = require("../config/connection");

const getAllInterns = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM `tbl_intern`";
    connection.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const registerInters = (data) => {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO `intern_tab`(`username`, `email`, `phone`, `cnic`, `gender`, `join_date`, `birth_date`, `university`, `degree`, `department`, `technology`, `duration`, `intern_type`) VALUES (?)";
    connection.query(sql, [data], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = { getAllInterns, registerInters};
