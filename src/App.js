import './App.css';
import React, { useState } from 'react';
import { createMockServer } from './createMockServer';
import Search from './components/Search';
import WeatherList from './components/Weather_list';

if (process.env.NODE_ENV === 'development') {
  createMockServer();
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