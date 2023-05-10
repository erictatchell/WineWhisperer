import axios from 'axios';
import { MongoClient } from 'mongodb';

export const getWineRecommendations = async (userInput) => {
    const [selectedPrompt, ...descriptionParts] = userInput.split(': ');
    const description = descriptionParts.join(': ');

    let prompt = ``;
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
    const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
        prompt,
        max_tokens: 70,
        temperature: 0.7,
    }, {
        headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
        },
    });

    const wineRecommendations = response.data.choices[0].text.trim().split('\n');

    const client = new MongoClient(process.env.MONGODB_URI);
    let matchingWines = [];

    try {
        await client.connect();
        const database = client.db(process.env.MONGODB_DATABASE);
        const collection = database.collection('wines');

        for (let wine of wineRecommendations) {
            const wineName = new RegExp(wine.trim(), 'i');
            const results = await collection.find({ wine_name: wineName }).toArray();
            matchingWines = [...matchingWines, ...results];
        }
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }

    return matchingWines;
};
