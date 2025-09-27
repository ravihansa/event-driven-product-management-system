import axios from 'axios';
const apiBaseUrl = process.env.REACT_APP_API_URL;

const apiClient = axios.create({
    baseURL: apiBaseUrl,
    headers: {
        "Content-Type": "application/json",
    },
});

export default apiClient;
