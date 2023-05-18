// pages/api/saveWine.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise;
    const db = client.db('Wine1');

    if (req.method === 'POST') {
        const { wineId } = req.body;

        await db.collection('wset').updateOne({ _id: wineId }, { $set: { saved: true } });

        res.status(200).json({ message: 'Wine saved successfully' });
    } else {
        res.status(400).json({ message: 'Only POST requests allowed' });
    }
}
