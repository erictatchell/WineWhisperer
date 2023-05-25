import Link from 'next/link';
import Image from 'next/image'
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import ThinkingDots from '../../components/loading';
import { IconButton, ThemeProvider, createTheme, } from '@mui/material';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import WineCard from '../../components/winecard';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF8B9DC',
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
  const [loading, setLoading] = useState(false);
  const [wines, setWines] = useState<Wine[]>([]);  // add this line
  const [showExamples, setShowExamples] = useState(true);

  const handleDescriptionChange = (e: any) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setShowExamples(false);  // hide the example divs
    setPageDesc(description);
    try {
      const response = await fetch(`/api/ai?selection=${selection}&description=${description}&numWines=3`);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const documents = await response.json();
      setWines(documents);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-5">
      <div className="grid justify-center mb-40">
        {showExamples && (  // conditional rendering based on showExamples state
          <div className='mx-6'>
            <div className='grid justify-center mb-6 text-dijon/95'>
              <h1>
                What wine are you looking for?
              </h1>
            </div>
            <div onClick={() => { setPageDesc('A wine that tastes good'); setDescription('A wine that tastes good'); handleSubmit; }} onChange={handleDescriptionChange} className="grid grid-cols-4 p-2 font-semibold text-dijon/95 max-w-sm ml- mr- mb-6 border border-dijon/95 rounded-lg backdrop-blur-sm shadow bg-brendan/50 sm:max-w-full">
              <button className="col-span-3">
                A wine that tastes good
              </button>
              <div className="justify-center grid">
                <button>
                  <ThemeProvider theme={theme}>
                    <ArrowCircleRightIcon fontSize="large" color="primary" opacity='0.8' />
                  </ThemeProvider>
                </button>
              </div>
            </div>
            <div onClick={() => { setPageDesc('A crisp and refreshing white that will impress my boss'); setDescription('A crisp and refreshing white that will impress my boss'); handleSubmit; }} onChange={handleDescriptionChange} className="grid grid-cols-4 p-2 font-semibold backdrop-blur-md text-dijon/95 max-w-sm ml- mr- mb-6 border border-dijon/95 rounded-lg backdrop-blur-sm shadow bg-brendan/50 sm:max-w-full">
              <button className="col-span-3">
                A crisp and refreshing white wine that will impress my boss
              </button>
              <div className="justify-center grid">
                <button>
                  <ThemeProvider theme={theme}>
                    <ArrowCircleRightIcon fontSize="large" color="primary" />
                  </ThemeProvider>
                </button>
              </div>
            </div>
            <div onClick={() => { 
              setPageDesc('A medium-bodied red with complex flavours of dark fruits and hints of oak'); 
              setDescription('A medium-bodied red with complex flavours of dark fruits and hints of oak'); 
              handleSubmit; }} 
              onChange={handleDescriptionChange} className="grid font-semibold grid-cols-4 p-2 backdrop-blur-md text-dijon/95 max-w-sm ml- mr- mb-6 border border-dijon/95 rounded-lg backdrop-blur-sm shadow bg-brendan/50 sm:max-w-full"
              >
              <button className="col-span-3 justify-center">
                A medium-bodied red with complex flavours of dark fruits and hints of oak
              </button>
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
            <div className='text-5xl mt-2 text-lightdijon '>“”</div>
            <div className=' mx-10 mb-5 font-medium text-lightdijon '>{pageDesc}</div>
          </div>
          : <div></div>}
        {!loading ?
          wines.map((wine: Wine, index: number) => (
            <WineCard key={index} wine={wine} index={index} />
          ))
          : <ThinkingDots></ThinkingDots>}
      </div>
      <div className="fixed bottom-0 left-0 z-50 w-full">
        <div className="max-w-lg mx-auto p-4 mb-16 bg-black/10 backdrop-blur-md">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2 flex flex-col md:flex-row items-start md:items-center">
              <input 
                required value={description} 
                onChange={handleDescriptionChange} 
                className="text-sm block w-full border-dijon/95 rounded-lg bg-transparent border p-2.5 text-lightdijon hover:bg-black focus:bg-transparent mt-2 md:mt-0 md:ml-2" id="wine-description" type="text" placeholder='Briefly describe your desired wine' />
            </div>
            <button type="submit" className="md:col-start-1 md:col-end-3 uppercase tracking-widest grid justify-center text-center inline-flex items-center drop-shadow-xl text-xl text-black bg-dijon hover:bg-dijon focus:ring-4 focus:outline-none focus:ring-[#F8DE7F]/50 font-medium rounded-lg mt-2 py-2  text-center inline-flex items-center dark:focus:ring-[#3b5998]/55">
              Discover
            </button>
          </form>
        </div>
      </div>
    </div >
  );
}