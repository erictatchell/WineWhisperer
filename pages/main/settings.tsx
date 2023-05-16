import { getSession, useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import NightlightRoundOutlinedIcon from '@mui/icons-material/NightlightRoundOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Link from 'next/link';
import Card from '../../components/card';
import clientPromise from '../../lib/mongodb';



export default function Settings() {
  const { data: session } = useSession()
  const user = session ? session.user : null;

  const [isNotificationOn, setNotification] = useState(false);
  const [isLocationOn, setLocation] = useState(false);
  const [isDarkModeOn, setDarkMode] = useState(false);

  return (
    <div className="mt-10 flex flex-col items-center">
      <div className='grid'>
        <Card
          title="Notifications"
          icon={<NotificationsActiveOutlinedIcon />}
          toggleSwitch={() => setNotification(!isNotificationOn)}
          isOn={isNotificationOn}
        />
        <Card
          title="Location"
          icon={<LocationOnIcon />}
          toggleSwitch={() => setLocation(!isLocationOn)}
          isOn={isLocationOn}
        />
        <Card
          title="Dark Mode"
          icon={<NightlightRoundOutlinedIcon />}
          toggleSwitch={() => setDarkMode(!isDarkModeOn)}
          isOn={isDarkModeOn}
        />

        <div className="flex justify-center items-center">
          <Link href="/main/aboutus">
            <button className="p-2 drop-shadow-xl text-medium mt-10 text-black bg-dijon hover:bg-[#F8DE7F] 
              focus:ring-4 focus:outline-none focus:ring-[#F8DE7F]/50 font-small rounded-lg px-3 py-2  
              text-center inline-flex items- dark:focus:ring-[#3b5998]/55 mr-2 mb-2"><InfoOutlinedIcon />About Us</button>
          </Link>
          </div>
        </div>
        </div>
      );
    };


    export async function getServerSideProps(context: any) {
      const session = await getSession(context);
      const userEmail = session && session.user ? session.user.email : null;
      if (userEmail) {
        const client = await clientPromise;
        const db = client.db();
        const userExtra = await db.collection("userExtras").findOne({ email: userEmail });
        if (userExtra) {
          return {
            props: {
              userId: userExtra.id,
            },
          };
        }
      }
      if (!session) {
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        };
      }
      return {
        props: {},
      };
    }