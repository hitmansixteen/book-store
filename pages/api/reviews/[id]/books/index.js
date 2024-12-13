import { connectToDatabase } from '../../../../../helpers/db';

// '/api/reviews/[id]/books' api (Fetching all the reviews of a specific book)
export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { db } = await connectToDatabase();
    const reviews = await db.collection('reviews').find({ bookId: parseInt(id, 10) }).toArray();

    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ message: 'No reviews found for this book' });
    }

    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
