import { getBooks, getAuthorById } from "@/lib/books";
import Link from "next/link"; // Import Link from next/link
import styles from "@/components/List.module.css";

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
    const author = getAuthorById(book.authorId);

    return { props: { book, author } };
}

export default function AuthorDetails({ book, author }) {
    return (
        <div className={styles.Item}>
            <h1>{author.name}</h1>
            <p>
                <strong>Biography: </strong>
                {author.biography}
            </p>

            <Link href={`/books/${book.id}`}>
                <strong> Back to the Book</strong>{" "}
            </Link>
        </div>
    );
}
