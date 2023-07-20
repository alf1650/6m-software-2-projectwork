//mockapi.js
import axios from "axios";
const BASE_URL = "https://api.api-ninjas.com/v1/";
const converterAPI = axios.create({ baseURL: BASE_URL });

export default converterAPI;
