import styles from './ProductTable.module.css';

export default function ProductTable({ products, onEdit, onDelete }) {
    return (
        <div className={styles.tableContainer}>
            <h2>Products List</h2>
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
                                <button className={styles.editBtn} onClick={() => onEdit(p)}>Edit</button>
                                <button className={styles.deleteBtn} onClick={() => onDelete(p.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
