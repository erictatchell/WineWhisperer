import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import saveWineId from '../../components/winecard'

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

interface WinePageProps {
  wine: Wine;
}

export default function WinePage() {
  const router = useRouter();
  const [wine, setWine] = useState<Wine | null>(null);

  useEffect(() => {
    if (router.isReady) {
      const storedWine = localStorage.getItem('WINE' + router.query._id);
      if (storedWine) {
        setWine(JSON.parse(storedWine));
      }
    }
  }, [router.isReady, router.query._id]);

  


  if (!wine) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col md:flex-row mx-8 items-center mb-12 justify-center">
      <div className="md:w-1/2 flex justify-center">
        <img src={'/white-sauvignon.png'} alt={wine.title} className="w-32 md:w-64" />
      </div>
      <div className="md:w-1/2 text-center md:text-left px-4">
        <h1 className="text-2xl font-bold mb-2">{wine.title}</h1>
        <p className="text-xl mb-2 ">{wine.variety}</p>
        <p className="text-lg mb-4">${wine.price}</p>
        <button onClick={() => saveWineId} type="submit" className="px-3 uppercase tracking-widest justify-center text-center inline-flex items-center drop-shadow-xl text-xl text-black bg-dijon hover:bg-[#F8DE7F] focus:ring-4 focus:outline-none focus:ring-[#F8DE7F]/50 font-medium rounded-lg mb-6 py-2  text-center inline-flex items-center dark:focus:ring-[#3b5998]/55">
          Save
        </button>
        <div className="w-100 text-gray-900 bg-lightdijon shadow-xl border border-brendan rounded-lg ">
          <div className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-brendan">
            <h1 className='mr-2 uppercase tracking-widest text-xs'>country:</h1>
            {wine.country}
          </div>
          <div className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-brendan">
            <h1 className='mr-2 uppercase tracking-widest text-xs'>region:</h1>
            {wine.region_1}
          </div>
          <div className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-brendan">
            <h1 className='mr-2 uppercase tracking-widest text-xs'>winery:</h1>
            {wine.winery}
          </div>
          <h1 className='mr-2 mt-3 uppercase tracking-widest text-sm'>{wine.points} / 100 from {wine.taster_twitter_handle}:</h1>

          <div>
            <div className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-brendan">
              {wine.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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


