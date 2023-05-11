import { getSession, useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import NightlightRoundOutlinedIcon from '@mui/icons-material/NightlightRoundOutlined';
import Link from 'next/link';


export default function Settings() {
    const { data: session } = useSession()
    const user = session ? session.user : null;

    const [isNotificationOn, setNotification] = useState(false);
    const [isLocationOn, setLocation] = useState(false);
    const [isDarkModeOn, setDarkMode] = useState(false);
  

    const Card = ({title, icon, isOn, toggleSwitch}) => (
        <div className="space-y-8 p-2 drop-shadow-xl text-xl mb-8 mt-0 text-black bg-dijon focus:ring-4 focus:outline-none focus:ring-[#F8DE7F]/50 font-small rounded-lg px-1 py-1 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span>{icon}</span>
              <span>{title}</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer ml-4">
              <input type="checkbox" checked={isOn} onChange={toggleSwitch} className="sr-only peer"/>
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
            </label>
          </div>
        </div>
      )

      return (
        <div className="mt-10 flex flex-col items-center">
          <Card 
            title="Notifications" 
            icon={<NotificationsActiveOutlinedIcon/>}
            toggleSwitch={() => setNotification(!isNotificationOn)} 
            isOn={isNotificationOn}
          />
          <Card 
            title="Location" 
            icon={<LocationOnIcon/>}
            toggleSwitch={() => setLocation(!isLocationOn)} 
            isOn={isLocationOn}
          />
          <Card 
            title="Dark Mode" 
            icon={<NightlightRoundOutlinedIcon/>}
            toggleSwitch={() => setDarkMode(!isDarkModeOn)} 
            isOn={isDarkModeOn}
          />
          <Link href="/main/aboutus">
          <button className="p-2 drop-shadow-xl text-medium mt-10 text-black bg-dijon hover:bg-[#F8DE7F] focus:ring-4 focus:outline-none focus:ring-[#F8DE7F]/50 font-small rounded-lg px-3 py-2  text-center inline-flex items- dark:focus:ring-[#3b5998]/55 mr-2 mb-2">About Us</button>
        </Link>
        </div>
      );
    };


// export const getServerSideProps = async (context: any) => {
//     const session = await getSession(context);
//     if (!session) {
//         return {
//             redirect: {
//                 destination: '/'
//             }
//         }
//     }
//     return {
//         props: { session }
//     }
// }