import { connectToDatabase } from "../../../helpers/db";
import { hash } from "bcryptjs";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { username, email, password } = req.body;

        if (!email || !password || !username) {
            return res.status(400).json({ message: "Missing fields" });
        }

        const hashedPassword = await hash(password, 12);

        const { db } = await connectToDatabase();

        const existingUser = await db.collection("users").findOne({ email });
        if (existingUser) {
            return res.status(422).json({ message: "User already exists!" });
        }

        await db.collection("users").insertOne({
            username,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({ message: "User created!" });
    }
    return res.status(405).json({ message: "Method not allowed" });
}
