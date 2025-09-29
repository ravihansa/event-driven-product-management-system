import React, { useState } from 'react';
import { useNotification } from '../../providers/NotifyCtxProvider';
import NotificationModal from '../notification/NotificationModal';
import styles from './TopNavbar.module.css';


const TopNavbar = () => {

    const { events } = useNotification();
    const [open, setOpen] = useState(false);

    return (
        <div>
            <header className={styles.topNavbar}>
                <div className={styles.leftSection}>
                    <h1 className={styles.brand}>Products Dashboard</h1>
                </div>
                <div className={styles.rightSection}>
                    <div className={styles.notificationIcon} onClick={() => setOpen((prev) => !prev)} >
                        {events.length ? `🔔 (${events.length})` : '🕭'}
                    </div>
                    <div className={styles.separator} >
                    </div>
                    <div className={styles.userProfile}>
                        <div className={styles.avatar}>R</div>
                    </div>
                </div>
            </header>
            {open && (<NotificationModal events={events} onClose={() => setOpen(false)} />)}
        </div>
    );
};

export default TopNavbar;
