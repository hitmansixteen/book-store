import { getToken } from 'next-auth/jwt';
import { connectToDatabase } from '../../../../helpers/db';
import { getSession } from 'next-auth/react';

// '/api/users/ history' api
export default async function handler(req, res) {

  if (req.method === 'GET') {
    // Fetching the search history of a logged-in user 

    const session = await getSession({ req });

    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { db } = await connectToDatabase();
    const collection = db.collection('history');
    const userId = session.user.id; 

    try {
      const history = await collection.findOne({ userId });

      res.status(200).json(history?.queries || []);

    } catch (error) {
      console.error('Error retrieving search history:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
    
  } else if (req.method === 'POST') {

    // Posting the updated search history of a loggeed-in user into the database

    const { db } = await connectToDatabase();
    const collection = db.collection('history');
    const token = await getToken({req})
    const userId = token.id
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ message: 'Query is required' });
    }

    try {
      const userHistory = await collection.findOne({ userId });
      console.log(userHistory)

      let updatedQueries = userHistory?.queries || [];
      updatedQueries.unshift(query); 

      if (updatedQueries.length > 5) {
        updatedQueries = updatedQueries.slice(0, 5); 
      }

      console.log(updatedQueries);

      await collection.updateOne(
        { userId },
        { $set: { userId, queries: updatedQueries } },
        { upsert: true }
      );

      res.status(200).json({ message: 'Query added to history', queries: updatedQueries });

    } catch (error) {

      console.error('Error adding query to history:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
    
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
