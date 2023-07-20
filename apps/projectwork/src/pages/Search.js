import styles from "../css-modules/Search.module.css";
import { useState, useEffect } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import useUserState from "../store/userStateContext";
import countriesAPI from "../api/countriesAPI";

function Search() {
  const {
    username,
    countriesList,
    updateCountriesList,
    selectedCountry,
    updateCountry,
  } = useUserState();
  const [isLoading, setIsLoading] = useState("false");
  const [year, setYear] = useState("2023");
  const navigate = useNavigate();

  const API_KEYS_ARRAY = process.env.REACT_APP_API_KEY.split(" ");
  const COUNTRY_API_KEY = API_KEYS_ARRAY[0];

  useEffect(() => {
    const fetchCountries = async () => {
      setIsLoading(true);
      try {
        const response = await countriesAPI.get("/countries", {
          params: {
            api_key: COUNTRY_API_KEY,
          },
        });
        updateCountriesList(response.data.response.countries);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const countryData = countriesList.filter(
      (country) => country.country_name === e.target.value
    );
    updateCountry({ name: e.target.value, code: countryData[0]["iso-3166"] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate({
      pathname: "/results",
      search: `?${createSearchParams({
        country: selectedCountry.code,
        year: year,
      })}`,
    });
  };

  return (
    <div className={styles.form}>
      <h2>{`Hi, ${username}!`}</h2>
      <p> Where would you like to go?</p>
      <br />
      <form onSubmit={handleSubmit}>
        <label>I would like to visit: </label>
        <select
          className={styles.select}
          value={selectedCountry.name}
          onChange={handleChange}
        >
          <option value="">
            {isLoading ? "Loading..." : "Select a country"}
          </option>
          {countriesList.map((country, i) => (
            <option key={i} value={country.country_name}>
              {country.country_name}
            </option>
          ))}
        </select>
        <label> in: </label>
        <input
          className={styles.year}
          type="number"
          min="1900"
          max="2099"
          step="1"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <br />
        <br />
        <br />
        <button
          className={styles.button}
          type="submit"
          disabled={selectedCountry ? false : true}
        >
          Get me some info!
        </button>
      </form>
    </div>
  );
}

export default Search;
