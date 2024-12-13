require("dotenv").config(); // Load environment variables from .env
const { MongoClient } = require("mongodb");
const fs = require("fs");

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

console.log("MONGODB_URI:", uri); // Debugging line
console.log("MONGODB_DB:", dbName); // Debugging line

const data = JSON.parse(fs.readFileSync("books.json", "utf-8"));

async function insertData() {
    const client = new MongoClient(uri, { useUnifiedTopology: true });

    try {
        await client.connect();
        console.log("Connected to MongoDB!");
        const db = client.db(dbName);

        await db.collection("books").insertMany(data.books);
        console.log("Books inserted!");
        await db.collection("genres").insertMany(data.genres);
        console.log("Genres inserted!");
        await db.collection("authors").insertMany(data.authors);
        console.log("Authors inserted!");
        await db.collection("reviews").insertMany(data.reviews);
        console.log("Reviews inserted!");
        await db.collection("users").insertMany(data.users);
        console.log("Users inserted!");
    } catch (err) {
        console.error("Error inserting data:", err);
    } finally {
        await client.close();
        console.log("MongoDB connection closed.");
    }
}

insertData();
