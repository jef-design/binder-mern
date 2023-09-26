import React from "react";
import {UserCircleIcon, ArrowRightOnRectangleIcon} from "@heroicons/react/24/solid";
import useStore from "../services/useStore";
import axios from "axios";
import {Link} from "react-router-dom";
import {useQueryClient} from "@tanstack/react-query";
import axiosInstance from "../services/axiosInstance";

const Header = () => {
    const {user, logOutUser} = useStore();
    const queryClient = useQueryClient();

    const logOutHandler = () => {
        axiosInstance.post("/api/binder/logout").then(res => res.data);
        logOutUser();
    };
    return (
        <div className="flex p-3 justify-between border bg-white sticky top-0 left-0 right-0 z-10">
            <div>
                <Link to={"/"} className=" font-bold text-lg">
                    Binder.
                </Link>
            </div>
            <div className="flex gap-2">
                {user && (
                    <div className="flex gap-4 items-center">
                        <div className="flex gap-1">
                        {user.profile_image && (<img className="h-9 w-9 rounded-full" src={user.profile_image.url} alt={user.name} />)}
                                {!user.profile_image && (<UserCircleIcon className="h-6 w-6 text-gray-500" />)}
                            {/* <UserCircleIcon className="h-6 w-6 text-gray-500" /> */}
                            <Link to={`/profile/${user._id}`}>{user?.name}</Link>
                        </div>
                        <div onClick={logOutHandler} className=" cursor-pointer flex items-center gap-1">
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
