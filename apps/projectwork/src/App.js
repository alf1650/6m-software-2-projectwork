import './App.css';
// App.js
import { useEffect, useState } from 'react';
import mockAPI from './api/mockapi';
import Table from './components/Table';
// import AddForm from './components/AddForm';

function App() {
  const [countryData, setCountryData] = useState([]);
  const apiGet = async () => {
    try {
      // const response = await mockAPI.get(`/holidays?&api_key=e6bc2f9624d494ca421477e718736a0b6ec483b4&country=AI&year=2024`);
      const response = await mockAPI.get(`/countries?&api_key=e6bc2f9624d494ca421477e718736a0b6ec483b4`);    
      console.log("response.data", response.data);
      setCountryData(response.data.response.countries);
      //console.log(response.data.items[0])
      //console.log(response.data.items[1])
      // console.log("holidayData", holidayData)
      // console.log("holidayData.name", holidayData[0])
      // console.log("weatherData.api_info", weatherData.api_info)
      // console.log("weatherData.items[0]", weatherData.items[0])
      // console.log("weatherData.items[0].forecasts", weatherData.items[0].forecasts[0])
      // console.log("weatherData.items[0].forecasts[0].date", weatherData.items[0].forecasts[0].date)
      // console.log("weatherData.items[0].forecasts[0].date", weatherData.items[0].forecasts[0].forecast)

      // console.log("weatherData.date", weatherData[0].date)
      // console.log("weatherData.forecast", weatherData[0].forecast)
      //console.log("weatherData.items", weatherData.forecasts)
       } catch (error) {
      console.log(error.message);
    }
  }
  //https://api.data.gov.sg/v1/environment/4-day-weather-forecast?date=2023-07-04

  // const apiGetId = async (id) => {
  //   try {
  //     const response = await mockAPI(`/product/${id}`);
  //       console.log(response.data);    
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // }
  
  // const apiPost = async (newProduct) => {
  //   try {
  //     const response = await mockAPI.post(`/product`, newProduct)
  //     console.log(response.data);
  //     apiGet();
  //   } catch(error) {
  //     console.log(error.message);
  //   };
  // }

  // const apiPut = async (id) => {
  //   try {
  //     const response = await mockAPI.put(`/product/${id}`, {
  //       name: '*** NEW PRODUCT ***',
  //       quantity: 8,
  //       price: '88.88',
  //     });
  //     console.log(response.data);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // }
  
  // const apiDelete = async (id) => {
  //   try {
  //     const response = await mockAPI.delete(`/product/${id}`);
  //     console.log(response.data);
  //   } catch (error) {
  //     console.log(error);    
  //   }
  // }


  // const objectAdd = {
  //   name: ' Product One added by Alfred',
  //   quantity: 10,
  //   price: 15.00
  // }

  useEffect(() => {
    apiGet();
  }, []);


  return (
    

    <div className="App">
      <h1>ISO 3166 Data</h1>
      {/* <AddForm handlerAddItem={apiPost} />  */}
      {/* <button onClick={() => apiPost(50)}>Post Products</button> */}
      {/* <button onClick={() => apiGet(50)}>Show Products</button> */}
      <button onClick={apiGet}>Load ISO 3166 Data</button>
      {/* <button onClick={() => apiPut(50)}>Update Products</button> */}
      <Table list={countryData} />

      {/* {weatherData.items[0].forecasts.map((forecast, index) => (
              <tr key={index}>
                <td>{forecast.date}</td>
                <td>{forecast.temperature}</td>
                <td>{forecast.relative_humidity}</td>
              </tr>
            ))} */}

    </div>
  );
}
export default App;