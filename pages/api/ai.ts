// pages/api/ai.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).end(); // Method Not Allowed
    }

    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${req.query.selection}${req.query.description}`,
            temperature: 0,
            max_tokens: 100,
        });

        res.status(200).json(response.data);
    } catch (error: any) {
        console.error(error);  // print the error to console
        res.status(500).json({ error: error.message }); // send error message in response
    }
}
