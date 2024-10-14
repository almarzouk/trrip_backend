const multer = require("multer");
const path = require("path");
const fs = require("fs");

// إعداد التخزين باستخدام multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

exports.uploadFile = upload.single("file");

exports.getFiles = (req, res) => {
  const directoryPath = path.join(__dirname, "../uploads");

  // قراءة محتويات المجلد وإرجاع قائمة الملفات
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).json({ message: "Unable to scan files" });
    }

    // إرجاع قائمة الملفات
    const fileDetails = files.map((file) => ({
      name: file,
      size: fs.statSync(path.join(directoryPath, file)).size, // الحصول على حجم الملف
    }));

    res.json(fileDetails);
  });
};

exports.removeFile = (req, res) => {
  const fileName = req.params.filename;
  const filePath = path.join(__dirname, "../uploads", fileName);

  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(500).json({ message: "Unable to delete file" });
    }

    res.json({ message: "File deleted successfully" });
  });
};

exports.getFile = (req, res) => {
  const fileName = req.params.filename;
  const filePath = path.join(__dirname, "../uploads", fileName);

  // التأكد من أن الملف موجود
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ message: "File not found" });
    }

    // إرسال الملف للمستخدم
    res.sendFile(filePath);
  });
};
