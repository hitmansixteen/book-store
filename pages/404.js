import Link from "next/link";
import styles from "@/components/Error.module.css";

export default function Custom404() {
    return (
        <div className={styles.container}>
            <h1>404 - Page Not Found</h1>
            <p>
                Sorry, the page you`&apos;`re looking for doesn`&apos;`t exist.
            </p>
            <p>
                You can go back to the{" "}
                <Link href="/">
                    <strong>home page</strong>
                </Link>{" "}
                or explore other sections of our site.
            </p>

            <nav className={styles.nav}>
                <ul>
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/info/faqs">FAQs</Link>
                    </li>
                    <li>
                        <Link href="/info/support">Support</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
