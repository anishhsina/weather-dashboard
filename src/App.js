import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [unit, setUnit] = useState('metric');
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  );
  const [error, setError] = useState('');

  const apiKey = "cbde8d54de6b7e2baa9a44514c958552";
  const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

  useEffect(() => {
    if (city) {
      fetchWeather(city);
    }
  }, [city, unit]);

  const fetchWeather = async (city) => {
    try {
      const response = await axios.get(baseUrl, {
        params: {
          q: city,
          units: unit,
          appid: apiKey,
        },
      });
      setWeatherData(response.data);
      setError('');
    } catch (err) {
      setError('City not found.');
    }
  };

  const handleToggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  const handleAddFavorite = () => {
    if (city && !favorites.includes(city)) {
      const updatedFavorites = [...favorites, city];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };

  const handleSelectFavorite = (favorite) => {
    setCity(favorite);
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Weather Dashboard</h1>

      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded mb-4"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <div className="flex justify-between items-center mb-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => fetchWeather(city)}
        >
          Get Weather
        </button>
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded"
          onClick={handleToggleUnit}
        >
          Toggle {unit === 'metric' ? '°F' : '°C'}
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {weatherData && (
        <div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">{weatherData.name}</h2>
            <p>{weatherData.weather[0].description}</p>
            <div className="flex items-center">
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                alt="Weather Icon"
                className="w-12 h-12"
              />
              <div className="ml-4">
                <p className="text-2xl">
                  {weatherData.main.temp}° {unit === 'metric' ? 'C' : 'F'}
                </p>
                <p>Humidity: {weatherData.main.humidity}%</p>
                <p>Wind Speed: {weatherData.wind.speed} m/s</p>
              </div>
            </div>
          </div>

          <button
            className="px-4 py-2 bg-green-500 text-white rounded"
            onClick={handleAddFavorite}
          >
            Add to Favorites
          </button>
        </div>
      )}

      <h2 className="text-xl font-semibold mt-6">Favorites</h2>
      <div className="flex flex-wrap mt-2">
        {favorites.map((favorite, index) => (
          <button
            key={index}
            className="px-4 py-2 bg-yellow-500 text-white rounded m-2"
            onClick={() => handleSelectFavorite(favorite)}
          >
            {favorite}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WeatherApp;
