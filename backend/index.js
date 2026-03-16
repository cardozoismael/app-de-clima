const express = require("express")
const fetch= require("node-fetch")
const cors= require("cors")
require("dotenv").config()

const app = express();
app.use(cors())

app.get("/weather/:city", async (req, res) => {
  const city = req.params.city;
  const apikey = process.env.WEATHER_API_KEY;
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${city}&days=7&lang=es`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener datos de clima" });
  }
});

app.listen(3000,()=>{
    console.log("sevidor en el localhost 3000")
})