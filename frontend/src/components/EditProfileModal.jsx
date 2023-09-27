import React, {useState} from 'react'
import {TailSpin} from "react-loader-spinner";
import useStore from '../services/useStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../services/axiosInstance'
import { BackspaceIcon } from "@heroicons/react/24/outline";




const EditProfileModal = ({currentUserLogId,status,modalCloseHandler}) => {
    const queryClient = useQueryClient()
    const {user} = useStore()
   
    const [username, setUsername] = useState(user.username)
    const [image, setImage] = useState(null);
    console.log(image)
    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [password, setPassword] = useState('')
    const [bio, setBio] = useState('')
    const [error, setError] = useState('')

   
    //delete
    // const dataUpdate = {username, name, email, bio}
    const {mutate,isLoading, mutateAsync} = useMutation({
        mutationFn: formData => 
        axiosInstance.patch(`/api/binder/user/${currentUserLogId}`, formData,{
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then(res => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries("userinfo", currentUserLogId)
            modalCloseHandler(false)
        }
    })


    const updateHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("image", image);
        formData.append("username", username);
        formData.append("name", name);
        formData.append("email", email);
        formData.append("bio", bio);

        for (var pair of formData.entries()) {
            console.log(pair[0]+ ' - ' + pair[1]); 
        }
        mutate(formData);
      
    }
     //imge handler
     const handleImageChange = event => {
        const file = event.target.files[0];
        setImage(file);

    };


    return (
       <div style={{display: status ? 'flex' : 'none'}} className='fixed z-10 top-0 left-0 flex items-center justify-center accent-gray-500/100 h-screen w-screen'>
        <div onClick={modalCloseHandler}  className='flex justify-center items-center w-screen h-screen fixed bottom-0 left-0 right-0 top-0 bg-black bg-opacity-60'></div>
         <div className=" rounded-md mb-3 border-b py-2 px-5 max-w-[500px] w-full bg-white
         absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
             {/* //exit button */}
             <div onClick={modalCloseHandler} className=' absolute right-4 top-2 cursor-pointer'>
             <BackspaceIcon class="h-9 w-9 text-red-500" />
              </div>
            <h3 className=' font-bold text-lg'>Edit Profile</h3>
            <form className='mt-4' onSubmit={updateHandler}>
                <div className="flex flex-col mb-2">
                    <div>
                        <img className='h-[100px] w-[100px] rounded-full' src={user.profile_image} alt="" />
                    </div>
                <label className='px-4 py-1 text-sm border rounded-sm max-w-[200px] my-4 cursor-pointer' htmlFor="fileInput">Change profile picture</label>
                <input accept="image/*" type="file" id="fileInput" onChange={handleImageChange} className="hidden" />
                    <div className="flex flex-col mb-4">
                        <label className=' font-[500] text-sm' htmlFor="username">Username</label>
                        <input
                            value={username}
                            className="border-2 p-2 mt-1 text-sm text-gray-500 focus:border-blue-500 outline-none"
                            onChange={e => {
                                setUsername(e.target.value);
                            }}
                            type="text"
                        />
                    </div>
                    <div className="flex flex-col mb-4">
                    <label className=' font-[500] text-sm' htmlFor="name">Name</label>
                    <input
                        value={name}
                        className="border p-2 mt-1 text-sm text-gray-500"
                        onChange={e => {
                            setName(e.target.value);
                        }}
                        type="text"
                    />
                    </div>
                   
                    {/* {isError &&(<span className=' text-xs text-red-600'>Field is required</span>)} */}
                </div>
                <div className="flex flex-col mb-4">
                    <label className=' font-[500] text-sm' htmlFor="email">Email</label>
                    <input
                        value={email}
                        className="border p-2 mt-1 text-sm text-gray-500"
                        onChange={e => {
                            setEmail(e.target.value);
                        }}
                        type="text"
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label className=' font-[500] text-sm' htmlFor="bio">Bio</label>
                    <input
                        value={bio}
                        className="border p-2 mt-1 text-sm text-gray-500"
                        onChange={e => {
                            setBio(e.target.value);
                        }}
                        type="text"
                        placeholder='Add Bio'
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label className=' font-[500] text-sm' htmlFor="password">Password</label>
                    <input
                        value={password}
                        className="border p-2 mt-1 text-sm text-gray-500"
                        onChange={e => {
                            setPassword(e.target.value);
                        }}
                        type="text"
                    />
                </div>
               
                <button
                    onClick={updateHandler}
                    style={{opacity: isLoading && "0.5"}}
                    className="flex gap-2 items-center justify-center p-2 bg-gray-200 text-gray-950 font-[500] text-center mt-2 rounded-sm w-full"
                >
                    {isLoading ? "Saving Changes" : "Save changes "}
                    {isLoading && (
                        <TailSpin
                            height={25}
                            width={25}
                            color="#0b536d"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                            ariaLabel="oval-loading"
                            secondaryColor="#0b536d"
                            strokeWidth={4}
                            strokeWidthSecondary={4}
                        />
                    )}
                </button>
                {error && (
                    <div className=" text-center p-1 border text-red-600 border-red-600 bg-red-100 text-sm my-2">
                        {error.error}
                    </div>
                )}
            </form>
        </div>
        
       </div>
    );
};

export default EditProfileModal;
