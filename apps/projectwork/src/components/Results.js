import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import mockAPI from "../api/mockapi";
import Table from "./Table";
import Map from "./Map";
import styles from "./Results.module.css";

const iso3166 = require("iso-3166-1");

function Results({ currency, updateFavs }) {
  const [holidayData, setHolidayData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonText, setButtonText] = useState("Add to Favorites");
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const [searchedCountry] = useState(searchParams.get("country"));
  const [searchedYear] = useState(searchParams.get("year"));
  const [startDate, setStartDate] = useState(`${searchedYear}-01-01`);
  const [endDate, setEndDate] = useState(`${searchedYear}-12-31`);
  const countryData = iso3166.whereAlpha2(searchedCountry);

  const API_KEY = process.env.REACT_APP_API_KEY;
  const EXCHANGE_API_BASE_URL = "https://v6.exchangerate-api.com/v6/ed1584ef93e1097b9b0c32f3/latest/USD";

  const [exchangeRate, setExchangeRate] = useState(null);

  const filteredData = holidayData.filter(
    (data) => data.date.iso > startDate && data.date.iso < endDate
  );

  useEffect(() => {
    const apiGet = async () => {
      setIsLoading(true);
      try {
        const response = await mockAPI.get(
          `/holidays?&api_key=${API_KEY}&country=${searchedCountry}&year=${searchedYear}`
        );
        setHolidayData(response.data.response.holidays);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    const getExchangeRate = async () => {
      try {
        const response = await fetch(EXCHANGE_API_BASE_URL);
        const data = await response.json();
        setExchangeRate(data.conversion_rates[searchedCountry]);
      } catch (error) {
        console.log(error.message);
      }
    };

    apiGet();
    getExchangeRate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchedCountry, searchedYear]);

  const handleAdd = () => {
    const newFav = {
      id: uuidv4(),
      country: countryData.country,
      start: startDate,
      end: endDate,
      notes: "",
    };
    updateFavs(newFav);
    setButtonText("Added!");
    setTimeout(() => {
      setButtonText("Add to Favorites");
    }, 500);
  };

  const handleStart = (e) => {
    setStartDate(e.target.value);
  };

  const handleEnd = (e) => {
    setEndDate(e.target.value);
  };

  return (
    <div className={styles.results}>
      <button className={styles.back} onClick={() => navigate("/search")}>
        {`« Back to Search`}
      </button>
      <p className={styles.title}>
        {`Travel to ${countryData.country} in ${searchedYear}`} </p>
        <button className={styles.add} onClick={handleAdd}>
          {buttonText}
        </button>
      <h1>{`${countryData.country} Holidays in ${searchedYear}`}</h1>
      <label>From: </label>
      <input
        type="date"
        value={startDate}
        min={`${searchedYear}-01-01`}
        max={`${searchedYear}-12-30`}
        onChange={handleStart}
      />
      <br />
      <label> To: </label>
      <input
        type="date"
        value={endDate}
        min={`${searchedYear}-01-02`}
        max={`${searchedYear}-12-31`}
        onChange={handleEnd}
      />
      <br />
      {/*API FOR $ CONVERTER*/}
      <h4>{`1 ${currency} = ${exchangeRate ? exchangeRate.toFixed(2) : "..."} ${searchedCountry}`}</h4>
      {/*API FOR $ CONVERTER*/}
      <div>
        {isLoading ? <progress /> : <Table filteredData={filteredData} />}
      </div>
      {/*API FOR MAP*/}
      <Map />
      {/*API FOR MAP*/}
    </div>
  );
}
export default Results;
