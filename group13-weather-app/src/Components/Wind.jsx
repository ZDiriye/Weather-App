//Anything imported here is required for the page to work - leaflet is for the map
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


import "./Wind.css";
import wind from "./Assets/Wind.png";
import location from "./Assets/location.png";
import waves from "./Assets/Waves.png";


const Wind = () => {
  // State variables to store wind data and CSS class for styling
  const [windData, setWindData] = useState(null);
  const [cssClass, setCSSClass] = useState('windweather-containerNight');
  
  // Extract city, latitude, and longitude from location state
  const {state} = useLocation();
  const city = state[0];
  const lat = state[1];
  const lon = state[2];


  // Function to fetch wind data from API
  const fetchData = async () => {
    try{
      // Fetch geocoding data to get latitude and longitude
      const response = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`);
      // Fetch wind forecast data based on latitude and longitude
      const response2 = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${response.data.results[0].latitude}&longitude=${response.data.results[0].longitude}&current_weather=true&hourly=windspeed_10m`);
      // Set wind data state
      setWindData(response2.data);
    }
    catch(error){
      console.error(error);
    }
  };

  // Fetch wind data on component mount
  useEffect(() => {
  fetchData();

    //Gets the current date and hour
  let currentDate = new Date();
  let currentHour = currentDate.getHours();


  console.log(currentHour);

  // Determine day or night to set CSS class for styling
  if(currentHour >= 7 && currentHour <= 19){
    setCSSClass('windweather-containerDay');
  }
  else{
    setCSSClass('windweather-containerNight');
  }


  // Create Leaflet map instance and fetch wind map tiles
  const coordinates = [lat,lon];
  const extendAmount = 1.5;
  const mapInstance = L.map('map', {
    zoomControl: false, // Disable zoom control
    dragging: false, // Disable dragging
  }).setView(coordinates, 10);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?lang=en', {
    attribution: '',
  }).addTo(mapInstance);
  
  // Function to fetch wind map tiles
  const fetchWindMapTiles = async () => {
    const apiKey = '2cc31d01c769fda3dbadec4c1b5f8185';
    // Custom tile layer URL
    const url = `http://maps.openweathermap.org/maps/2.0/weather/WND/{z}/{x}/{y}?date=1552861800&appid=${apiKey}`;
    L.tileLayer(url, {
      tms: true,
      opacity: 0.35,
    }).addTo(mapInstance);
    // Calculate the extended bounds
    const extendedBounds = [
      [coordinates[0] - extendAmount, coordinates[1] - extendAmount], // Lower left corner
      [coordinates[0] + extendAmount, coordinates[1] + extendAmount], // Upper right corner
    ];
    // Create the bounding box
    const bounds = L.latLngBounds(extendedBounds);
    // Fit the map to the extended bounds
    mapInstance.fitBounds(bounds);
  };
  // Add a icon marker at the specified location
  const map_icon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    shadowSize: [41, 41],
  });
  L.marker(coordinates, { icon: map_icon }).addTo(mapInstance);
  fetchWindMapTiles();
  return () => {
    mapInstance.remove();
  };


  }, []);




  const locationName = city;


  //Wind data collected from the API and if the data is not available yet, a holding value of 'Loading' is used

  const currentHour = new Date().getHours();
  const hourlyForecast = [
  { time: "Now", speed: windData ? windData.current_weather.windspeed : "Loading" },
  { time: `${(currentHour + 1) % 24}:00`, speed: windData ? windData.hourly.windspeed_10m[(currentHour + 1) % 24] : "Loading" },
  { time: `${(currentHour + 2) % 24}:00`, speed: windData ? windData.hourly.windspeed_10m[(currentHour + 2) % 24] : "Loading" },
  { time: `${(currentHour + 3) % 24}:00`, speed: windData ? windData.hourly.windspeed_10m[(currentHour + 3) % 24] : "Loading" },
  { time: `${(currentHour + 4) % 24}:00`, speed: windData ? windData.hourly.windspeed_10m[(currentHour + 4) % 24] : "Loading" },
  { time: `${(currentHour + 5) % 24}:00`, speed: windData ? windData.hourly.windspeed_10m[(currentHour + 5) % 24] : "Loading" },
  ];


  //HTML returned with all elements required to be rendered on the page
  return (
  <div className={cssClass}>
      <header className="windlocation-heading">
        <h1>{locationName}</h1>
      </header>

      <section className="windcurrent-weather-container">
        <div className='windspeed'>
            <div className="speed">{windData ? windData.current_weather.windspeed : "Loading"} m/s</div>
        </div>
      </section>


      <div className="map-container">
          <div id="map" style={{ height: "10rem", width: "100%"}}>
          </div>
      </div>


     


      <section className="windhourly-forecast-container">
        {hourlyForecast.map((hour, index) => (
          <div key={index} className="windhourly-forecast-item">
            <div className="windhourly-time">{hour.time}</div>
            <img src={wind} alt="Wind icon" className="wind-icon" />
            <div className="windhourly-speed">{hour.speed} m/s</div>
          </div>
        ))}
      </section>


      <nav className="windnavigation-bar">


          <Link to="/wind" state={[city, lat, lon]}><img src={wind} alt="Wind" className="nav-icon" /></Link>
          <Link to="/"><img src={location} alt="Locations" className="nav-icon" /></Link>
          <Link to="/waves" state={[city, lat, lon]}><img src={waves} alt="Waves" className="nav-icon" /></Link>


      </nav>
  </div>
  );


  };




  export default Wind;
