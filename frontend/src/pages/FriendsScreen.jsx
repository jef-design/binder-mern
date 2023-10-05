import React from "react";
import useStore from "../services/useStore";
import AsideMenu from "../layouts/AsideMenu";
import { useQuery } from "@tanstack/react-query";
import FriendSuggestion from "../layouts/FriendSuggestion";
import axiosInstance from "../services/axiosInstance";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";



const FriendsScreeen = () => {
    const {user} = useStore()

    const {data: userDetails} = useQuery({
        queryKey: ["userinfo", user._id],
        queryFn: () => axiosInstance.get(`/api/binder/user/${user._id}`).then(res => res.data),
        refetchInterval: 10000,
    });
    
    const userInfo = userDetails?.user[0]
    const {follower} = userInfo || {}
    console.log(follower)
  return (
    <main className=" mt-3 w-full">
      <AsideMenu />
      <div className="max-w-[680px] w-full h-full mx-auto col-span-2 bg-white px-4 py-2 rounded-sm dark:bg-dark-main dark:text-white dark:border-none duration-300 ease-in-out">
        <h2 className=" font-bold text-lg">Friends</h2>
        <div className="mt-4">
            <span>All</span>
            {follower?.map((userIf, index) => {
                return(
                    <div key={index}>
                         <Link to={`/profile/${userIf.userID._id}`} className="flex justify-between my-2 rounded-sm cursor-pointer py-2 hover:bg-gray-100">
                            <div className="flex gap-2 items-center">
                            <div className="relative">
                            {userIf.userID.status === true && (<div className="absolute bottom-0 right-0 bg-green-500 h-2 w-2 rounded-full"></div>)}
                                {userIf.userID.profile_image && (<img className="h-9 w-9 rounded-full" src={userIf.userID.profile_image.url} alt={userIf.userID.name} />)}
                                {!userIf.userID.profile_image && (<UserCircleIcon className="h-9 w-9 text-gray-500" />)}
                            </div>
                                <div>
                                <div>{userIf.userID.name}</div>
                                <div className=" text-xs text-gray-500">@{userIf.userID.username}</div>
                                </div>
                            </div>
                            <div className="flex items-center bg-gray-950 text-white cursor-pointer px-4 h-7 rounded-md text-sm">Follow</div>
                        </Link>
                    </div>
                )
            })}
        </div>
      </div>
      <FriendSuggestion />
    </main>
  );
};

export default FriendsScreeen;
