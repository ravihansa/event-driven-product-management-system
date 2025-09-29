import React, { useState } from 'react';
import ConfirmationModal from '../common/confirmationModal/ConfirmationModal';
import styles from './ProductTable.module.css';


export default function ProductTable({ products, openModalSave, openModalEdit, onDelete }) {

    const [deleteId, setDeleteId] = useState(null);

    return (
        <>
            <div className={styles.tableContainer}>
                <h2>Products List</h2>
                <button className={styles.addBtn} onClick={() => openModalSave()} >Add New Product ✚</button>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Name</th><th>Price</th><th>Qty</th><th>Category</th><th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((p) => (
                            <tr key={p.id}>
                                <td>{p.name}</td>
                                <td>${p.price}</td>
                                <td>{p.quantity}</td>
                                <td>{p.category.name}</td>
                                <td>
                                    <button className={styles.editBtn} onClick={() => openModalEdit(p)}>Edit</button>
                                    <button className={styles.deleteBtn} onClick={() => setDeleteId(p.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ConfirmationModal
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={() => {
                    onDelete(deleteId);
                    setDeleteId(null);
                }}
                message='Do you want to delete this product?'
            />
        </>
    );
}
