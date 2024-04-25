import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import clientPromise from '../../lib/mongodb';

// Creates an instance of the OpenAI client class
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).end();
    }
    console.log("DESCRIPTION: ", req.query.description);
    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: `List 10 DISTINCT common wines that best fits this prompt: ${req.query.description}` }],
            model: "gpt-3.5-turbo",
            max_tokens: 300,
            temperature: 0.5
        });

        const client = await clientPromise;
        const db = client.db();
        const collection = db.collection('wset');

        const result = completion.choices[0].message.content;

        const wines = result ? result.split('\n').map(wine => wine.replace(/^\d+\.\s*/, '').trim()) : [];
        console.log('OpenAI: ', wines);

        // Query the MongoDB database to get the wine suggestions
        const matches = wines.map(wine => {
            const pattern = new RegExp("\\b" + wine + "\\b", 'i');
            return {
                $or: [
                    {
                        title: pattern,
                        variety: { $not: pattern }
                    },
                    {
                        title: { $not: pattern },
                        variety: pattern
                    }
                ]
            };
        });

        const pipeline = [
            { $match: { $or: matches } },
            { $sample: { size: 3 } }
        ];
        const documents = await collection.aggregate(pipeline).toArray();
        console.log("MongoDB documents: ", documents);
        res.status(200).json(documents);
    } catch (error: any) {
        console.error(error);  // print the error to console
        res.status(500).json({ error: error.message }); // send error message in response
    }
}
