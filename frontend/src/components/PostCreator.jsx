import React, {useState} from "react";
import axios from "axios";
import {PhotoIcon, XMarkIcon} from "@heroicons/react/24/outline";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Oval} from "react-loader-spinner";
import axiosInstance from "../services/axiosInstance";

const PostCreator = () => {
    const [caption, setCaption] = useState("");
    const [image, setImage] = useState(null);
    const [prevImage, setPrevImage] = useState(null);


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
        <div>
            <div className=" bg-white rounded-md px-4 py-2 shadow-md">
                <span className=" font-bold">Create Post</span>
                <form onSubmit={submitHandler}>
                    <div className="my-2">
                        <input
                            value={caption}
                            onChange={e => {
                                setCaption(e.target.value);
                            }}
                            className="border w-full p-2 bg-gray-100"
                            type="text"
                            placeholder="Share your stories"
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <div>
                            <label htmlFor="fileInput" id="customFileLabel">
                                <div className="flex items-center cursor-pointer border-r px-5">
                                    <PhotoIcon className="h-6 w-6 text-sky-500 cursor-pointer mr-3" />
                                    <span className=" text-sm">Add Photo/Video</span>
                                </div>
                            </label>
                            <input accept="image/*,video/*" type="file" id="fileInput" onChange={handleImageChange} className=" hidden" />
                        </div>
                        <button
                            style={{opacity: caption || prevImage ? '1' : '0.5'}}
                            disabled={caption || prevImage ? false : true}
                            className=" bg-gray-900 py-1 px-3 text-white rounded-sm"
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
                <div className=" flex items-center justify-between p-3 my-2 bg-white rounded-md">
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
