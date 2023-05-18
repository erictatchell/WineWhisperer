import { GetServerSideProps } from 'next';
import { getSession } from "next-auth/react";
import clientPromise from '../../lib/mongodb';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image'
import { IconButton, ThemeProvider, createTheme } from '@mui/material';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { FaLeaf } from 'react-icons/fa';
import WineCard from '../../components/winecard';


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
    eco: boolean;    // New field
    blurb: string;   // New field
    saved: boolean;
}


// Defining a TypeScript interface for the props that the TopPicks component will receive
interface EcoProps {
    ecowines: Wine[];
}

const theme = createTheme({
    palette: {
        primary: {
            main: '#00000',
        },
        secondary: {
            main: '#64748B',
            contrastText: '#fff',
        },
    },
});

// The main TopPicks component which receives an array of wine objects as a prop
/** TODO */
export default function Eco({ ecowines }: EcoProps) {
    const router = useRouter();



    function handleWineClick(wine: Wine) {
        localStorage.setItem('WINE' + wine._id, JSON.stringify(wine));
        router.push(`/wine/${wine._id}`);
    }




    return (
        <div className="grid justify-center mt-5">
            {ecowines.map((wine: Wine, index: number) => (
                <WineCard key={index} wine={wine} index={index} />
            ))}
        </div>
    )
}

// The getServerSideProps function runs on the server side before the page is rendered
// It fetches the data that the page needs to render
export const getServerSideProps: GetServerSideProps = async (context) => {
    const client = await clientPromise;
    const db = client.db('Wine1');

    const ecowines = await db
        .collection('wset')
        .find({ eco: "true" })    // Filter for eco wines
        .limit(4)
        .toArray();

    return {
        props: {
            ecowines: JSON.parse(JSON.stringify(ecowines)),
        },
    };
};
