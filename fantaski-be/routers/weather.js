express = require("express");
const axios = require("axios");
const router = express.Router();
const moment = require("moment");

router.get("/", async (req, res) => {
  console.log("request for weatherInfo");
  try {
    let resWeather = await axios.get(
      "http://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          id: "2130037",
          appid: "fdc23a83b7a185b3cd315af306b5d3dc",
          units: "metric",
        },
      }
    );

    res.json({
      code: 200,
      message: "成功讀取天氣資料",
      // dataAll: resWeather.data,
      data: {
        time: moment.unix(resWeather.data.dt).format("HH:mm"),
        temp: Math.round(resWeather.data.main.temp),
        statusId: resWeather.data.weather[0].id,
        status: resWeather.data.weather[0].main,
      },
    });
  } catch (e) {
    console.log("query for whetherInfo failed:", e);
    res.json({ code: 9999, message: "天氣資料讀取錯誤" });
  }
});

module.exports = router;
