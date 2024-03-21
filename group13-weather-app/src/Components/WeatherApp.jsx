import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./WeatherApp.css";
import wind from "./Assets/Wind.png";
import compass from "./Assets/Compass.png";
import location from "./Assets/location.png";
import waves from "./Assets/Waves.png";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";


const WeatherApp = () => {
  // State variables
  const [weatherData, setWeatherData] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [city, setCity] = useState('Cape Town'); // Initialise city as a state variable
  const [searchInput, setSearchInput] = useState(''); // State for handling search input
  const apiKey = '2cc31d01c769fda3dbadec4c1b5f8185';
  const [CSSclass, setCSSclass] = useState('weather-container-day');

  
  useEffect(() => {
    // Fetch weather data and forecast
    const fetchData = async () => {
      try {
        // Fetch current weather data
        const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        setWeatherData(weatherResponse.data);

        // Fetch hourly forecast data
        const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`);
        const hourlyData = forecastResponse.data.list.slice(0, 5).map(hour => ({
          time: hour.dt_txt.substr(11, 5),
          temp: hour.main.temp,
          icon: `https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`
        }));
        setHourlyForecast(hourlyData);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    //gets current date and hour 
    let currentDate = new Date();
    let currentHour = currentDate.getHours();


    console.log(currentHour);

    // Determine CSS class based on time of day - day for 7am to 7pm
    if(currentHour >= 7 && currentHour <= 19){
      setCSSclass('weather-container-day');
    }
    else{
      setCSSclass('weather-container-night');
    }


    fetchData();
  }, [apiKey, city]); // Depend on city to refetch data when it changes

  // Handle search input change
  const handleSearch = (e) => {
    e.preventDefault(); // Prevent the default form submit action
    setCity(searchInput); // Update the city state with the user's input
  };

  // Map options for Google Maps
  const mapOptions = { gestureHandling: 'greedy', disableDefaultUI: true };

  // Render weather app UI
  return (
      <div className={CSSclass}>
        <div className='searchBar'>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search for a coastal city or location..."
          />
          <button type="submit">Search</button>
        </form>
        </div>
        {weatherData && (
          <>
            <div className="location-heading">
              <h1>{weatherData.name}</h1>
            </div>
            <div className="current-weather-container">
              <div className="temperature">{Math.round(weatherData.main.temp)}°</div>
              <div className="high-low">
                <span className="high">H: {Math.round(weatherData.main.temp_max)}° </span>
                <span className="low">L: {Math.round(weatherData.main.temp_min)}°</span>
              </div>
              <div className="wind-container">
                <div className="wind-speed">
                  <img src={wind} alt="Wind Speed Icon" className="weather-icon" />
                  <span>{Math.round(weatherData.wind.speed)} MPH - Wind</span>
                </div>
                <div className="wind-directions">
                  <img src={compass} alt="Wind Directions Icon" className="weather-icon" />
                  <span>{Math.round(weatherData.wind.deg)}° - Wind Direction</span>
                </div>
              </div>
            </div>
            <div className="hourly-forecast-container">
              {hourlyForecast.map((hour, index) => (
                <div key={index} className="hourly-forecast-item">
                  <img src={hour.icon} alt="Weather icon" className="weather-icon" />
                  <div className="hourly-time">{hour.time}</div>
                  <div className="hourly-temp">{Math.round(hour.temp)}°</div>
                </div>
              ))}
            </div>
            <div className="map-container">
              <APIProvider apiKey="AIzaSyAQYXfm7jX465oOttf8Jag3l0-neDoBnw4">
                <div style={{ height: "10rem", width: "100%"}}>
                  <Map options={mapOptions} zoom={9} center={{ lat: weatherData.coord.lat, lng: weatherData.coord.lon }}>
                    <Marker position={{ lat: weatherData.coord.lat, lng: weatherData.coord.lon }} />
                  </Map>
                </div>
              </APIProvider>
            </div>


          </>
        )}
        <div className="navigation-bar">
            <Link to="/wind" state={[weatherData ? weatherData.name:"Cape Town", weatherData ? weatherData.coord.lat:-33.92584, weatherData ? weatherData.coord.lon:18.42322]}><img src={wind} alt="Wind" className="nav-icon" /></Link>


            <Link to="/"><img src={location} alt="Locations" className="nav-icon" /></Link>


            <Link to="/waves" state={[weatherData ? weatherData.name:"Cape Town", weatherData ? weatherData.coord.lat:-33.92584, weatherData ? weatherData.coord.lon:18.42322]}><img src={waves} alt="Waves" className="nav-icon" /></Link>


          </div>
      </div>
  );
  };


  export default WeatherApp;