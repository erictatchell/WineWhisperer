import { GetServerSideProps } from 'next';
import { getSession } from "next-auth/react";
import clientPromise from '../../lib/mongodb';

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

interface TopPicksProps {
  wines: Wine[];
}

export default function TopPicks({ wines }: TopPicksProps) {
    return (
        <div>
            <h1>Top Picks page</h1>
            {wines.map((wine: Wine, index: number) => (
                <div key={index}>
                    <h2>{wine.title}</h2>
                    <p>{wine.description}</p>
                    {/* You can add more fields here */}
                </div>
            ))}
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const client = await clientPromise;
    const db = client.db('Wine1'); // your database name
    const wines = await db
        .collection('wset')
        .find({})
        .limit(10)
        .toArray();

    return {
        props: {
            wines: JSON.parse(JSON.stringify(wines)),
        },
    };
};

