import React from 'react'
import stylingBook from './Book.module.css';

// Book Component
export const Book = (props) => {

  // Finding the author and genere of a specific book
  const author = props.authors.find(i=> i.id === props.details.authorId )
  const genre = props.genres.find(i=> i.id === props.details.genreId)

  return (
    <>

    <div key={props.details.id} className={stylingBook.bookCard} onClick={props.onClickBook}>
      
    <div className={stylingBook.bookTitle}>{props.details.title}</div>
    <div className={stylingBook.bookAuthor}>Author Name: {author.name}</div>
    <div className={stylingBook.bookGenre}>Genre: {genre.name}</div>
    <div className={stylingBook.bookDescription}>{props.details.description}</div>
    <div className={stylingBook.bookPrice}>${props.details.price}</div>
    <div className={stylingBook.bookRating}>Rating: {props.details.rating}★</div>
    </div>
    
    </>
  )
}

export default Book;
