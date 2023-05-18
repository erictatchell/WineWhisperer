import type { AppProps } from 'next/app'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Image from 'next/image'
import { Lora } from 'next/font/google'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import LayersIcon from '@mui/icons-material/Layers';
import HomeIcon from '@mui/icons-material/Home';
import { useRouter } from 'next/router';
import Link from 'next/link'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useSession, signIn, signOut } from 'next-auth/react'

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
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
const handleGoogle = () => {
  signIn("google", { callbackUrl: '/main/home' });
};

export default function Layout({ children }: Props) {
  const router = useRouter();
  const path = router.pathname;
  const { data: session } = useSession()
  const user = session ? session.user : null;

  const isSpecialRoute = path === '/' || path === '/auth/login' || path === '/auth/signup';
  if (!isSpecialRoute) {

    return (

      <div className={`pb-16 flex flex-col ${lora.className}min-h-screen`}>
        <video autoPlay muted loop id="myVideo" className="fixed z-0 w-full h-full object-cover">
          <source src="/bgvid.mp4" type="video/mp4" />
        </video>
        <nav className="bg-vineyard bg-cover sticky w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
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
              {path == '/main/search' ? ' Cellar ' : ''}
              {path.startsWith('/wine/') ? ' view ' : ''}
              {path == '/main/settings' ? ' Settings ' : ''}
              {path == '/main/404' ? ' Lost? ' : ''}
              {path == '/main/brazil' ? ' Fun in the Sun ' : ''}
              {path == '/main/eco' ? ' Eco ' : ''}
              -
            </div>

            {session ?
              <div className="flex md:order-2">
                <ThemeProvider theme={theme}>
                  <IconButton href="/main/profile">
                    <AccountCircleIcon fontSize="large" color="primary" />
                  </IconButton>
                </ThemeProvider>
              </div>
              :
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-lightdijon px-3 py-2 text-sm font-semibold hover:bg-dijon text-gray-900 shadow-sm">
                    <ChevronDownIcon className=" h-5 w-5 text-brendan font-bold" aria-hidden="true" />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-lightdijon shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1 ">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/main/settings"
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block px-4 py-2 text-sm hover:bg-dijon '
                            )}
                          >
                            Settings
                          </Link>
                        )}
                      </Menu.Item>
                      <form method="POST">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              type="button"
                              onClick={handleGoogle}
                              className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block w-full px-4 py-2 text-left text-sm hover:bg-dijon'
                              )}
                            >
                              <div className='grid grid-cols-7'>
                                <div className='justify-center'>
                                  <svg className="w-4 mr-3 h-4 " aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                                </div>
                                <div className='col-span-6 text-start'>Log In</div>
                              </div>
                            </button>
                          )}
                        </Menu.Item>
                      </form>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

            }
          </div>

        </nav>
        <main>
          {children}
        </main>

        <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-brendan border-t border-brendan-200 bg-brendan dark:border-brendan">
          <div className="grid max-w-md grid-cols-4 mx-auto font-medium">
            <Link href='/main/home' className="flex items-center justify-center px-5 group">
              <IconButton>
                <ThemeProvider theme={theme}>
                  <HomeIcon fontSize="large" color="primary" />
                </ThemeProvider>
              </IconButton>
            </Link>
            <Link href='/main/toppicks' className="flex items-center justify-center px-5 group">
              <IconButton>
                <ThemeProvider theme={theme}>
                  <LeaderboardIcon fontSize="large" color="primary" />
                </ThemeProvider>
              </IconButton>
            </Link>
            <Link href='/main/search?sort=points_desc' className="flex items-center justify-center px-5 group">
              <IconButton>
                <ThemeProvider theme={theme}>
                  <LayersIcon fontSize="large" color="primary" />
                </ThemeProvider>
              </IconButton>
            </Link>
            <Link href='/main/saved' className="flex items-center justify-center px-5 group">
              <IconButton>
                <ThemeProvider theme={theme}>
                  <BookmarkIcon fontSize="large" color="primary" />
                </ThemeProvider>
              </IconButton>
            </Link>
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


