import {useParams} from "react-router-dom";
import axios from "axios";
import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import useStore from "../services/useStore";
import PostPlaceholder from "../components/PostPlaceholder";
import PostCards from "../components/PostCards";
import ProfilePlaceHolder from "../components/ProfilePlaceHolder";
import EditProfileModal from "../components/EditProfileModal";
import React,{ useState } from "react";
import FollowButton from "../components/FollowButton";
import axiosInstance from "../services/axiosInstance";

const ProfileDetails = () => {
    const params = useParams();
    const {user} = useStore();
    const currentUserLogId = user._id
    const queryClient = useQueryClient();
    const [isOpen, setIsOpen] = useState(false)
 

    const {data: userDetails} = useQuery({
        queryKey: ["userinfo", params.userID],
        queryFn: () => axiosInstance.get(`/api/binder/user/${params.userID}`).then(res => res.data),
    });
    // FOLLOW USER
    const {mutate, isLoading: followLoader} = useMutation({
        mutationFn: followerID => axiosInstance.patch(`/api/binder/follow/${params.userID}`, followerID).then(res => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries(["userinfo", params.userID]);
        },
    });

    const followHandler = () => {
        const followerID = {id: currentUserLogId};
        mutate(followerID);
    };
    // UNFOLLOW USER
     // FOLLOW USER
     const {mutate: mutateUnfollow, isLoading: unfollowLoader} = useMutation({
        mutationFn: unfollowerID => axiosInstance.patch(`/api/binder/unfollow/${params.userID}`, unfollowerID).then(res => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries(["userinfo", params.userID]);
        },
    });

    const unFollowHandler = () => {
        const unfollowerID = {id: currentUserLogId};
        mutateUnfollow(unfollowerID);
    };
    // get user post

    const {
        data: UserPost, isLoading: userPostLoader,
    } = useQuery({
        queryKey: ["userpost", params.userID],
        queryFn: () => axiosInstance.get(`/api/binder/user/post/${params.userID}`).then(res => res.data),
        
    });
    console.log(UserPost)
    if (userPostLoader) {
        return (
            <>
            <ProfilePlaceHolder/>
              <PostPlaceholder/>
              <PostPlaceholder/>
              <PostPlaceholder/>
            </>
        );
    }
    const modalHandler = () => {
        setIsOpen(true)
    }
    const modalCloseHandler = () => {
        setIsOpen(false)
    }
    return (
        <div className="max-w-[780px] w-full mx-auto p-3 pt-7 border rounded-md bg-white">
            <EditProfileModal currentUserLogId={currentUserLogId} status={isOpen} modalCloseHandler={modalCloseHandler} />
            {userDetails?.user.map(user => {
                return (
                    <React.Fragment key={user._id}>
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className=" text-2xl font-bold mb-2">{user.name}</h2>
                                <div className="text-sm text-gray-500 italic">@{user.username}</div>
                                <div>{user.bio}</div>
                                <div className="mt-4">
                                    <span className=" text-gray-600">{user.follower.length} Follower</span>
                                </div>
                            </div>
                            <div className="w-[120px] h-[120px] rounded-full border-2">
                                <img className=" w-full h-full rounded-full" src={user?.profile_image?.url} alt="" />
                            </div>
                        </div>
                        <div className="flex gap-2 justify-between mt-4 font-[500]">
                            {params.userID === currentUserLogId ? (
                                <button onClick={modalHandler} className="border w-full py-2 rounded-md">Edit Profile</button>
                            ) : (
                                <FollowButton 
                                    follower={user.follower}
                                    currentUserLogId={currentUserLogId}
                                    followHandler={followHandler}
                                    unFollowHandler={unFollowHandler}
                                    followLoader={followLoader}
                                    unfollowLoader={unfollowLoader}
                                     />
                            )}
                            <button className="border w-full py-2 rounded-md">Share Profile</button>
                        </div>
                    </React.Fragment>
                );
            })}
            <div className="mt-8 border-t">
                <div className=" text-lg my-2">Posts</div>
                        {UserPost &&
                            UserPost?.posts.map(post => {
                                return (
                                    <React.Fragment key={post._id}>
                                        <PostCards
                                            postID={post._id}
                                            userID={post.userID}
                                            name={post.userID?.name}
                                            profileImage={post.userID.profile_image}
                                            userName={post.userName}
                                            caption={post.caption}
                                            image={post.image}
                                            likes={post.likes}
                                            comments={post.comments}
                                            userLogged={currentUserLogId}
                                        />
                                    </React.Fragment>
                                );
                            })}
                    </div>
        </div>
    );
};

export default ProfileDetails;
