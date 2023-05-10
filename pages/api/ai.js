import { MongoClient } from 'mongodb';
import openai from 'openai';

openai.apiKey = process.env.OPENAI_API_KEY;

export default async (req, res) => {
    if (req.method === 'POST') {
        const { selectedPrompt, description } = req.body;

        let prompt = '';
        switch (selectedPrompt) {
            case 'list':
                prompt = `Give me a specific list of wines that match the following description: ${description}`;
                break;
            case 'single':
                prompt = `Give me a single specific wine that matches the following description: ${description}`;
                break;
            case 'other':
                prompt = `Staying strictly on the topic of wine, recommend me wines based on the following description: ${description}`;
                break;
        }

        const response = await openai.Completion.create({
            engine: 'davinci-codex',
            prompt,
            max_tokens: 70,
            temperature: 0.7,
        });

        const wineRecommendations = response.data.choices[0].text.trim().split('\n');

        const client = new MongoClient(process.env.MONGODB_URI);
        let matchingWines = [];

        try {
            await client.connect();
            const database = client.db();
            const collection = database.collection('wine');

            for (let wine of wineRecommendations) {
                const wineName = new RegExp(wine.trim(), 'i');
                const results = await collection.find({ title: wineName }).toArray();
                matchingWines = [...matchingWines, ...results];
            }

            res.status(200).json(matchingWines);

        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'An error occurred when fetching the recommendations.' });

        } finally {
            await client.close();
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
};
