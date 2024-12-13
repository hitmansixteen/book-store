import useSWR from "swr";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "@/components/List.module.css";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Authors() {
    const { data, error } = useSWR("/api/authors", fetcher);
    const r = useRouter();

    if (error) return <div>Failed to load authors</div>;
    if (!data) return <div>Loading...</div>;

    return (
        <div>
            <h1>Authors</h1>
            <ul className={styles.List}>
                {data.map((author) => (
                    <li key={author.id} className={styles.Item}>
                        <strong>{author.name}</strong>: {author.biography}
                    </li>
                ))}
            </ul>

            <button onClick={() => r.push("/")} className="blueButton">
                Go to Home Page
            </button>
        </div>
    );
}
