// App.js
import React from 'react';
import WeatherApp from './Components/WeatherApp';
import MarineWeather from './Components/marineWeather';
import Wind from './Components/Wind';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import MarineWeather from './Components/marineWeather';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WeatherApp />}/>
        <Route path="wind" element={<Wind />}/>
        <Route path="waves" element={<MarineWeather />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
