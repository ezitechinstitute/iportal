const { connection } = require('../../config/connection');

const GetAllInternForCertificateIssuance = (req, res) => {
  try {
    const sql = `SELECT
    intern_accounts.eti_id,
    intern_accounts.isCertificate,
    intern_table.status,
    intern_table.name,
    intern_table.email,
    intern_table.id
FROM intern_accounts
JOIN intern_table
    ON intern_accounts.email = intern_table.email;
`;
    connection.query(sql, (err, data) => {
      if (err) {
        console.log('error in sql query');
        return res.status(400).json({
          message: 'Server error',
          error: err.message,
        });
      }
      if (data.length === 0) {
        return res.status(404).json({
          message: 'No Intern For Certificate Issuance requests found',
        });
      }

      return res.json({
        message:
          'Get All Intern For Certificate Issuance requests retrieved successfully',
        data: data, // Return all records
      });
    });
  } catch (error) {
    console.log(`failed to Get All Intern For Certificate Issuance ,${error}`);
  }
};

const getInernByEmail = (req, res) => {
  const { email } = req.params;
  const sql = ` SELECT
    intern_table.*,
    intern_accounts.*

FROM intern_table
JOIN intern_accounts
    ON intern_table.email = intern_accounts.email
WHERE intern_table.email = ?;
`;

  try {
    connection.query(sql, [email], (err, data) => {
      if (err) {
        console.log('error in sql query');
        return res.status(400).json({
          message: 'Server error',
          error: err.message,
        });
      }
      if (data.length === 0) {
        return res.status(404).json({
          message: 'No Intern For Certificate Issuance requests found',
        });
      }

      return res.json({
        message: 'Get intern by email, retrieved successfully',
        data: data, // Return all records
      });
    });
  } catch (error) {
    console.log(`failed to get intern by id ,${error}`);
  }
};

const getInternProjectsByEmail = (req, res) => {
  try {
    const { email } = req.params;
    const sql = `select * from intern_projects WHERE EMAIL=?`;
    connection.query(sql, [email], (err, data) => {
      if (err) {
        console.log('error in sql query');
        return res.status(400).json({
          message: 'Server error',
          error: err.message,
        });
      }
      if (data.length === 0) {
        return res.status(404).json({
          message: 'No getInternProjectsByEmail found',
        });
      }

      return res.status(200).json({
        message: 'getInternProjectsByEmail successfully',
        data: data,
      });
    });
  } catch (error) {
    console.log(`error to get InternProjectsByEmail ::${error} `);
  }
};

// controller isAllowed to sutdent download certificate .... (controlled by Manager/HR)...
const isCertificateAllowToggle = (req, res) => {
  try {
    const { email } = req.params;

    // Pehle current value fetch karenge
    const selectSql = `SELECT isCertificate FROM intern_accounts WHERE email = ?`;
    connection.query(selectSql, [email], (err, data) => {
      if (err) {
        return res.status(400).json({
          message: 'Server error',
          error: err.message,
        });
      }
      if (data.length === 0) {
        return res.status(404).json({
          message: 'No user found with this email',
        });
      }

      // Current value ko toggle karenge
      const currentValue = data[0].isCertificate;
      const newValue = currentValue ? 0 : 1; // Agar 1 (true) hai to 0 (false) karenge, aur vice versa

      // Ab database mein value update karenge
      const updateSql = `UPDATE intern_accounts SET isCertificate = ? WHERE email = ?`;
      connection.query(updateSql, [newValue, email], (err, result) => {
        if (err) {
          return res.status(400).json({
            message: 'Server error while updating',
            error: err.message,
          });
        }
        const message = `certificate ${newValue ? 'Allowed' : 'notAllowed'}`;
        return res.status(200).json({
          message: message,
          data: {
            oldValue: currentValue,
            newValue: newValue,
          },
        });
      });
    });
  } catch (error) {
    console.log(`failed isCertificateAllowToggle :: ${error}`);
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};
module.exports = {
  GetAllInternForCertificateIssuance,
  getInernByEmail,
  getInternProjectsByEmail,
  isCertificateAllowToggle,
};
