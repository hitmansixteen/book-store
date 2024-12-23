import { connectToDatabase } from "../../../../helpers/db";

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const { db } = await connectToDatabase();
        const book = await db.collection("books").findOne({ id: id });

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json(book);
    } catch (error) {
        console.error("Error fetching book:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
