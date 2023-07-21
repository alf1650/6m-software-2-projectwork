//mockapi.js
import axios from 'axios';
const BASE_URL = 'https://calendarific.com/api/v2/';
const countriesAPI = axios.create({ baseURL: BASE_URL });

export default countriesAPI
