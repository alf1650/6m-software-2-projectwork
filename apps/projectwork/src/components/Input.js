import React, { useState, useEffect } from 'react';
import axios from 'axios';

const iso3166 = require('iso-3166-1'); // Import iso-3166-1 library

const Input = ({ onSearch }) => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [year, setYear] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://calendarific.com/api/v2/countries', {
          params: {
            api_key: 'bec8af6c95730291984e596b210fc460f4bbacab',
          },
        });
        setCountries(response.data.response.countries);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    
    const country = iso3166.whereAlpha2(selectedCountry);
    const countryCode = country ? country.alpha2 : null;

    
    onSearch(countryCode, year);
  };

  return (
    <div>
      <h2>Search Holidays</h2>
      <form onSubmit={handleSearch}>
        <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
          <option value="">Select a country</option>
          {countries.map((country) => (
            <option key={country.country_code} value={country.country_code}>
              {country.country_name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default Input;
