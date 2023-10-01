import React from "react";
import useStore from "../services/useStore";
import AsideMenu from "../layouts/AsideMenu";

const SettingsScreen = () => {
    const {user} = useStore()
    return (
        <main className='relative grid grid-cols-4 gap-2 mt-3 w-full xl:grid-cols-2 sm:grid-cols-1'>
            <AsideMenu/>
            <div className="max-w-[680px] w-full mx-auto col-span-2 bg-white px-4 py-2 rounded-sm">
                <h2 className=" font-bold text-lg">Manage Account</h2>
                <div className=" mt-3">
                    <p className=" font-[600]">Name</p>
                    <span>{user.name}</span>
                </div>
                <div className=" mt-3">
                    <p className=" font-[600]">Email</p>
                    <span>{user.email}</span>
                </div>
                <div className="mt-4 p-2 border inline-block rounded-sm text-red-400 cursor-pointer">
                    Delete Account Permanently
                </div>
            </div>
          
        </main>
    );
};

export default SettingsScreen;
