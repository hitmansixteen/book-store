import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import styles from "./Layout.module.css";
import { useUser } from "@/context/user-context";
import { useRouter } from "next/router";

const Layout = (props) => {
    const { updateUser } = useUser();
    const router = useRouter();
    const [theme, setTheme] = useState("light");
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const { data: session, status } = useSession();

    useEffect(() => {
        if (typeof window !== "undefined") {
            document.body.className = theme;
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    const handleLogout = async () => {
        const response = await fetch("/api/auth/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        if (response.ok) {
            updateUser(null);
            await signOut({ redirect: false });
            alert("User logged out successfully");
        } else {
            console.error("Failed to log out");
        }
    };

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.layout}>
            <header className={styles.header}>
                {/* Footer navigation now in headerLeft */}
                <div className={styles.headerLeft}>
                    <nav className={styles.footerNav}>
                        <Link href="/" className={styles.navLink}>
                            Featured Books
                        </Link>
                        <Link href="/info" className={styles.navLink}>
                            Learn More
                        </Link>
                        <Link href="/genres" className={styles.navLink}>
                            Genres
                        </Link>
                        <Link href="/authors" className={styles.navLink}>
                            Authors
                        </Link>
                    </nav>
                </div>

                {/* Header-related elements now in headerRight */}
                <div className={styles.headerRight}>
                    {session ? (
                        <div className={styles.userWrapper}>
                            <span
                                className={styles.username}
                                onClick={() =>
                                    setIsPopupVisible((prev) => !prev)
                                }
                            >
                                Welcome{" "}
                                {session.user.username || session.user.email}!
                            </span>

                            {isPopupVisible && (
                                <div className={styles.popup}>
                                    <button
                                        className={styles.logoutButton}
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button
                            className={styles.signInButton}
                            onClick={() => {
                                router.push("/auth/signin");
                            }}
                        >
                            Sign In
                        </button>
                    )}

                    <div className={styles.themeSwitch}>
                        <label className={styles.switch}>
                            <input
                                type="checkbox"
                                onChange={toggleTheme}
                                checked={theme === "dark"}
                            />
                            <span className={styles.slider}></span>
                        </label>

                        <span className={styles.themeLabel}>
                            {theme === "light" ? "Light Mode" : "Dark Mode"}
                        </span>
                    </div>
                </div>
            </header>

            <main className={styles.main}>{props.children}</main>

            {/* Footer content is now empty or adjusted */}
            <footer className={styles.footer}>
                {/* Optional footer content */}
            </footer>
        </div>
    );
};

export default Layout;
