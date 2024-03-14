//Imports requried for the page to work
//Includes axios, react, css files and images used on the page
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

import "./marineWeather.css";
import wind from "./Assets/Wind.png";
import location from "./Assets/location.png";
import waves from "./Assets/Waves.png";
import bigWave from "./Assets/wave.png";
import seaWavesThree from "./Assets/Sea Waves.png";
import seaWavesTwo from "./Assets/Sea Waves less.png";
import seaWavesOne from "./Assets/Sea Waves single.png";
import swell from "./Assets/Swell.png";

const MarineWeather = () => {

  //Used to store the data from the API call to use outside of fetchData
  const [marineWeatherData, setMarineWeatherData] = useState(null);
  //State for the CSS class
  const [cssClass, setCSSClass] = useState('weather-containerNight')

  //Gets the marine weather data from the API
  //Used the example code given on QM+
  const fetchData = async () => {

    let apiURL = `https://marine-api.open-meteo.com/v1/marine?latitude=51.5378&longitude=0.7143&current=wave_height,wave_direction,swell_wave_height&hourly=wave_height,swell_wave_height&forecast_hours=6`;
    try{
      const response = await axios.get(apiURL);
      setMarineWeatherData(response.data)
      console.log(response.data); 
    }

    catch (error) { 
      console.error(error);
    }

  };

  //Manages the calling of fetchData, to ensure it doesn't call too many times
  //Also switches the CSS class based on the current time
  useEffect(() => {
    fetchData(); 

    let currentDate = new Date();
    let currentHour = currentDate.getHours();

    console.log(currentHour);

    if(currentHour >= 7 && currentHour <= 19){
      setCSSClass('marineweather-containerDay')
    }
    else{
      setCSSClass('marineweather-containerNight')
    }

  }, []);

  //Changes the image displayed for the waves based on the height
  //Used the Douglas scale for reference
  function chooseWaveImg(height){
    if(height !== "Loading"){
      //High Wave and above
      if(height >= 6){
        return bigWave;
      }
      //rough
      else if(height < 6 && height > 2.5){
        return seaWavesThree;
      }
      //moderate
      else if(height < 2.5 && height > 1.25){
        return seaWavesTwo;
      }
      //slight and calm
      else{
        return seaWavesOne;
      }
      //Need more wave images for calm waves
    }
    else{
      return "Loading";
    }

  }
    

  const locationName = "Southend-On-Sea"; // Replace with dynamic location data

  // Hourly forecast data from the marine API
  // Has a holding value of Loading until the API call is done, otherwise the marineWeatherData is null and the page doesn't render
  const hourlyForecast = [
    { time: "Now", icon: chooseWaveImg(marineWeatherData ? marineWeatherData.hourly.wave_height[0]:"Loading"), height: marineWeatherData ? marineWeatherData.hourly.wave_height[0]:"Loading"},
    { time: marineWeatherData ? marineWeatherData.hourly.time[1].slice(11, 16) : "Loading", icon: chooseWaveImg(marineWeatherData ? marineWeatherData.hourly.wave_height[1]:"Loading"), height: marineWeatherData ? marineWeatherData.hourly.wave_height[1]: "Loading"},
    { time: marineWeatherData ? marineWeatherData.hourly.time[2].slice(11, 16): "Loading", icon: chooseWaveImg(marineWeatherData ? marineWeatherData.hourly.wave_height[2]:"Loading"), height: marineWeatherData ? marineWeatherData.hourly.wave_height[2]: "Loading"},
    { time: marineWeatherData ? marineWeatherData.hourly.time[3].slice(11, 16): "Loading", icon: chooseWaveImg(marineWeatherData ? marineWeatherData.hourly.wave_height[3]:"Loading"), height: marineWeatherData ? marineWeatherData.hourly.wave_height[3]: "Loading"},
    { time: marineWeatherData ? marineWeatherData.hourly.time[4].slice(11, 16): "Loading", icon: chooseWaveImg(marineWeatherData ? marineWeatherData.hourly.wave_height[4]:"Loading"), height: marineWeatherData ? marineWeatherData.hourly.wave_height[4]: "Loading"},
    { time: marineWeatherData ? marineWeatherData.hourly.time[5].slice(11, 16): "Loading", icon: chooseWaveImg(marineWeatherData ? marineWeatherData.hourly.wave_height[5]:"Loading"), height: marineWeatherData ? marineWeatherData.hourly.wave_height[5]: "Loading"},
    // Add more forecast data as needed
  ];

  // Hourly swell forecast data from the marine API
  // Has a holding value of Loading until the API call is done, otherwise the marineWeatherData is null and the page doesn't render
  const swellForecast = [
    { time: 'Now', height: marineWeatherData ? marineWeatherData.hourly.swell_wave_height[0]: "Loading"},
    { time: marineWeatherData ? marineWeatherData.hourly.time[1].slice(11, 16): "Loading", height: marineWeatherData ? marineWeatherData.hourly.swell_wave_height[1]: "Loading"},
    { time: marineWeatherData ? marineWeatherData.hourly.time[2].slice(11, 16): "Loading", height: marineWeatherData ? marineWeatherData.hourly.swell_wave_height[2]: "Loading"},
    { time: marineWeatherData ? marineWeatherData.hourly.time[3].slice(11, 16): "Loading", height: marineWeatherData ? marineWeatherData.hourly.swell_wave_height[3]: "Loading"},
    { time: marineWeatherData ? marineWeatherData.hourly.time[4].slice(11, 16): "Loading", height: marineWeatherData ? marineWeatherData.hourly.swell_wave_height[4]: "Loading"},
    { time: marineWeatherData ? marineWeatherData.hourly.time[5].slice(11, 16): "Loading", height: marineWeatherData ? marineWeatherData.hourly.swell_wave_height[5]: "Loading"},
    // Add more forecast data as needed
  ];

  // Current weather data for the location
  // Has a holding value of Loading until the API call is done, otherwise the marineWeatherData is null and the page doesn't render
  const currentWeather = {
    height: marineWeatherData ? marineWeatherData.current.wave_height : "Loading",
    direction: marineWeatherData ? marineWeatherData.current.wave_direction : "Loading",
  };

  // Current weather data for the location
  // Has a holding value of Loading until the API call is done, otherwise the marineWeatherData is null and the page doesn't render
  const currentSwell = {
    swellHeight: marineWeatherData ? marineWeatherData.current.swell_wave_height : "Loading",
  };

  // HTML page returned with the weather data inside
  return (
    <div className={cssClass}>
        <header className="marinelocation-heading">
          <h1>{locationName}</h1>
        </header>

        <section className="marinecurrent-weather-container">
          <div className='wave-and-height'>
              <img src={bigWave} alt="Waves icon" className="wave-heading-icon" />
              
                <div className="height">{currentWeather.height} m</div>
          </div>
          <div className="direction-div">
            <span className="direction">Direction: {currentWeather.direction} °</span>
          </div>
        </section>

        <section className="marinehourly-forecast-container">
          {hourlyForecast.map((hour, index) => (
            <div key={index} className="marinehourly-forecast-item">
              <div className="marinehourly-time">{hour.time}</div>
              <img src={hour.icon} alt="Wave icon" className="wave-icon" />
              
              <div className="marinehourly-hight">{hour.height} m</div>
            </div>
          ))}
        </section>

        <section className="swell-container">
          <div className='swell-heading'>
              <img src={swell} alt="Swell icon" className="swell-icon" />
              <h2 className='swell-title'>Swell</h2>
          </div>
          
          <div className='swellHeight'>{currentSwell.swellHeight} m</div>

          <div className="marinehourly-forecast-container">
            {swellForecast.map((hour, index) => (
              <div key={index} className="marinehourly-forecast-item">
                <div className="marinehourly-time">{hour.time}</div>
                
                <div className="marinehourly-swell">{hour.height} m</div>
              </div>
            ))}
          </div>
        </section>
      

        <nav className="marinenavigation-bar">

            <Link to="/wind"><img src={wind} alt="Wind" className="nav-icon" /></Link>


            <Link to="/"><img src={location} alt="Locations" className="nav-icon" /></Link>


            <Link to="/waves"><img src={waves} alt="Waves" className="nav-icon" /></Link>

        </nav>
    </div>
  );

};


export default MarineWeather;