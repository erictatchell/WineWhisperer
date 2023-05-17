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
import { motion, AnimatePresence } from "framer-motion";



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
  const router = useRouter();
  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={router.route}
        initial="initialState"
        animate="animateState"
        exit="exitState"
        transition={{
          duration: 0.75,
        }}
        variants={{
          initialState: {
            opacity: 0,
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
          },
          animateState: {
            opacity: 1,
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
          },
          exitState: {
            clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
          },
        }}
      >
        <SessionProvider session={session}>
          <Layout>

            <Component {...pageProps} />

          </Layout>
        </SessionProvider>
      </motion.div>
    </AnimatePresence>
  )
}
