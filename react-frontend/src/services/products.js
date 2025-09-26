import axios from 'axios';
const apiBaseUrl = process.env.REACT_APP_API_URL;
const sellerId = process.env.REACT_APP_SELLER_ID; // Temporary id for testing purpose


export const getProducts = async () => {
    const res = await axios.get(`${apiBaseUrl}/product/${sellerId}`);
    return res.data;
};
