import stylingBook from "../components/Book/Book.module.css";
import styling from "../styles/General.module.css";
import Book from "@/components/Book/book";
import { useRouter } from "next/router";
import {
    getAllAuthors,
    getAllGenres,
    getFeaturedBooks,
} from "@/helpers/api-util";
import { useState } from "react";

export default function Home({ books, authors, genres }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const bookClicked = (id) => {
        setLoading(true);
        router.push("/books/" + id);
    };

    const viewAllBooks = () => {
        setLoading(true);
        router.push("/books");
    };

    if (
        loading ||
        books.length === 0 ||
        genres.length === 0 ||
        authors.length === 0
    ) {
        return (
            <div className={styling.loading}>
                <div className={styling.spinner}></div>
            </div>
        );
    }

    return (
        <>
            <header className={styling.heading}>Featured Books</header>

            <div className={styling.Buttons}>
                <button className={styling.Button} onClick={viewAllBooks}>
                    View All Books
                </button>
            </div>
            <div className={stylingBook.bookList}>
                {books.map((book) => (
                    <Book
                        details={book}
                        key={book.id}
                        authors={authors}
                        genres={genres}
                        onClickBook={() => bookClicked(book.id)}
                    />
                ))}
            </div>
        </>
    );
}

export async function getServerSideProps() {
    const dataBooks = await getFeaturedBooks();
    const dataAuthors = await getAllAuthors();
    const dataGenres = await getAllGenres();

    if (!dataBooks || !dataAuthors || !dataGenres) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            books: dataBooks,
            authors: dataAuthors,
            genres: dataGenres,
        },
    };
}
