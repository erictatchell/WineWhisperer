import { useRouter } from 'next/router';
import { IconButton, ThemeProvider, createTheme, } from '@mui/material';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { FaLeaf } from 'react-icons/fa';
import SaveIcon from '@mui/icons-material/Save';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const theme = createTheme({
    palette: {
        primary: {
            main: '#000000',
        },
        secondary: {
            main: '#64748B',
            contrastText: '#fff',
        },
    },
});


interface WineCardProps {
    wine: Wine;
    index: number;
}



export default function WineCard({ wine, index }: WineCardProps) {
    const router = useRouter();
    const path = router.pathname;
    const topPicks = '/main/toppicks';
    const { data: session } = useSession();
    const user = session ? session.user : null;
    let [wineimg, setWineImg] = useState('');
    function handleWineClick(wine: Wine) {
        localStorage.setItem('WINE' + wine._id, JSON.stringify(wine));
        router.push(`/wine/${wine._id}`);
    }
    async function saveWineId(wine: Wine) {
        try {
            if (user) {
                const res = await fetch('/api/wine/saveWine', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ wineId: wine._id, email: user.email }),
                });

                if (res.ok) {
                    console.log('Wine saved successfully');
                } else {
                    console.log('Failed to save wine');
                }
            } else {
                console.log('User is not logged in');
            }
        } catch (error) {
            console.log('An error occurred while trying to save the wine', error);
        }
    }
    if (path === topPicks) {

        return (
            <div key={index} className={`relative p-5 mb-4 max-w-sm mx-5 rounded-xl shadow-xl flex items-center space-x-4
                ${index + 1 > 3 ? 'bg-gradient-to-t from-dijon/80 to-dijon/50' : ''}
                ${index + 1 == 1 ? 'bg-gradient-to-r from-[#F4EC88]/70 from-10% via-[#F3EFB8]/90 via-30% to-[#D0C863]/50' : ''}
                ${index + 1 == 2 ? 'bg-gradient-to-r from-[#C2C2C2]/70 from-10% via-[#EAEAEA]/90 via-30% to-[#848484]/50' : ''}
                ${index + 1 == 3 ? 'bg-gradient-to-r from-[#C97B49]/70 from-10% via-[#DB9E76]/90 via-30% to-[#946A4F]/50' : ''}`}>
                <div className="flex-shrink-0">
                    <img src={wine.image} alt="Wine image" width='50' height='50' />
                </div>
                <div>
                    <div className="text-md font-semibold text-black">{wine.title}</div>
                    <p className="text-sm uppercase tracking-widest font-medium text-gray">{wine.variety}</p>
                    <p className="text-sm text-black tracking-widest">${wine.price ? wine.price : 'No price listed'}</p>
                    <p className="text-md uppercase tracking-widest font-bold text-green">{wine.points} / 100</p>
                </div>
                <div className="absolute bottom-0 right-3 mb-4">
                    <IconButton onClick={() => { handleWineClick(wine) }}>
                        <ThemeProvider theme={theme}>
                            <ArrowCircleRightIcon fontSize="large" opacity='0.7' color="primary" />
                        </ThemeProvider>
                    </IconButton>
                    <IconButton onClick={() => saveWineId(wine)}>
                        <ThemeProvider theme={theme}>
                            <BookmarkBorderIcon fontSize="large" opacity='0.7' color='primary' />
                        </ThemeProvider>
                    </IconButton>

                </div>
            </div>
        )
    } else if (path != '/main/eco') {
        return (

            <div key={index} className='bg-gradient-to-t from-dijon to-dijon/50 relative p-5 mb-4 max-w-sm mx-5 rounded-xl shadow-xl flex items-center space-x-4'>
                <div className="flex-shrink-0">
                    <img src={wine.image} alt="Wine image" width='50' height='50' />
                </div>
                <div>
                    <div className="text-md font-semibold text-black">{wine.title}</div>
                    <p className="text-sm uppercase tracking-widest font-medium text-gray">{wine.variety}</p>
                    <p className="text-sm text-black tracking-widest">${wine.price ? wine.price : 'No price listed'}</p>
                    <p className="text-md uppercase tracking-widest font-bold text-green">{wine.points} / 100</p>
                </div>
                <div className="absolute bottom-0 right-3 mb-4">
                    <IconButton onClick={() => { handleWineClick(wine) }}>
                        <ThemeProvider theme={theme}>
                            <ArrowCircleRightIcon fontSize="large" opacity='0.7' color="primary" />
                        </ThemeProvider>
                    </IconButton>
                    <IconButton onClick={() => saveWineId(wine)}>
                        <ThemeProvider theme={theme}>
                            <BookmarkBorderIcon fontSize="large" opacity='0.7' color='primary' />
                        </ThemeProvider>
                    </IconButton>

                </div>
            </div>
        )
    } else {
        return (
            <div key={index} className={`relative p-5 mb-4 max-w-sm mx-5 rounded-xl shadow-xl flex items-center space-x-4
                ${index + 1 > 1 ? 'bg-gradient-to-r from-[#68a678] to-dijon/60' : ''}
                ${index + 1 == 1 ? 'bg-gradient-to-r from-[#68a678] to-dijon/60' : ''}`}>
                <div className="flex-shrink-0">
                    <img src={wine.image} alt="Wine image" width='50' height='50' />
                </div>
                <div>
                    <div className="text-md font-semibold text-black">{wine.title}</div>
                    <p className="text-sm uppercase tracking-widest font-medium text-gray">{wine.variety}</p>
                    <p className="text-sm text-black tracking-widest">${wine.price ? wine.price : 'No price listed'}</p>
                    <p className="text-md uppercase tracking-widest font-bold text-green">{wine.points} / 100</p>
                </div>
                <div className="absolute bottom-0 right-3 mb-4">
                    <IconButton onClick={() => { handleWineClick(wine) }}>
                        <ThemeProvider theme={theme}>
                            <FaLeaf size="1.5em" opacity='0.7' color="darkgreen" />
                        </ThemeProvider>
                    </IconButton>
                    <IconButton onClick={() => saveWineId(wine)}>
                        <ThemeProvider theme={theme}>
                            <BookmarkBorderIcon fontSize="large" opacity='0.7' color='primary' />
                        </ThemeProvider>
                    </IconButton>

                </div>
            </div>

        )
    }
}