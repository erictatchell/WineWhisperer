import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient, Db } from 'mongodb';
import clientPromise from '../../../lib/mongodb';
import { useSession } from 'next-auth/react';

const saveWine = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { wineId } = req.body;
        const { data: session } = useSession()
        const user = session ? session.user : null;

        try {
            // connect to the database
            const client: MongoClient = await clientPromise;
            const db: Db = client.db();  // you may need to pass a database name here if your uri doesn't include one

            // find the userExtra document that matches the user's email
            const userExtra = await db.collection('userExtras').findOne({ email: user?.email });
            if (!userExtra) {
                // handle error
                return res.status(404).send('User not found');
            }

            // add the wine ID to the saved array
            await db.collection('userExtras').updateOne(
                { email: user?.email },
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
