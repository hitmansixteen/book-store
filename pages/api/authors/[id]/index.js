import { connectToDatabase } from "../../../../helpers/db";

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method !== "GET") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const { db } = await connectToDatabase();
        const author = await db.collection("authors").findOne({ id: id });

        if (!author) {
            return res.status(404).json({ message: "Author not found" });
        }

        const books = await db
            .collection("books")
            .find({ authorId: id })
            .toArray();

        res.status(200).json({ author, books });
    } catch (error) {
        console.error("Error fetching author:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
