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
import { useSession } from 'next-auth/react';

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
export default function Eco({ ecowines }: EcoProps) {
    const router = useRouter();
    const { data: session } = useSession();
    const user = session ? session.user : null;

    async function saveWineId(wine: Wine) {
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