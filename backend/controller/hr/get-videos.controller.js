const { connection } = require("../../config/connection");

const GetVideosFeedBack = (req, res) => {
  const sql = "SELECT * FROM `video_feedback`";

  connection.query(sql, (err, data) => {
    if (err) throw err;
    return res.json(data);
  });
};

const ApprovedFeedBack = (req, res) => {
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

const RejectFeedBack = (req, res) => {
  const { id } = req.params;

  const sql =
    "UPDATE `video_feedback` SET `status`='Rejected' WHERE `eti_id` = ?";

  connection.query(sql, [id], (err, result_1) => {
    if (err) throw err;

    const sql2 =
      "UPDATE `intern_accounts` SET `review`='Rejected' WHERE `eti_id` = ?";
    connection.query(sql2, [id], (err, result_2) => {
      if (err) throw err;
      return res.json({ message: "Feedback Rejected Successfuly" });
    });
  });
};

module.exports = {
  GetVideosFeedBack,
  ApprovedFeedBack,
  RejectFeedBack,
};
