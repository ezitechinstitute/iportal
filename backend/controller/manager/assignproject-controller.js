const { connection } = require("../../config/connection");

const AssignProject = (req, res) => {
  const {
    title,
    url,
    startDate,
    endDate,
    supervisor,
    email,
    technology,
    description,
  } = req.body.values;

  const data = [
    title,
    url,
    startDate,
    endDate,
    supervisor,
    email,
    technology,
    description,
  ];

  const sql =
    "INSERT INTO `intern_projects`(`title`, `url`, `start_date`, `end_date`, `supervisor`, `email`, `technology`, `description`) VALUES (?)";
  connection.query(sql, [data], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data.affectedRows);
    }
  });
};

module.exports = { AssignProject };
