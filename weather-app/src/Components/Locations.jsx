// Locations.js

// Importing axios library for making HTTP requests
import axios from "axios";

// API key for accessing OpenWeatherMap API
const apiKey = "b51e45dd6bf8471084db4a98e8d6e433";

// URL to fetch weather data for a specific city
const URL = "https://api.openweathermap.org/data/2.5/weather?q=london&appid=${apiKey}";

// Function to fetch and format weather data for a given city
const getFormattedWeatherData = async (city, units) => {
  // Making GET request to OpenWeatherMap API
  const { data } = await axios.get(URL, {
    params: {
      q: city, // City name parameter
      units: units, // Units parameter (metric, imperial, etc.)
    },
  });

  // Extracting relevant weather data from API response
  const { temp, feels_like, humidity } = data.main; // Temperature, feels like temperature, and humidity
  const { description } = data.weather[0]; // Weather description
  const { speed } = data.wind; // Wind speed
  const { country, name } = data.sys; // Country code and city name

  // Returning formatted weather data
  return {
    temp,
    feels_like,
    humidity,
    description,
    speed,
    country,
    name,
  };
};

// Exporting the function for external use
export { getFormattedWeatherData };