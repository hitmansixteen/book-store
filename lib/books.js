import fs from "fs";
import path from "path";

export function getBooks() {
    const filePath = path.join(process.cwd(), "books.json");
    const jsonData = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(jsonData);

    return data.books;
}

export function getGenres() {
    const filePath = path.join(process.cwd(), "books.json");
    const jsonData = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(jsonData);

    return data.genres;
}

export function getGenreById(genreID) {
    const filePath = path.join(process.cwd(), "books.json");
    const jsonData = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(jsonData);

    const genre = data.genres.find((genre) => genre.id === genreID);
    return genre ? genre : "Unknown Genre";
}

export function getAuthorById(authorID) {
    const filePath = path.join(process.cwd(), "books.json");
    const jsonData = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(jsonData);

    const author = data.authors.find((author) => author.id === authorID);
    return author ? author : "Unknown author";
}

export function getAuthors() {
    const filePath = path.join(process.cwd(), "books.json");
    const jsonData = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(jsonData);

    return data.authors;
}
