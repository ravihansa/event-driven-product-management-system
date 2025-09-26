import React, { useEffect, useState, } from 'react';
import { getProducts } from '../services/products';
import ProductTable from '../components/product/ProductTable';


export default function ProductPage() {

    const [loading, setLoading] = useState(true);
    const [productList, setProductList] = useState([]);

    const loadProductList = async () => {
        try {
            const prodData = await getProducts();
            const prodList = prodData?.data;
            if (prodList?.length) {
                setProductList(prodList);
            }
        } catch (error) {
            console.error('Failed to load product data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProductList();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <ProductTable products={productList} />
        </div>
    );
}
