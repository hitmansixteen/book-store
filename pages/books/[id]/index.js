import { getBooks, getGenreById, getAuthorById } from "@/lib/books";
import styles from "@/components/List.module.css";
import Link from "next/link";

export async function getStaticPaths() {
    const books = getBooks();
    const paths = books.map((book) => ({
        params: { id: book.id.toString() },
    }));

    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const books = getBooks();
    const book = books.find((book) => book.id.toString() === params.id);
    const genre = getGenreById(book.genreId);
    const author = getAuthorById(book.authorId);

    return { props: { book, genre, author } };
}

export default function BookDetails({ book, genre, author }) {
    return (
        <div className={styles.Item}>
            <h1>{book.title}</h1>
            <p>{book.description}</p>

            <p>
                <strong>Price:</strong> ${book.price}
            </p>
            <p>
                <strong>Rating:</strong> {book.rating}
            </p>
            <p>
                <strong>Genre:</strong> {genre.name}
            </p>
            <p>
                <strong>Author:</strong>
                <Link href={`/books/${book.id}/author`}>{author.name}</Link>
            </p>
        </div>
    );
}
