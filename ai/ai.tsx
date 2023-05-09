import axios from 'axios';
import dotenv from 'dotenv';
import mysql from 'mysql';

dotenv.config();

const connection = mysql.createConnection({
    host: process.env.MONGODB_HOST,
    user: process.env.MONGODB_USER,
    password: process.env.MONGODB_PASS,
    database: process.env.MONGODB_NAME,
});

connection.connect();

const getWineRecommendations = async (userInput: string) => {
    const prompt = ``;

    const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
        prompt,
        max_tokens: 50,
        temperature: 0.7,
    }, {
        headers: {
            'Authorization': `Bearer ${process.env.OPENAI_KEY}`,
            'Content-Type': 'application/json',
        },
    });

    const wineRecommendations = response.data.choices[0].text.trim().split('\n');

    let matchingWines: string[] = [];

    for (let wine of wineRecommendations) {
        wine = connection.escape(wine.trim());
        const query = `SELECT * FROM wines WHERE wine_name LIKE '%${wine}%';`;
        
        connection.query(query, (error: string, results: any) => {
            if (error) throw error;
            matchingWines = [...matchingWines, ...results];
        });
    }

    connection.end();

    return matchingWines;
};
