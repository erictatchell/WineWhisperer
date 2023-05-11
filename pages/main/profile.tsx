import { IconButton, ThemeProvider } from '@mui/material';
import { getSession, signOut, useSession } from 'next-auth/react';
import Image from 'next/image'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';




export default function Profile() {
  return (
    <div className="w-full h-full p-10">
      <div className="flex justify-between">
        <div>
          <img className="w-24 h-24 rounded-full" src='/' alt='Profile Pic' />
          <button className="mt-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Change Picture
          </button>
        </div>
        <button className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Settings
        </button>
      </div>
      <div className="mt-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Brendan Doyle</h2>
          <button className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Edit
          </button>
        </div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl">Brendan@placehoder.com</h2>
          <button className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Edit
          </button>
        </div>
        <div className="mb-4">
          <h2 className="text-xl">ID: 12345678</h2>
        </div>
      </div>
      <div className="absolute bottom-10 right-10">
        <button className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
          Sign Out
        </button>
      </div>
    </div>
  );
}