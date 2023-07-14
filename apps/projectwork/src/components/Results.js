import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import mockAPI from "../api/mockapi";
import Table from "./Table";
import styles from "./Results.module.css";

const iso3166 = require("iso-3166-1");

function Results({ currency }) {
  const [holidayData, setHolidayData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  {
    /*setSearchParams to be used for changes in search query*/
  }
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchedCountry] = useState(searchParams.get("country"));
  const [searchedYear] = useState(searchParams.get("year"));
  const countryName = iso3166.whereAlpha2(searchedCountry);
  const navigate = useNavigate();

  const apiGet = async () => {
    setIsLoading(true);
    try {
      const response = await mockAPI.get(
        `/holidays?&api_key=e6bc2f9624d494ca421477e718736a0b6ec483b4&country=${searchedCountry}&year=${searchedYear}`
      );
      setHolidayData(response.data.response.holidays);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    apiGet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchedCountry, searchedYear]);

  const checkRange = () => {
    console.log("Allow user to narrow the dates here");
  };

  return (
    <div className={styles.results}>
      <button className={styles.back} onClick={() => navigate("/search")}> {`< Back to Search`}</button>
      <h2>{`${countryName.country} Holidays in ${searchedYear}`}</h2>
      <label>From: </label>
      <input type="date" />
      <label> To: </label>
      <input type="date" />
      <button onClick={checkRange}>Check dates</button>
      {/*API FOR $ CONVERTER*/}
      <h4>{`1 ${currency} = 1${searchedCountry}`}</h4>
      {/*API FOR $ CONVERTER*/}
      <div>
        {isLoading ? <progress /> : <Table holidayData={holidayData} />}
      </div>
      {/*API FOR MAP*/}
      <h1>Location Map</h1>
      {/*API FOR MAP*/}
    </div>
  );
}
export default Results;
