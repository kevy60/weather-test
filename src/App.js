import './App.css';
import React, { useState } from 'react';
import { createMockServer } from './mock/createMockServer';
import Search from './components/Search';
import WeatherCard from './components/WeatherCard';

if (process.env.NODE_ENV === 'development') {
  createMockServer();
}

const WeatherList = ({ selected }) => {
  return (
    <div data-testid="my-weather-list" className='cities-container'>
      {selected.map((city) => (
        <WeatherCard key={`${city.lat}-${city.lon}`} city={city} />
      ))}
    </div>
  );
}

function App() {
  const [query, setQuery] = useState('');
  const [searchResults, setsearchResults] = useState([]);
  const [selected, setSelected] = useState([]);

  const selectCity = (city) => {
    setSelected((prevSelected) => [city, ...prevSelected]);
  }

  return (
    <div className="App">
      <h1>Weather Application</h1>
      <Search 
        query={query} 
        setQuery={setQuery} 
        searchResults={searchResults} 
        setsearchResults={setsearchResults} 
        selectCity={selectCity} 
      />
      <WeatherList selected={selected} />
    </div>
  );
}

export default App;