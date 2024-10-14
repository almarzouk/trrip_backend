const express = require("express");
const router = express.Router();
const {
  uploadFile,
  getFiles,
  getFile,
  removeFile,
} = require("../controllers/fileController");

// لتحميل الملفات
router.post("/upload", uploadFile, (req, res) => {
  res.json({
    message: "File uploaded successfully",
    filename: req.file.filename,
  });
});

// لاسترداد جميع الملفات
router.get("/", getFiles);
router.get("/:filename", getFile);

// لحذف ملف
router.delete("/:filename", removeFile);

module.exports = router;
