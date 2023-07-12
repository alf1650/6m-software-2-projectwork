import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Results = ({ country, year }) => {
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHolidays = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://calendarific.com/api/v2/holidays', {
          params: {
            api_key: 'bec8af6c95730291984e596b210fc460f4bbacab',
            country: country,
            year: year,
          },
        });
        console.log('API Response:', response.data);
        setHolidays(response.data.response.holidays || []);
      } catch (error) {
        console.error('Error fetching holidays:', error);
        setHolidays([]); 
      }
      setLoading(false);
    };

    if (country && year) {
      fetchHolidays();
    }
  }, [country, year]);

  const handleSaveFavorite = (holiday) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const newFavorite = {
      name: holiday.name,
      date: holiday.date.iso,
    };
    const updatedFavorites = [...favorites, newFavorite];
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    console.log('Favorite saved:', newFavorite);
  };

  return (
    <div>
      <h2>Results</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h3>Holidays</h3>
          {Array.isArray(holidays) && holidays.length === 0 ? (
            <p>No holidays found.</p>
          ) : (
            <ul>
              {holidays.map((holiday) => (
                <li key={holiday.name}>
                  {holiday.date.iso} - {holiday.name}
                  <button onClick={() => handleSaveFavorite(holiday)}>Save</button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default Results;
