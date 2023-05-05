import Image from 'next/image'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import { useSession, signIn, signOut } from 'next-auth/react'
import DefLayout from '../components/layouts/homelayout'
import { redirect } from 'next/navigation'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const handleGoogle = () => {
    signIn("google", { callbackUrl: '/main/home' });
  };
  const handleInsta = () => {
    signIn("instagram");
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
        <button onClick={handleInsta} type="button" className="drop-shadow-xl justify-center text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm py-3 py-3 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2">
          <svg className="w-4 h-4 mr-3 ml-3" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook-f" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M279.1 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.4 0 225.4 0c-73.22 0-121.1 44.38-121.1 124.7v70.62H22.89V288h81.39v224h100.2V288z"></path></svg>
        </button>

        <button onClick={handleGoogle} type="button" className="drop-shadow-xl justify-center text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-3 py-3 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
          <svg className="w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
        </button>
      </div>



    </main>
  )
}


