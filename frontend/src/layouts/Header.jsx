import React from "react";
import {
  UserCircleIcon,
  ArrowRightOnRectangleIcon, MoonIcon, SunIcon
} from "@heroicons/react/24/solid";
import useStore from "../services/useStore";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../services/axiosInstance";

const Header = ({toggleTheme,themes}) => {
  const { user, logOutUser } = useStore();

  const userId = {_id: user?._id}

  const logOutHandler = () => {
    axiosInstance.post(`/api/binder/logout`, userId).then((res) => res.data);
    logOutUser();
  };
  return (
    <div className="flex px-4 py-2 justify-between bg-white sticky top-0 left-0 right-0 z-10 dark:bg-dark-main dark:text-white duration-300 ease-in-out">
      <div>
        <Link to={"/"} className=" font-bold text-lg">
          Binder.
        </Link>
      </div>
      <div className="flex gap-2 items-center">
        <div className=" cursor-pointer" onClick={toggleTheme}>
        {themes === 'light' && (<MoonIcon className="h-6 w-6 text-gray-500" />)}
        {themes === 'dark' && ( <SunIcon className="h-6 w-6 text-gray-500" />)}
       
        </div>
        {user && (
          <div className="flex gap-4 items-center text-sm">
            <div className="flex gap-1 items-center">
             <div className="relative">
             {user.status === true && (<div className="absolute bottom-0 right-2 bg-green-500 h-2 w-2 rounded-full"></div>)}
             {user.profile_image && (
                <img
                  className="h-8 w-8 mr-2 rounded-full object-cover"
                  src={user.profile_image}
                  alt={user.name}
                />
              )}
              {!user.profile_image && (
                <UserCircleIcon className="h-8 w-8 text-gray-500" />
              )}
             </div>

              <Link to={`/profile/${user._id}`}>{user?.name}</Link>

             
            </div>
            <div
              onClick={logOutHandler}
              className=" cursor-pointer flex items-center gap-1"
            >
              <ArrowRightOnRectangleIcon className="h-6 w-6 text-red-500" />
              <span className=" text-gray-500">Sign out</span>
            </div>
          </div>
        )}
        {!user && (
          <div className="flex gap-2">
            <Link to={"/signup"}>Sign up</Link>
            <Link to={"/login"}>Log in</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
