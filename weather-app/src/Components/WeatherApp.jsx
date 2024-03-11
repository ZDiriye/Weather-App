//test comment

import React from 'react';
import "../Components/WeatherApp.css";
import clearNight from "./Assets/Clear-night.png";
import partlycloudyNight from "./Assets/Partly-cloudy-night.png";
import wind from "./Assets/Wind.png";
import location from "./Assets/location.png";
import waves from "./Assets/Waves.png";
import mapImage from "./Assets/mapImage.png";

const WeatherApp = () => {
  const locationName = "London"; // Repla ce with dynamic location data
  // Dummy hourly forecast data
  const hourlyForecast = [
    { time: 'Now', icon: clearNight, temp: '10°' },
    { time: '22:00', icon: clearNight, temp: '10°' },
    { time: '23:00', icon: clearNight, temp: '9°' },
    { time: '00:00', icon: clearNight, temp: '9°' },
    { time: '01:00', icon: partlycloudyNight , temp: '7°' },
    { time: '02:00', icon: partlycloudyNight , temp: '7°' },
    { time: '03:00', icon: partlycloudyNight , temp: '6°' },
    { time: '04:00', icon: partlycloudyNight , temp: '6°' },
    // Add more forecast data as needed
  ];

  const currentWeather = {
    temp: '10°',
    high: '18°',
    low: '9°',
    windSpeed: '11 MPH',
    windGusts: '24 MPH',
  };

  return (
    <div className="weather-container">
      <div className="location-heading">
        <h1>{locationName}</h1>
      </div>
      <div className="current-weather-container">
        <div className="temperature">{currentWeather.temp}</div>
        <div className="high-low">
          <span className="high">H: {currentWeather.high}</span>
          <span className="low">L: {currentWeather.low}</span>
        </div>
        <div className="wind-container">
          <div className="wind-speed">
            <img src={wind} alt="Wind Speed Icon" className="weather-icon" />
            <span>{currentWeather.windSpeed} - Wind</span>
          </div>
          <div className="wind-gusts">
            <img src={wind} alt="Wind Gusts Icon" className="weather-icon" />
            <span>{currentWeather.windGusts} - Gusts</span>
          </div>
        </div>
      </div>
      <div className="hourly-forecast-container">
        {hourlyForecast.map((hour, index) => (
          <div key={index} className="hourly-forecast-item">
            <img src={hour.icon} alt="Weather icon" className="weather-icon" />
            <div className="hourly-time">{hour.time}</div>
            <div className="hourly-temp">{hour.temp}</div>
          </div>
        ))}
      </div>

      <div className="map-container">
        <img src={mapImage} alt="Wind Map" className="wind-map" />
      </div>
    

      <div className="navigation-bar">
        <a href="#Wind" className="nav-item">
          <img src={wind} alt="Wind" className="nav-icon" />
        </a>
        <a href="#Locations" className="nav-item">
          <img src={location} alt="Locations" className="nav-icon" />
        </a>
        <a href="#Waves" className="nav-item">
          <img src={waves} alt="Waves" className="nav-icon" />
        </a>
      </div>
    </div>
  );
};

export default WeatherApp;
