import React, {useState} from "react";
import axios from "axios";
import {PhotoIcon, XMarkIcon, PaperClipIcon} from "@heroicons/react/24/outline";
import { UserCircleIcon} from "@heroicons/react/24/solid";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Oval} from "react-loader-spinner";
import axiosInstance from "../services/axiosInstance";
import useStore from '../services/useStore'

const PostCreator = () => {
    const [caption, setCaption] = useState("");
    const [image, setImage] = useState(null);
    const [prevImage, setPrevImage] = useState(null);
    const {user} = useStore()


    const queryClient = useQueryClient();
    const {mutate, isLoading, isError} = useMutation({
        mutationFn: dataForm =>
            axiosInstance.post("/api/binder/post/create", dataForm, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then(res => res.data),
        mutationKey: ["createpost"],
        onSuccess: () => {
            queryClient.invalidateQueries("getpost");
            setPrevImage(null);
            setCaption("");

        },
    });
    const submitHandler = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);
        formData.append("caption", caption);

        mutate(formData);
    };
    const handleImageChange = event => {
        const file = event.target.files[0];
        setImage(file);

        const prevImage = URL.createObjectURL(event.target.files[0]);
        setPrevImage(prevImage);
    };

    return (
        <div className="">
            <div className=" bg-white rounded-md px-4 py-4 shadow-md sticky left-0 bottom-0 dark:bg-dark-main dark:text-white duration-300 ease-in-out">
                <span className=" font-bold">Create Post</span>
                <form onSubmit={submitHandler}>
                    <div className="my-4 dark:bg-[#3a3b3c] flex items-center border rounded-3xl overflow-hidden dark:border-none">
                        <div className="">
                            {user.profile_image && (<img className="h-9 w-9 rounded-full object-contain" src={user?.profile_image} alt="sd" />)}
                            {!user.profile_image && (<UserCircleIcon className="h-6 w-6 rounded-full text-gray-500" />)}
                        </div>
                        <input
                            value={caption}
                            onChange={e => {
                                setCaption(e.target.value);
                            }}
                            className="px-4 py-2 outline-none w-full dark:bg-[#3a3b3c] "
                            type="text"
                            placeholder="Share your stories"
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex">
                        <div>
                            <label htmlFor="fileInput" id="customFileLabel">
                                <div className="flex items-center cursor-pointer border-r px-5">
                                    <PhotoIcon className="h-4 w-4 text-sky-500 cursor-pointer mr-2" />
                                    <span className="text-xs">Add Photo/Video</span>
                                </div>
                            </label>
                            <input accept="image/*,video/*" type="file" id="fileInput" onChange={handleImageChange} className=" hidden" />
                        </div>
                        <div className="flex items-center cursor-pointer border-r px-5">
                            <PaperClipIcon className="h-4 w-4 text-red-500 mr-2" />
                            <span className=" text-xs">File</span>
                        </div>
                        </div>
                        <button
                            style={{opacity: caption || prevImage ? '1' : '0.5'}}
                            disabled={caption || prevImage ? false : true}
                            className=" bg-gray-900 py-1 px-3 text-white rounded-3xl"
                            onClick={submitHandler}
                        >
                            Post
                        </button>
                    </div>
                    {image?.type == "image/jpeg" ? 
                    prevImage && (
                        <div style={{opacity: isLoading && '0.3'}} className="border cursor-pointer px-2 bg-gray-950 relative">
                            <img src={prevImage} alt="image" className="h-40 mx-auto" />

                            <div
                                onClick={() => {
                                    setPrevImage(null);
                                }}
                                className="text-white absolute right-4 top-2"
                            >
                                <XMarkIcon className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    ): 
                    prevImage && (
                        <div style={{opacity: isLoading && '0.3'}} className="border cursor-pointer px-2 bg-gray-950 relative">
                            <video
                                controls
                                width="100%"
                                src={prevImage}
                            />

                            <div
                                onClick={() => {
                                    setPrevImage(null);
                                }}
                                className="text-white absolute right-4 top-2"
                            >
                                <XMarkIcon className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    )}
                </form>
            </div>
            {isLoading && (
                <div className=" flex items-center justify-between p-3 my-2 bg-white rounded-md dark:bg-dark-main dark:text-white">
                    <span>Posting...</span>
                    <Oval
                        height={30}
                        width={30}
                        color="#0b536d"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel="oval-loading"
                        secondaryColor="#0b536d"
                        strokeWidth={4}
                        strokeWidthSecondary={4}
                    />
                </div>
            )}
        </div>
    );
};

export default PostCreator;

// const submitHandler = async e => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("image", image);
//     formData.append("caption", caption);
//     axios
//         .post("/api/binder/post/create", formData, {
//             headers: {
//                 Authorization: `Bearer ${user?.token}`,
//                 "Content-Type": "multipart/form-data",
//             },
//         })
//         .then(res => {
//             console.log(res.data);
//             setCaption("");
//         })
//         .catch(error => {
//             console.log(error);
//         });
// };
