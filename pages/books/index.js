import { getBooks, getGenres } from "@/lib/books";
import Link from "next/link";
import styles from "@/components/List.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export async function getStaticProps() {
    const books = getBooks();
    const genres = getGenres();
    if (!books || books.length === 0) {
        return {
            notFound: true,
        };
    }
    return {
        props: { books, genres },
        revalidate: 60,
    };
}

export default function BooksPage({ books, genres }) {
    const r = useRouter();
    const { genreId } = r.query;
    const [filteredBooks, setFilteredBooks] = useState(books);
    const [selectedGenre, setSelectedGenre] = useState(genreId || "all");
    const [searchTerm, setSearchTerm] = useState("");
    const [searchHistory, setSearchHistory] = useState([]);

    useEffect(() => {
        const history = JSON.parse(localStorage.getItem("searchHistory")) || [];
        setSearchHistory(history);
    }, []);

    useEffect(() => {
        // Filter books based on selected genre and search term
        const filterBooks = () => {
            let newFilteredBooks = books;

            // Apply genre filtering
            if (selectedGenre && selectedGenre !== "all") {
                newFilteredBooks = newFilteredBooks.filter(
                    (book) => book.genreId === selectedGenre
                );
            }

            // Apply search term filtering
            if (searchTerm) {
                newFilteredBooks = newFilteredBooks.filter((book) =>
                    book.title.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }

            setFilteredBooks(newFilteredBooks);
        };

        filterBooks();
    }, [books, selectedGenre, searchTerm]);

    const handleGenreChange = (e) => {
        const genreID = e.target.value;
        setSelectedGenre(genreID); // Update selected genre
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchKeyPress = (e) => {
        if (e.key === "Enter") {
            const term = e.target.value.trim();
            if (term && !searchHistory.includes(term)) {
                const updatedHistory = [term, ...searchHistory].slice(0, 5); // Keep only the latest 5 searches
                setSearchHistory(updatedHistory);
                localStorage.setItem(
                    "searchHistory",
                    JSON.stringify(updatedHistory)
                );
            }
            setSearchTerm(term);
        }
    };

    return (
        <div className={styles.Container}>
            <h1>Book List</h1>

            <div className={styles.Filter}>
                <label htmlFor="genre-filter">Filter By Genre:</label>
                <select
                    name="genre-filter"
                    value={selectedGenre}
                    onChange={handleGenreChange}
                >
                    <option value="all">All Genres</option>
                    {genres.map((genre) => (
                        <option key={genre.id} value={genre.id}>
                            {genre.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className={styles.search}>
                <input
                    type="text"
                    placeholder="Search books..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onKeyPress={handleSearchKeyPress}
                />
                <ul>
                    {searchHistory.map((item, index) => (
                        <li key={index} onClick={() => setSearchTerm(item)}>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>

            <ul className={styles.List}>
                {filteredBooks.map((book) => (
                    <li key={book.id} className={styles.Item}>
                        {book.title} - ${book.price}
                        <Link href={`/books/${book.id}`}>
                            <button className="blueButton">View Details</button>
                        </Link>
                    </li>
                ))}
            </ul>
            <Link href={`/`}>
                <button className="blueButton">Home Page</button>
            </Link>
        </div>
    );
}
