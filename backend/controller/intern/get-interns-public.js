const { connection } = require("../../config/connection");

/**
 * Public endpoint to return paginated interns.
 * Query params: page (default 1), limit (default 10)
 * Response: { data: [...], total, page, limit }
 */
const GetPublicInterns = (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const offset = (page - 1) * limit;

  // Count only active interns (check intern_accounts.int_status = 'Active')
  const countSql = "SELECT COUNT(*) AS total FROM intern_table it JOIN intern_accounts ia ON ia.email = it.email WHERE ia.int_status = 'Active'";
  connection.query(countSql, (countErr, countResult) => {
    if (countErr) {
      console.error('Count error', countErr);
      return res.status(500).json({ error: 'Database error' });
    }

    const total = (countResult && countResult[0] && countResult[0].total) || 0;
    const dataSql = `SELECT it.id, it.name, it.email, it.city, it.phone, it.gender, it.image as avatar, it.join_date, it.birth_date, it.university, it.technology, it.duration FROM intern_table it JOIN intern_accounts ia ON ia.email = it.email WHERE ia.int_status = 'Active' ORDER BY it.id DESC LIMIT ? OFFSET ?`;
    connection.query(dataSql, [limit, offset], (dataErr, rows) => {
      if (dataErr) {
        console.error('Query error', dataErr);
        return res.status(500).json({ error: 'Database error' });
      }

      return res.json({ data: rows, total, page, limit });
    });
  });
};

module.exports = { GetPublicInterns };
