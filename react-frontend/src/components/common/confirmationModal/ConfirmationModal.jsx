import React from 'react';
import styles from './ConfirmationModal.module.css';


const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.backdrop}>
            <div className={styles.modal}>
                <h3>Confirm Delete</h3>
                <p>{message || 'Are you sure you want to delete this item?'}</p>
                <div className={styles.actions}>
                    <button className={styles.cancelBtn} onClick={onClose}>
                        Cancel
                    </button>
                    <button className={styles.deleteBtn} onClick={onConfirm}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
