import './globals.css'

import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

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
      <body className={inter.className}>
        <h1>Header</h1>
        {children}
        <h1>Footer</h1>
      </body>
    </html>
  )
}
