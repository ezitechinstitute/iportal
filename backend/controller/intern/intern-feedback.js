const { connection } = require("../../config/connection");

// Get Feedback by eti_id (from session)
const GetFeedback = (req, res) => {
    const { id } = req.query; 

    if (!id) {
        return res.status(400).json({ message: 'ID is required' });
    }

    const sql = "SELECT * FROM `intern_feedback` WHERE `eti_id` = ?";
    connection.query(sql, [id], (err, data) => {
        if (err) {
            console.error('Error fetching feedback:', err);
            return res.status(500).json({ message: 'Server error', error: err.message });
        }
        return res.json(data);
    });
};

// Insert Feedback (using exact received ID)
const InsertFeedback = (req, res) => {
    const { feedback_text } = req.body;
    const { id } = req.query;  // Use exact received ID

    console.log('Received ID:', id); // Log the received ID
  
    if (!feedback_text) {
        console.error('Feedback text is missing');
        return res.status(400).json({ message: 'Feedback text is required' });
    }
  
    if (!id) {
        console.error('ID is missing');
        return res.status(400).json({ message: 'ID is required' });
    }
  
    const sql = "INSERT INTO `intern_feedback` (`eti_id`, `feedback_text`) VALUES (?, ?)";
    connection.query(sql, [id, feedback_text], (err, result) => {
        if (err) {
            console.error('Error while inserting feedback:', err);
            return res.status(500).json({ message: 'Server error', error: err.message });
        }
        console.log('Feedback inserted with ID:', result.insertId);
        return res.status(201).json({ message: 'Feedback inserted successfully', feedback_id: result.insertId });
    });
};

module.exports = { GetFeedback, InsertFeedback };
