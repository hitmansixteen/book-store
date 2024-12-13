import { connectToDatabase } from '../../../helpers/db';

// '/api/genres' api (Fetching all the genres)
export default async function handler(req, res) {
    
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { db } = await connectToDatabase();
    const books = await db.collection('genres').find({}).toArray();
    
    res.status(200).json(books);

  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
