import React, { useState } from 'react';
import './Mausam.css';


const api = {
  api: "eb5cc1520986203ffe501e48aa9e4462",
  base: "https://api.openweathermap.org/data/2.5/"
};

const Mausam = () => {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.api}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  };

  const dateBuilder = (d) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const days = [
      'Sunday', 'Monday', 'Tuesday', 'Wednesday',
      'Thursday', 'Friday', 'Saturday'
    ];

    const day = days[d.getDay()];
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();

    return `${day}, ${month} ${date}, ${year}`;
  };

  return (
    <div>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyPress={search}
          />
        </div>

        {weather.main && weather.sys && (
          <div className="location-box">
            <div className="location">
              {weather.name}, {weather.sys.country}
            </div>
            <div className="date">
              {dateBuilder(new Date())}
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°C
              </div>
              <div className="weather">
                {weather.weather[0].main}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Mausam;
