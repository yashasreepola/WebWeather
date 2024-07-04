import React, { useState, useEffect } from "react";
import axios from "axios";
import Map from "../map/Map";
import './weather.css';

function Weather() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("Hyderabad");
  const [inputCity, setInputCity] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (cityName) => {
    try {
      setLoading(true);
      const currentResponse = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=034c0ed4ba894afa93955701240106&q=${cityName}`
      );

      const historyPromises = [];
      for (let i = 0; i < 5; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const formattedDate = date.toISOString().split("T")[0];
        historyPromises.push(
          axios.get(
            `https://api.weatherapi.com/v1/history.json?key=034c0ed4ba894afa93955701240106&q=${cityName}&dt=${formattedDate}`
          )
        );
      }

      const historyResponses = await Promise.all(historyPromises);
      const historyData = historyResponses.map((response) => response.data);

      setWeather(currentResponse.data);
      setHistory(historyData);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputCity.trim()) {
      setCity(inputCity);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <form onSubmit={handleSubmit} className="mb-4 flex items-center">
        <input
          type="text"
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value)}
          placeholder="Enter city"
          className="p-2 border border-gray-300 rounded-l focus:outline-none focus:border-blue-500"
        />
        <button type="submit" className="p-2 bg-blue-500 h-[45px] w-full text-white hover:bg-blue-600 transition duration-300">
          Get Weather
        </button>
      </form>
      <div className="flex flex-row justify-between w-full">
                <div className="card pr-4">
                    {weather && weather.location ? (
                        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <div className="bg-blue-500 text-white text-center p-4">
                                <h2 className="text-2xl font-bold">
                                    {weather.location.name}, {weather.location.country}
                                </h2>
                                <p className="text-sm">{weather.location.localtime}</p>
                            </div>
                            <div className="p-4">
                                <div className="mb-4">
                                    <h3 className="text-lg font-semibold text-left">Location</h3>
                                    <p>Latitude: {weather.location.lat}</p>
                                    <p>Longitude: {weather.location.lon}</p>
                                </div>
                                <div className="weather-details mt-4">
                                    <p><span className="font-semibold">Temperature:</span> {weather.current.temp_c}°C / {weather.current.temp_f}°F</p>
                                    <p><span className="font-semibold">Condition:</span> {weather.current.condition.text}</p>
                                    <p><span className="font-semibold">Wind:</span> {weather.current.wind_kph} kph ({weather.current.wind_mph} mph) {weather.current.wind_dir}</p>
                                    <p><span className="font-semibold">Humidity:</span> {weather.current.humidity}%</p>
                                    <p><span className="font-semibold">Pressure:</span> {weather.current.pressure_mb} mb</p>
                                    <p><span className="font-semibold">Precipitation:</span> {weather.current.precip_mm} mm</p>
                                    <p><span className="font-semibold">Visibility:</span> {weather.current.vis_km} km</p>
                                    <p><span className="font-semibold">Feels Like:</span> {weather.current.feelslike_c}°C / {weather.current.feelslike_f}°F</p>
                                    <p><span className="font-semibold">UV Index:</span> {weather.current.uv}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-center">
                            {loading ? (
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                            ) : (
                                <p className="text-center">Loading weather data...</p>
                            )}
                        </div>
                    )}
                </div>
                <div className="flex-1 pl-4">
                    {weather && weather.location && (
                        <Map longitude={weather.location.lon} latitude={weather.location.lat} />
                    )}
                </div>
      </div>
      <div className="weather-container mt-4">
        {history.map((day, index) => (
          <div key={index} className="weather-card">
            <h2>{day.forecast.forecastday[0].date}</h2>
            <p>Max Temp: {day.forecast.forecastday[0].day.maxtemp_c}°C / {day.forecast.forecastday[0].day.maxtemp_f}°F</p>
            <p>Min Temp: {day.forecast.forecastday[0].day.mintemp_c}°C / {day.forecast.forecastday[0].day.mintemp_f}°F</p>
            <p>Condition: {day.forecast.forecastday[0].day.condition.text}</p>
            <p>Sunrise: {day.forecast.forecastday[0].astro.sunrise}</p>
            <p>Sunset: {day.forecast.forecastday[0].astro.sunset}</p>
            <img src={day.forecast.forecastday[0].day.condition.icon} alt={day.forecast.forecastday[0].day.condition.text} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Weather;
