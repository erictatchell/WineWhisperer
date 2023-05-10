import { useState } from 'react';

export default function Home() {
    const [selectedPrompt, setSelectedPrompt] = useState('list');
    const [description, setDescription] = useState('');
    const [wineResults, setWineResults] = useState<Wine[]>([]);

    const handleDropdownChange = (event: any) => {
        setSelectedPrompt(event.target.value);
    };

    const handleInputChange = (event: any) => {
        setDescription(event.target.value);
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const res = await fetch('/api/ai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ selectedPrompt, description }),
        });

        const wineData: Wine[] = await res.json();
        setWineResults(wineData);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <select value={selectedPrompt} onChange={handleDropdownChange}>
                    <option value="list">List of 5 wines</option>
                    <option value="single">Single wine</option>
                    <option value="other">No option</option>
                </select>
                <textarea value={description} onChange={handleInputChange} />
                <button type="submit">Get recommendations</button>
            </form>
            <div>
                {wineResults.map((wine) => (
                    <div key={wine._id}>{wine.title}</div>
                ))}
            </div>
        </div>
    );
}
