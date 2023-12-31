import React from 'react'
import {
    HomeIcon,
    UserIcon,
    BellAlertIcon,
    UserGroupIcon,
    Cog6ToothIcon,
  } from "@heroicons/react/24/solid";
import { NavLink } from 'react-router-dom';
import useStore from '../services/useStore';

const MobileMenu = () => {
    const { user } = useStore();
    const links = [
        {
          pathname: "Home",
          to: "/",
          icon: <HomeIcon className="h-6 w-6 text-gray-950  dark:text-white" />,
          id: 1,
        },
        {
          pathname: "Profile",
          to: `/profile/${user?._id}`,
          icon: <UserIcon className="h-6 w-6 text-gray-950 dark:text-white" />,
          id: 2,
        },
        {
          pathname: "Notifications",
          to: "/notifications",
          icon: <BellAlertIcon className="h-6 w-6 text-gray-950 dark:text-white" />,
          id: 3,
        },
        {
          pathname: "Friends",
          to: "/friends",
          icon: <UserGroupIcon className="h-6 w-6 text-gray-950 dark:text-white" />,
          id: 4,
        },
        {
          pathname: "Settings",
          to: "/settings",
          icon: <Cog6ToothIcon className="h-6 w-6 text-gray-950 dark:text-white" />,
          id: 5,
        },
      ];
    
  return (
    <div className='fixed bottom-0 left-0 right-0 bg-white hidden xl:block dark:bg-dark-secondary'>
        <div className='grid grid-cols-5 gap-1 border-t drop-shadow-md'>
        {links.map((link, i) => {
          return (
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "font-[700] bg-gray-100 border-2 border-t-cyan-500  justify-center text-white flex items-center gap-3 w-full py-2 px-4 rounded-lg hover:bg-gray-100 c dark:bg-dark-secondary"
                  : "font-[700] justify-center flex items-center  gap-3 w-full py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-secondary"
              }
              to={link.to}
              key={i}
            >
              {link.icon}
            </NavLink>
          );
        })}
        </div>
    </div>
  )
}

export default MobileMenu