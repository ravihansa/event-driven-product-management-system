import apiClient from './apiClient';


export const getCategoryList = async () => {
    const res = await apiClient.get(`/category`);
    return res.data;
};
