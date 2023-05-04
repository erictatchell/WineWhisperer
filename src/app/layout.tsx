import './globals.css'

import { Lora } from 'next/font/google'

const lora = Lora({ subsets: ['latin'] })

export const metadata = {
  title: 'WineWhisperer',
  description: 'Discover your next favourite wine',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`flex flex-col min-h-screen ${lora.className}`}>
        <div></div>
        {children}
      </body>
    </html>
  )
}
