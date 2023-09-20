import axios from "axios";
import React, {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import PostCards from "./PostCards";
import {Navigate} from "react-router-dom";
import PostPlaceholder from "./PostPlaceholder";

const PostCard = () => {
    
    const {
        data: PostData,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["getpost"],
        queryFn: () => axios.get("https://binder-api.onrender.com/api/binder/post/").then(res => res.data),
        
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

    if (isError) {
        return <span>Error</span>;
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
                                userName={post.userName}
                                caption={post.caption}
                                image={post.image}
                                likes={post.likes}
                            />
                        </React.Fragment>
                    );
                })}
        </div>
    );
};

export default PostCard;
