import React, { useState } from 'react';
import axios from 'axios';
import './Meteo.css'; 

const Meteo = () => {
  const [city, setCity] = useState(''); 
  const [weatherData, setWeatherData] = useState(null); 
  const [error, setError] = useState(''); 

  const apiKey = '+++++++++++++++++'; 

  const handleSearch = async () => {
    try {
      const cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

      const cityResponse = await axios.get(cityUrl);

      setWeatherData(cityResponse.data);
      setError('');
    } catch (err) {
      setWeatherData(null);
      setError('API Error: Something went wrong!');
    }
  };

  return (
    <div className="weather-container">
      <h2 className="title">Weather Information</h2>
      <div className="search-box">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="city-input"
        />
        <button onClick={handleSearch} className="search-button">Search</button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {weatherData && (
        <div className="weather-display">
          <h3 className="city-name">Weather for {weatherData.name}, {weatherData.sys.country}</h3>
          <div className="weather-details">
            <div className="weather-icon">
              <img
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                alt={weatherData.weather[0].description}
              />
            </div>
            <div className="weather-info">
              <p>Temperature: {weatherData.main.temp} °C</p>
              <p>Feels Like: {weatherData.main.feels_like} °C</p>
              <p>Humidity: {weatherData.main.humidity} %</p>
              <p>Wind Speed: {weatherData.wind.speed} m/s</p>
              <p>Description: {weatherData.weather[0].description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Meteo;
