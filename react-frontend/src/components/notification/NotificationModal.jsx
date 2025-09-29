import React from 'react';
import styles from './NotificationModal.module.css';


export default function NotificationModal({ events, onClose }) {

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <h2>Notifications</h2>
                    <button className={styles.modalCloseButton} onClick={onClose}>&times;</button>
                </div>
                <div className={styles.modalBody}>
                    <ul>
                        {events.toReversed().map((event, i) => (
                            <li key={i} className={event.type === 'warning' ? styles.warnItem : ''} >
                                {event.title} ➜ {event.details}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
