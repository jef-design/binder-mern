import React,{useState} from "react";
import {UserCircleIcon, HeartIcon as HeartIconSolid} from "@heroicons/react/24/solid";
import {HeartIcon, ChatBubbleLeftIcon, TrashIcon} from "@heroicons/react/24/outline";
import {Link} from "react-router-dom";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import axiosInstance from '../services/axiosInstance'
import useStore from "../services/useStore";
import {Comment} from "react-loader-spinner";

const PostCards = ({postID,name, userID,profileImage, caption, image, likes,comments,userLogged}) => {
    const {user} = useStore();
    const queryClient = useQueryClient();
    const [comment, setComment] = useState('')
    const userProfile = user.profile_image
    
    console.log(userID)
    //delete handler
    const {mutate} = useMutation({
        mutationKey: ["deletepost"],
        mutationFn: postID => axiosInstance.delete(`/api/binder/post/${postID}`).then(res => res.data),
        onSuccess: postID => {
            queryClient.invalidateQueries("getpost","userpost", userID);
          
        },
    });

    const deleteHandler = () => {
        mutate(postID);
    };
 
    //like post
    const {mutate: mutateLike} = useMutation({
        mutationKey: ["likepost"],
        mutationFn: likerID => axiosInstance.patch(`/api/binder/post/like/${postID}`, likerID).then(res => res.data),
        onSuccess: likerID => {
            queryClient.invalidateQueries("getpost","userpost",userID, likerID);
            console.log(likerID);
        },
    });

    const likeHandler = () => {
        const likerID = {id: user._id};
        mutateLike(likerID);
    };

    // unlike handler
    const {mutate: mutateUnLike} = useMutation({
        mutationKey: ["likepost"],
        mutationFn: likerID => axiosInstance.patch(`/api/binder/post/unlike/${postID}`, likerID).then(res => res.data),
        onSuccess: likerID => {
            queryClient.invalidateQueries("getpost","userpost",userID, likerID);
           
        },
    });
    const unLikeHandler = () => {
        const likerID = {id: user._id};
        mutateUnLike(likerID);
    };
    const filteredLiked = likes.filter(like => like.userID == user._id);

    //comment handler 
    const {mutate: mutateComment, isLoading} = useMutation({
        mutationKey: ["commentpost"],
        mutationFn: commenterID => axiosInstance.patch(`/api/binder/post/comment/${postID}`, commenterID).then(res => res.data),
        onSuccess: commenterID => {
            queryClient.invalidateQueries("getpost","userpost",userID, commenterID);
            setComment('')
           
        },
    });
    const sendComment = (e) => {
        e.preventDefault()
        const commenterID = {id: user._id, comment: comment};
        mutateComment(commenterID);
    }

      //delete comment handler
      const postedComment = { postID}
      const {mutate: deleteCommentMutate} = useMutation({
        mutationKey: ["deletecomment"],
        mutationFn: (commentID) => axiosInstance.patch(`/api/binder/post/comment/delete/${postID}`, commentID).then(res => res.data),
        onSuccess: (commentID) => {
            queryClient.invalidateQueries("getpost","userpost", commentID, postID);
          
        },
    });

    return (
        <div className="flex flex-col gap-5 bg-white px-4 py-2 rounded-md mb-4 shadow-md">
            <div className="flex justify-between">
                <div className="flex items-center gap-2">
                    {!profileImage?.url && <UserCircleIcon className="h-9 w-9 text-gray-500" />}
                    {profileImage && (<img className="h-9 w-9 rounded-full" src={profileImage?.url} alt="" /> )}
                    <Link to={`/profile/${userID._id}`}>
                        <span className=" font-[500]">{name}</span>
                    </Link>
                </div>
                {user._id === userID._id && (
                    <div className=" cursor-pointer" onClick={deleteHandler}>
                        <TrashIcon className="h-6 w-6 text-gray-500" />
                    </div>
                )}
            </div>
            <span className="font-[400] text-sm">{caption}</span>
            <div className="h-auto -mx-4">
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
                
                </div>
                <div className="flex items-center gap-1">
                    <ChatBubbleLeftIcon className="h-6 w-6 text-gray-500" />{" "}
               
                    <span className=" text-xs">{comments.length} {comments.length <= 1 ? 'comment' : 'comments'}</span>
                </div>
            </div>
            <div className="px-3 mt-1 border-t pt-3">

                {comments.map((com,i) => {
                    return(
                        <div key={i} className="flex gap-3 items-center mb-3">
                            {!com.userID?.profile_image?.url && <UserCircleIcon className="h-7 w-7 text-gray-500" />}
                            {com.userID && (<img className="h-7 w-7 rounded-full" src={com.userID.profile_image?.url} alt="" /> )}
                            <div className=" bg-gray-100 w-full p-2 rounded-md">
                                <div className=" text-xs font-[600]">
                                {com.userID?.name}
                                </div >
                                <span className="text-xs">{com?.comment}</span>
                                <div className=" flex items-center gap-4">
                                <p className=" text-xs text-gray-600">Reply</p>
                                
                                {com?.userID?._id === userLogged && (<p onClick={() => {
                                    deleteCommentMutate({_id:com._id})
                                }} className=" text-xs text-gray-600 cursor-pointer">Delete</p>)}
                                </div>
                            </div>
                            
                        </div>
                    )
                })}
                {isLoading && (
                    <div className="flex justify-center">                   
                    <Comment
                        visible={true}
                        ariaLabel="comment-loading"
                        wrapperStyle={{}}
                        wrapperClass="comment-wrapper"
                        color="#fff"
                        backgroundColor="#2e50af"
                        height={30}
                        width={30}
                    />
                    </div>
                )}
            </div>
            <div className="flex gap-4 border-t pt-2">
            {!userProfile && <UserCircleIcon className="h-6 w-6 text-gray-500" />}
                    {userProfile && (<img className="h-6 w-6 rounded-full" src={userProfile} alt="" /> )}
        
              <form onSubmit={sendComment}>
              <input
                    value={comment}
                    className="w-full outline-none text-sm"
                    type="text"
                    placeholder={`Add a comment for ${name}...`}
                    onChange={(e) => {setComment(e.target.value)}}
                />
              </form>
            </div>
        </div>
    );
};

export default PostCards;
