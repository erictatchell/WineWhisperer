import {useRouter} from 'next/router';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { GetServerSideProps } from 'next';
import CopyButton from '../../components/copybutton';

// The properties our WinePage component expects to receive
interface WinePageProps {
  wine: Wine;
}

export default function WinePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session ? session.user : null;
  const [isSaved, setIsSaved] = useState(false);
  const [wine, setWine] = useState<Wine | null>(null);

  // useEffect hook to run side-effects in function components, in this case we're reading the wine and its status from local storage
  useEffect(() => {
    if (router.isReady) {
      const storedWine = localStorage.getItem('WINE' + router.query._id);
      if (storedWine) {
        setWine(JSON.parse(storedWine));
      }

      const savedInLocalStorage = localStorage.getItem('WINE_SAVED_' + router.query._id);

      if (savedInLocalStorage) {
        setIsSaved(true);
      } else {
        checkSaveWine();
      }
    }
  }, [router.isReady, router.query._id]);

  // Function to check if the current wine is saved by the user on the server
  async function checkSaveWine() {
    if (user) {
      const res = await fetch('/api/wine/getsaveWine', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user.email }),
      });

      const { saveWines } = await res.json();

      if (saveWines.includes(router.query._id)) {
        setIsSaved(true);
        localStorage.setItem('WINE_SAVED_' + router.query._id, 'true');
      } else {
        setIsSaved(false);
        localStorage.removeItem('WINE_SAVED_' + router.query._id);
      }
    }
  }

  // Function to save or un-save the current wine to the server
  async function saveWineId() {
    try {
      if (user && wine) {
        if (isSaved) {
          const res = await fetch('/api/wine/unsaveWine', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ wineId: wine._id, email: user.email }),
          });
          if (res.ok) {
            setIsSaved(false);
          }
        } else {
          // If the wine is not saved, we save it to the server
          const res = await fetch('/api/wine/saveWine', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ wineId: wine._id, email: user.email }),
          });
          if (res.ok) {
            setIsSaved(true);
          }
        }
      }
    } catch (error) {
      console.log('An error occurred while trying to save the wine', error);
    }
  }
  // If the wine is not loaded yet, we show a loading message
  if (!wine) {
    return <div>Loading...</div>;
  }
  // Renders the information about the wine
  return (
    <div className="flex flex-col md:flex-row mx-8 items-center mb-12 mt-10 justify-center">
      <div className='bg-lightdijon/20 backdrop-blur-md py-3 rounded-xl'>
        <div className="md:w-1/2 flex justify-center">
          <img src={wine.image} alt={wine.title} className="w-32 md:w-64" />
        </div>
        <div className="md:w-1/2 text-center md:text-left px-4">
          <h1 className="text-2xl text-lightdijon  font-bold mb-2">
            {wine.title}
          </h1>
          <p className="text-xl text-lightdijon mb-2 ">
            {wine.variety}
          </p>
          <p className="text-lg text-lightdijon mb-4">
            ${wine.price}
          </p>
          <button className="px-3 uppercase tracking-widest justify-center text-center items-center drop-shadow-xl text-xl text-black bg-dijon/70 hover:bg-[#F8DE7F] focus:ring-4 focus:outline-none focus:ring-[#F8DE7F]/50 font-medium rounded-xl mb-6 py-2  text-center inline-flex dark:focus:ring-[#3b5998]/55" onClick={saveWineId}>
            {isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </button>
          <CopyButton/>
          <div className="w-100 text-gray-900 bg-lightdijon shadow-xl border border-brendan rounded-lg ">
            <div className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-brendan">
              <h1 className='mr-2 uppercase tracking-widest text-xs'>
                country:
              </h1>
              {wine.country}
            </div>
            <div className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-brendan">
              <h1 className='mr-2 uppercase tracking-widest text-xs'>
                region:
              </h1>
              {wine.region_1}
            </div>
            <div className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-brendan">
              <h1 className='mr-2 uppercase tracking-widest text-xs'>
                winery:
              </h1>
              {wine.winery}
            </div>
            <h1 className='ml-4 mr-2 mt-3 font-bold uppercase tracking-widest text-sm'>
              {wine.points} / 100 from {wine.taster_twitter_handle}:
            </h1>
            <div>
              <div className="relative inline-flex items-center w-full px-4 py-4 text-md font-medium border-b border-brendan">
                {wine.description}
              </div>
            </div>

            <div>
      { wine.eco && (
        <div>
          <h1 className='ml-4 mr-2 mt-3 font-bold uppercase tracking-widest text-sm'>
            Sustainability:
          </h1>
          <div className="relative inline-flex items-center w-full px-4 py-4 text-md font-medium border-b border-brendan">
            {wine.blurb}
          </div>
        </div>
      )}
    </div>

          </div>
        </div>
      </div>
    </div>
  );
}

// Function to get the wine details server-side before rendering the page
export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context.params) {
    return {
      notFound: true,
    };
  }

  const { _id } = context.params;
  const res = await fetch(`http://2800-202310-bby-29.vercel.app/api/wine/${_id}`);
  const wine: Wine = await res.json();

  if (!wine) {
    return {
      notFound: true,
    };
  }
  return { props: { wine } };
};

