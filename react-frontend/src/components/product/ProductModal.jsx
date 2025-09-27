import { useState, useEffect } from 'react';
import styles from './ProductModal.module.css';

export default function ProductModal({ onClose, onSave, prodData, catList }) {
    const [form, setForm] = useState({ name: "", description: "", price: "", quantity: "", categoryId: "" });

    useEffect(() => {
        if (prodData) {
            // setForm(prodData);
            setForm({
                name: prodData.name ?? '',
                description: prodData.description ?? '',
                price: prodData.price ?? '',
                quantity: prodData.quantity ?? '',
                categoryId: prodData.categoryId ?? '',
                sellerId: prodData.sellerId
            });
        }
    }, [prodData]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            ...form,
            price: form.price ? Number(form.price) : null,
            quantity: form.quantity ? Number(form.quantity) : null,
            categoryId: form.categoryId ? Number(form.categoryId) : null,
        };
        onSave(payload);
        onClose();
    };

    return (
        <div className={styles.backdrop}>
            <div className={styles.modal}>
                <h3>{prodData ? "Edit Product" : "Add Product"}</h3>
                <form onSubmit={handleSubmit}>
                    <label>Name</label>
                    <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
                    <label>Description</label>
                    <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
                    <label>Price</label>
                    <input name="price" type="number" step="0.01" placeholder="Price" value={form.price} onChange={handleChange} required />
                    <label>Quantity</label>
                    <input name="quantity" type="number" min="1" max="100" placeholder="Quantity" value={form.quantity} onChange={handleChange} required />
                    <label>Category</label>
                    <select
                        name="categoryId"
                        value={form.categoryId}
                        onChange={handleChange}
                    >
                        {catList.map((option) => (
                            <option key={option.id} value={option.id}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                    <div className={styles.actions}>
                        <button type="submit" className={styles.saveBtn}>Save</button>
                        <button type="button" onClick={onClose} className={styles.cancelBtn}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
