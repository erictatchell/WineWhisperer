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
    const numWines = Number(req.query.numWines) || 5;

    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${req.query.selection}${req.query.description}`,
            temperature: 0,
            max_tokens: 100,
        });

        const client = await clientPromise;
        const db = client.db(); // replace 'yourDbName' with your actual database name
        const collection = db.collection('wset'); // replace 'yourCollectionName' with your actual collection name

        let result = response.data.choices[0].text;
        console.log(result);

        // Split the string into an array of wines, remove leading numbers, and trim extra white space
        const wines = result ? result.split('\n').map(wine => wine.replace(/^\d+\.\s*/, '').trim()) : [];
        console.log(wines);

        const pipeline = [
            {
                $match: {
                    $or: wines.map(wine => {
                        const pattern = new RegExp(wine, 'i'); // create a case-insensitive regex pattern
                        return { $or: [{ title: pattern }, { variety: pattern }] };
                    }),
                },
            },
            {
                $sample: { size: numWines },
            },
        ];

        const documents = await collection.aggregate(pipeline).toArray();



        console.log("MongoDB documents: ", documents);

        res.status(200).json(documents);
    } catch (error: any) {
        console.error(error);  // print the error to console
        res.status(500).json({ error: error.message }); // send error message in response
    }
}
