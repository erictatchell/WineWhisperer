import { useState, useEffect } from 'react';

export default function Home() {
  const [selection, setSelection] = useState('list');
  const [description, setDescription] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    switch (value) {
      case 'List 5 wines that match the description: ':
        setSelection('List 5 wines that match the description: ');
        setDescription(''); // clear description when option changes
        break;
      case 'List 1 wine that match the description: ':
        setSelection('List 1 wine that match the description: ');
        setDescription(''); // clear description when option changes
        break;
      case 'Staying on the topic of wine, suggest wines based on this prompt: ':
        setSelection('Staying on the topic of wine, suggest wines based on this prompt: ');
        break;
      default:
        setSelection('');
        break;
    }
  };

  const handleDescriptionChange = (e: any) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/ai?selection=${selection}&description=${description}`);

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const responseData = await response.json();
      setResult(responseData.choices[0].text);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <select value={selection} onChange={handleChange}>
          <option value="List 5 wines that match the description: ">List of 5 wines</option>
          <option value="List 1 wine that match the description: ">Single wine</option>
          <option value="Staying on the topic of wine, suggest wines based on this prompt: ">No option</option>
        </select>
        <textarea value={description} onChange={handleDescriptionChange} />
        <button type="submit">Get recommendations</button>
      </form>
      {loading ? <p>Thinking...</p> : <div>{result}</div>}
    </div>
  );
}
