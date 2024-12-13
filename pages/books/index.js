import React, { useState, useEffect } from "react";
import styling from "@/styles/General.module.css";
import stylingBook from "@/components/Book/Book.module.css";
import Book from "@/components/Book/book";
import { useRouter } from "next/router";
import { getAllBooks, getAllAuthors, getAllGenres } from "@/helpers/api-util";
import { useSession } from "next-auth/react"; 

// '/books' page (shows all the books)
const Books = (props) => {
  const router = useRouter();
  const { genre } = router.query;

  const { data: session, status } = useSession();

  const [selectedGenre, setSelectedGenre] = useState(genre || "");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState(props.books);
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    if (genre) {
      setSelectedGenre(genre);
      setSearchTerm("");
    }

    if (session) {
      fetchRecentSearches();
    }

  }, [genre, session]);

  // Fetching the user history
  const fetchRecentSearches = async () => {
    try {
      const response = await fetch("/api/users/history", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${session?.accessToken}`, 
        },
      });

      if (response.ok) {

        const data = await response.json();
        setRecentSearches(data); 
        
      } else {
        console.error("Failed to fetch recent searches.");
      }
    } catch (error) {
      console.error("Error fetching recent searches:", error);
    }
  };

  // Filtering thorugh the genre
  const handleGenreChange = () => {
    const newFilteredBooks = props.books.filter((book) => {

      const genreMatch = selectedGenre ? book.genreId == selectedGenre : true;
      return genreMatch;

    });
    setFilteredBooks(newFilteredBooks);
    setSearchTerm("");
  };


  // Handles the serach bar
  const searchBook = async () => {

    const newFilteredBooks = filteredBooks.filter((book) => {

      const searchMatch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
      return searchMatch;

    });
    setFilteredBooks(newFilteredBooks);

    if(searchTerm){
      if (session) {
        await addSearchQueryToDatabase(searchTerm);
      }

      const updatedSearches = [...recentSearches, searchTerm].slice(-5);
      setRecentSearches(updatedSearches);
      
    }   
    setSearchTerm("")

  }

  // Update the search history of a logged-in user
  const addSearchQueryToDatabase = async (query) => {
    try {
      const response = await fetch("/api/users/history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session?.accessToken}`, 
        },
        body: JSON.stringify({ query }),
      });

      if (response.ok) {
        console.log("Search query added to history");
      } else {
        console.error("Failed to add search query to history.");
      }
    } catch (error) {
      console.error("Error adding search query to database:", error);
    }
  };

  const bookClick = (id) => {
    router.push("/books/" + id);
  };

  useEffect(() => {
    handleGenreChange()
  },[selectedGenre])


  return (
    <>
      <header className={styling.heading}>All Books Page</header>

      <div className={styling.filterContainer}>

        <select className={styling.dropdown} value={selectedGenre} 
        onChange={(e) => setSelectedGenre(e.target.value)} >
          
          <option value="">All Genres</option>
          {props.genres.map((genre) => 
            (<option key={genre.id} value={genre.id}>{genre.name}</option>)
          )}

        </select>

        <input
          type="text" className={styling.searchBar} placeholder="Search by title..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button className={styling.searchButton} onClick={searchBook}>Search</button>
      </div>

      {session && (
        <div className={styling.recentSearchesContainer}>
          <div className={styling.recentSearches}>
            <h3>Recent Searches</h3>
            <ul>
              {recentSearches.map((term, index) => (
                <li key={index}>{term}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className={stylingBook.bookList}>

        {filteredBooks.map((book) => (
          <Book key={book.id} details={book} authors={props.authors} genres={props.genres}
          onClickBook={() => bookClick(book.id)}/>

        ))}

      </div>

    </>
  );
}

export async function getStaticProps() {

  const dataBooks = await getAllBooks();
  const dataAuthors = await getAllAuthors();
  const dataGenres = await getAllGenres();

  if (!dataBooks || !dataAuthors || !dataGenres) {
    return {
      notFound:true
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

export default Books
