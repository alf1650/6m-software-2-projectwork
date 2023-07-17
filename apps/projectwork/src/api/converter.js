//mockapi.js
import axios from "axios";
const BASE_URL = "https://api.api-ninjas.com/v1/";
const converter = axios.create({ baseURL: BASE_URL });

export default converter;
