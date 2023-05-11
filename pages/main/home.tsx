import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Wine {
  _id: string;
  id: number;
  country: string;
  description: string;
  designation: string;
  points: number;
  price: number;
  province: string;
  region_1: string;
  region_2: string;
  taster_name: string;
  taster_twitter_handle: string;
  title: string;
  variety: string;
  winery: string;
}

export default function Home() {
  const [selection, setSelection] = useState('list');
  const [description, setDescription] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [wines, setWines] = useState<Wine[]>([]);  // add this line
  const [numWines, setNumWines] = useState(5);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
  
    switch (value) {
      case 'List 5 wines that match the description: ':
        setSelection('List 5 wines that match the description: ');
        setDescription(''); // clear description when option changes
        setNumWines(5);
        break;
      case 'List 1 wine that match the description: ':
        setSelection('List 1 wine that match the description: ');
        setDescription(''); // clear description when option changes
        setNumWines(1);
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
      const response = await fetch(`/api/ai?selection=${selection}&description=${description}&numWines=${numWines}`);

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const documents = await response.json();
      setWines(documents);  // set the state here
      // setResult(documents.map((doc: { title: any; }) => doc.title).join(', ')); // remove this line
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
      {loading ? (
        <p>Thinking...</p>
      ) : (
        <div className="grid justify-center">
          {/* Mapping over the wines array and creating a card for each wine */}
          {wines.map((wine: Wine, index: number) => (
            <div key={index} className="grid mb-6 max-w-sm p-6 bg-white border border-brendan rounded-lg shadow dark:bg-brendan/90 dark:border-gray-700">
              <a href="#">
                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-dijon dark:text-dijon">{wine.title}</h5>
              </a>
              <h1 className='text-xl font-semibold text-white'>{wine.taster_twitter_handle ? `from ${wine.taster_twitter_handle}` : ''} </h1>
              <p className="mb-3 font-normal text-lightdijon dark:text-lightdijon">{wine.description}</p>
              <Link href="#" className="inline-flex items-center text-dijon hover:underline">
                View
              </Link>
              <h1 className='text-dijon' >Score: {wine.points}</h1>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}