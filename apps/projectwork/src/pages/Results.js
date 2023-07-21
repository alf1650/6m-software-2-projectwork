import styles from "../css-modules/Results.module.css";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Table from "../components/Table";
import Map from "../components/Map";
import countriesAPI from "../api/countriesAPI";
import useUserState from "../store/userStateContext";
import CurrencyConverter from "../components/CurrencyConverter";

function Results() {
  const {
    selectedCountry,
    countriesList,
    updateCountry,
    selectedYear,
    updateYear,
    addFav,
  } = useUserState();

  const [holidaysData, setHolidaysData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonText, setButtonText] = useState("Add to Favorites");
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const [searchedCountryCode] = useState(searchParams.get("country")); //reading from URL query string
  const [searchedYear] = useState(searchParams.get("year")); //reading from URL query string
  const [startDate, setStartDate] = useState(`${searchedYear}-01-01`);
  const [endDate, setEndDate] = useState(`${searchedYear}-12-31`);

  const API_KEYS_ARRAY = process.env.REACT_APP_API_KEY.split(" "); //.env contains string with 2 keys, .split to access
  const COUNTRY_API_KEY = API_KEYS_ARRAY[0];

  const filteredData = holidaysData.filter(
    (data) => data.date.iso > startDate && data.date.iso < endDate //displays holidays data by date range
  );

  const getSelectedCountryFullName = (searchedCountryCode) => {
    const countryData = countriesList.filter(
      (countryData) => countryData["iso-3166"] === searchedCountryCode
    );
    return countryData[0].country_name;
  };

  useEffect(() => {
    const apiGet = async () => {
      setIsLoading(true);
      try {
        const response = await countriesAPI.get("/holidays", {
          params: {
            api_key: COUNTRY_API_KEY,
            country: searchedCountryCode,
            year: selectedYear,
          },
        });
        if (!response.data.response) {
          console.log("No searched data found");
          navigate("/*");
        } else {
          setHolidaysData(response.data.response.holidays);
          updateCountry({
            ...selectedCountry,
            name: getSelectedCountryFullName(searchedCountryCode),
            code: searchedCountryCode,
          });
          updateYear(searchedYear);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error.message);
        navigate("/*");
      }
    };
    apiGet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchedCountryCode, searchedYear]);

  const handleAdd = () => {
    const newFav = {
      id: uuidv4(),
      country: selectedCountry.name,
      start: startDate,
      end: endDate,
      notes: "",
    };
    addFav(newFav);
    setButtonText("Added!");
    setTimeout(() => {
      setButtonText("Add to Favorites");
    }, 500);
  };

  return (
    <div className={styles.results}>
      <button className={styles.back} onClick={() => navigate("/search")}>
        {`« Back to Search`}
      </button>
      <p className={styles.title}>
        {`Travel to ${selectedCountry.name} in ${selectedYear}`}
        <button className={styles.add} onClick={handleAdd}>
          {buttonText}
        </button>
      </p>
      <h1>{`${selectedCountry.name} Holidays in ${selectedYear}`}</h1>
      <label>From: </label>
      <input
        type="date"
        value={startDate}
        onKeyDown={(e) => e.preventDefault()}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <label> To: </label>
      <input
        type="date"
        value={endDate}
        onKeyDown={(e) => e.preventDefault()}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <br />
      <CurrencyConverter />
      <div>
        {isLoading ? <progress /> : <Table filteredData={filteredData} />}
      </div>
      <Map />
    </div>
  );
}
export default Results;
