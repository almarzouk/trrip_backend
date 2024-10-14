const axios = require("axios");

exports.getWeather = async (req, res) => {
  const city = req.query.city || "palma"; // استخدم المدينة من المعلمات، افتراضيًا "بالما"
  const apiKey = "7e5e6c90f3bdb0868dad4f42713e75e0";
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await axios.get(url);
    const weatherData = response.data;

    // استخراج توقعات الطقس لليومين القادمين
    const dailyForecasts = weatherData.list
      .filter((item) => item.dt_txt.endsWith("12:00:00")) // نحصل على توقعات منتصف النهار
      .slice(0, 7) // احصل على يومين
      .map((item) => ({
        temperature: item.main.temp,
        description: item.weather[0].description,
        date: item.dt_txt.split(" ")[0], // استخراج التاريخ
      }));

    res.json(dailyForecasts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching weather data" });
  }
};
