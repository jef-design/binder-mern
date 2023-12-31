import React from "react";
import {useQuery} from "@tanstack/react-query";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";
import useStore from '../services/useStore'
import Search from "./Search";



const FriendSuggestion = () => {
    const {user} = useStore();
    const userLoggedIn = user._id
    const {data: users, isLoading} = useQuery({
        queryKey: ["getusers"],
        queryFn: () => axiosInstance.get("/api/binder/users").then(res => res.data.users),
        refetchInterval: 10000,
    });

    const filteredUser = users?.filter((u) => u._id !== userLoggedIn)
  
    return (
        <div className="bg-white fixed right-0 top-0 mt-10 px-4 pt-5 max-w-[350px] h-full w-full sm:hidden dark:bg-dark-main dark:text-white duration-300 ease-in-out">
            <Search/>
            <div className=" bg-white p-3 rounded-md shadow-md dark:bg-dark-main dark:text-white duration-300 ease-in-out">
            <h3 className="font-bold my-2">People in binder you might follow</h3>
            {filteredUser &&
                filteredUser.map(user => {
                    return (
                       
                        <Link to={`/profile/${user._id}`} key={user._id} className="flex justify-between my-2 rounded-sm cursor-pointer py-2 hover:bg-gray-100 dark:hover:bg-[#242526]">
                            <div className="flex gap-2 items-center">
                                <div className="relative">
                                {user.status === true && (<div className="absolute bottom-0 right-1 bg-green-500 h-2 w-2 rounded-full"></div>)}
                                {user.profile_image && (<img className="h-9 w-9 rounded-full object-cover" src={user.profile_image.url} alt={user.name} />)}
                                {!user.profile_image && (<UserCircleIcon className="h-9 w-9 text-gray-500" />)}
                                </div>
                                <div>
                                <div>{user.name}</div>
                                <div className=" text-xs text-gray-500">@{user.username}</div>
                                </div>
                            </div>
                            <div className="flex items-center bg-gray-950 text-white cursor-pointer px-4 h-7 rounded-md text-sm">Follow</div>
                        </Link>
                        
                    );
                })}
        </div>
        </div>
    );
};

export default FriendSuggestion;
