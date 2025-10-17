import React, { useState } from 'react';
import './App.css';

const API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your OpenWeatherMap API key

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const getWeather = async (e) => {
    e.preventDefault();
    if (!city) return;

    try {
      setError('');
      const response = await fetch(
        https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric
      );

      if (!response.ok) {
        throw new Error('City not found');
      }

      const data = await response.json();

      const weatherData = {
        temperature: data.main.temp,
        humidity: data.main.humidity,
        condition: data.weather[0].main,
        city: data.name,
        country: data.sys.country
      };

      setWeather(weatherData);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  return (
    <div className="App">
      <h1>React Weather App</h1>
      <form onSubmit={getWeather}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-info">
          <h2>
            Weather in {weather.city}, {weather.country}
          </h2>
          <p>Temperature: {weather.temperature}°C</p>
          <p>Humidity: {weather.humidity}%</p>
          <p>Condition: {weather.condition}</p>
        </div>
      )}
    </div>
  );
}

export default App;
