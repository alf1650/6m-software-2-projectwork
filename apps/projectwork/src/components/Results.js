import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import mockAPI from "../api/mockapi";
import converter from "../api/converter";
import Table from "./Table";
import Map from "./Map";
import styles from "./Results.module.css";

const iso3166 = require("iso-3166-1");

function Results({ currency, updateFavs }) {
  const [holidayData, setHolidayData] = useState([]);
  const [convertedAmount, setConvertedAmount] = useState("1");
  const [nativeCurrency, setNativeCurrency] = useState("");
  const [nativeCurrencyName, setNativeCurrencyName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCurrencyLoading, setIsCurrencyLoading] = useState(false);
  const [buttonText, setButtonText] = useState("Add to Favorites");
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const [searchedCountryCode] = useState(searchParams.get("country"));
  const [searchedYear] = useState(searchParams.get("year"));
  const [startDate, setStartDate] = useState(`${searchedYear}-01-01`);
  const [endDate, setEndDate] = useState(`${searchedYear}-12-31`);
  const countryData = iso3166.whereAlpha2(searchedCountryCode);

  const API_KEYS_ARRAY = process.env.REACT_APP_API_KEY.split(" ");
  const COUNTRY_API_KEY = API_KEYS_ARRAY[0];
  const CONVERTER_API_KEY = API_KEYS_ARRAY[1];

  const filteredData = holidayData.filter(
    (data) => data.date.iso > startDate && data.date.iso < endDate
  );

  useEffect(() => {
    const apiGet = async () => {
      setIsLoading(true);
      try {
        const response = await mockAPI.get(
          `/holidays?&api_key=${COUNTRY_API_KEY}&country=${searchedCountryCode}&year=${searchedYear}`
        );
        setHolidayData(response.data.response.holidays);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    apiGet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchedCountryCode, searchedYear]);

  useEffect(() => {
    const fetchNativeCurrency = async () => {
      try {
        const response = await converter.get("/country", {
          headers: { "X-Api-Key": CONVERTER_API_KEY },
          params: {
            name: `${countryData.country}`,
          },
        });
        return response.data[0].currency;
      } catch (error) {
        console.error("Error fetching currency:", error);
      }
    };

    const fetchConvertedAmount = async (nativeC) => {
      try {
        const response = await converter.get("/convertcurrency", {
          headers: { "X-Api-Key": CONVERTER_API_KEY },
          params: {
            want: `${nativeC}`,
            have: `${currency}`,
            amount: 1,
          },
        });
        return response.data.new_amount;
      } catch (error) {
        console.error("Error fetching currency:", error);
      }
    };

    const fetchCurrencyConversion = async () => {
      setIsCurrencyLoading(true);
      const native = await fetchNativeCurrency();
      const convert = await fetchConvertedAmount(native.code);
      setNativeCurrency(native.code);
      setNativeCurrencyName(native.name);
      setConvertedAmount(convert);
      setIsCurrencyLoading(false);
    };

    fetchCurrencyConversion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

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
      <h4>
        {isCurrencyLoading ? (
          <progress />
        ) : (
          `1 ${currency} = $ ${convertedAmount} ${nativeCurrency} (${nativeCurrencyName.toUpperCase()})`
        )}
      </h4>
      <div>
        {isLoading ? <progress /> : <Table filteredData={filteredData} />}
      </div>
      <Map searchedCountry={countryData.country} />
    </div>
  );
}
export default Results;
