//mockapi.js
import axios from 'axios';
const BASE_URL = 'https://calendarific.com/api/v2/';
const mockAPI = axios.create({ baseURL: BASE_URL });

export default mockAPI
