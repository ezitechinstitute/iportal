const { connection } = require("../../config/connection");
const { SendMailCertificate } = require("../../mail/mailer-controller");

const SubmitCertificateReq = (req, res) => {
  const { ezi_id, username, email, tech, project_count, joining_date, cnic } = req.body;

  if (!ezi_id || !username || !email || !project_count) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  const duration = `${project_count} months`;
  const sql = `
    INSERT INTO certificate_requests 
    (ezi_id, username, email, tech, project_count, duration, joining_date, cnic, status) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'submitted')
  `;

  const values = [ezi_id, username, email, tech, project_count, duration, joining_date, cnic];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Insert error:", err);
      return res.status(500).json({ message: "Server error", error: err.message });
    }
    return res.status(201).json({
      message: "Certificate request submitted",
      request_id: result.insertId,
      status: "submitted",
      ezi_id,
      username,
      email,
      tech,
      project_count,
      joining_date,
      cnic
    });
  });
};

const SupApproveCert = (req, res) => {
  const { id } = req.params;
  const { remarks, status } = req.body;

  const sql = `
    UPDATE certificate_requests 
    SET supervisor_remarks = ?, status = ? 
    WHERE id = ?
  `;

  connection.query(sql, [remarks, status, id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Supervisor approval failed", error: err.message });
    }
    return res.json({ message: "Supervisor approved", id });
  });
};

const ManApproveCert = (req, res, next) => {
  const { id } = req.params;
  const { status, issued_by } = req.body;

      const sql = `
        UPDATE certificate_requests 
        SET status = ? 
        WHERE id = ? AND status = 'supervisor_approved'
    `;

      connection.query(sql, [status, id], (err, result) => {
        if (err) {
          return res.status(500).json({ message: "Manager approval failed", error: err.message });
       }
         req.body.issued_by = issued_by;
        req.params.id = id;

        next();
  });
};

const CertificateIssuance = (req, res) => {
  const { id } = req.params;
  const { status, issued_by } = req.body;

  const selectSql = `SELECT * FROM certificate_requests WHERE id = ? AND status = 'manager_approved'`;

  connection.query(selectSql, [id], (err, rows) => {
    if (err || rows.length === 0) {
      return res.status(400).json({ message: "No eligible request found" });
    }
  

    const data = rows[0];

    const insertSql = `
      INSERT INTO certificates 
      (student_username, student_email, ezi_id, tech, project_count, experience_duration, issued_by) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const insertValues = [
      data.username,
      data.email,
      data.ezi_id,
      data.tech,
      data.project_count,
      data.duration,
      issued_by
    ];

    connection.query(insertSql, insertValues, (err2, result) => {
      if (err2) {
        return res.status(500).json({ message: "Certificate issue failed", error: err2.message });
      }

      SendMailCertificate(
          data.username,
          data.email,
          data.tech,
          data.duration,
          data.project_count,
          issued_by
        );

      return res.status(200).json({
        message: "Manager approved! Certificate issued successfully",
        certificateId: result.insertId,
        duration: data.duration,
        username: data.username,
        email: data.email,
        tech: data.tech,
        project_count: data.project_count,
        issued_by
      });
    });
  });
  }

  const GetAllCertificates = (req, res) => {
    const sql = "SELECT * FROM `certificates`";
    try{
        connection.query(sql, (err, data) => {
        if (err){
            console.error('Error fetching all certificates:', err);
            return res.status(500).json({ message: 'Server error', error: err.message });
        }

        if (data.length === 0)
            return res.status(404).json({ message: "No certificates found" });

        return res.json({
            message: "Certificates retrieved successfully",
            data: data
        });
    });
    } catch (error) {
        console.error("Server crash:", error);
  res.status(500).json({ message: "Unexpected server error", error });
}
    
};

const GetCertificatesByEmail = 
  (req, res) => {
  const { email } = req.params;
  const sql = "SELECT * FROM certificates WHERE student_email = ?";
  connection.query(sql, [email], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err.message });
    }
    res.status(200).json({ certificates: rows });
  });
}

module.exports = {
  SubmitCertificateReq,
  SupApproveCert,
  ManApproveCert,
  CertificateIssuance,
  GetAllCertificates,
  GetCertificatesByEmail
};