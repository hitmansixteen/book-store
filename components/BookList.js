import styles from "./List.module.css";

export default function BookList({ books }) {
    return (
        <div className={styles.List}>
            {books.map((book) => (
                <div key={book.id} className={styles.Item}>
                    <h2>{book.title}</h2>
                    <p>book.description</p>
                    <p>
                        <strong>Price:</strong> ${book.price}
                    </p>
                    <p>
                        <strong>Rating</strong> {book.rating}
                    </p>
                </div>
            ))}
        </div>
    );
}
