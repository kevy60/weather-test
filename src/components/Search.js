import React from 'react';

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

  return (
    <div>
      <input type="text" data-testid="search-input" onChange={inputChangeHandler} />
      <button data-testid="search-button" onClick={buttonClickHandler}>Search</button>

      <div data-testid="search-results">
        {searchResults.map((city) => (
          <div key={`${city.lat}-${city.lon}`} onClick={() => selectCity(city)}>
            {city.name}, {city.lat}, {city.lon}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;