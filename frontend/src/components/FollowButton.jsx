import React from "react";
import { RotatingLines } from "react-loader-spinner";

const FollowButton = ({follower, currentUserLogId, followHandler, unFollowHandler,followLoader,unfollowLoader}) => {
    console.log(follower, currentUserLogId);

    const filteredFollower = follower.filter(f => f.userID === currentUserLogId);
    console.log(filteredFollower);
    return (
        <>
            {filteredFollower == 0 ? (
                <button onClick={followHandler} className="border w-full py-2 rounded-md flex justify-center items-center">
                     {followLoader  ?
                    <RotatingLines
                        strokeColor="grey"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="20"
                        visible={true}
                        /> : 'Follow'}
                </button>
            ) : (
                <button onClick={unFollowHandler} className="border w-full py-2 rounded-md flex justify-center items-center">
                    {unfollowLoader  ?
                    <RotatingLines
                        strokeColor="grey"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="20"
                        visible={true}
                        /> : 'Unfollow'}
                </button>
            )}
        </>
    );
};

export default FollowButton;
