// pages/api/ai.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';
import clientPromise from '../../lib/mongodb';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).end(); // Method Not Allowed
    }
    console.log("DESCRIPTION: ", req.query.description);
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `List 3 wines that matches the following description: ${req.query.description}`,
            temperature: 0,
            max_tokens: 100,
        });

        const client = await clientPromise;
        const db = client.db();
        const collection = db.collection('wset'); 

        let result = response.data.choices[0].text;

        const wines = result ? result.split('\n').map(wine => wine.replace(/^\d+\.\s*/, '').trim()) : [];
        console.log('OpenAI: ', wines);

        const matches = wines.map(wine => {
            const pattern = new RegExp("\\b"+wine+"\\b", 'i');
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
