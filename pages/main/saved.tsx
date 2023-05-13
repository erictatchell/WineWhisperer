// Importing necessary modules and functions from Next.js and next-auth
import { GetServerSideProps } from 'next';
import { getSession } from "next-auth/react";

// Importing the MongoClient Promise that was set up in the mongodb.tsx file
import clientPromise from '../../lib/mongodb';
import Link from 'next/link';
import { useRouter } from 'next/router';

// Defining a TypeScript interface for the structure of a wine object
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

// Defining a TypeScript interface for the props that the TopPicks component will receive
interface SavedProps {
    wines: Wine[];
}


// The main TopPicks component which receives an array of wine objects as a prop
/** TODO */
export default function Saved({ wines }: SavedProps) {
    const router = useRouter();

    function handleWineClick(wine: Wine) {
        localStorage.setItem('WINE' + wine._id, JSON.stringify(wine));
        router.push(`/wine/${wine._id}`);
    }

    return (
        <div className="grid justify-center">
            <h1>Saved page</h1>
            {/* Mapping over the wines array and creating a card for each wine */}
            {wines.map((wine: Wine, index: number) => (
                <div key={index} className="grid max-w-sm ml-6 mr-6 mb-6 border-brendan rounded-lg shadow dark:bg-brendan/90 dark:border-gray-700 sm:max-w-full">
                    <div onClick={() => handleWineClick(wine)} className="ml-3 mr-3 mt-3 mb-3">
                        <h5 className="mb-2 text-xl font-bold tracking-tight text-dijon dark:text-dijon sm:text-lg">{wine.title}</h5>
                        <h5 className="mb-2 text-sm uppercase tracking-widest font-semibold tracking-tight text-lightdijon dark:text-lightdijon sm:text-xs">{wine.variety}</h5>
                        <h5 className="mb-2 text-sm uppercase tracking-widest font-semibold tracking-tight text-lightdijon dark:text-lightdijon sm:text-xs">${wine.price}</h5>
                        
                    </div>
                </div>
            ))}
        </div>
    )
}

// The getServerSideProps function runs on the server side before the page is rendered
// It fetches the data that the page needs to render
export const getServerSideProps: GetServerSideProps = async (context) => {
    // Waiting for the MongoDB client connection to be ready
    const client = await clientPromise;

    // Selecting the 'Wine1' database
    const db = client.db('Wine1');

    // Fetching the first 10 documents from the 'wset' collection in the 'Wine1' database
    const wines = await db
        .collection('wset')
        .find({})
        .sort({ points: 1 })
        .limit(2)
        .toArray();

    // Returning the fetched data as props to the TopPicks component
    // The data is stringified and parsed to ensure it is serializable
    return {
        props: {
            wines: JSON.parse(JSON.stringify(wines)),
        },
    };
};
