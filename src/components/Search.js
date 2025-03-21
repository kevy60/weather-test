import React from 'react';
import './Search.css';

const Search = ({ query, setQuery, searchResults, setsearchResults, selectCity }) => {
  const inputChangeHandler = (event) => {
    setQuery(event.target.value);
  }

  const buttonClickHandler = async () => {
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5`)
      .then((result) => {
        return result.json();
      })
      .then((cities) => {
        setsearchResults(cities.map((city) => ({
          name: city.name,
          country: city.country,
          lat: city.lat,
          lon: city.lon
        })))
      })
  }

  const onSelect = (city) => {
    selectCity(city);
    setsearchResults([])
  }

  return (
    <div className='search-conatiner'>
        <div className='input-container'>
      <input type="text" data-testid="search-input" onChange={inputChangeHandler} />
      <button data-testid="search-button" onClick={buttonClickHandler}>Search</button>
    </div>
    
    {
      searchResults.length > 0 && 
      <div data-testid="search-results" className="search-results">
        {searchResults.map((city) => (
          <div className="search-result" key={`${city.lat}-${city.lon}`} onClick={() => onSelect(city)}>
            <span className="city-name">{city.name}</span>
            <span className="city-location">{city.lat}, {city.lon}</span>
          </div>
        ))}
      </div>
    }
    </div>
  );
}

export default Search;