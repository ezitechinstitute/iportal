const { connection } = require("../../config/connection");

// Get interns with review status 'Review'
const GetReviewInterns = (req, res) => {
  // Get pagination parameters from query string
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  // Get search term if provided
  const searchTerm = req.query.search || "";

  // Base SQL query
  let sql = `
    SELECT *
    FROM video_feedback vf WHERE status = 'Pending'
  `;

  // Add search filter if search term exists
  if (searchTerm) {
    sql += ` AND vf.name LIKE '%${connection
      .escape(searchTerm)
      .replace(/'/g, "")}%'`;
  }

  // Add pagination
  sql += ` LIMIT ${limit} OFFSET ${offset}`;

  // Query for total count (for pagination metadata)
  let countSql = `
    SELECT COUNT(*) as total
    FROM video_feedback vf 
    
    WHERE status = 'Pending'
  `;

  if (searchTerm) {
    countSql += ` AND vf.name LIKE '%${connection
      .escape(searchTerm)
      .replace(/'/g, "")}%'`;
  }

  // Execute both queries
  connection.query(countSql, (err, countResult) => {
    if (err) {
      console.error("Count query error:", err);
      return res.status(500).json({ error: "Database query failed" });
    }

    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    connection.query(sql, (err, data) => {
      if (err) {
        console.error("Data query error:", err);
        return res.status(500).json({ error: "Database query failed" });
      }

      const results = data.map((row) => ({
        id: row.id,
        eti_id: row.eti_id,
        name: row.name,
        email: row.email,
        technology: row.tech,
        videoUrl: row.videoUrl,
        status: row.status,
      }));

      return res.json({
        data: results,
        pagination: {
          currentPage: page,
          totalPages: totalPages,
          totalItems: total,
          itemsPerPage: limit,
        },
      });
    });
  });
};

// Get interns with review status 'Non-Review'
const GetNonReviewInterns = (req, res) => {
  // Get pagination parameters from query string
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  // Get search term if provided
  const searchTerm = req.query.search || "";

  // Base SQL query
  let sql = `
    SELECT *
    FROM video_feedback vf WHERE
    vf.status = 'Approved'
  `;

  // Add search filter if search term exists
  if (searchTerm) {
    sql += ` AND vf.name LIKE '%${connection
      .escape(searchTerm)
      .replace(/'/g, "")}%'`;
  }

  // Add pagination
  sql += ` LIMIT ${limit} OFFSET ${offset}`;

  // Query for total count (for pagination metadata)
  let countSql = `
    SELECT COUNT(*) as total
    FROM video_feedback WHERE status = 'Approved'
  `;

  if (searchTerm) {
    countSql += ` AND vf.name LIKE '%${connection
      .escape(searchTerm)
      .replace(/'/g, "")}%'`;
  }

  // Execute both queries
  connection.query(countSql, (err, countResult) => {
    if (err) {
      console.error("Count query error:", err);
      return res.status(500).json({ error: "Database query failed" });
    }

    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    connection.query(sql, (err, data) => {
      if (err) {
        console.error("Data query error:", err);
        return res.status(500).json({ error: "Database query failed" });
      }

      const results = data.map((row) => ({
        id: row.id,
        eti_id: row.eti_id,
        name: row.name,
        email: row.email,
        technology: row.tech,
        videoUrl: row.videoUrl,
        status: row.status,
      }));

      return res.json({
        data: results,
        pagination: {
          currentPage: page,
          totalPages: totalPages,
          totalItems: total,
          itemsPerPage: limit,
        },
      });
    });
  });
};
// Count total interns with review status 'Review'
const CountReviewInterns = (req, res) => {
  const sql = `
    SELECT COUNT(*) AS totalReviewInterns
    FROM video_feedback WHERE status = 'Pending'`;

  connection.query(sql, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database query failed" });
    }

    const totalReviewInterns = data[0].totalReviewInterns;
    return res.json({ totalReviewInterns });
  });
};

// Count total interns with review status 'Non-Review'
const CountNonReviewInterns = (req, res) => {
  const sql = `
    SELECT COUNT(*) AS totalNonReviewInterns
    FROM video_feedback
    WHERE status = 'Approved'`;

  connection.query(sql, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database query failed" });
    }

    const totalNonReviewInterns = data[0].totalNonReviewInterns;
    return res.json({ totalNonReviewInterns });
  });
};

// Update review status of an intern
const ApproveFeedback = (req, res) => {
  const { id } = req.params;

  const sql =
    "UPDATE `video_feedback` SET `status`='Approved' WHERE `eti_id` = ?";

  connection.query(sql, [id], (err, result_1) => {
    if (err) throw err;
    console.log(result_1);
    const sql2 =
      "UPDATE `intern_accounts` SET `review`='Approved' WHERE `eti_id` = ?";
    connection.query(sql2, [id], (err, result_2) => {
      if (err) throw err;
      console.log(result_2);
      return res.json("Feedback Approved Successfuly");
    });
  });
};

const DeleteFeedback = (req, res) => {
  const { id } = req.params;

  const sql = `
    DELETE FROM video_feedback
    WHERE id = ?`;
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database query failed" });
    }
    const sql2 =
      "UPDATE `intern_accounts` SET `review`='Rejected' WHERE `eti_id` = ?";
    connection.query(sql2, [id], (err, result_2) => {
      if (err) throw err;
      return res.json({ message: "Feedback Deleted Successfuly" });
    });
  });
};

const checkVideoStatus = (req, res) => {
  const { eti_id } = req.params;

  const sql = `
    SELECT status
    FROM video_feedback
    WHERE eti_id = ?`;
  connection.query(sql, [eti_id], (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database query failed" });
    }

    if (data.length === 0) {
      return res.json({ status: "No Video Submitted" });
    }

    const status = data[0].status;
    return res.json({ status });
  });
};

module.exports = {
  GetReviewInterns,
  GetNonReviewInterns,
  CountReviewInterns,
  CountNonReviewInterns,
  ApproveFeedback,
  DeleteFeedback,
  checkVideoStatus,
};
