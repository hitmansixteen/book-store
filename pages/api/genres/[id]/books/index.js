import { connectToDatabase } from '../../../../../helpers/db';

// '/api/genres/[id]/books' api (Fetching all the books of a specific genre)
export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { db } = await connectToDatabase();
    const books = await db.collection('books').find({ genreId: parseInt(id, 10) }).toArray();

    if (!books || books.length === 0) {
      return res.status(404).json({ message: 'No books found for this genre' });
    }

    res.status(200).json(books);
  } catch (error) {
    console.error('Error fetching books by genre:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
