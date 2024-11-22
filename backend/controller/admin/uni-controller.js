const { connection } = require("../../config/connection");

const GetUniversities = (req, res) => {
  const sql =
    "SELECT uni.*, COUNT(it.id) AS uniInterns FROM universities uni LEFT JOIN intern_table it ON uni.uni_name = it.university GROUP BY uni.uni_name";
  connection.query(sql, (err, data) => {
    if (err) throw err;
    return res.json(data);
  });
};

module.exports = {
  GetUniversities,
};
