import { GetServerSideProps } from 'next';
import { getSession, useSession } from "next-auth/react";  // Add useSession
import clientPromise from '../../lib/mongodb';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image'
import { IconButton, ThemeProvider, createTheme } from '@mui/material';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { FaLeaf } from 'react-icons/fa';
import SaveIcon from '@mui/icons-material/Save';

// Rest of the import and interface code...
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

export default function Eco({ ecowines }: EcoProps) {
    const router = useRouter();
    const { data: session } = useSession();
    const user = session ? session.user : null;

    

    async function handleSaveClick(wine: Wine) {
        try {
            if (user) {
                const res = await fetch('/api/wine/saveWine', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ wineId: wine._id, email: user.email }),
                });

                if (res.ok) {
                    console.log('Wine saved successfully');
                } else {
                    console.log('Failed to save wine');
                }
            } else {
                console.log('User is not logged in');
            }
        } catch (error) {
            console.log('An error occurred while trying to save the wine', error);
        }
    }

    // Rest of your code...



    

    return (
        <div className="grid justify-center mt-5">
            {ecowines.map((wine: Wine, index: number) => (
                <div key={index} className={`relative p-5 mb-4 max-w-sm
                ${index + 1 > 1 ? 'bg-gradient-to-r from-[#C1D5A6] to-[#FFFFFF]' : ''}
                ${index + 1 == 1 ? 'bg-gradient-to-r from-[#C1D5A6] to-[#FFFFFF]' : ''}
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
                                <FaLeaf size="2em" color="darkgreen" />
                                </ThemeProvider>
                            </button>
                        </IconButton>
                        <IconButton onClick={() => handleSaveClick(wine)}>
    <ThemeProvider theme={theme}>
        <SaveIcon fontSize="large" style={{ color: 'black' }} />
    </ThemeProvider>
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
