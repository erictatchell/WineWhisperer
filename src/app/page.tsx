import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <h1 className="text-xl">WineWhisperer</h1>
      <a href="/authentication/login">Log In</a><br></br>
      <a href="/authentication/signup">Sign Up</a>
    </main>
  )
}
