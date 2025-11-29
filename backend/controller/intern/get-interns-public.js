const { connection } = require("../../config/connection");
console.log("[DEBUG] get-interns-public.js loaded");
require("dotenv").config();

/**
 * Public endpoint to return paginated interns.
 * Query params: page (default 1), limit (default 10)
 * Response: { data: [...], total, page, limit }
 */
const GetPublicInterns = (req, res) => {
  console.log("[DEBUG] GetPublicInterns called", req.query);
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const offset = (page - 1) * limit;

  // Count only active interns (check intern_accounts.int_status = 'Active')
  const countSql =
    "SELECT COUNT(*) AS total FROM intern_table it JOIN intern_accounts ia ON ia.email = it.email WHERE ia.int_status = 'Active'";
  connection.query(countSql, (countErr, countResult) => {
    if (countErr) {
      console.error("Count error", countErr);
      return res.status(500).json({ error: "Database error" });
    }

    const total = (countResult && countResult[0] && countResult[0].total) || 0;
    const dataSql = `SELECT it.id, it.name, it.email, it.city, it.phone, it.gender, it.image as avatar, it.join_date, it.birth_date, it.university, it.technology, it.duration, ia.eti_id FROM intern_table it JOIN intern_accounts ia ON ia.email = it.email WHERE ia.int_status = 'Active' ORDER BY it.id DESC LIMIT ? OFFSET ?`;
    connection.query(dataSql, [limit, offset], (dataErr, rows) => {
      if (dataErr) {
        console.error("Query error", dataErr);
        return res.status(500).json({ error: "Database error" });
      }

      return res.json({ data: rows, total, page, limit });
    });
  });
};

const GetPublicProfile = (req, res) => {
  console.log("[DEBUG] GetPublicProfile called", req.params);
  const eti_id = req.params.eti_id;
  const sql = `SELECT it.id, it.name, it.email, it.country, it.city, it.phone, it.gender, it.image as avatar, it.birth_date, it.technology, ia.eti_id, ia.int_status FROM intern_table it JOIN intern_accounts ia ON ia.email = it.email WHERE ia.eti_id = ? AND ia.int_status = 'Active'`;
  connection.query(sql, [eti_id], (err, results) => {
    if (err) {
      console.error("Query error", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Intern not found" });
    }
    return res.json(results[0]);
  });
};

const GetPublicProfileProjects = (req, res) => {
  console.log("[DEBUG] GetPublicProfileProjects called", req.params);
  const eti_id = req.params.eti_id;

  const sql = `SELECT ip.title, pt.task_screenshot, pt.task_live_url, pt.task_git_url FROM intern_projects as ip JOIN project_tasks as pt ON ip.project_id = pt.project_id WHERE ip.eti_id =? AND ip.pstatus = 'Completed'`;
  connection.query(sql, [eti_id], (err, results) => {
    if (err) {
      console.error("Query error", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (results.length === 0) {
      return res
        .status(404)
        .json({ error: "No projects found for this intern" });
    }
    return res.json(results);
  });
};

const GetPublicProfilePerformance = (req, res) => {
  console.log("[DEBUG] GetPublicProfilePerformance called", req.params);
  const eti_id = req.params.eti_id;
  const data = getInternData(eti_id);
  data
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.error("Error fetching intern data:", err);
      res.status(500).json({ error: "Database error" });
    });
};

// getInternData.js
function getInternData(internId) {
  return new Promise((resolve, reject) => {
    const result = {
      attendedDays: 0,
      completedProjects: 0,
      completedTasks: 0,
      performance: 0.0,
    };

    // 1. Attendance count
    connection.query(
      "SELECT COUNT(*) AS attendedDays FROM intern_attendance WHERE eti_id = ? AND status = 1",
      [internId],
      (err, attendanceResult) => {
        if (err) return reject(err);

        result.attendedDays = attendanceResult[0]?.attendedDays || 0;

        // 2. Completed projects
        connection.query(
          "SELECT COUNT(*) AS completedProjects FROM intern_projects WHERE eti_id = ? AND pstatus = 'Completed'",
          [internId],
          (err, projectsResult) => {
            if (err) return reject(err);

            result.completedProjects =
              projectsResult[0]?.completedProjects || 0;

            // 3. Completed tasks
            connection.query(
              "SELECT COUNT(*) AS completedTasks FROM intern_tasks WHERE eti_id = ? AND task_status = 'Completed'",
              [internId],
              (err, tasksResult) => {
                if (err) return reject(err);

                result.completedTasks = tasksResult[0]?.completedTasks || 0;
                calculateInternAverageScore(internId)
                  .then((avgScore) => {
                    result.performance = avgScore;
                    resolve(result);
                  })
                  .catch((scoreErr) => reject(scoreErr));
              }
            );
          }
        );
      }
    );
  });
}

const calculateInternAverageScore = async (internId) => {
  try {
    const response = await fetch(
      `${process.env.API_URL}/get-int-avg/?id=${internId}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.final_average || 0.0;
  } catch (error) {
    console.error("Error fetching performance score:", error);
    return 0.0;
  }
};

module.exports = {
  GetPublicInterns,
  GetPublicProfile,
  GetPublicProfileProjects,
  GetPublicProfilePerformance,
};
