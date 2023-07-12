import { useEffect, useState } from "react";
import mockAPI from "../api/mockapi";
import Table from "./Table";
import styles from "./Results.module.css";

function Results() {
  const [holidayData, setHolidayData] = useState([]);
  const apiGet = async () => {
    try {
      const response = await mockAPI.get(
        `/holidays?&api_key=e6bc2f9624d494ca421477e718736a0b6ec483b4&country=AI&year=2024`
      );
      setHolidayData(response.data.response.holidays);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    apiGet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.results}>
      <h1>Holiday Data</h1>
      <button onClick={apiGet}>Load Holiday Data</button>
      <Table list={holidayData} />
    </div>
  );
}
export default Results;
