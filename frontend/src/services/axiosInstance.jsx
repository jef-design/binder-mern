import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://binder-api.onrender.com',
    withCredentials: true
})

export default axiosInstance
