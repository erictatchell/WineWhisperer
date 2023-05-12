import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

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

  const saveWine = async (wineId: string, userId: string) => {
    const response = await fetch('/api/save-wine', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ wineId, userId })
    });

    if (!response.ok) {
      throw new Error('Failed to save wine');
    }
  }

  if (!wine) {
    return <div>Loading...</div>;
  }
  return (
    <div className='grid justify-center'>
      <div className='mt-3 flex justify-center'>
        <h2 className='tracking-wide uppercase font-bold text-xl'>{wine.title}</h2>
        <h2 className='mt-3 tracking-wide uppercase font-bold text-sm'>{wine.variety}</h2>
      </div>
      <div>
        <button onClick={() => saveWine(wine._id, 'userId')}>Save</button>
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


