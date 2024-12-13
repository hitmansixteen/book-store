import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useSession , signOut} from 'next-auth/react';
import styles from './Layout.module.css';
import { useUser } from '@/context/user-context';
import { useRouter } from 'next/router';

// Layout component to show on each page
const Layout = (props) => {
  const { updateUser } = useUser();
  const router = useRouter();
  const [theme, setTheme] = useState('light');
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // Getting the logged-in user
  const { data: session, status } = useSession(); 
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.body.className = theme;
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };


  // Logging-out the user
  const handleLogout = async () => {

    const response = await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include"
    });
  
    if (response.ok) {

      updateUser(null)
      await signOut({ redirect: false });
      alert("User logged out successfully")

    } else {
      console.error("Failed to log out");
    }
  }

  if(status === 'loading'){
    return <div>Loading...</div>
  }

  return (
    <div className={styles.layout}>

      <header className={styles.header}>

        <div className={styles.headerLeft}>
          {/* Any left-aligned content can go here */}
        </div>

        {/* General Header (Username/Sign-in, Switch theme) */}
        <div className={styles.headerRight}>
          {session ? (

            <div className={styles.userWrapper}>

              <span className={styles.username} onClick={() => setIsPopupVisible((prev) => !prev)}>
                {session.user.username || session.user.email}
              </span>

              {isPopupVisible && (

                <div className={styles.popup}>
                  <button className={styles.logoutButton} onClick={handleLogout}>
                    Logout
                  </button>
                </div>

              )}
            </div>
          ) : (

            <button className={styles.signInButton} onClick={() => { router.push('/auth/signin')}}>
              Sign In
            </button>
          )}

          <div className={styles.themeSwitch}>
            <label className={styles.switch}>
              <input type="checkbox" onChange={toggleTheme} checked={theme === 'dark'} />
              <span className={styles.slider}></span>
            </label>

            <span className={styles.themeLabel}>
              {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
            </span>
          </div>
        </div>
      </header>

      <main className={styles.main}>{props.children}</main>

      {/* Genreal Footer */}
        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <nav className={styles.footerNav}>
              <Link href="/" className={styles.navLink}>Featured Books</Link>
              <Link href="/info" className={styles.navLink}>Learn More</Link>
              <Link href="/genres" className={styles.navLink}>Genres</Link>
              <Link href="/authors" className={styles.navLink}>Authors</Link>
            </nav>
          </div>
        </footer>

    </div>
  )
}

export default Layout;
