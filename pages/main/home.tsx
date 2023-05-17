import Link from 'next/link';
import Image from 'next/image'
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import ThinkingDots from '../../components/dots';
import { IconButton, ThemeProvider, createTheme, } from '@mui/material';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

const theme = createTheme({
  palette: {
    primary: {
      main: '#a89471',
    },
    secondary: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});

export default function Home() {
  const [selection, setSelection] = useState('list');
  const [description, setDescription] = useState('');
  const [pageDesc, setPageDesc] = useState('');

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
    setPageDesc(pageDesc);
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
    <div className="mt-5">
      <div className="grid justify-center mb-40">
        {showExamples && (  // conditional rendering based on showExamples state
          <div className='mx-6'>
            <div className='grid justify-center mb-6'>
              <h1>What wine are you looking for?</h1>
            </div>
            <div onClick={() => { setPageDesc('A wine that tastes good'); setDescription('A wine that tastes good'); handleSubmit; }} onChange={handleDescriptionChange} className="grid grid-cols-4 p-2 text-black max-w-sm ml- mr- mb-6 border-brendan rounded-lg shadow bg-dijon/50 dark:border-gray-700 sm:max-w-full">
              <button className="col-span-3">A wine that tastes good</button>
              <div className="justify-center grid">
                <button>
                  <ThemeProvider theme={theme}>
                    <ArrowCircleRightIcon fontSize="large" color="primary" />
                  </ThemeProvider>
                </button>
              </div>
            </div>
            <div onClick={() => { setPageDesc('A crisp and refreshing white that will impress my boss'); setDescription('A crisp and refreshing white that will impress my boss'); handleSubmit; }} onChange={handleDescriptionChange} className="grid grid-cols-4 p-2 text-black max-w-sm ml- mr- mb-6 border-brendan rounded-lg shadow bg-dijon/50 dark:border-gray-700 sm:max-w-full">
              <button className="col-span-3">A crisp and refreshing white wine that will impress my boss</button>
              <div className="justify-center grid">
                <button>
                  <ThemeProvider theme={theme}>
                    <ArrowCircleRightIcon fontSize="large" color="primary" />
                  </ThemeProvider>
                </button>
              </div>
            </div>
            <div onClick={() => { setPageDesc('A medium-bodied red with complex flavours of dark fruits and hints of oak'); setDescription('A medium-bodied red with complex flavours of dark fruits and hints of oak'); handleSubmit; }} onChange={handleDescriptionChange} className="grid grid-cols-4 p-2 text-black max-w-sm ml- mr- mb-6 border-brendan rounded-lg shadow bg-dijon/50 dark:border-gray-700 sm:max-w-full">
              <button className="col-span-3 justify-center">A medium-bodied red with complex flavours of dark fruits and hints of oak</button>
              <div className="justify-center grid">
                <button>
                  <ThemeProvider theme={theme}>
                    <ArrowCircleRightIcon fontSize="large" color="primary" />
                  </ThemeProvider>
                </button>
              </div>
            </div>
          </div>


        )}
        {!loading && wines.length != 0 ?
          <div className='text-center'>
            <div className='text-5xl mt-2'>“”</div>
            <div className=' mx-10 mb-5 font-medium'>{pageDesc}</div>
          </div>
          : <div></div>}

        {!loading ?

          wines.map((wine: Wine, index: number) => (
            <>
              <div key={index} onClick={() => handleWineClick(wine)} className={`relative p-5 mb-4 max-w-sm mx-5 bg-gradient-to-t from-dijon to-dijon/50 rounded-xl shadow-xl flex items-center space-x-4`}>

                <div className="flex-shrink-0">
                  <Image src="/white-sauvignon.png" alt="Wine image" width={50} height={50} />
                </div>
                <div>
                  <div className="text-md font-semibold text-black">{wine.title}</div>
                  <p className="text-sm uppercase tracking-widest font-medium text-gray">{wine.variety}</p>
                  <p className="text-sm text-gray-500 tracking-widest">${wine.price ? wine.price : 'No price listed'}</p>
                  <p className="text-md uppercase tracking-widest font-bold text-green">{wine.points} / 100</p>
                </div>
                <div className="absolute bottom-0 right-3 mb-4">
                  <IconButton href="/">
                    <button>
                      <ThemeProvider theme={theme}>
                        <ArrowCircleRightIcon fontSize="large" color="primary" />
                      </ThemeProvider>
                    </button>
                  </IconButton>
                </div>
              </div>
            </>
          ))
          : <ThinkingDots></ThinkingDots>}
      </div>
      <div className="fixed bottom-0 left-0 z-50 w-full">
        <div className="max-w-lg mx-auto p-4 mb-16 bg-black/10 backdrop-blur-md">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2 flex flex-col md:flex-row items-start md:items-center">
              <input required value={description} onChange={handleDescriptionChange} className="text-sm block w-full p-2.5 dark:bg-white dark:text-black hover:bg-gray-100 focus:bg-gray-200 focus:outline-none mt-2 md:mt-0 md:ml-2" id="wine-description" type="text" placeholder='Type here' />
            </div>
            <button type="submit" className="md:col-start-1 md:col-end-3 uppercase tracking-widest grid justify-center text-center inline-flex items-center drop-shadow-xl text-xl text-black bg-dijon hover:bg-[#F8DE7F] focus:ring-4 focus:outline-none focus:ring-[#F8DE7F]/50 font-medium rounded-lg mt-2 py-2  text-center inline-flex items-center dark:focus:ring-[#3b5998]/55">
              Discover
            </button>
          </form>
        </div>
      </div>
    </div >
  );


}