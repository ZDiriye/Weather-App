
// fetch(`https://marine-api.open-meteo.com/v1/marine?latitude=54.544587&longitude=10.227487&hourly=wave_height,swell_wave_height&daily=wave_height_max,swell_wave_height_max&timezone=auto`, {
  
// }).then((response) => response.json()).then((jsonData) => {
//     console.log(jsonData)
  
// });



import axios from 'axios';
import React from 'react';

import "./marineWeather.css";
import wind from "./Assets/Wind.png";
import location from "./Assets/location.png";
import waves from "./Assets/Waves.png";
import bigWave from "./Assets/wave.png";
import seaWavesThree from "./Assets/Sea Waves.png"
import seaWavesTwo from "./Assets/Sea Waves less.png"
import swell from "./Assets/Swell.png";

const MarineWeather = () => {

    const fetchData = async () => {

        const response = {};
    
        try {
            const response = await axios.get( `https://marine-api.open-meteo.com/v1/marine?latitude=54.544587&longitude=10.227487&current=wave_height,wave_direction,swell_wave_height&hourly=wave_height,swell_wave_height&forecast_hours=6`
            );
            console.log(response.data); //You can see all the weather data in console log
            // console.log(response.data["daily"]["wave_height_max"][0], "m")
            // apiResults = (response.data["daily"]["wave_height_max"][0], "m")
        } 
        catch (error) { 
            console.error(error);
        }
    
        return response
    };

    fetchData();

    const locationName = "London"; // Replace with dynamic location data
  // Dummy hourly forecast data
  const hourlyForecast = [
    { time: 'Now', icon: bigWave, height: '1.76 m' },
    { time: '22:00', icon: bigWave, height: '1.70 m' },
    { time: '23:00', icon: seaWavesThree, height: '1.50 m' },
    { time: '00:00', icon: seaWavesTwo, height: '1.20 m' },
    { time: '01:00', icon: seaWavesTwo, height: '1.15 m' },
    // Add more forecast data as needed
  ];

  const swellForecast = [
    { time: 'Now', height: '0.1 m' },
    { time: '22:00', height: '0.2 m' },
    { time: '23:00', height: '0.1 m' },
    { time: '00:00', height: '0.15 m' },
    { time: '01:00', height: '0.15 m' },
    // Add more forecast data as needed
  ];

  const currentWeather = {
    height: '1.76 m',
    direction: '87°',
  };

  const currentSwell = {
    swellHeight: '1.76 m',
  };

  return (
    <div className="weather-container">
      <div className="location-heading">
        <h1>{locationName}</h1>
      </div>
      <div className="current-weather-container">
        <div className='wave-and-height'>
            <img src={bigWave} alt="Waves icon" className="wave-heading-icon" />
            <div className="height">{currentWeather.height}</div>
        </div>
        <div className="direction-div">
          <span className="direction">Direction: {currentWeather.direction}</span>
        </div>
      </div>
      <div className="hourly-forecast-container">
        {hourlyForecast.map((hour, index) => (
          <div key={index} className="hourly-forecast-item">
            <div className="hourly-time">{hour.time}</div>
            <img src={hour.icon} alt="Wave icon" className="wave-icon" />
            
            <div className="hourly-hight">{hour.height}</div>
          </div>
        ))}
      </div>

      <div className="swell-container">
        <div className='swell-heading'>
            <img src={swell} alt="Swell icon" className="swell-icon" />
            <h2 className='swell-title'>Swell</h2>
        </div>
        
        <div className='swellHeight'>{currentSwell.swellHeight}</div>

        <div className="hourly-forecast-container">
        {swellForecast.map((hour, index) => (
          <div key={index} className="hourly-forecast-item">
            <div className="hourly-time">{hour.time}</div>
            
            <div className="hourly-swell">{hour.height}</div>
          </div>
        ))}
      </div>

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

export default MarineWeather;