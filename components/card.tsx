import { FC } from 'react';

type CardProps = {
  title: string;
  icon: JSX.Element;
  isOn: boolean;
  toggleSwitch: () => void;
};

const Card: FC<CardProps> = ({ title, icon, isOn, toggleSwitch }) => {
  return (
    <div className="space-y-8 p-2 drop-shadow-xl text-xl mb-8 mt-0 text-black bg-dijon focus:ring-4 focus:outline-none focus:ring-[#F8DE7F]/50 font-small rounded-lg px-4 py-1 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2">

      <div className="flex items-center justify-between w-full">

        <div className="flex items-center">
          {icon}
        </div>

        <div className="flex items-center mx-4">
          {title}
        </div>

        <div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={isOn} onChange={toggleSwitch} className="sr-only peer"/>
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
            peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer 
            dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] 
            after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full 
            after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600">
            </div>
          </label>
        </div>

      </div>

    </div>
  );
};

export default Card;

