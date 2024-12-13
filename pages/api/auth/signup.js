import { connectToDatabase } from "../../../helpers/db";
import { hash } from "bcryptjs";

// 'api/auth/signup' api (Resiters the new user)
export default async function handler(req, res) {

  if (req.method === "POST") {
    const { username, email, password } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({ message: "Missing fields" });
    }

    // Hasihing the password before putting it in the database 
    const hashedPassword = await hash(password, 12);

    const { db } = await connectToDatabase();

    // Checking if the user with the same email already exists
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
