import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080', // replace with your backend URL
    withCredentials: true, // if you're using cookies/session
});

export default axiosInstance;