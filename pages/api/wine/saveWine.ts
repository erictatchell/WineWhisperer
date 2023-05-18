import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, Db } from 'mongodb';
import { getSession } from 'next-auth/react';  // Import getSession
import clientPromise from '../../../lib/mongodb';

const saveWine = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const session = await getSession({ req });  // Get the session
    const { wineId } = req.body;
    const userEmail = session?.user?.email;  // Retrieve email from the session

    // Check if session exists
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      // connect to the database
      const client: MongoClient = await clientPromise;
      const db: Db = client.db();  // you may need to pass a database name here if your uri doesn't include one

      // find the userExtra document that matches the user's email
      const userExtra = await db.collection('userExtras').findOne({ email: userEmail });
      if (!userExtra) {
        // handle error
        return res.status(404).send('User not found');
      }

      // add the wine ID to the saved array
      await db.collection('userExtras').updateOne(
        { email: userEmail },
        { $addToSet: { saved: wineId } }
      );

      res.status(200).json({ message: 'Wine saved successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).end();  // Method Not Allowed
  }
};

export default saveWine;
