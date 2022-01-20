import axios from "axios";
import endpoint from "./endpoint.json";


const axiosInstance = axios.create({
    baseURL: endpoint.baseURL
})


export default axiosInstance;
