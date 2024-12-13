import { getGenres } from "@/lib/books";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "@/components/List.module.css";

export async function getServerSideProps() {
    const genres = getGenres();
    return {
        props: {
            genres,
        },
    };
}

export default function Genres({ genres }) {
    const r = useRouter();
    const navigateHome = () => {
        r.push("/");
    };
    return (
        <div>
            <h1>Genres</h1>
            <ul className={styles.List}>
                {genres.map((genre) => (
                    <li key={genre.id} className={styles.Item}>
                        <Link href={`/books?genreId=${genre.id}`}>
                            {genre.name}
                        </Link>
                    </li>
                ))}
            </ul>
            <button onClick={navigateHome} className="blueButton">
                Go to Home Page
            </button>
        </div>
    );
}
