import { IconButton, ThemeProvider } from '@mui/material';
import { getSession, signOut, useSession } from 'next-auth/react';
import Image from 'next/image'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Link from 'next/link';
import clientPromise from '../../lib/mongodb';

interface ProfileProps {
  userId?: string;
}


export default function Profile({ userId }: ProfileProps) {
  const { data: session } = useSession()
  const user = session ? session.user : null;

  return (
    // entire page
    <div className="mt-6 mx-8 bg-lightdijon/20 backdrop-blur-md py-3 rounded-xl px-6">

      {/* top level grid */}
      <div className="flex items-start justify-between">
        {/* Profile pic */} 

        <div className="relative">
          <img className="rounded-full" src={`${user ? user.image : '/logo.png'}`} alt="Profile" />
          <Link href="https://myaccount.google.com/">
          <button className="absolute right-0 bottom-0 p-1 rounded-full text-xs drop-shadow-xl mt-3
             text-black bg-dijon/70 hover:bg-lightdijon focus:ring-4 focus:outline-none focus:ring-[#F8DE7F]/50 
              font-small   text-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2">
                Change</button>
          </Link>
        </div>

        {/* Settings button */}
        <Link href="/main/settings">
          <button className="p-2 drop-shadow-xl text-l mt-3 text-black bg-dijon/70 hover:bg-lightdijon
            focus:ring-4 focus:outline-none focus:ring-[#F8DE7F]/50 font-medium rounded-lg px-5 py-3.5  
            text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2">
              Settings</button>
        </Link>
      </div>

      {/* User info */}
      <div className="mt-4 z-10">
        <h3 className="text-l font-bold text-lightdijon">Username</h3>
        <div className="flex items-top justify-between">
          <h1 className="text-m text-lightdijon">{user ? user.name : 'No name'}</h1>
          <Link href="https://myaccount.google.com/">
          <button className="p-2 drop-shadow-xl text-medium mt-0 text-black bg-dijon/70 hover:bg-lightdijon 
            focus:ring-4 focus:outline-none focus:ring-[#F8DE7F]/50 font-small rounded-lg px-1 py-1  
            text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2">
              Edit</button>
          </Link>
        </div>
      </div>

      <div className="mt-0 z-10">
        <h3 className="text-l font-bold text-lightdijon">Email</h3>
        <div className="flex items-top justify-between">
        <h1 className="text-m text-lightdijon">{user ? user.email : 'No email'}</h1>
        <Link href="https://myaccount.google.com/">
          <button className="p-2 drop-shadow-xl text-medium mt-0 text-black bg-dijon/70 hover:bg-lightdijon
            focus:ring-4 focus:outline-none focus:ring-[#F8DE7F]/50 font-small rounded-lg px-1 py-1  text-center 
            inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2">
              Edit</button>
          </Link>
        </div>
      </div>

      <div className="mt-0 z-10">
        <h3 className="text-l font-bold text-lightdijon">User ID:</h3>
        <h1 className="text-m text-lightdijon">{userId}</h1>
      </div>

      {/* Sign out button */}
      <div className="flex justify-end mt-4">
        <button onClick={() => (signOut())} className="p-2 drop-shadow-xl text-medium mt-3 text-black bg-dijon/70 
          hover:bg-[#bb2b43] focus:ring-4 focus:outline-none focus:ring-[#bb2b43]/50 font-medium rounded-lg px-2 
          py-2  text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2">
            Sign Out</button>
      </div>
    </div>
  );
}

// export async function getServerSideProps(context: any) {
//   const session = await getSession(context);
//   const userEmail = session && session.user ? session.user.email : null;
//   if (userEmail) {
//     const client = await clientPromise;
//     const db = client.db();
//     const userExtra = await db.collection("userExtras").findOne({ email: userEmail });
//     if (userExtra) {
//       return {
//         props: {
//           userId: userExtra.id,
//         },
//       };
//     }
//   }
//   if (!session) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//     };
//   }
//   return {
//     props: {},
//   };
// }
