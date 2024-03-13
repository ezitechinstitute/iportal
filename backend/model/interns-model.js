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

module.exports = getAllInterns;
