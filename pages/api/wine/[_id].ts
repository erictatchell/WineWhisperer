import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from "mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end(); // Method Not Allowed
  }

  let id = req.query._id;

  if (!id) {
    return res.status(400).json({ error: 'Missing id in the query' });
  }

  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('wset');
    if (Array.isArray(id)) {
      id = id[0];
    }

    const wine = await collection.findOne({ _id: new ObjectId(id) });

    if (!wine) {
      return res.status(404).json({ error: 'Wine not found' });
    }

    res.status(200).json(wine);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
