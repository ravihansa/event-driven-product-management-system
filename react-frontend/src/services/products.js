import apiClient from './apiClient';
const sellerId = process.env.REACT_APP_SELLER_ID; // Temporary id for testing purpose


export const getProducts = async () => {
    const res = await apiClient.get(`/product/${sellerId}`);
    return res.data;
};

export const createProduct = async (product) => {
    const payload = { ...product, sellerId: Number(sellerId) };
    const res = await apiClient.post(`/product`, payload);
    return res.data;
};

export const updateProduct = async (id, product) => {
    const res = await apiClient.put(`/product/${id}`, product);
    return res.data;
};

export const deleteProduct = async (id) => {
    await apiClient.delete(`/product/${id}`);
};
