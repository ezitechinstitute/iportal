// middlewares/multer.js
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Make sure this folder exists
const uploadFolder = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadFolder)) fs.mkdirSync(uploadFolder);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder); // uploads folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  },
});

const limits = { fileSize: 200 * 1024 * 1024 }; // 200MB limit

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("video/")) cb(null, true);
  else cb(new Error("Only video files are allowed"), false);
};

const upload = multer({ storage, limits, fileFilter });

module.exports = upload;
