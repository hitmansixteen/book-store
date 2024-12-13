import { connectToDatabase } from '../../../helpers/db';

// '/api/authors' api (Fetching all the authors)
export default async function handler(req, res) {
    
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { db } = await connectToDatabase();
    const authors = await db.collection('authors').find({}).toArray();
    
    res.status(200).json(authors);

  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
