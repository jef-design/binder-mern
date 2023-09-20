import React from "react";
import {HomeIcon, UserIcon, BellAlertIcon,UserGroupIcon, Cog6ToothIcon} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import useStore from "../services/useStore";

const AsideMenu = () => {
    const {user } = useStore()
    return (
        <div className="bg-white h-screen">
            <div className="flex flex-col gap-6 fixed left-0 p-4 rounded-md  border-b">
                <Link to="/" className="flex items-center gap-3 w-full py-2 px-4 rounded-lg hover:bg-gray-100">
                    <HomeIcon className="h-6 w-6 text-gray-950" />
                    <div>Home</div>
                </Link>
                <Link to={`/profile/${user?._id}`} className="flex items-center gap-3 w-full py-2 px-4 rounded-lg hover:bg-gray-100">
                    <UserIcon className="h-6 w-6 text-gray-950" />
                    <div>Profile</div>
                </Link>
                <Link to={'/'} className="flex items-center gap-3 w-full py-2 px-4 rounded-lg hover:bg-gray-100">
                    <BellAlertIcon className="h-6 w-6 text-gray-950" />
                    <div className="relative">Notifications
                        <div className="absolute -right-4 top-0 rounded-full h-2 w-2 bg-blue-600"></div>
                    </div>
                </Link>
                <Link to={'/'} className="flex items-center gap-3 w-full py-2 px-4 rounded-lg hover:bg-gray-100">
                <UserGroupIcon className="h-6 w-6 text-gray-950" />
                    <div>Friends</div>
                </Link>
                <Link to={'/'} className="flex items-center gap-3 w-full py-2 px-4 rounded-lg hover:bg-gray-100">
                <Cog6ToothIcon className="h-6 w-6 text-gray-950" />
                    <div>Settings</div>
                </Link>
            </div>
        </div>
    );
};

export default AsideMenu;
