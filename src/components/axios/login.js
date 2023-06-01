import axios from "axios";

const baseURL = 'https://kiska.herokuapp.com/'

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        accept: 'application/json'
    },
})

export default axiosInstance;