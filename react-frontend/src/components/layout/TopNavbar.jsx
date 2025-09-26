import React from 'react';
import styles from './TopNavbar.module.css';


const TopNavbar = () => {

    return (
        <header className={styles.topNavbar}>
            <div className={styles.leftSection}>
                <h1 className={styles.brand}>Products Dashboard</h1>
            </div>
            <div className={styles.rightSection}>
                <div className={styles.notificationIcon} >
                    🔔 ({1})
                </div>
                <div className={styles.separator} >
                </div>
                <div className={styles.userProfile}>
                    <div className={styles.avatar}>R</div>
                </div>
            </div>
        </header>
    );
};

export default TopNavbar;
