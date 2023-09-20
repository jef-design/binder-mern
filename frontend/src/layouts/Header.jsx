import React from "react";
import {UserCircleIcon, ArrowRightOnRectangleIcon} from "@heroicons/react/24/solid";
import useStore from "../services/useStore";
import axios from "axios";
import {Link} from "react-router-dom";
import {useQueryClient} from "@tanstack/react-query";

const Header = () => {
    const {user, logOutUser} = useStore();
    const queryClient = useQueryClient();

    const logOutHandler = () => {
        axios.post("https://binder-api.onrender.com/api/binder/logout").then(res => res.data);
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
                    <div className="flex gap-4">
                        <div className="flex gap-1">
                            <UserCircleIcon className="h-6 w-6 text-gray-500" />
                            <Link to={`/profile/${user._id}`}>{user?.name}</Link>
                        </div>
                        <div onClick={logOutHandler} className=" cursor-pointer">
                            <ArrowRightOnRectangleIcon className="h-6 w-6 text-red-500" />
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
