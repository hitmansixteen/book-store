import React from "react";
import styles from "@/styles/General.module.css";
import Author from "@/components/Authors/author";
import { getAllAuthors } from "@/helpers/api-util";

const AuthorsPage = ({ authors }) => {
    if (!authors) {
        return <h2>Data Failed to Load</h2>;
    }

    return (
        <div>
            <div>
                <header className={styles.heading}>Authors Page</header>
                <ul className={styles.authorsGrid}>
                    {authors.map((i) => (
                        <li key={i.id}>
                            <Author author={i} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export async function getServerSideProps() {
    const authors = await getAllAuthors();

    if (!authors) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            authors,
        },
    };
}

export default AuthorsPage;
