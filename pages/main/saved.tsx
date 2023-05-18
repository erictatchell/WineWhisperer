import { GetServerSideProps } from 'next';
import clientPromise from '../../lib/mongodb';
import { useRouter } from 'next/router';
import Image from 'next/image'
import { IconButton, ThemeProvider, createTheme } from '@mui/material';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import WineCard from '../../components/winecard';
import { useSession } from 'next-auth/react';
import { getSession } from 'next-auth/react';
import { ObjectId } from 'mongodb';

export const getServerSideProps: GetServerSideProps = async (context) => {
    // Get the user's session based on the request
    const session = await getSession(context);
    const email = session?.user?.email;

    if (!email) {
        return {
            props: {
                wines: [],
            },
        };
    }

    const client = await clientPromise;
    const db = client.db('Wine1');

    // Fetch the user's saved wines array
    const userExtras = await db.collection('userExtras').findOne({ email });

    if (!userExtras) {
        return {
            props: {
                wines: [],
            },
        };
    }

    // Convert saved wine IDs from string to ObjectId
    const savedWinesIds = (userExtras.saved || []).map((id: string) => new ObjectId(id));

    // Fetching the documents from the 'wset' collection in the 'Wine1' database that are in the user's saved array
    const wines = await db
        .collection('wset')
        .find({ _id: { $in: savedWinesIds } })
        .sort({ points: -1 })
        .limit(10)
        .toArray();

    // Returning the fetched data as props to the TopPicks component
    return {
        props: {
            wines: JSON.parse(JSON.stringify(wines)),
        },
    };
};
