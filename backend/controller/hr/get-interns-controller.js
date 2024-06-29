const { connection } = require("../../config/connection");

const GetLatestRegister = (req, res) => {
  const { email } = req.params;

  if (email === "umair1@ezitech.org") {
    const sql =
      "SELECT * FROM `intern_table` WHERE `technology` = 'WordPress' OR `technology` = 'Digital Marketing' OR `technology` = 'Search Engine Optimization (SEO)' ORDER BY `id` DESC LIMIT 5";
    connection.query(sql, (err, data) => {
      if (err) {
        return res.json(err);
      } else {
        return res.json(data);
      }
    });
  } else {
    const sql =
      "SELECT * FROM `intern_table` WHERE `technology` NOT IN ('WordPress', 'Digital Marketing', 'Search Engine Optimization (SEO)') ORDER BY `id` DESC LIMIT 5";
    connection.query(sql, (err, data) => {
      if (err) {
        return res.json(err);
      } else {
        return res.json(data);
      }
    });
  }
};

const GetOnsiteInterview = (req, res) => {
  const { email } = req.params;

  if (email === "umair1@ezitech.org") {
    const sql =
      "SELECT * FROM `intern_table` WHERE (`technology` = 'WordPress' OR `technology` = 'Digital Marketing' OR `technology` = 'Search Engine Optimization (SEO)') AND `interview_type` = 'Onsite' AND `status` = 'Interview' ORDER BY `id` DESC";
    connection.query(sql, (err, data) => {
      if (err) {
        return res.json(err);
      } else {
        return res.json(data);
      }
    });
  } else {
    const sql =
      "SELECT * FROM `intern_table` WHERE `technology` NOT IN ('WordPress', 'Digital Marketing', 'Search Engine Optimization (SEO)') AND `interview_type` = 'Onsite' AND `status` = 'Interview' ORDER BY `id` DESC";
    connection.query(sql, (err, data) => {
      if (err) {
        return res.json(err);
      } else {
        return res.json(data);
      }
    });
  }
};

const GetRemoteInterview = (req, res) => {
  const { email } = req.params;

  if (email === "umair1@ezitech.org") {
    const sql =
      "SELECT * FROM `intern_table` WHERE (`technology` = 'WordPress' OR `technology` = 'Digital Marketing' OR `technology` = 'Search Engine Optimization (SEO)') AND `interview_type` = 'Remote' AND `status` = 'Interview' ORDER BY `id` DESC";

    connection.query(sql, (err, data) => {
      if (err) {
        return res.json(err);
      } else {
        return res.json(data);
      }
    });
  } else {
    const sql =
      "SELECT * FROM `intern_table` WHERE `technology` NOT IN ('WordPress', 'Digital Marketing', 'Search Engine Optimization (SEO)') AND `interview_type` = 'Remote' AND `status` = 'Interview' ORDER BY `id` DESC";

    connection.query(sql, (err, data) => {
      if (err) {
        return res.json(err);
      } else {
        return res.json(data);
      }
    });
  }
};

const GetTestIntern = (req, res) => {
  const { email } = req.params;

  if (email === "umair1@ezitech.org") {
    const sql =
      "SELECT * FROM `intern_table` WHERE (`technology` = 'WordPress' OR `technology` = 'Digital Marketing' OR `technology` = 'Search Engine Optimization (SEO)') AND `status` = 'Test'";
    connection.query(sql, (err, data) => {
      if (err) {
        return res.json(err);
      } else {
        return res.json(data);
      }
    });
  } else {
    const sql =
      "SELECT * FROM `intern_table` WHERE `technology` NOT IN ('WordPress', 'Digital Marketing', 'Search Engine Optimization (SEO)') AND `status` = 'Test'";
    connection.query(sql, (err, data) => {
      if (err) {
        return res.json(err);
      } else {
        return res.json(data);
      }
    });
  }
};

module.exports = {
  GetLatestRegister,
  GetOnsiteInterview,
  GetRemoteInterview,
  GetTestIntern,
};
