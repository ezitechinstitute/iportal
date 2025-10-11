const { connection } = require("../../config/connection");
const fs = require("fs");

const cloudinary = require("../../config/cloudinary").v2;

const UploadVideo = async (req, res) => {
  const { id, name, email, tech } = req.body;

  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "video",
    });

    // Delete the file after upload
    fs.unlink(req.file.path, (err) => {
      if (err) console.error("Failed to delete local file:", err);
      else console.log("Local file deleted:", req.file.path);
    });

    // // Save to DB
    const sql =
      "INSERT INTO `video_feedback`(`eti_id`, `name`, `email`, `tech`, `videoUrl`) VALUES (?, ?, ?, ?, ?)";
    connection.query(
      sql,
      [id, name, email, tech, result.secure_url],
      (err, data) => {
        if (err) throw err;
        res.json({
          success: true,
          message: "Video uploaded successfully",
          url: result.secure_url,
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Upload failed" });
  }
};

module.exports = {
  UploadVideo,
};
