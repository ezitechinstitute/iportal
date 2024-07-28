const { connection } = require("../../config/connection");

const GetLatestRegister = (req, res) => {
  const { email } = req.params;

  if (email === "marketingmanager@ezitech.org") {
    const sql =
      "SELECT * FROM `intern_table` WHERE `technology` = 'WordPress Development' OR `technology` = 'Digital Marketing' OR `technology` = 'Search Engine Optimization (SEO)' ORDER BY `id` DESC LIMIT 5";
    connection.query(sql, (err, data) => {
      if (err) {
        return res.json(err);
      } else {
        return res.json(data);
      }
    });
  }

  if (email === "remotemanager@ezitech.org") {
    const sql =
      "SELECT * FROM `intern_table` WHERE `technology` NOT IN ('WordPress Development', 'Digital Marketing', 'Search Engine Optimization (SEO)') AND `interview_type` = 'Remote' ORDER BY `id` DESC LIMIT 5";
    connection.query(sql, (err, data) => {
      if (err) {
        return res.json(err);
      } else {
        return res.json(data);
      }
    });
  }

  if (email === "onistemanager@ezitech.org") {
    const sql =
      "SELECT * FROM `intern_table` WHERE `technology` NOT IN ('WordPress Development', 'Digital Marketing', 'Search Engine Optimization (SEO)') AND `interview_type` = 'Onsite' ORDER BY `id` DESC LIMIT 5";
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

  if (email === "marketingmanager@ezitech.org") {
    const sql =
      "SELECT * FROM `intern_table` WHERE (`technology` = 'WordPress Development' OR `technology` = 'Digital Marketing' OR `technology` = 'Search Engine Optimization (SEO)') AND `interview_type` = 'Onsite' AND `status` = 'Interview' ORDER BY `id` DESC";
    connection.query(sql, (err, data) => {
      if (err) {
        return res.json(err);
      } else {
        return res.json(data);
      }
    });
  } else if (email === "onsitemanager@ezitech.org") {
    const sql =
      "SELECT * FROM `intern_table` WHERE `technology` NOT IN ('WordPress Development', 'Digital Marketing', 'Search Engine Optimization (SEO)') AND `interview_type` = 'Onsite' AND `status` = 'Interview' ORDER BY `id` DESC";
    connection.query(sql, (err, data) => {
      if (err) {
        return res.json(err);
      } else {
        console.log(data)
        return res.json(data);
      }
    });
  }
};

const GetRemoteInterview = (req, res) => {
  const { email } = req.params;

  if (email === "marketingmanager@ezitech.org") {
    const sql =
      "SELECT * FROM `intern_table` WHERE (`technology` = 'WordPress Development' OR `technology` = 'Digital Marketing' OR `technology` = 'Search Engine Optimization (SEO)') AND `interview_type` = 'Remote' AND `status` = 'Interview' ORDER BY `id` DESC";

    connection.query(sql, (err, data) => {
      if (err) {
        return res.json(err);
      } else {
        return res.json(data);
      }
    });
  } else if (email === "remotemanager@ezitech.org") {
    const sql =
      "SELECT * FROM `intern_table` WHERE `technology` NOT IN ('WordPress Development', 'Digital Marketing', 'Search Engine Optimization (SEO)') AND `interview_type` = 'Remote' AND `status` = 'Interview' ORDER BY `id` DESC";

    connection.query(sql, (err, data) => {
      if (err) {
        return res.json(err);
      } else {
        return res.json(data);
      }
    });
  }
};

const GetContactWith = (req, res) => {
  const { email } = req.params;

  if (email === "marketingmanger@ezitech.org") {
    const sql =
      "SELECT * FROM `intern_table` WHERE (`technology` = 'WordPress Development' OR `technology` = 'Digital Marketing' OR `technology` = 'Search Engine Optimization (SEO)')  AND `Status` = 'Contact' ORDER BY `id` DESC";
    connection.query(sql, (err, data) => {
      if (err) {
        return res.json(err);
      } else {
        return res.json(data);
      }
    });
  }

  if (email === "remotemanager@ezitech.org") {
    const sql =
      "SELECT * FROM `intern_table` WHERE `technology` NOT IN ('WordPress Development', 'Digital Marketing', 'Search Engine Optimization (SEO)') AND `interview_type` = 'Remote' AND `Status` = 'Contact' ORDER BY `id` DESC";
    connection.query(sql, (err, data) => {
      if (err) {
        return res.json(err);
      } else {
        return res.json(data);
      }
    });
  }

  if (email === "onsitemanager@ezitech.org") {
    const sql =
      "SELECT * FROM `intern_table` WHERE `technology` NOT IN ('WordPress Development', 'Digital Marketing', 'Search Engine Optimization (SEO)') AND `interview_type` = 'Onsite' AND `Status` = 'Contact' ORDER BY `id` DESC";
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

  if (email === "marketingmanager@ezitech.org") {
    const sql =
      "SELECT * FROM `intern_table` WHERE (`technology` = 'WordPress Development' OR `technology` = 'Digital Marketing' OR `technology` = 'Search Engine Optimization (SEO)') AND `status` = 'Test'";
    connection.query(sql, (err, data) => {
      if (err) {
        return res.json(err);
      } else {
        return res.json(data);
      }
    });
  } else if (email === "remotemanager@ezitech.org") {
    const sql =
      "SELECT * FROM `intern_table` WHERE `technology` NOT IN ('WordPress Development', 'Digital Marketing', 'Search Engine Optimization (SEO)') AND `interview_type` = 'Remote' AND `status` = 'Test'";
    connection.query(sql, (err, data) => {
      if (err) {
        return res.json(err);
      } else {
        return res.json(data);
      }
    });
  } else if (email === "onsitemanager@ezitech.org") {
    const sql =
      "SELECT * FROM `intern_table` WHERE `technology` NOT IN ('WordPress', 'Digital Marketing', 'Search Engine Optimization (SEO)') AND `interview_type` = 'Onsite' AND `status` = 'Test'";
    connection.query(sql, (err, data) => {
      if (err) {
        return res.json(err);
      } else {
        return res.json(data);
      }
    });
  }
};

const GetActiveInterns = (req, res) => {
  const sql = "SELECT * FROM `intern_accounts` WHERE `status` = 'Active'";
  connection.query(sql, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
};

const CountInterns = (req, res) => {
  const sql = `SELECT intern_type, MONTH(created_at) as month, COUNT(*) as count FROM intern_table WHERE YEAR(created_at) = YEAR(CURDATE()) GROUP BY intern_type, MONTH(created_at) ORDER BY MONTH(created_at)`;

  connection.query(sql, (err, results) => {
    if (err) {
      return res.json(err);
    } else {
      const data = {
        onsite: Array(12).fill(0),
        remote: Array(12).fill(0),
      };

      results.forEach((row) => {
        if (row.intern_type === "Onsite") {
          data.onsite[row.month - 1] = row.count;
        } else if (row.intern_type === "Remote") {
          data.remote[row.month - 1] = row.count;
        }
      });
      res.json(data);
    }
  });
};

const CountInterviewInterns = (req, res) => {
  const { email } = req.params;
  if (email === "onsitemanager@ezitech.org") {
    const sql =
      "SELECT COUNT(*) as count FROM intern_table WHERE  `technology` NOT IN ('WordPress Development', 'Digital Marketing', 'Search Engine Optimization (SEO)') AND `interview_type` = 'Onsite' AND `status` = 'Interview'";
    connection.query(sql, (err, data) => {
      if (err) {
        return res, json(err);
      } else {
        return res.json(data[0]);
      }
    });
  }

  if (email === "remotemanager@ezitech.org") {
    const sql =
      "SELECT COUNT(*) as count FROM intern_table WHERE `technology` NOT IN ('WordPress Development', 'Digital Marketing', 'Search Engine Optimization (SEO)') AND `interview_type` = 'Remote' AND `status` = 'Interview'";
    connection.query(sql, (err, data) => {
      if (err) {
        return res, json(err);
      } else {
        return res.json(data[0]);
      }
    });
  }

  if (email === "marketingmanger@ezitech.org") {
    const sql =
      "SELECT COUNT(*) as count FROM intern_table WHERE (`technology` = 'WordPress Development' OR `technology` = 'Digital Marketing' OR `technology` = 'Search Engine Optimization (SEO)') AND `status` = 'Interview'";
    connection.query(sql, (err, data) => {
      if (err) {
        return res, json(err);
      } else {
        return res.json(data[0]);
      }
    });
  }
};

const CountTestInterns = (req, res) => {
  const { email } = req.params;
  if (email === "onsitemanager@ezitech.org") {
    const sql =
      "SELECT COUNT(*) as count FROM intern_table WHERE  `technology` NOT IN ('WordPress Development', 'Digital Marketing', 'Search Engine Optimization (SEO)') AND `interview_type` = 'Onsite' AND `status` = 'Test'";
    connection.query(sql, (err, data) => {
      if (err) {
        return res, json(err);
      } else {
        return res.json(data[0]);
      }
    });
  }

  if (email === "remotemanager@ezitech.org") {
    const sql =
      "SELECT COUNT(*) as count FROM intern_table WHERE `technology` NOT IN ('WordPress Development', 'Digital Marketing', 'Search Engine Optimization (SEO)') AND `interview_type` = 'Remote' AND `status` = 'Test'";
    connection.query(sql, (err, data) => {
      if (err) {
        return res, json(err);
      } else {
        return res.json(data[0]);
      }
    });
  }

  if (email === "marketingmanager@ezitech.org") {
    const sql =
      "SELECT COUNT(*) as count FROM intern_table WHERE (`technology` = 'WordPress Development' OR `technology` = 'Digital Marketing' OR `technology` = 'Search Engine Optimization (SEO)') AND `status` = 'Test'";
    connection.query(sql, (err, data) => {
      if (err) {
        return res, json(err);
      } else {
        return res.json(data[0]);
      }
    });
  }
};

const CountTestCompleted = (req, res) => {
  const sql =
    "SELECT COUNT(*) as count FROM complete_test WHERE status = 'Completed'";
  connection.query(sql, (err, data) => {
    if (err) {
      return res, json(err);
    } else {
      return res.json(data[0]);
    }
  });
};

const CountContactWith = (req, res) => {
  const { email } = req.params;
  if (email === "onsitemanager@ezitech.org") {
    const sql =
      "SELECT COUNT(*) as count FROM intern_table WHERE  `technology` NOT IN ('WordPress Development', 'Digital Marketing', 'Search Engine Optimization (SEO)') AND `interview_type` = 'Onsite' AND `status` = 'Contact'";
    connection.query(sql, (err, data) => {
      if (err) {
        return res, json(err);
      } else {
        return res.json(data[0]);
      }
    });
  }

  if (email === "remotemanager@ezitech.org") {
    const sql =
      "SELECT COUNT(*) as count FROM intern_table WHERE `technology` NOT IN ('WordPress Development', 'Digital Marketing', 'Search Engine Optimization (SEO)') AND `interview_type` = 'Remote' AND `status` = 'Contact'";
    connection.query(sql, (err, data) => {
      if (err) {
        return res, json(err);
      } else {
        return res.json(data[0]);
      }
    });
  }

  if (email === "marketingmanager@ezitech.org") {
    const sql =
      "SELECT COUNT(*) as count FROM intern_table WHERE (`technology` = 'WordPress Development' OR `technology` = 'Digital Marketing' OR `technology` = 'Search Engine Optimization (SEO)') AND `status` = 'Contact'";
    connection.query(sql, (err, data) => {
      if (err) {
        return res, json(err);
      } else {
        return res.json(data[0]);
      }
    });
  }
};

module.exports = {
  GetLatestRegister,
  GetOnsiteInterview,
  GetRemoteInterview,
  GetContactWith,
  GetTestIntern,
  GetActiveInterns,
  CountInterns,
  CountInterviewInterns,
  CountTestInterns,
  CountTestCompleted,
  CountContactWith,
};
