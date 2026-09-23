import axios from "axios";

const api = axios.create({
    baseURL: "https://ju-janta-backend.onrender.com/api/user",
    withCredentials: true
});

export default api;