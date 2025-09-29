import TopNavbar from './TopNavbar';
import styles from './Layout.module.css';

const Layout = ({ children }) => {

    return (
        <div className={styles.layout}>
            <TopNavbar />
            <main className={styles.mainContent}>
                {children}
            </main>
        </div>
    );
};

export default Layout;
