import '/styles/globals.css'
import type { AppProps } from 'next/app'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Lora } from 'next/font/google'
import Layout from '../components/layouts/layout'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import { useRouter } from 'next/router';
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

export default function App({
  Component, pageProps: { session, ...pageProps }
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <video autoPlay muted loop playsInline id="myVideo" className="fixed w-full h-full object-cover" poster="/bgpic2.png">
          <source src="/bgvid.mp4" type="video/mp4" />
        </video>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}
