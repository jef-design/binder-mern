import React from "react";
import {
  HomeIcon,
  UserIcon,
  BellAlertIcon,
  UserGroupIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import { Link, useLocation, NavLink } from "react-router-dom";
import useStore from "../services/useStore";

const AsideMenu = () => {
  const { user } = useStore();

  const links = [
    {
      pathname: "Home",
      to: "/",
      icon: <HomeIcon className="h-6 w-6 text-gray-950" />,
      id: 1,
    },
    {
      pathname: "Profile",
      to: `/profile/${user?._id}`,
      icon: <UserIcon className="h-6 w-6 text-gray-950" />,
      id: 2,
    },
    {
      pathname: "Notifications",
      to: "/notifications",
      icon: <BellAlertIcon className="h-6 w-6 text-gray-950" />,
      id: 3,
    },
    {
      pathname: "Friends",
      to: "/friends",
      icon: <UserGroupIcon className="h-6 w-6 text-gray-950" />,
      id: 4,
    },
    {
      pathname: "Settings",
      to: "/settings",
      icon: <Cog6ToothIcon className="h-6 w-6 text-gray-950" />,
      id: 5,
    },
  ];

  return (
    <div className=" bg-white fixed left-0 top-0 mt-10 px-4 pt-5 max-w-[350px] h-full w-full xl:hidden ">
      <div className="flex flex-col gap-6">
        {links.map((link, i) => {
          return (
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "font-[700] bg-black text-white flex items-center gap-3 w-full py-2 px-4 rounded-lg hover:bg-gray-100 hover:text-black"
                  : "font-[700] flex items-center  gap-3 w-full py-2 px-4 rounded-lg hover:bg-gray-100"
              }
              to={link.to}
              key={i}
            >
              {link.icon}
              <div>{link.pathname}</div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default AsideMenu;

// import React from "react";
// import {HomeIcon, UserIcon, BellAlertIcon,UserGroupIcon, Cog6ToothIcon} from "@heroicons/react/24/solid";
// import { Link, useLocation, NavLink } from "react-router-dom";
// import useStore from "../services/useStore";

// const AsideMenu = () => {
//     const {user } = useStore()
//     return (
//         <div className="bg-white max-w-[450px] h-full xl:hidden">
//             <div className="flex flex-col gap-6 fixed left-0 p-4 rounded-md  border-b">
//                 <Link to="/" className="flex items-center gap-3 w-full py-2 px-4 rounded-lg hover:bg-gray-100">
//                     <HomeIcon className="h-6 w-6 text-gray-950" />
//                     <div>Home</div>
//                 </Link>
//                 <Link to={`/profile/${user?._id}`} className="flex items-center gap-3 w-full py-2 px-4 rounded-lg hover:bg-gray-100">
//                     <UserIcon className="h-6 w-6 text-gray-950" />
//                     <div>Profile</div>
//                 </Link>
//                 <Link to={'/'} className="flex items-center gap-3 w-full py-2 px-4 rounded-lg hover:bg-gray-100">
//                     <BellAlertIcon className="h-6 w-6 text-gray-950" />
//                     <div className="relative">Notifications
//                         <div className="absolute -right-4 top-0 rounded-full h-2 w-2 bg-blue-600"></div>
//                     </div>
//                 </Link>
//                 <Link to={'/'} className="flex items-center gap-3 w-full py-2 px-4 rounded-lg hover:bg-gray-100">
//                 <UserGroupIcon className="h-6 w-6 text-gray-950" />
//                     <div>Friends</div>
//                 </Link>
//                 <Link to={'/'} className="flex items-center gap-3 w-full py-2 px-4 rounded-lg hover:bg-gray-100">
//                 <Cog6ToothIcon className="h-6 w-6 text-gray-950" />
//                     <div>Settings</div>
//                 </Link>
//             </div>
//         </div>
//     );
// };

// export default AsideMenu;
