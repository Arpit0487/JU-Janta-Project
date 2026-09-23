import axios from "axios";

const authAPI = axios.create({
    baseURL: "https://ju-janta-backend.onrender.com/api/auth",
    withCredentials: true
});

export default authAPI;
