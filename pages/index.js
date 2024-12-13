import { getBooks } from "@/lib/books";
import BookList from "@/components/BookList";
import { useRouter } from "next/router";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export async function getStaticProps() {
    const books = getBooks();
    return {
        props: {
            books,
        },
    };
}

export default function Home({ books }) {
    const r = useRouter();
    const navigateGenres = () => {
        r.push("/genres");
    };
    return (
        <div>
            <h1>Featured Books</h1>
            <BookList books={books} />
            <button onClick={navigateGenres} className="blueButton">
                Go to Genres Page
            </button>
            <Link href={`/books`}>
                <button className="blueButton">View All Books</button>
            </Link>
            <Link href={`/authors`}>
                <button className="blueButton">View All Authors</button>
            </Link>
            <Link href={`/info`}>
                <button className="blueButton">About Us</button>
            </Link>
            <ThemeToggle />
        </div>
    );
}
