import React from "react";
import {UserCircleIcon, HeartIcon as HeartIconSolid} from "@heroicons/react/24/solid";
import {HeartIcon, ChatBubbleLeftIcon, TrashIcon} from "@heroicons/react/24/outline";
import {Link} from "react-router-dom";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import useStore from "../services/useStore";

const PostCards = ({postID, userID, userName, caption, image, likes}) => {
    const {user} = useStore();
    const queryClient = useQueryClient();
    const {mutate} = useMutation({
        mutationKey: ["deletepost"],
        mutationFn: postID => axios.delete(`/api/binder/post/${postID}`).then(res => res.data),
        onSuccess: postID => {
            queryClient.invalidateQueries("getpost","userpost", userID);
            console.log(postID);
        },
    });

    const deleteHandler = () => {
        mutate(postID);
    };
    //like post
    //like post
    const {mutate: mutateLike} = useMutation({
        mutationKey: ["likepost"],
        mutationFn: likerID => axios.patch(`/api/binder/post/like/${postID}`, likerID).then(res => res.data),
        onSuccess: likerID => {
            queryClient.invalidateQueries("getpost","userpost",userID, likerID);
            console.log(likerID);
        },
    });

    const likeHandler = () => {
        const likerID = {id: user._id};
        mutateLike(likerID);
    };

    const {mutate: mutateUnLike} = useMutation({
        mutationKey: ["likepost"],
        mutationFn: likerID => axios.patch(`/api/binder/post/unlike/${postID}`, likerID).then(res => res.data),
        onSuccess: likerID => {
            queryClient.invalidateQueries("getpost","userpost",userID, likerID);
           
        },
    });
    const unLikeHandler = () => {
        const likerID = {id: user._id};
        mutateUnLike(likerID);
    };
    const filteredLiked = likes.filter(like => like.userID == user._id);


    return (
        <div className="flex flex-col gap-5 bg-white p-2 rounded-md mb-4 shadow-md">
            <div className="flex justify-between">
                <div className="flex gap-2">
                    <UserCircleIcon className="h-6 w-6 text-gray-500" />
                    <Link to={`/profile/${userID}`}>
                        <span className=" font-bold">{userName}</span>
                    </Link>
                </div>
                {user._id === userID && (
                    <div className=" cursor-pointer" onClick={deleteHandler}>
                        <TrashIcon className="h-6 w-6 text-gray-500" />
                    </div>
                )}
            </div>
            <div>{caption}</div>
            <div className="h-auto -mx-2">
                {image && image?.url?.endsWith(".jpg") && (
                    <img className="max-h-[710px] w-full" src={image?.url} alt={caption} />
                )}
                {image && image?.url?.endsWith(".mp4") && <video controls width="100%" src={image?.url} />}
            </div>
            <div className="flex gap-3">
                <div className="flex items-center gap-1">
                    {filteredLiked == 0 ? (
                        <>
                            <HeartIcon onClick={likeHandler} className="h-6 w-6 text-blue-500 cursor-pointer" />
                            <span className=" text-xs">{likes.length} {likes.length <= 1 ? 'like' : 'likes'}</span>
                        </>
                    ) : (
                        <>
                            <HeartIconSolid onClick={unLikeHandler} className="h-6 w-6 text-blue-500 cursor-pointer" />
                            <span className=" text-xs">{likes.length}  {likes.length <= 1 ? 'like' : 'likes'}</span>
                        </>
                    )}
                    {/* {likes.length === 0 || !filteredLiked ? <><HeartIcon onClick={likeHandler} className="h-6 w-6 text-gray-500" /> <span className=" text-xs">{likes.length}</span></>
                    : <><HeartIconSolid onClick={unLikeHandler} className="h-6 w-6 text-blue-500" /><span className=" text-xs">{likes.length}</span></>} */}
                </div>
                <div className="flex items-center gap-1">
                    <ChatBubbleLeftIcon className="h-6 w-6 text-gray-500" />{" "}
                    <span className=" text-xs">No comment</span>
                </div>
            </div>
            <div className="flex gap-4 border-t pt-2">
                <UserCircleIcon className="h-6 w-6 text-gray-500" />
                <input
                    className="w-full outline-none text-sm"
                    type="text"
                    placeholder={`Add a comment for ${userName}...`}
                />
            </div>
        </div>
    );
};

export default PostCards;
