import { GetServerSideProps } from 'next';
import { getSession } from "next-auth/react";
import clientPromise from '../../lib/mongodb';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image'
import { IconButton, ThemeProvider, createTheme } from '@mui/material';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';


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
}


// Defining a TypeScript interface for the props that the TopPicks component will receive
interface EcoProps {
    wines: Wine[];
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
export default function Eco({ wines }: EcoProps) {
    const router = useRouter();

    function handleWineClick(wine: Wine) {
        localStorage.setItem('WINE' + wine._id, JSON.stringify(wine));
        router.push(`/wine/${wine._id}`);
    }

    return (
        <div className="grid justify-center mt-5">
            {wines.map((wine: Wine, index: number) => (
                <div key={index} className={`relative p-5 mb-4 max-w-sm
                ${index + 1 > 3 ? 'bg-dijon' : ''}
                ${index + 1 == 1 ? 'bg-gradient-to-r from-[#F4EC88] from-10% via-[#F3EFB8] via-30% to-[#D0C863]' : ''}
                ${index + 1 == 2 ? 'bg-gradient-to-r from-[#C2C2C2] from-10% via-[#EAEAEA] via-30% to-[#848484]' : ''}
                ${index + 1 == 3 ? 'bg-gradient-to-r from-[#C97B49] from-10% via-[#DB9E76] via-30% to-[#946A4F]' : ''}
                rounded-xl shadow-xl flex items-center mx-5 space-x-4`}>
                    <div className="flex-shrink-0">
                        <Image src="/white-sauvignon.png" alt="Wine image" width='50' height='50' />
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
            ))}
        </div>
    )
}

// The getServerSideProps function runs on the server side before the page is rendered
// It fetches the data that the page needs to render
export const getServerSideProps: GetServerSideProps = async (context) => {
    const client = await clientPromise;
    const db = client.db('Wine1');

    const wines = await db
        .collection('wset')
        .find({ eco: true })    // Filter for eco wines
        .sort({ points: -1 })
        .limit(10)
        .toArray();

    return {
        props: {
            wines: JSON.parse(JSON.stringify(wines)),
        },
    };
};
