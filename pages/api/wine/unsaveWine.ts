import { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../../lib/mongodb'

// Defines the API route that should be called by the client to get a response from the server
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { wineId, email } = req.body;
        const client = await clientPromise;
        const db = client.db();
        const userExtrasCollection = db.collection('userExtras');

        // Update the user document: remove the specified wine from the 'saved' array
        await userExtrasCollection.updateOne(
            { email },
            { $pull: { saved: wineId } }
        );
        res.status(200).json({ message: 'Wine unsaved successfully' });
    } else {
        res.status(400).json({ message: 'Only POST requests allowed' });
    }
}
