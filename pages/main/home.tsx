import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import ThinkingDots from '../../components/dots';

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
  const router = useRouter();
  const [showExamples, setShowExamples] = useState(true);

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
    setShowExamples(false);  // hide the example divs

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

  function handleWineClick(wine: Wine) {
    localStorage.setItem('WINE' + wine._id, JSON.stringify(wine));
    router.push(`/wine/${wine._id}`);
  }


  return (
    <div className="mt-6">
      <div className="grid justify-center">
        {showExamples && (  // conditional rendering based on showExamples state
          <>
            <div className='grid justify-center mb-6'>
              <h1>Examples:</h1>
            </div>
            <div className="grid text-lightdijon max-w-sm ml- mr- mb-6 border-brendan rounded-lg shadow bg-brendan/90 dark:bg-brendan/90 dark:border-gray-700 sm:max-w-full">
              <button onClick={() => { setDescription('Red'); handleSubmit; }} onChange={handleDescriptionChange} className="grid justify-center">Red</button>
            </div>
            <div className="grid text-lightdijon max-w-sm ml- mr- mb-6 border-brendan rounded-lg shadow bg-brendan/90 dark:bg-brendan/90 dark:border-gray-700 sm:max-w-full">
              <button onClick={() => { setDescription('White'); handleSubmit; }} onChange={handleDescriptionChange} className="grid justify-center">White</button>
            </div>
            <div className="grid text-lightdijon max-w-sm ml- mr- mb-6 border-brendan rounded-lg shadow bg-brendan/90 dark:bg-brendan/90 dark:border-gray-700 sm:max-w-full">
              <button onClick={() => { setDescription('Sweet'); handleSubmit; }} onChange={handleDescriptionChange} className="grid justify-center">Sweet</button>
            </div>
            <div className="grid text-lightdijon max-w-sm ml- mr- mb-6 border-brendan rounded-lg shadow bg-brendan/90 dark:bg-brendan/90 dark:border-gray-700 sm:max-w-full">
              <button onClick={() => { setDescription('Dry'); handleSubmit; }} onChange={handleDescriptionChange} className="grid justify-center">Dry</button>
            </div>
          </>
        )}
        {!loading ? 
        wines.map((wine: Wine, index: number) => (
          <div key={index} className="grid max-w-sm ml-6 mr-6 mb-6 border-brendan rounded-lg shadow dark:bg-brendan/90 dark:border-gray-700 sm:max-w-full">
            <Link href='#' onClick={() => handleWineClick(wine)} className="ml-3 mr-3 mt-3 mb-3">
              <h5 className="mb-2 text-xl font-bold tracking-tight text-dijon dark:text-dijon sm:text-lg">{wine.title}</h5>
              <h5 className="mb-2 text-sm uppercase tracking-widest font-semibold tracking-tight text-lightdijon dark:text-lightdijon sm:text-xs">{wine.variety}</h5>
              <h5 className="mb-2 text-sm uppercase tracking-widest font-semibold tracking-tight text-lightdijon dark:text-lightdijon sm:text-xs">${wine.price}</h5>
              <h5 className="mb-2 text-sm font-semibold tracking-tight text-white dark:text-lightdijon sm:text-xs">{wine.description}</h5>
              <h5 className="btn btn-primary">View</h5>
            </Link>
          </div>
        ))
        : <ThinkingDots></ThinkingDots>}
      </div>
      <div className="fixed bottom-0 left-0 z-50 w-full max-w-lg mx-auto p-4 mb-16">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="block uppercase tracking-wide text-gray-700 text-sm font-bold" htmlFor="wine-description">
            Briefly describe your desired wine
          </label>
          <div className="md:col-span-2 flex flex-col md:flex-row items-start md:items-center">
            <input required value={description} onChange={handleDescriptionChange} className="text-sm block w-full p-2.5 dark:bg-white dark:text-black hover:bg-gray-100 focus:bg-gray-200 focus:outline-none mt-2 md:mt-0 md:ml-2" id="wine-description" type="text" placeholder='Type here' />
          </div>
          <button type="submit" className="md:col-start-2 md:col-end-3 uppercase tracking-widest grid justify-center text-center inline-flex items-center drop-shadow-xl text-xl text-black bg-dijon hover:bg-[#F8DE7F] focus:ring-4 focus:outline-none focus:ring-[#F8DE7F]/50 font-medium rounded-lg mt-2 py-2  text-center inline-flex items-center dark:focus:ring-[#3b5998]/55">
            Send
          </button>
        </form>
      </div>



    </div>
  );


}