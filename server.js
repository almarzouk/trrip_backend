const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const app = express();

// الاتصال بقاعدة البيانات
connectDB();

// CORS configuration
const corsOptions = {
  origin: "https://trip-seven-zeta.vercel.app", // Your Vercel frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
  credentials: true, // Enable credentials (cookies, authorization headers)
};

app.use(cors(corsOptions)); // Apply the CORS middleware with options
app.use(express.json());

// المسارات
app.use("/items", require("./routes/itemRoutes"));
app.use("/tasks", require("./routes/taskRoutes"));
app.use("/weather", require("./routes/weatherRoutes"));
app.use("/files", require("./routes/fileRoutes"));

// تشغيل الخادم
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
