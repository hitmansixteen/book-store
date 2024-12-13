import { connectToDatabase } from '../../../helpers/db';

// '/api/reviews' api (Fetching all the reviews)
export default async function handler(req, res) {
    
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { db } = await connectToDatabase();
    const reviews = await db.collection('reviews').find({}).toArray();
    
    res.status(200).json(reviews);

  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
