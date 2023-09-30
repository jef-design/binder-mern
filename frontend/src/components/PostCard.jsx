import axios from "axios";
import React, {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import PostCards from "./PostCards";
import {Navigate} from "react-router-dom";
import PostPlaceholder from "./PostPlaceholder";
import axiosInstance from "../services/axiosInstance";
import useStore from "../services/useStore";


const PostCard = () => {
    const {logOutUser, user} = useStore();
    const userLogged = user._id
        
    const {
        data: PostData,
        isLoading,
        error,
        isError,
        isFetching
    } = useQuery({
        queryKey: ["getpost"],
        queryFn: () => axiosInstance.get("/api/binder/post").then(res => res.data),
        staleTime: 2000
        
    });

    if (isLoading) {
        return (
            <>
              <PostPlaceholder/>
              <PostPlaceholder/>
              <PostPlaceholder/>
            </>
        );
    }

    if (error?.response?.data?.message === 'Not Authorized, No token') {
       alert('Session expired, Please login again.')
       logOutUser();
       
    }
   
    return (
        <div className="mt-5">
            {PostData &&
                PostData?.posts.map(post => {
                    return (
                        <React.Fragment key={post._id}>
                            <PostCards
                                postID={post._id}
                                userID={post.userID}
                                profileImage={post.userID?.profile_image}
                                name={post.userID?.name}
                                // userName={post.userName}
                                caption={post.caption}
                                image={post.image}
                                likes={post.likes}
                                comments={post.comments}
                                userLogged={userLogged}
                            />
                        </React.Fragment>
                    );
                })}
        </div>
    );
};

export default PostCard;
