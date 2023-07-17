import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import mockAPI from "../api/mockapi";
import Table from "./Table";
import Map from "./Map";
import styles from "./Results.module.css";
import axios from "axios";

const iso3166 = require("iso-3166-1");

function Results({ currency, updateFavs }) {
  const [holidayData, setHolidayData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonText, setButtonText] = useState("Add to Favorites");
  const navigate = useNavigate();
  const [showMap, setshowMap] = useState(true);

  const [searchParams] = useSearchParams();
  const [searchedCountry] = useState(searchParams.get("country"));
  const [searchedYear] = useState(searchParams.get("year"));
  const [startDate, setStartDate] = useState(`${searchedYear}-01-01`);
  const [endDate, setEndDate] = useState(`${searchedYear}-12-31`);
  const countryData = iso3166.whereAlpha2(searchedCountry);
  const [position, setPosition] = useState({ lat: 0, lon: 0 });

  const API_KEY = process.env.REACT_APP_API_KEY;

  const filteredData = holidayData.filter(
    (data) => data.date.iso > startDate && data.date.iso < endDate
  );

  

  useEffect(() => {
    const apiGet = async () => {
      setIsLoading(true);
      try {
        const response1 = await mockAPI.get(
          `/holidays?&api_key=${API_KEY}&country=${searchedCountry}&year=${searchedYear}`
        );
        setHolidayData(response1.data.response.holidays);
        setIsLoading(false);
        const response2 = await axios.get(`https://geocode.maps.co/search?country=${searchedCountry}`);
        console.log("response2.data",response2.data[0]);
        // setPosition({lat: response2.data[0].lat, lon: response2.data[0].lon});
        setPosition(response2.data[0]);
        console.log("position",position); 
      } catch (error) {
        console.log(error.message);
      }
    };
    apiGet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchedCountry, searchedYear]);

  // useEffect(() => {
  //   console.log("position1", position1);
  // }, [position1]);

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

  //const position = [1.3521, 103.8198];

  return (
    <div className={styles.results}>
      <button className={styles.back} onClick={() => navigate("/search")}>
        {`« Back to Search`}
      </button>
      <p className={styles.title}>
        {`Travel to ${countryData.country} in ${searchedYear}`}
        <button className={styles.add} onClick={handleAdd}>
          {buttonText}
        </button>
      </p>
      <h1>{`${countryData.country} Holidays in ${searchedYear}`}</h1>
      <label>From: </label>
      <input
        type="date"
        value={startDate}
        min={`${searchedYear}-01-01`}
        max={`${searchedYear}-12-30`}
        onChange={handleStart}
      />
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
      <h4>{`1 ${currency} = 1${searchedCountry}`}</h4>
      {/*API FOR $ CONVERTER*/}
      <div>
        {isLoading ? <progress /> : <Table filteredData={filteredData} />}
      </div>
      {/*API FOR MAP*/}
      <div className={styles.MapContainer}>
      {showMap && <Map position={{lat: position.lat, lon: position.lon}} />}
      </div>
      {/*API FOR MAP*/}
    </div>
  );
}
export default Results;
