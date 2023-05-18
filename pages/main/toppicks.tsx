import { GetServerSideProps } from 'next';
import clientPromise from '../../lib/mongodb';
import { useRouter } from 'next/router';
import Image from 'next/image'
import { IconButton, ThemeProvider, createTheme } from '@mui/material';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import WineCard from '../../components/winecard';
import { useSession } from 'next-auth/react';

// The main TopPicks component which receives an array of wine objects as a prop
/** TODO */
export default function TopPicks({ wines }: TopPicksProps) {
    return (
        <div className="grid justify-center mt-5">
            {wines.map((wine: Wine, index: number) => (
                <WineCard key={index} wine={wine} index={index} />
            ))}
        </div>
    )
}
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

export const getServerSideProps: GetServerSideProps = async (context) => {
    // Waiting for the MongoDB client connection to be ready
    const client = await clientPromise;

    // Selecting the 'Wine1' database
    const db = client.db('Wine1');

    // Fetching the first 10 documents from the 'wset' collection in the 'Wine1' database
    const wines = await db
        .collection('wset')
        .find({})
        .sort({ points: -1 })
        .limit(10)
        .toArray();

    // Returning the fetched data as props to the TopPicks component
    // The data is stringified and parsed to ensure it is serializable
    return {
        props: {
            wines: JSON.parse(JSON.stringify(wines)),
        },
    };
};
