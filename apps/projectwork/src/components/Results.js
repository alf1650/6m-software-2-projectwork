import './App.css';
import mockAPI from '../api/mockapi';
import {useState} from 'react';

function Results() {

    const [date, setDate] = useState("");
    const [holidayData, setHolidayData] = useState([])
    const apiGet = async () => {
        try {
          const response = await mockAPI.get(`/holidays?&api_key=e6bc2f9624d494ca421477e718736a0b6ec483b4&country=AI&year=2024`);
          console.log("response.data", response.data);
          setHolidayData(response.data.response.holidays);
        }
        catch(error){
            console.log(error.message);
        }
    }


    return (

            <div className="App">
            <h1>Holiday Data</h1>
            <button onClick={apiGet}>Load Holiday Data</button>
            {holidayData.items[0].forecasts.filter((forecast, index) => (
                    <tr key={index}>
                    <td></td>
                    <td></td>
                    <td></td>
                    </tr>
                ))}

            </div>        
    )
}

export default Results;