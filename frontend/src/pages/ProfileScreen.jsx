import React from "react";
import useStore from "../services/useStore";
import AsideMenu from "../layouts/AsideMenu";
import FriendSuggestion from "../layouts/FriendSuggestion";
import ProfileDetails from "./ProfileDetails";

const ProfileScreeen = () => {

    return (
        <main className='relative mt-3 w-full xl:grid-cols-2 sm:grid-cols-1'>
            <AsideMenu/>
            <div className="max-w-[650px] w-full mx-auto col-span-2">
                <ProfileDetails/>
            </div>
            <FriendSuggestion/>
        </main>
    );
};

export default ProfileScreeen;
