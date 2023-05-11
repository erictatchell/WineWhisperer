import { IconButton, ThemeProvider } from '@mui/material';
import { getSession, signOut, useSession } from 'next-auth/react';
import Image from 'next/image'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';




export default function Profile() {
  return (
    // entire page
    <div className="mt-6 mx-8">

      {/* top level grid */}
      <div className="flex items-start justify-between">
        {/* Profile pic */} 
        <div className="relative">
          <img className="h-32 w-32 rounded-full" src="../purple_logo.png" alt="Profile" />
          <button className="absolute right-0 bottom-0 p-1 rounded-full text-xs drop-shadow-xl mt-3 text-black bg-dijon hover:bg-[#F8DE7F] focus:ring-4 focus:outline-none focus:ring-[#F8DE7F]/50 font-small   text-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2">Change</button>
        </div>
        {/* Settings button */}
        <button className="p-2 drop-shadow-xl text-xl mt-3 text-black bg-dijon hover:bg-[#F8DE7F] focus:ring-4 focus:outline-none focus:ring-[#F8DE7F]/50 font-medium rounded-lg px-5 py-3.5  text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2">Settings</button>
      </div>

      {/* User info */}
      <div className="mt-4">
        <h3 className="text-lg font-bold">Username</h3>
        <div className="flex items-top justify-between">
          <h1 className="text-l">Brendan Doyle</h1>
          <button className="p-2 drop-shadow-xl text-medium mt-3 text-black bg-dijon hover:bg-[#F8DE7F] focus:ring-4 focus:outline-none focus:ring-[#F8DE7F]/50 font-medium rounded-lg px-2 py-2  text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2">Edit</button>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-bold">Email</h3>
        <div className="flex items-top justify-between">
          <h2 className="text-l font-light">Brendan@email.com</h2>
          <button className=" drop-shadow-xl text-medium mt-3 text-black bg-dijon hover:bg-[#F8DE7F] focus:ring-4 focus:outline-none focus:ring-[#F8DE7F]/50 font-medium rounded-lg px-2 py-2  text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2">Edit</button>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-bold">User ID:</h3>
        <h3 className="text-lg font-light items-top">12345</h3>
      </div>

      {/* Sign out button */}
      <div className="flex justify-end mt-4">
        <button className="drop-shadow-xl text-medium mt-3 text-black bg-dijon hover:bg-[#bb2b43] focus:ring-4 focus:outline-none focus:ring-[#bb2b43]/50 font-medium rounded-lg px-2 py-2  text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2">Sign Out</button>
      </div>
    </div>
  );
};
