//Imports requried for the page to work
//Includes axios, react, react-router-dom, css files and images used on the page
import React, {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';

import axios from 'axios';
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
  const [cssClass, setCSSClass] = useState('marineweather-containerDay');

  //Get the state of another page through the links and set it to variable city
  const {state} = useLocation();
  const city = state; 

  console.log(city)

  //Gets the marine weather data from the API
  const fetchData = async () => {

    //Fetches the latitude and longitude from the api based on the textual location using a geocoding api
    //The latitude and longitude obtained is then used in a new api call to get the marine weather 

    try{
      const response = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`);
      const response2 = await axios.get(`https://marine-api.open-meteo.com/v1/marine?latitude=${response.data.results[0].latitude}&longitude=${response.data.results[0].longitude}&current=wave_height,wave_direction,swell_wave_height&hourly=wave_height,swell_wave_height&forecast_hours=6`);
      setMarineWeatherData(response2.data);
    }
    catch(error){
      console.error(error);
    }

    // fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`)
    //   .then(apiResponse => apiResponse.json())
    //   .then(data => 
    //         fetch(`https://marine-api.open-meteo.com/v1/marine?latitude=${data.results[0].latitude}&longitude=${data.results[0].longitude}&current=wave_height,wave_direction,swell_wave_height&hourly=wave_height,swell_wave_height&forecast_hours=6`)
    //         .then(response => response.json())
    //         .then(data2 => setMarineWeatherData(data2))
    //         .catch((error) => {console.log(error)}))

    //   .catch(error => console.error(error));
  };


  //Manages the calling of fetchData, to ensure it doesn't call too many times
  //Also switches the CSS class based on the current time
  useEffect(() => {

    //Gets the current date and time
    let currentDate = new Date();
    let currentHour = currentDate.getHours();

    console.log(currentHour);

    //Between the hours of 7am and 7pm, it will show the day background
    if(currentHour >= 7 && currentHour <= 19){
      setCSSClass('marineweather-containerDay')
    }
    //If between 7pm and 7am show the night background
    else{
      setCSSClass('marineweather-containerNight')
    }
    
    // Call to fetch api data
    fetchData(); 

  }, []);

  //Changes the image displayed for the waves based on the height
  //Used the Douglas scale for reference
  function chooseWaveImg(height){
    if(height !== "Not a valid location"){
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
    }
    //returns blank image
    else{
      return "";
    }

  }
    
  // The location name is set with the name of the city/location searched by the user
  const locationName = city; 

  //For all below - Not a valid location is also used as error handling for if the location is not available for the marine API e.g. if they searched London and there's no waves in London!

  // Hourly forecast data from the marine API
  // Has a holding value of Not a valid location until the API call is done, otherwise the marineWeatherData is null and the page doesn't render
  const hourlyForecast = [
    { time: "Now", icon: chooseWaveImg(marineWeatherData ? marineWeatherData.hourly.wave_height[0]:"Not a valid location"), height: marineWeatherData ? marineWeatherData.hourly.wave_height[0]:"Not a valid location"},
    { time: marineWeatherData ? marineWeatherData.hourly.time[1].slice(11, 16) : "Not a valid location", icon: chooseWaveImg(marineWeatherData ? marineWeatherData.hourly.wave_height[1]:"Not a valid location"), height: marineWeatherData ? marineWeatherData.hourly.wave_height[1]: "Not a valid location"},
    { time: marineWeatherData ? marineWeatherData.hourly.time[2].slice(11, 16): "Not a valid location", icon: chooseWaveImg(marineWeatherData ? marineWeatherData.hourly.wave_height[2]:"Not a valid location"), height: marineWeatherData ? marineWeatherData.hourly.wave_height[2]: "Not a valid location"},
    { time: marineWeatherData ? marineWeatherData.hourly.time[3].slice(11, 16): "Not a valid location", icon: chooseWaveImg(marineWeatherData ? marineWeatherData.hourly.wave_height[3]:"Not a valid location"), height: marineWeatherData ? marineWeatherData.hourly.wave_height[3]: "Not a valid location"},
    { time: marineWeatherData ? marineWeatherData.hourly.time[4].slice(11, 16): "Not a valid location", icon: chooseWaveImg(marineWeatherData ? marineWeatherData.hourly.wave_height[4]:"Not a valid location"), height: marineWeatherData ? marineWeatherData.hourly.wave_height[4]: "Not a valid location"},
    { time: marineWeatherData ? marineWeatherData.hourly.time[5].slice(11, 16): "Not a valid location", icon: chooseWaveImg(marineWeatherData ? marineWeatherData.hourly.wave_height[5]:"Not a valid location"), height: marineWeatherData ? marineWeatherData.hourly.wave_height[5]: "Not a valid location"},
    // Add more forecast data as needed
  ];

  // Hourly swell forecast data from the marine API
  // Has a holding value of Not a valid location until the API call is done, otherwise the marineWeatherData is null and the page doesn't render
  const swellForecast = [
    { time: 'Now', height: marineWeatherData ? marineWeatherData.hourly.swell_wave_height[0]: "Not a valid location"},
    { time: marineWeatherData ? marineWeatherData.hourly.time[1].slice(11, 16): "Not a valid location", height: marineWeatherData ? marineWeatherData.hourly.swell_wave_height[1]: "Not a valid location"},
    { time: marineWeatherData ? marineWeatherData.hourly.time[2].slice(11, 16): "Not a valid location", height: marineWeatherData ? marineWeatherData.hourly.swell_wave_height[2]: "Not a valid location"},
    { time: marineWeatherData ? marineWeatherData.hourly.time[3].slice(11, 16): "Not a valid location", height: marineWeatherData ? marineWeatherData.hourly.swell_wave_height[3]: "Not a valid location"},
    { time: marineWeatherData ? marineWeatherData.hourly.time[4].slice(11, 16): "Not a valid location", height: marineWeatherData ? marineWeatherData.hourly.swell_wave_height[4]: "Not a valid location"},
    { time: marineWeatherData ? marineWeatherData.hourly.time[5].slice(11, 16): "Not a valid location", height: marineWeatherData ? marineWeatherData.hourly.swell_wave_height[5]: "Not a valid location"},
    // Add more forecast data as needed
  ];

  // Current weather data for the location
  // Has a holding value of Not a valid location until the API call is done, otherwise the marineWeatherData is null and the page doesn't render
  const currentWeather = {
    height: marineWeatherData ? marineWeatherData.current.wave_height : "Not a valid location",
    direction: marineWeatherData ? marineWeatherData.current.wave_direction : "Not a valid location",
  };

  // Current weather data for the location
  // Has a holding value of Not a valid location until the API call is done, otherwise the marineWeatherData is null and the page doesn't render
  const currentSwell = {
    swellHeight: marineWeatherData ? marineWeatherData.current.swell_wave_height : "Not a valid location",
  };

  // HTML page returned with the weather data inside
  // Contains the links to the other pages in the nav element at the bottom
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
              <img src={hour.icon} alt="Wave icon" className="wave-icon" />
              <div className="marinehourly-time">{hour.time}</div>
              <div className="marinehourly-height">{hour.height} m</div>
            </div>
          ))}
        </section>

        <section className="swell-container">
          <div className='swell-heading'>
              <img src={swell} alt="Swell icon" className="swell-icon" />
              <h2 className='swell-title'>Swell</h2>
          </div>
          
          <div className='swellHeight'>{currentSwell.swellHeight} m</div>

          <div className="marine-swell-hourly-forecast-container">
            {swellForecast.map((hour, index) => (
              <div key={index} className="marinehourly-forecast-item">
                <div className="marinehourly-time">{hour.time}</div>
                
                <div className="marinehourly-height">{hour.height} m</div>
              </div>
            ))}
          </div>
        </section>
      

        <nav className="marinenavigation-bar">

            <Link to="/wind" state={city}><img src={wind} alt="Wind" className="nav-icon" /></Link>


            <Link to="/"><img src={location} alt="Locations" className="nav-icon" /></Link>


            <Link to="/waves" state={city}><img src={waves} alt="Waves" className="nav-icon" /></Link>

        </nav>
    </div>
  );

};


export default MarineWeather;