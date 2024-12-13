import { getAuthors } from "@/lib/books";

export default function handler(req, res) {
    const authors = getAuthors();

    res.status(200).json(authors);
}
