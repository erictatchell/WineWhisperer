import '/styles/globals.css'
import type { AppProps } from 'next/app'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Lora } from 'next/font/google'
import Layout from '../components/layouts/layout'
import { SessionProvider } from "next-auth/react"

const lora = Lora({ subsets: ['latin'] })

const theme = createTheme({
  palette: {
    primary: {
      main: '#F5E6CC',
    },
    secondary: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});

// Default component for the custom _app.js in Next.js. Wraps the entire application in a SessionProvider and a layout component
export default function App({
  Component, pageProps: { session, ...pageProps}
}: AppProps) {
  return (
    <SessionProvider session={session}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </SessionProvider>
  )
}
