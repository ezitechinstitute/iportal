const { connection } = require("../../config/connection");
const cron = require("node-cron");

// Update intern_account table when deploy
const GetSupervisorsInterns = (req, res) => {
  const { supid } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const sql_0 =
    "SELECT DISTINCT technologies.technology, supervisor_permissions.internship_type FROM `intern_table` JOIN supervisor_permissions ON supervisor_permissions.internship_type = intern_table.intern_type JOIN technologies ON supervisor_permissions.tech_id = technologies.tech_id WHERE supervisor_permissions.manager_id = ?";
  connection.query(sql_0, [supid], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      const superTech = [];
      const superInternship = [];
      for (let i = 0; i < data.length; i++) {
        superTech.push(data[i].technology);
        superInternship.push(data[i].internship_type);
      }

      let query =
        "SELECT * FROM intern_accounts ia LEFT JOIN intern_table it ON ia.email = it.email WHERE 1 = 1";
      const techFilter = superTech.map((t) => t).join("','");

      if (techFilter.length > 0) {
        query += ` AND technology IN ('${techFilter}')`;
      }

      const iship_type = [...new Set(superInternship.map((i) => i))];

      if (iship_type.length > 0) {
        query += ` AND intern_type IN ('${iship_type.join("','")}')`;
      }

      // Status filter
      const statusFilter = "Active"; // Assume 'status' is a variable holding the desired status value

      if (statusFilter && statusFilter.length > 0) {
        query += ` AND status = '${statusFilter}' ORDER BY id DESC LIMIT ? OFFSET ?`;
      }

      if (superTech.length > 0 && superInternship.length > 0) {
        // console.log(query);

        connection.query(query, [limit, offset], (reject, resolve) => {
          if (reject) {
            console.log(reject);
            return res.json(reject);
          } else {
            let countquery =
              "SELECT COUNT(*) as count FROM intern_table WHERE 1= 1";

            if (techFilter.length > 0) {
              countquery += ` AND technology IN ('${techFilter}')`;
            }

            if (iship_type.length > 0) {
              countquery += ` AND intern_type IN ('${iship_type.join("','")}')`;
            }

            if (statusFilter && statusFilter.length > 0) {
              countquery += ` AND status = '${statusFilter}'`;
            }

            connection.query(countquery, (countError, countResult) => {
              if (countError) {
                return res.json(countError);
              } else {
                const totalData = countResult[0].count;
                const totalPages = Math.ceil(totalData / limit);

                return res.json({
                  data: resolve,
                  meta: {
                    page,
                    limit,
                    totalData,
                    totalPages,
                  },
                });
              }
            });
          }
        });
      } else {
        return res.json("Something Went Wrong!!!");
      }
    }
  });
};

const AssignProject = (req, res) => {
  const {
    etiId,
    projectTitle,
    startDate,
    endDate,
    durationDays,
    points,
    description,
    supId,
  } = req.body.project;
  const sql =
    "INSERT INTO `intern_projects`(`eti_id`, `title`, `start_date`, `end_date`, `duration`, `project_marks`, `description`, `assigned_by`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [
    etiId,
    projectTitle,
    startDate,
    endDate,
    durationDays,
    points,
    description,
    supId,
  ];
  connection.query(sql, values, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    } else {
      return res.send({ msg: "Project Assigned successfully", data: data });
    }
  });
};

const GetAttendance = (req, res) => {
  const { email } = req.params;
  const sql =
    "SELECT COUNT(*) as countAttend FROM `intern_attendance` WHERE `email` = ?";
  connection.query(sql, [email], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    } else {
      return res.json(data[0].countAttend);
    }
  });
};

const CountAllProjects = (req, res) => {
  const { email } = req.params;
  const sql =
    "SELECT COUNT(*) as countAllProject FROM `intern_projects` WHERE `email` = ?";
  connection.query(sql, [email], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    } else {
      return res.json(data[0].countAllProject);
    }
  });
};

const CountCompProjects = (req, res) => {
  const { email } = req.params;
  const sql =
    "SELECT COUNT(*) as countCompProject FROM `intern_projects` WHERE `email` = ? AND pstatus = 'Completed'";
  connection.query(sql, [email], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    } else {
      return res.json(data[0].countCompProject);
    }
  });
};

const CountExpProjects = (req, res) => {
  const { email } = req.params;
  const sql =
    "SELECT COUNT(*) as countExpProject FROM `intern_projects` WHERE `email` = ? AND pstatus = 'Expire'";
  connection.query(sql, [email], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    } else {
      // console.log(data[0].countAttend)
      return res.json(data[0].countExpProject);
    }
  });
};

const GetProjects = (req, res) => {
  const { supid } = req.params;
  const sql = "SELECT * FROM `intern_projects` WHERE `assigend_by` = ?";
  connection.query(sql, [supid], (err, data) => {
    if (err) throw err;
    return res.json(data);
  });
};

const GetTasks = (req, res) => {
  const { supid } = req.params;
  const sql =
    "SELECT * FROM `intern_tasks` JOIN intern_projects ON intern_tasks.project_id = intern_projects.project_id AND intern_tasks.eti_id = intern_projects.eti_id WHERE intern_projects.assigned_by = ?";
  connection.query(sql, [supid], (err, data) => {
    if (err) throw err;
    return res.json(data);
  });
};

const DayIncrement = (req, res) => {
  const sql1 =
    "SELECT days, duration FROM intern_projects WHERE pstatus = 'Ongoing'";
  connection.query(sql1, (err, data1) => {
    if (err) {
      return res.json(err);
    } else {
      for (let i = 0; i < data1.length; i++) {
        if (data1[i].days < data1[i].duration) {
          const day = data1[i].days + 1;
          const sql2 = `UPDATE intern_projects SET days = ${day} WHERE pstatus = 'Ongoing' `;
          connection.query(sql2, (err, data2) => {
            if (err) {
              console.log(err);
            } else {
              console.log(data2);
            }
          });
        } else {
          const sql2 =
            "UPDATE intern_projects SET pstatus = 'Expire' WHERE pstatus = 'Ongoing'";
          connection.query(sql2, (err, data3) => {
            if (err) {
              console.log(err);
            } else {
              console.log(data3);
            }
          });
        }
      }
    }
  });
};

cron.schedule("0 0 1 * * *", () => {
  console.log("running the project schedule");
  DayIncrement();
});

module.exports = {
  GetSupervisorsInterns,
  AssignProject,
  GetAttendance,
  CountAllProjects,
  GetProjects,
  GetTasks,
  CountCompProjects,
  CountExpProjects,
};
