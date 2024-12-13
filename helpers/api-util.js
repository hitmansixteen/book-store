// Api-Util to contain all the api calling (except the user authentication)

export async function getAllBooks(){

  try {
    const response = await fetch('http://localhost:3000/api/books');

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const books = await response.json();
    return books;

  } catch (error) {
    console.error('Failed to fetch books:', error);

  }
}

export async function getAllAuthors(){
  try {
    const response = await fetch('http://localhost:3000/api/authors');

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const books = await response.json();
    return books;

  } catch (error) {
    console.error('Failed to fetch books:', error);

  }
}

export async function getAllGenres(){
  try {
    const response = await fetch('http://localhost:3000/api/genres');

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const books = await response.json();
    return books;

  } catch (error) {
    console.error('Failed to fetch books:', error);

  }
}

export async function getAllReviews() {
  try {
    const response = await fetch('http://localhost:3000/api/reviews');

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const books = await response.json();
    return books;

  } catch (error) {
    console.error('Failed to fetch books:', error);

  }
}

export async function getAllUsers() {
  try {
    const response = await fetch('http://localhost:3000/api/users');

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const books = await response.json();
    return books;

  } catch (error) {
    console.error('Failed to fetch books:', error);

  }
}

export async function getBookById(id){
  try {
    const response = await fetch(`http://localhost:3000/api/books/${id}`);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const book = await response.json();
    return book;
  } catch (error) {
    console.error(`Failed to fetch book with ID ${id}:`, error);
  }
}

export async function getBooksByGenreId(id) {
  try {
    const response = await fetch(`http://localhost:3000/api/genres/${id}/books`);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const books = await response.json();
    return books;
  } catch (error) {
    console.error(`Failed to fetch books for genre ID ${id}:`, error);
  }
}

export async function getAuthorById(id){
  try {
    const response = await fetch(`http://localhost:3000/api/authors/${id}`);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.author;
  } catch (error) {
    console.error(`Failed to fetch author with ID ${id}:`, error);
  }
}

export async function getReviewByBookId(id){
  try {
    const response = await fetch(`http://localhost:3000/api/reviews/${id}/books`);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const reviews = await response.json();
    return reviews;
  } catch (error) {
    console.error(`Failed to fetch reviews for book ID ${id}:`, error);
  }
}

export async function getFeaturedBooks(){
  try {
    const books = await getAllBooks();
    return books.filter(i => i.isFeatured);
  } catch (error) {
    console.error('Failed to fetch featured books:', error);
  }
}