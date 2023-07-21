import axios from "axios";
const BASE_URL = "https://64b14d45062767bc4825fec3.mockapi.io/";
const userApi = axios.create({ baseURL: BASE_URL });

export default userApi;
