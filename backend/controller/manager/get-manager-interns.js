const { connection } = require("../../config/connection");

const GetManagerOnsite = (req, res) => {
  const sql =
    "SELECT `id`, `name`, `image`, `duration`, `technology`, `status` FROM `intern_table` WHERE `intern_type` = 'Onsite' AND `status` = 'Active'";
  connection.query(sql, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
};

const GetManagerRemote = (req, res) => {
  const sql =
    "SELECT `id`, `name`, `image`, `duration`, `technology`, `status` FROM `intern_table` WHERE `intern_type` = 'Remote' AND `status` = 'Active'";
  connection.query(sql, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
};

const OnsiteSingle = (req, res) => {
  const { id } = req.body;

  const sql = "SELECT * WHERE `id` = (?)";
  connection.query(sql, [id], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
};

module.exports = { GetManagerOnsite, GetManagerRemote, OnsiteSingle };
