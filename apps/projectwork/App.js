import React, { useState } from 'react';
import Login from './components/Login';
import Input from './components/Input';
import Results from './components/Results';
import Favorites from './components/Favorites';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [countryCode, setCountryCode] = useState('');
  const [year, setYear] = useState(''); const [holidays, setHolidays] = useState([]);


  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleSearch = (selectedCountryCode, selectedYear) => {
    setCountryCode(selectedCountryCode);
    setYear(selectedYear);
  };


  return (
    <div>
      {!loggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <Input onSearch={handleSearch} />
          <Results countryCode={countryCode} year={year} />
          <Favorites />
        </>
      )}
    </div>
  );
};

export default App;
