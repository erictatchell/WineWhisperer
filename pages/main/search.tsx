import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import clientPromise from '../../lib/mongodb';
import { useRouter } from 'next/router';
import Image from 'next/image'
import { IconButton, ThemeProvider, createTheme, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import WineCard from '../../components/winecard';
import { Lora } from 'next/font/google'
import Link from 'next/link';

const lora = Lora({ subsets: ['latin'] })

interface SearchProps {
  wines: Wine[];
  totalPages: number;
  currentPage: number;
}

const ITEMS_PER_PAGE = 10;
const MAX_BUTTONS = 5;

const theme = createTheme({
  palette: {
    primary: {
      main: '#00000',
    },
    secondary: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});

export default function Search({ wines, totalPages, currentPage }: SearchProps) {
  const router = useRouter();

  const [page, setPage] = useState(currentPage);

  const [sortOption, setSortOption] = useState('points_desc');

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  function handleWineClick(wine: Wine) {
    localStorage.setItem('WINE' + wine._id, JSON.stringify(wine));
    router.push(`/wine/${wine._id}`);
  }

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
    if (pageNumber === 1 || pageNumber === undefined) {
      router.push(`/main/search?sort=${sortOption}`);
    } else {
      router.push(`/main/search?page=${pageNumber}&sort=${sortOption}`);
    }
  };

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    const selectedOption = event.target.value as string;
    setSortOption(selectedOption);

    if (selectedOption === "eco") {
      router.push(`/main/eco`);
    } else {
      if (page === 1 || page === undefined) {
        router.push(`/main/search?sort=${selectedOption}`);
      } else {
        router.push(`/main/search?page=${page}&sort=${selectedOption}`);
      }
    }

  };


  const renderPaginationButtons = () => {
    const buttons = [];

    const startPage = Math.max(1, currentPage - Math.floor(MAX_BUTTONS / 2));
    const endPage = Math.min(totalPages, startPage + MAX_BUTTONS - 1);

    if (currentPage > 1) {
      buttons.push(
        <button
          key="previous"
          className="mx-1 px-2 py-1 rounded-md bg-brendan/80   backdrop-blur-md text-lightdijon"
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          className={`mx-1 px-2 py-1 rounded-md ${currentPage === i ? 'bg-lightdijon text-black' : 'bg-brendan/50 backdrop-blur-md text-lightdijon'
            }`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    if (currentPage < totalPages) {
      buttons.push(
        <button
          key="next"
          className="mx-1 px-2 py-1 rounded-md bg-brendan/80 backdrop-blur-md text-lightdijon"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="grid justify-center mt-5 mb-14">
      <div className='mb-4 text-center grid grid-cols-2'> {/* Add gap-4 for space between Select and Button */}
        <Select value={sortOption} onChange={handleSortChange} className={`${lora.className} rounded-lg bg-gradient-to-t from-dijon to-dijon/50`}>
          <MenuItem className={`${lora.className}`} value="asc">Price: Low to High</MenuItem>
          <MenuItem className={`${lora.className}`} value="desc">Price: High to Low</MenuItem>
          <MenuItem className={`${lora.className}`} value="points_asc">Points: Low to High</MenuItem>
          <MenuItem className={`${lora.className}`} value="points_desc">Points: High to Low</MenuItem>
        </Select>
        <Link href='/main/eco'>
          <button className='p-4 mx-5 rounded-lg text-black bg-gradient-to-t from-dijon to-[#68a678]/50'>
            Eco-friendly Wines
          </button>
        </Link>
      </div>
      {wines.map((wine: Wine, index: number) => (
        <WineCard key={index} wine={wine} index={index} />
      ))}

      <div className='fixed bottom-0 left-0 z-50 w-full'>
        <div className="max-w-lg mx-auto p-4 mb-16 flex justify-center bg-black/10 backdrop-blur-md">
          {renderPaginationButtons()}
        </div>
      </div>
    </div>

  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const client = await clientPromise;
  const db = await client.db('Wine1');

  const page = context.query.page ? Number(context.query.page) : 1; // Get the current page number from the query parameters

  const totalWines = await db.collection('wset').countDocuments(); // Get the total number of wines
  const totalPages = Math.ceil(totalWines / ITEMS_PER_PAGE); // Calculate the total number of pages

  const skip = (page - 1) * ITEMS_PER_PAGE; // Calculate the number of wines to skip

  const sortOption = context.query.sort || 'asc'; // Get the sort option from the query parameters

  let sortField;
  switch (sortOption) {
    case 'asc':
      sortField = 'price';
      break;
    case 'desc':
      sortField = 'price';
      break;
    case 'points_asc':
      sortField = 'points';
      break;
    case 'points_desc':
      sortField = 'points';
      break;
    default:
      sortField = 'points';
  }

  const sortDirection = sortOption === 'asc' || sortOption === 'points_asc' ? 1 : -1;

  const wines = await db
    .collection('wset')
    .find({})
    .sort({ [sortField]: sortDirection }) // Sort the wines
    .skip(skip)
    .limit(ITEMS_PER_PAGE)
    .toArray();

  return {
    props: {
      wines: JSON.parse(JSON.stringify(wines)),
      totalPages,
      currentPage: page,
    },
  };
};