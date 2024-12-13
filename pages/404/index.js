import React from 'react';
import styles from './NotFound.module.css';
import Link from 'next/link';

// '/404' page (A custom error page)
const NotFound = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.errorCode}>404</h1>
            <p className={styles.message}>Oops! The page you are looking for does not exist.</p>
            <Link href="/" className={styles.homeLink}>Go back to Home</Link>
        </div>
    );
};

export default NotFound;
