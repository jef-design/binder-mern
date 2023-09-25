import React from "react";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";



const FriendSuggestion = () => {
    const {data: users, isLoading} = useQuery({
        queryKey: ["getusers"],
<<<<<<< HEAD
        queryFn: () => axiosInstance.get("/api/binder/users").then(res => res.data.users),
=======
        queryFn: () => axios.get("https://binder-api.onrender.com/api/binder/users").then(res => res.data.users),
>>>>>>> 48cf4afe657d84e6207d8a49344ae202613d3ddf
    });

    return (
        <div className="sm:hidden">
            <div className=" bg-white p-3 rounded-md shadow-md">
            <h3 className="font-bold my-2">Friend Suggestion</h3>
            {users &&
                users.map(user => {
                    return (
                        
                        <Link to={`/profile/${user._id}`} key={user._id} className="flex justify-between my-2 rounded-sm cursor-pointer py-2 hover:bg-gray-100">
                            <div className="flex gap-2 items-center">
                                <UserCircleIcon className="h-9 w-9 text-gray-500" />
                                <div>
                                <div>{user.name}</div>
                                <div className=" text-xs text-gray-500">@{user.username}</div>
                                </div>
                            </div>
                            <div className="flex items-center bg-gray-950 text-white cursor-pointer px-4 rounded-md text-sm">Follow</div>
                        </Link>
                    );
                })}
        </div>
        </div>
    );
};

export default FriendSuggestion;
