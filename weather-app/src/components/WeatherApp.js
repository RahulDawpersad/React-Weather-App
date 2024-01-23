import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import styles  from "./style.module.css";


const apiKey = "1da550247f2ed8a45a02dda55086b7a2";

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const storedCity = localStorage.getItem("userCity");
    const storedWeatherData = localStorage.getItem("weatherData");

    if (storedCity && storedWeatherData) {
      setCity(storedCity);
      setWeatherData(JSON.parse(storedWeatherData));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    getWeatherData();
  };

  const getWeatherData = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      )
      .then((response) => {
        const weatherData = response.data;
        setWeatherData(weatherData);
        localStorage.setItem("userCity", city);
        localStorage.setItem("weatherData", JSON.stringify(weatherData));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const refreshWeather = () => {
    getWeatherData();
  };

  const isDay = (sunriseTimestamp, sunsetTimestamp) => {
    const now = Date.now() / 1000;
    return now >= sunriseTimestamp && now < sunsetTimestamp;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.mainContainer}>
        <form onSubmit={handleSubmit}>
          <h1>Skycast Weather App</h1>
          <label htmlFor="cityInput">Enter City:</label>
          <input
            type="text"
            id="cityInput"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <button type="submit">Get Weather</button>
          <span id="refreshIcon" onClick={refreshWeather}>
            <FontAwesomeIcon icon={faSyncAlt} spin />
          </span>
        </form>
        {weatherData && (
          <div id="weatherData" className={styles.weatherData}>
            <p>
              {weatherData.main.temp.toFixed(1)}°C temperature from{" "}
              {weatherData.main.temp_min.toFixed(1)} to{" "}
              {weatherData.main.temp_max.toFixed(1)}°C
            </p>
            <p>Weather: {weatherData.weather[0].description}</p>
            {/* <p>Rain Amount: {weatherData.rain?.["1h"] || 0} %</p> */}
            <p>Rain Amount: {((weatherData.rain?.["1h"] || 0) * 100).toFixed(0)}%</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>
              Wind:{" "}
              {(weatherData.wind.speed * 3.6).toFixed(2)} km/h
            </p>
            <p>
              {isDay(weatherData.sys.sunrise, weatherData.sys.sunset) ? (
                <>
                  Day <FontAwesomeIcon icon={faSun} />
                </>
              ) : (
                <>
                  Night <FontAwesomeIcon icon={faMoon} />
                </>
              )}
            </p>
            <p>Date: {new Date().toDateString()}</p>
            <p>
              Time: {new Date().toLocaleTimeString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

