import type { AppProps } from 'next/app'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Image from 'next/image'
import { Lora } from 'next/font/google'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import { useRouter } from 'next/router';
import Link from 'next/link'

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

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const router = useRouter();
  const path = router.pathname;

  const isSpecialRoute = path === '/' || path === '/auth/login' || path === '/auth/signup';
  if (!isSpecialRoute) {
    return (

      <div className={`pb-16 flex flex-col min-h-screen ${lora.className}`}>
        <nav className="bg-brendan dark:bg-brendan sticky w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <Link href="/main/home" className="flex items-center">
              <Image src="/logo.png" className="mr-3" alt="WW Logo" width='47' height='100' />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"></span>
            </Link>
            <div className='text-lightdijon text-2xl font-semibold tracking-widest uppercase'>
              -
              {path == '/main/home' ? ' Home ' : ''}
              {path == '/main/toppicks' ? ' Top Picks ' : ''}
              {path == '/main/aboutus' ? ' About Us ' : ''}
              {path == '/main/profile' ? ' Profile ' : ''}
              {path == '/main/saved' ? ' Saved ' : ''}
              {path.startsWith('/wine/') ? ' view ' : ''}
              {path == '/main/settings' ? ' Settings ' : ''}
              -

            </div>
            <div className="flex md:order-2">
              <ThemeProvider theme={theme}>
                <IconButton href="/main/profile">
                  <AccountCircleIcon fontSize="large" color="primary" />
                </IconButton>
              </ThemeProvider>
            </div>
          </div>
        </nav>
        <main>
          {children}</main>
        <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-brendan border-t border-brendan-200 bg-brendan dark:border-brendan">
          <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
            <IconButton href="/main/home">
              <button type="button" className="inline-flex flex-col items-center justify-center px-5 group">
                <ThemeProvider theme={theme}>
                  <HomeIcon fontSize="large" color="primary" />
                </ThemeProvider>
              </button>
            </IconButton>
            <IconButton href="/main/toppicks">
              <button type="button" className="inline-flex flex-col items-center justify-center px-5 group">
                <ThemeProvider theme={theme}>
                  <LeaderboardIcon fontSize="large" color="primary" />
                </ThemeProvider>
              </button>
            </IconButton>
            <IconButton href="/main/search">
              <button type="button" className="inline-flex flex-col items-center justify-center px-5 group">
                <ThemeProvider theme={theme}>
                  <SearchIcon fontSize="large" color="primary" />
                </ThemeProvider>
              </button>
            </IconButton>
            <IconButton href="/main/saved">
              <button type="button" className="inline-flex flex-col items-center justify-center px-5 group">
                <ThemeProvider theme={theme}>
                  <BookmarkIcon fontSize="large" color="primary" />
                </ThemeProvider>
              </button>
            </IconButton>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className={`flex flex-col min-h-screen ${lora.className}`}>
        <div>
          <header></header>
          <main>{children}</main>
          <footer></footer>
        </div>
      </div>
    );
  }
}


