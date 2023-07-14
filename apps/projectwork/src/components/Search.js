import { useState, useEffect } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import styles from "./Search.module.css";
import axios from "axios";

const iso3166 = require("iso-3166-1");

function Search({ username }) {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [year, setYear] = useState("2023");
  const [isLoading, setIsLoading] = useState("false");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountries = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "https://calendarific.com/api/v2/countries",
          {
            params: {
              api_key: "bec8af6c95730291984e596b210fc460f4bbacab",
            },
          }
        );
        setCountries(response.data.response.countries);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching countries:", error);
        setIsLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const country = iso3166.whereCountry(selectedCountry);
    const countryCode = country ? country.alpha2 : null;
    navigate({
      pathname: "/results",
      search: `?${createSearchParams({
        country: countryCode,
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
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          <option value="">
            {isLoading ? "Loading..." : "Select a country"}
          </option>
          {countries.map((country, i) => (
            <option key={i} value={country.country_code}>
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
