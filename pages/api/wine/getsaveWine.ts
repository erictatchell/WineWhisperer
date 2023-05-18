import { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../../lib/mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email } = req.body;

        const client = await clientPromise;
        const db = client.db();

        const userExtrasCollection = db.collection('userExtras');

        const user = await userExtrasCollection.findOne({ email });

        if (user && user.saved) {
            res.status(200).json({ savedWines: user.saved });
        } else {
            res.status(404).json({ message: 'No saved wines found for this user' });
        }
    } else {
        res.status(400).json({ message: 'Only POST requests allowed' });
    }
}
