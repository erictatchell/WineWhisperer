import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <h1 className='text-lg'>WineWhisperer</h1>
      <a href="/about">About Page</a>
    </main>
  )
}
