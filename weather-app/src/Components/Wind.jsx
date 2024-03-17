import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';

import "./Wind.css";
import wind from "./Assets/Wind.png";
import location from "./Assets/location.png";
import waves from "./Assets/Waves.png";

const Wind = () => {

  const [windData, setWindData] = useState(null);
  const [cssClass, setCSSClass] = useState('weather-containerNight')

  const {state} = useLocation();
  const city = state; 

  const fetchData = async () => {

    // hardcoded southend-on-sea latitude and longitude
    // let apiURL = `https://api.open-meteo.com/v1/forecast?latitude=${data.results[0].latitude}&longitude=${data.results[0].longitude}&current_weather=true&hourly=windspeed_10m`;
    // try{
    //   const response = await axios.get(apiURL);
    //   setWindData(response.data)
    //   console.log(response.data); 
    // }

    // catch (error) { 
    //   console.error(error);
    // }

    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`)
      .then(apiResponse => apiResponse.json())
      .then(data => 
            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${data.results[0].latitude}&longitude=${data.results[0].longitude}&current_weather=true&hourly=windspeed_10m`)
            .then(response => response.json())
            .then(data2 => setWindData(data2))
            .catch(error => console.error(error)))

      .catch(error => console.error(error));

  };

  
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


  // same as marineWeather.jsx - Should this be a global variable?
  const locationName = city;


  const currentHour = new Date().getHours();
  
  const hourlyForecast = [
    { time: "Now", speed: windData ? windData.current_weather.windspeed : "Loading" },
    { time: `${(currentHour + 1) % 24}:00`, speed: windData ? windData.hourly.windspeed_10m[(currentHour + 1) % 24] : "Loading" },
    { time: `${(currentHour + 2) % 24}:00`, speed: windData ? windData.hourly.windspeed_10m[(currentHour + 2) % 24] : "Loading" },
    { time: `${(currentHour + 3) % 24}:00`, speed: windData ? windData.hourly.windspeed_10m[(currentHour + 3) % 24] : "Loading" },
    { time: `${(currentHour + 4) % 24}:00`, speed: windData ? windData.hourly.windspeed_10m[(currentHour + 4) % 24] : "Loading" },
    { time: `${(currentHour + 5) % 24}:00`, speed: windData ? windData.hourly.windspeed_10m[(currentHour + 5) % 24] : "Loading" },
    // Add more forecast data as needed
  ];

  return (
    <div className={cssClass}>
        <header className="marinelocation-heading">
          <h1>{locationName}</h1>
        </header>

        <section className="marinecurrent-weather-container">
          <div className='wave-and-height'>
              <img src={wind} alt="Wind icon" className="wave-heading-icon" />
              <div className="speed">{windData ? windData.current_weather.windspeed : "Loading"} m/s</div>
          </div>
        </section>

        <section className="marinehourly-forecast-container">
          {hourlyForecast.map((hour, index) => (
            <div key={index} className="marinehourly-forecast-item">
              <div className="marinehourly-time">{hour.time}</div>
              <img src={wind} alt="Wind icon" className="wave-icon" />
              <div className="marinehourly-speed">{hour.speed} m/s</div>
            </div>
          ))}
        </section>

        <nav className="marinenavigation-bar">

            <Link to="/wind" state={city}><img src={wind} alt="Wind" className="nav-icon" /></Link>


            <Link to="/"><img src={location} alt="Locations" className="nav-icon" /></Link>


            <Link to="/waves" state={city}><img src={waves} alt="Waves" className="nav-icon" /></Link>

        </nav>
    </div>
  );

};


export default Wind;