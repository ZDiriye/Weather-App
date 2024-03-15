import axios from "axios";

const apiKey = 'apikey';
const URL = 'url for api or whatever used';

const getFormattedWeatherData = async (city, units) => {
  const { data } = await axios.get('${apiUrl}/weather', {
    params: {
      q: city,
      units: units,
      appid: apiKey,
    },
  });

  const { temp, feels_like, humidity } = data.main;
  const { wind_speed } = data.wind;
  const { country, name } = data.sys;

  return {
    temp,
    feels_like,
    humidity,
    wind_speed,
    country,
    name,
  };
};

export { getFormattedWeatherData };