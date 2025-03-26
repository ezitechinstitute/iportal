const { connection } = require("../../config/connection");

// Get interns with review status 'Review'
const GetReviewInterns = (req, res) => {
  const sql = `
    SELECT it.image, it.name, it.technology, it.email, it.join_date, it.phone, it.intern_type
    FROM intern_table it 
    JOIN intern_accounts ia 
    ON it.email = ia.email 
    WHERE ia.review = 'Review'`;

  connection.query(sql, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database query failed" });
    }

    if (data.length > 0) {
      const results = data.map(row => ({
        image: row.image,
        name: row.name,
        technology: row.technology,
        joinDate: row.join_date,
        phone: row.phone,
        internType: row.intern_type,
        email: row.email
      }));
      return res.json(results);
    } else {
      return res.json([]);
    }
  });
};

// Get interns with review status 'Non-Review'
const GetNonReviewInterns = (req, res) => {
  const sql = `
    SELECT it.image, it.name, it.email, it.technology, it.join_date, it.phone, it.intern_type
    FROM intern_table it 
    JOIN intern_accounts ia 
    ON it.email = ia.email 
    WHERE ia.review = 'Non-Review'`;

  connection.query(sql, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database query failed" });
    }

    if (data.length > 0) {
      const results = data.map(row => ({
        image: row.image,
        name: row.name,
        technology: row.technology,
        joinDate: row.join_date,
        phone: row.phone,
        internType: row.intern_type,
        email: row.email
      }));
      return res.json(results);
    } else {
      return res.json([]);
    }
  });
};

// Count total interns with review status 'Review'
const CountReviewInterns = (req, res) => {
  const sql = `
    SELECT COUNT(*) AS totalReviewInterns
    FROM intern_table it 
    JOIN intern_accounts ia 
    ON it.email = ia.email 
    WHERE ia.review = 'Review'`;

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
    FROM intern_table it 
    JOIN intern_accounts ia 
    ON it.email = ia.email 
    WHERE ia.review = 'Non-Review'`;

  connection.query(sql, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database query failed" });
    }

    const totalNonReviewInterns = data[0].totalNonReviewInterns;
    return res.json({ totalNonReviewInterns });
  });
};

const UpdateReviewStatus = (req, res) => {
    const { email, reviewStatus } = req.body;
  
    // Log the request body for debugging
    console.log('Request body:', req.body);
  
    if (!email || !reviewStatus) {
      return res.status(400).json({ error: "Email and reviewStatus are required" });
    }
  
    const sql = `
      UPDATE intern_accounts 
      SET review = ?
      WHERE email = ?`;
  
    connection.query(sql, [reviewStatus, email], (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Database query failed" });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Intern not found" });
      }
  
      return res.json({ message: "Review status updated successfully" });
    });
  };
module.exports = {
  GetReviewInterns,
  GetNonReviewInterns,
  CountReviewInterns,
  CountNonReviewInterns,
  UpdateReviewStatus
};