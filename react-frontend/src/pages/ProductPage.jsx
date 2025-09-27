import React, { useEffect, useState, } from 'react';
import { useAlerts } from '../providers/AlertProvider';
import Loader from '../components/common/loader/Loader';
import ProductTable from '../components/product/ProductTable';
import ProductModal from '../components/product/ProductModal';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../services/products';
import { getCategoryList } from '../services/category';


export default function ProductPage() {

    const [loading, setLoading] = useState(true);
    const [productList, setProductList] = useState([]);
    const [allCategoryList, setAllCategoryList] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editProduct, setEditProduct] = useState(null);
    const { successAlert, errorAlert } = useAlerts();

    const loadProductList = async () => {
        try {
            const [prodData, catData] = await Promise.all([getProducts(), getCategoryList()]);
            const prodList = prodData?.data;
            const catList = catData?.data;
            if (prodList?.length) {
                setProductList(prodList);
            }
            if (catList?.length) {
                setAllCategoryList(catList);
            }
        } catch (error) {
            errorAlert(error.message);
            console.error('Failed to load product or category data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProductList();
    }, []);

    const handleSave = async (data) => {
        try {
            setLoading(true);
            if (editProduct) {
                await updateProduct(editProduct.id, data);
            } else {
                await createProduct(data);
            }
            loadProductList();
            successAlert(editProduct ? 'Product updated successfully' : 'Product saved successfully');
        } catch (error) {
            errorAlert(error.message);
            console.error('Failed to save product:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        alert('Are you sure to delete this product?');
        try {
            setLoading(true);
            await deleteProduct(id);
            loadProductList();
            successAlert('Product deleted successfully');
        } catch (error) {
            errorAlert(error.message);
            console.error('Failed to delete product:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {loading && <Loader size="medium" color="#2c3e50" />}
            <ProductTable
                products={productList}
                openModalSave={() => { setModalOpen(true) }}
                openModalEdit={(p) => { setModalOpen(true); setEditProduct(p); }}
                onDelete={handleDelete}
            />
            {modalOpen && (
                <ProductModal
                    onClose={() => { setModalOpen(false); setEditProduct(null); }}
                    onSave={handleSave}
                    prodData={editProduct}
                    catList={allCategoryList}
                />
            )}
        </div>
    );
}
