import Image from 'next/image'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import { useSession, signIn, signOut } from 'next-auth/react'
import DefLayout from '../components/layouts/homelayout'
import { redirect } from 'next/navigation'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const handleSignInClick = () => {
    signIn("google", { callbackUrl: '/main/home' });
  };
  const { data: session } = useSession()
  return (
    <main>
      <div className="grid justify-center">
        <div className="grid justify-center">
          <Image className="drop-shadow-xl grid justify-center mt-10" src="/purple_logo.png" alt="WineWhisperer" width="175" height="175"></Image>
        </div>
        <h1 className="drop-shadow-xl text-xl mt-5 text-brendan font-medium tracking-widest2 grid justify-center">WINE WHISPERER</h1>
        <Link href='/auth/login' className='justify-center text-center inline-flex items-center drop-shadow-xl text-xl  mt-12 text-black bg-dijon hover:bg-[#F8DE7F] focus:ring-4 focus:outline-none focus:ring-[#F8DE7F]/50 font-medium rounded-lg px-5 py-3.5  text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2'>
          <button type="button" className="tracking-widest2">
            LOG IN
          </button>
        </Link>
        <Link href='/auth/signup' className='justify-center text-center inline-flex items-center drop-shadow-xl text-xl mt-3 text-black bg-dijon hover:bg-[#F8DE7F] focus:ring-4 focus:outline-none focus:ring-[#F8DE7F]/50 font-medium rounded-lg px-5 py-3.5  text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2'>
          <button type="button" className="tracking-widest2">
            SIGN UP
          </button>
        </Link>

        <h1 className="mt-3 mb-5 grid justify-center">- or -</h1>
      </div>
      <div className='flex justify-center'>
        <button type="button" className="drop-shadow-xl justify-center text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm py-3 py-3 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2">
          <svg className="w-4 h-4 mr-3 ml-3" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook-f" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M279.1 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.4 0 225.4 0c-73.22 0-121.1 44.38-121.1 124.7v70.62H22.89V288h81.39v224h100.2V288z"></path></svg>
        </button>
        <button type="button" className="drop-shadow-xl justify-center text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-3 py-3 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 mr-2 mb-2">
          <svg className="w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="twitter" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M459.4 151.7c.325 4.548 .325 9.097 .325 13.65 0 138.7-105.6 298.6-298.6 298.6-59.45 0-114.7-17.22-161.1-47.11 8.447 .974 16.57 1.299 25.34 1.299 49.06 0 94.21-16.57 130.3-44.83-46.13-.975-84.79-31.19-98.11-72.77 6.498 .974 12.99 1.624 19.82 1.624 9.421 0 18.84-1.3 27.61-3.573-48.08-9.747-84.14-51.98-84.14-102.1v-1.299c13.97 7.797 30.21 12.67 47.43 13.32-28.26-18.84-46.78-51.01-46.78-87.39 0-19.49 5.197-37.36 14.29-52.95 51.65 63.67 129.3 105.3 216.4 109.8-1.624-7.797-2.599-15.92-2.599-24.04 0-57.83 46.78-104.9 104.9-104.9 30.21 0 57.5 12.67 76.67 33.14 23.72-4.548 46.46-13.32 66.6-25.34-7.798 24.37-24.37 44.83-46.13 57.83 21.12-2.273 41.58-8.122 60.43-16.24-14.29 20.79-32.16 39.31-52.63 54.25z"></path></svg>
        </button>

        <button onClick={handleSignInClick} type="button" className="drop-shadow-xl justify-center text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-3 py-3 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
          <svg className="w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
        </button>
        <button type="button" className="drop-shadow-xl justify-center text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-3 py-3 text-center inline-flex items-center dark:focus:ring-[#050708]/50 mr-2 mb-2">
          <svg className="w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="apple" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path></svg>
        </button>
      </div>



    </main>
  )
}


