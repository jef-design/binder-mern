import {useParams} from "react-router-dom";
import useStore from "../services/useStore";
import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import React,{ useState,useEffect, useCallback } from "react";

import PostPlaceholder from "../components/PostPlaceholder";
import PostCards from "../components/PostCards";
import ProfilePlaceHolder from "../components/ProfilePlaceHolder";
import EditProfileModal from "../components/EditProfileModal";
import FollowButton from "../components/FollowButton";
import axiosInstance from "../services/axiosInstance";
import ImageModal from "../components/ImageModal";


const ProfileDetails = () => {
    const params = useParams();
    const {user} = useStore();
    const currentUserLogId = user._id
    const queryClient = useQueryClient();
    const [isOpen, setIsOpen] = useState(false)
    const [openModal, setOpenModal] = useState(false);
   //
   useQuery({
    queryKey: ['refreshToken'],
    queryFn: () => axiosInstance.get(`/api/binder/refreshToken`).then(res => res.data)
});

    const {data: userDetails} = useQuery({
        queryKey: ["userinfo", params.userID],
        queryFn: () => axiosInstance.get(`/api/binder/user/${params.userID}`).then(res => res.data),
    });
    console.log(userDetails)
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

    const unFollowHandler =() => {
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
   
      const modalHandler = useCallback(() => {
        setIsOpen(true)
    }, [])

    const modalCloseHandlers = useCallback(() => {
        setIsOpen(false)
    }, [])

    if (userPostLoader) {
        return (
            <>
            <ProfilePlaceHolder/>
              <PostPlaceholder/>
              <PostPlaceholder/>
              <PostPlaceholder/>
              <PostPlaceholder/>
            </>
        );
    }
    const handleClickOpenModal = () => {
        setOpenModal(true);
      };
      const handleCloseModal = () => {
        setOpenModal(false);
      };
    return (
        <div className="max-w-[780px] w-full mx-auto p-3 pt-7 border rounded-md bg-white dark:bg-dark-main dark:text-white dark:border-none duration-300 ease-in-out">
            <EditProfileModal currentUserLogId={currentUserLogId} status={isOpen} modalCloseHandler={modalCloseHandlers} />
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
                                <div>
                                    {user?.status && (<><span className=" text-xs">Online </span><span className="h-2 w-2 rounded-full bg-green-500 inline-block"></span></>)}
                                   
                                </div>
                            </div>
                            <div className="w-[160px] h-[160px] border-2 rounded-full">
                                <img onClick={handleClickOpenModal} className="w-[160px] h-[160px] cursor-pointer rounded-full object-cover" src={user?.profile_image?.url} alt="" />
                            </div>
                            <ImageModal imageUrl={user?.profile_image?.url} modalOpen={openModal} handleCloseModal={handleCloseModal} />
                        </div>
                        <div className="flex gap-2 justify-between mt-4 font-[500]">
                            {params.userID === currentUserLogId ? (
                                <button onClick={modalHandler} className="border w-full py-2 rounded-md dark:border-gray-500">Edit Profile</button>
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
                            <button className="border w-full py-2 rounded-md dark:border-gray-500">Share Profile</button>
                        </div>
                    </React.Fragment>
                );
            })}
            <div className="mt-8 border-t dark:border-gray-500">
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
                                            date={post.createdAt}
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
