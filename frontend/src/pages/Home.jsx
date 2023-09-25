import React from "react";
import PostCreator from "../components/PostCreator";
import PostCard from "../components/PostCard";
import useStore from "../services/useStore";
import AsideMenu from "../layouts/AsideMenu";
import FriendSuggestion from "../layouts/FriendSuggestion";

const Home = () => {

    return (
        <main className='relative grid grid-cols-3 gap-2 mt-3 w-full xl:grid-cols-2 sm:grid-cols-1'>
            <AsideMenu/>
            <div className="max-w-[680px] w-full mx-auto">
            {/* col-span-1 col-start-2 col-end-3 */}
                <PostCreator />
                <PostCard />
            </div>
            <FriendSuggestion/>
        </main>
    );
};

export default Home;
