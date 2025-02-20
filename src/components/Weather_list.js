import React from 'react';

const WeatherList = ({ selected }) => {
  return (
    <div data-testid="my-weather-list">
      {selected.map((city) => (
        <div key={`${city.lat}-${city.lon}`}>{city.name}</div>
      ))}
    </div>
  );
}

export default WeatherList;