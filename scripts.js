async function cargarClima(ciudad = "quilmes") {
  try {
    const response = await fetch(`http://localhost:3000/weather/${ciudad}`);
    const data = await response.json();
    console.log(data)

    document.querySelectorAll(".estado")[0].innerHTML = `🌡️ Temperatura: ${data.current.temp_c} ºC`;
    document.querySelectorAll(".estado")[1].innerHTML = `🤔 Sensación térmica: ${data.current.feelslike_c} ºC`;


    const iconUrl = "https:" + data.current.condition.icon;
    document.querySelector(".img-estado img").src = iconUrl;


    if (data.forecast) {
      const filas = document.querySelectorAll(".seccion-semanal table tr.linea1");


      data.forecast.forecastday.forEach((dia, i) => {
        const fila = filas[i + 1];
        if (fila) {
          const tempCell = fila.querySelector(".infor");
          const fellCell = fila.querySelector(".infor2");
          const diaCell = fila.querySelector(".dias");

          tempCell.innerHTML = `Máx: ${dia.day.maxtemp_c} ºC / Mín: ${dia.day.mintemp_c} ºC`;
          fellCell.innerHTML = `Promedio: ${dia.day.avgtemp_c} ºC`;
          diaCell.innerHTML = dia.date;
        }
      });
    }
  } catch (error) {
    console.error("⚠️ Error al cargar clima:", error);
  }
}

window.onload = () => cargarClima();